import type { CheckoutLine, CheckoutSessionResult } from "@/lib/commerce/types";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { products as localProducts } from "@/content/products";

type ProductRow = {
  id: string;
  title: string;
  priceCents: number;
  slug: string;
};

async function resolveProducts(lines: CheckoutLine[]): Promise<{
  items: Array<ProductRow & { quantity: number }>;
  amount: number;
}> {
  const items: Array<ProductRow & { quantity: number }> = [];
  let amount = 0;

  for (const line of lines) {
    if (!line.productId || line.quantity < 1) continue;
    let product: ProductRow | null = null;

    if (isFirebaseAdminConfigured() && process.env.NEXT_PUBLIC_COMMERCE_PROVIDER !== "local") {
      const snap = await adminDb().collection("products").doc(line.productId).get();
      if (snap.exists) {
        const data = snap.data()!;
        if (data.published !== false) {
          product = {
            id: snap.id,
            title: data.title,
            priceCents: data.priceCents,
            slug: data.slug,
          };
        }
      }
    }

    if (!product) {
      const local = localProducts.find((p) => p.id === line.productId);
      if (local) {
        product = {
          id: local.id,
          title: local.title,
          priceCents: local.priceCents,
          slug: local.slug,
        };
      }
    }

    if (!product) continue;
    items.push({ ...product, quantity: line.quantity });
    amount += product.priceCents * line.quantity;
  }

  return { items, amount };
}

export async function createPaystackCheckout(
  lines: CheckoutLine[],
): Promise<CheckoutSessionResult> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return {
      url: null,
      message: "Paystack is not configured (missing PAYSTACK_SECRET_KEY).",
    };
  }

  const { items, amount } = await resolveProducts(lines);
  if (!items.length || amount < 1) {
    return { url: null, message: "Cart is empty or products were not found." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const reference = `bs_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const email =
    process.env.PAYSTACK_CHECKOUT_EMAIL ||
    process.env.SUPER_ADMIN_EMAIL ||
    "checkout@brownsquareconsult.com";

  if (isFirebaseAdminConfigured()) {
    await adminDb()
      .collection("orders")
      .doc(reference)
      .set({
        reference,
        status: "pending",
        amount,
        currency: "NGN",
        items: items.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          priceCents: item.priceCents,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      currency: "NGN",
      reference,
      callback_url: `${siteUrl}/checkout/success?reference=${reference}`,
      metadata: {
        order_reference: reference,
        items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
      },
    }),
  });

  const json = (await res.json()) as {
    status: boolean;
    message: string;
    data?: { authorization_url?: string };
  };

  if (!res.ok || !json.status || !json.data?.authorization_url) {
    return {
      url: null,
      message: json.message || "Failed to initialize Paystack transaction.",
    };
  }

  return {
    url: json.data.authorization_url,
    message: "Redirecting to Paystack…",
  };
}
