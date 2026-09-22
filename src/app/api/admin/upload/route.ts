import { NextResponse } from "next/server";
import { AuthError, requireSessionUser } from "@/lib/auth/session";
import { adminStorage } from "@/lib/firebase/admin";
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

    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${folder}/${Date.now()}-${safeName}`;
    const bucket = adminStorage().bucket();
    const object = bucket.file(path);
    await object.save(bytes, {
      metadata: { contentType: file.type || "application/octet-stream" },
    });
    try {
      await object.makePublic();
    } catch {
      // bucket may already be public via IAM
    }

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${path}`;
    return NextResponse.json({ url: publicUrl, path });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
