import { NextResponse } from "next/server";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    await requireSessionUser("thip_manager");
    const snap = await adminDb()
      .collection("thipWaitlist")
      .orderBy("createdAt", "desc")
      .get();
    const entries = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ entries });
  } catch (error) {
    return authError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireSessionUser("thip_manager");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    await adminDb().collection("thipWaitlist").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return authError(error);
  }
}

function authError(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
  const message = error instanceof Error ? error.message : "Server error";
  return NextResponse.json({ message }, { status: 500 });
}
