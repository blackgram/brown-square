import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import type { AdminPermission } from "@/lib/auth/permissions";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const folder = String(form.get("folder") || "uploads");
    const permission: AdminPermission =
      folder === "products" ? "product_manager" : "editor";
    await requireSessionUser(permission);

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ message: "file is required" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${folder}/${Date.now()}-${safeName}`;

    const blob = await put(path, file, {
      access: "public",
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({ url: blob.url, path: blob.pathname });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}

