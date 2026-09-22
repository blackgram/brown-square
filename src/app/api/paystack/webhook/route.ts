import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ message: "Paystack not configured" }, { status: 503 });
  }

  const signature = request.headers.get("x-paystack-signature");
  const rawBody = await request.text();

  if (!signature || !verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let event: {
    event?: string;
    data?: { reference?: string; status?: string; amount?: number };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (event.event === "charge.success" && event.data?.reference) {
    const reference = event.data.reference;
    if (isFirebaseAdminConfigured()) {
      const ref = adminDb().collection("orders").doc(reference);
      const snap = await ref.get();
      if (snap.exists && snap.data()?.status !== "paid") {
        await ref.set(
          {
            status: "paid",
            paidAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paystackAmount: event.data.amount,
          },
          { merge: true },
        );
      } else if (!snap.exists) {
        await ref.set({
          reference,
          status: "paid",
          amount: event.data.amount ?? 0,
          currency: "NGN",
          paidAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}

function verifySignature(body: string, signature: string, secret: string) {
  const hash = createHmac("sha512", secret).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
  } catch {
    return false;
  }
}
