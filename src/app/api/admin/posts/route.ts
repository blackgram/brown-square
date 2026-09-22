import { NextResponse } from "next/server";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";
import { getPostAdmin, listAllPostsAdmin } from "@/lib/blog/firebase";
import { CONTENT_TAGS, revalidateContent } from "@/lib/revalidate";

export async function GET() {
  try {
    await requireSessionUser("editor");
    const posts = await listAllPostsAdmin();
    return NextResponse.json({ posts });
  } catch (error) {
    return authError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSessionUser("editor");
    const body = await request.json();
    const slug = String(body.slug || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    if (!slug || !body.title) {
      return NextResponse.json(
        { message: "slug and title are required" },
        { status: 400 },
      );
    }

    const existing = await adminDb().collection("posts").doc(slug).get();
    if (existing.exists) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }

    const doc = normalizePostBody(body, slug);
    await adminDb().collection("posts").doc(slug).set(doc);
    revalidateContent(
      ["/onestoryworld", `/onestoryworld/${slug}`, "/"],
      [CONTENT_TAGS.posts, `post:${slug}`],
    );
    return NextResponse.json({ post: { ...doc, slug } }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireSessionUser("editor");
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    if (!slug) {
      return NextResponse.json({ message: "slug is required" }, { status: 400 });
    }
    const existing = await getPostAdmin(slug);
    if (!existing) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    const doc = normalizePostBody(body, slug);
    await adminDb().collection("posts").doc(slug).set(doc, { merge: true });
    revalidateContent(
      ["/onestoryworld", `/onestoryworld/${slug}`, "/"],
      [CONTENT_TAGS.posts, `post:${slug}`],
    );
    return NextResponse.json({ post: { ...existing, ...doc, slug } });
  } catch (error) {
    return authError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireSessionUser("editor");
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ message: "slug is required" }, { status: 400 });
    }
    await adminDb().collection("posts").doc(slug).delete();
    revalidateContent(
      ["/onestoryworld", `/onestoryworld/${slug}`, "/"],
      [CONTENT_TAGS.posts, `post:${slug}`],
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return authError(error);
  }
}

function normalizePostBody(body: Record<string, unknown>, slug: string) {
  const now = new Date().toISOString();
  return {
    slug,
    title: String(body.title || ""),
    excerpt: String(body.excerpt || ""),
    date: String(body.date || now.slice(0, 10)),
    readingTime: String(body.readingTime || "5 min"),
    category: String(body.category || "The Unseen"),
    image: String(body.image || ""),
    imageAlt: String(body.imageAlt || body.title || ""),
    body: Array.isArray(body.body)
      ? body.body.map(String)
      : String(body.bodyText || "")
          .split(/\n\n+/)
          .map((p) => p.trim())
          .filter(Boolean),
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
