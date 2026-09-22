import { NextResponse } from "next/server";
import {
  AuthError,
  SESSION_COOKIE,
  createSessionCookie,
  getAdminUserByUid,
  revokeSession,
} from "@/lib/auth/session";
import { adminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { message: "Firebase Admin is not configured" },
      { status: 503 },
    );
  }

  let body: { idToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const idToken = body.idToken;
  if (!idToken) {
    return NextResponse.json({ message: "Missing idToken" }, { status: 400 });
  }

  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    const user = await getAdminUserByUid(decoded.uid);
    if (!user) {
      return NextResponse.json(
        { message: "No admin account for this user" },
        { status: 403 },
      );
    }

    const sessionCookie = await createSessionCookie(idToken);
    const response = NextResponse.json({ user });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create session";
    return NextResponse.json({ message }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  const session = match?.[1];

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  if (session && isFirebaseAdminConfigured()) {
    try {
      await revokeSession(session);
    } catch {
      // ignore revoke errors on logout
    }
  }

  return response;
}

export async function GET() {
  try {
    const { getSessionUser } = await import("@/lib/auth/session");
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
