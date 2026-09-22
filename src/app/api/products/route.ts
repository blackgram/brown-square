import { NextResponse } from "next/server";
import { getCommerceClient } from "@/lib/commerce";

export async function GET() {
  const products = await getCommerceClient().listProducts();
  return NextResponse.json({ products });
}
