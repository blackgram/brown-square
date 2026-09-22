import { NextResponse } from "next/server";
import {
  ADMIN_PERMISSIONS,
  isValidPermission,
  type AdminPermission,
  type UserRole,
} from "@/lib/auth/permissions";
import {
  AuthError,
  ensureUserDoc,
  requireSessionUser,
} from "@/lib/auth/session";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    await requireSessionUser("manage_users");
    const snap = await adminDb().collection("users").orderBy("email").get();
    const users = snap.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ users });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSessionUser("manage_users");
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      displayName?: string;
      role?: UserRole;
      permissions?: string[];
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { message: "Email and password (min 8 chars) are required" },
        { status: 400 },
      );
    }

    const role: UserRole = body.role === "super_admin" ? "super_admin" : "admin";
    const permissions = normalizePermissions(body.permissions, role);

    const created = await adminAuth().createUser({
      email,
      password,
      displayName: body.displayName?.trim() || email.split("@")[0],
    });

    const user = await ensureUserDoc({
      uid: created.uid,
      email,
      displayName: created.displayName || email,
      role,
      permissions,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireSessionUser("manage_users");
    const body = (await request.json()) as {
      uid?: string;
      displayName?: string;
      role?: UserRole;
      permissions?: string[];
    };

    if (!body.uid) {
      return NextResponse.json({ message: "uid is required" }, { status: 400 });
    }

    const ref = adminDb().collection("users").doc(body.uid);
    const existing = await ref.get();
    if (!existing.exists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const role: UserRole =
      body.role === "super_admin"
        ? "super_admin"
        : body.role === "admin"
          ? "admin"
          : (existing.data()?.role as UserRole);

    const permissions = normalizePermissions(
      body.permissions ?? existing.data()?.permissions,
      role,
    );

    const updates = {
      displayName:
        body.displayName?.trim() ||
        existing.data()?.displayName ||
        existing.data()?.email,
      role,
      permissions,
      updatedAt: new Date().toISOString(),
    };

    await ref.set(updates, { merge: true });
    if (body.displayName) {
      await adminAuth().updateUser(body.uid, { displayName: updates.displayName });
    }

    return NextResponse.json({
      user: { uid: body.uid, email: existing.data()?.email, ...updates },
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

function normalizePermissions(
  raw: unknown,
  role: UserRole,
): AdminPermission[] {
  if (role === "super_admin") return [];
  if (!Array.isArray(raw)) return [];
  return raw.filter(isValidPermission);
}

function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
  const message =
    error instanceof Error ? error.message : "Unexpected server error";
  return NextResponse.json({ message }, { status: 500 });
}

export { ADMIN_PERMISSIONS };
