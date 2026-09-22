import { NextResponse } from "next/server";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";
import { getSiteClient } from "@/lib/site";
import { CONTENT_TAGS, revalidateContent } from "@/lib/revalidate";

export async function GET() {
  try {
    await requireSessionUser("site_manager");
    const settings = await getSiteClient().getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return authError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireSessionUser("site_manager");
    const body = await request.json();
    const settings = {
      name: String(body.name || ""),
      tagline: String(body.tagline || ""),
      fullName: String(body.fullName || ""),
      description: String(body.description || ""),
      email: String(body.email || ""),
      footerTitle: String(body.footerTitle || ""),
      footerMeta: String(body.footerMeta || ""),
      reach: String(body.reach || ""),
      updatedAt: new Date().toISOString(),
    };
    await adminDb().collection("site").doc("settings").set(settings, { merge: true });
    revalidateContent(
      ["/", "/contact", "/about"],
      [CONTENT_TAGS.site],
    );
    return NextResponse.json({ settings });
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
