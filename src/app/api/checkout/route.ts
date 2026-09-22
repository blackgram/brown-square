import { NextResponse } from "next/server";
import { getCommerceClient } from "@/lib/commerce";
import type { CheckoutLine } from "@/lib/commerce/types";

export async function POST(request: Request) {
  let body: { lines?: CheckoutLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const lines = body.lines ?? [];
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  const result = await getCommerceClient().createCheckoutSession(lines);
  return NextResponse.json(result, { status: result.url ? 200 : 501 });
}
