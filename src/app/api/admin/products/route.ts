import { NextResponse } from "next/server";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";
import { getProductAdmin, listAllProductsAdmin } from "@/lib/commerce/firebase";
import { CONTENT_TAGS, revalidateContent } from "@/lib/revalidate";

export async function GET() {
  try {
    await requireSessionUser("product_manager");
    const products = await listAllProductsAdmin();
    return NextResponse.json({ products });
  } catch (error) {
    return authError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSessionUser("product_manager");
    const body = await request.json();
    const id = String(body.id || body.slug || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    if (!id || !body.title) {
      return NextResponse.json(
        { message: "id/slug and title are required" },
        { status: 400 },
      );
    }
    const existing = await adminDb().collection("products").doc(id).get();
    if (existing.exists) {
      return NextResponse.json({ message: "Product already exists" }, { status: 409 });
    }
    const doc = normalizeProduct(body, id);
    await adminDb().collection("products").doc(id).set(doc);
    revalidateContent(
      ["/store", `/store/${doc.slug}`, "/"],
      [CONTENT_TAGS.products, `product:${doc.slug}`],
    );
    return NextResponse.json({ product: { ...doc, id } }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireSessionUser("product_manager");
    const body = await request.json();
    const id = String(body.id || "").trim();
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    const existing = await getProductAdmin(id);
    if (!existing) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const doc = normalizeProduct(body, id);
    await adminDb().collection("products").doc(id).set(doc, { merge: true });
    revalidateContent(
      ["/store", `/store/${doc.slug}`, "/"],
      [CONTENT_TAGS.products, `product:${doc.slug}`],
    );
    return NextResponse.json({ product: { ...existing, ...doc, id } });
  } catch (error) {
    return authError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireSessionUser("product_manager");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    const existing = await getProductAdmin(id);
    await adminDb().collection("products").doc(id).delete();
    if (existing) {
      revalidateContent(
        ["/store", `/store/${existing.slug}`, "/"],
        [CONTENT_TAGS.products, `product:${existing.slug}`],
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return authError(error);
  }
}

function normalizeProduct(body: Record<string, unknown>, id: string) {
  const now = new Date().toISOString();
  const slug = String(body.slug || id)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-");
  return {
    id,
    slug,
    title: String(body.title || ""),
    description: String(body.description || ""),
    longDescription: String(body.longDescription || ""),
    priceCents: Number(body.priceCents) || 0,
    currency: "NGN" as const,
    category: String(body.category || "Consultations"),
    imageLabel: String(body.imageLabel || body.title || ""),
    image: String(body.image || ""),
    published: body.published !== false,
    updatedAt: now,
  };
}

function authError(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
  const message = error instanceof Error ? error.message : "Server error";
  return NextResponse.json({ message }, { status: 500 });
}
