import { cookies } from "next/headers";
import { adminAuth, adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  can,
  type AdminPermission,
  type AdminUser,
  type UserRole,
  isValidPermission,
} from "@/lib/auth/permissions";

export const SESSION_COOKIE = "__session";
const SESSION_EXPIRES_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function createSessionCookie(idToken: string) {
  return adminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRES_MS,
  });
}

export async function revokeSession(sessionCookie: string) {
  const decoded = await adminAuth().verifySessionCookie(sessionCookie);
  await adminAuth().revokeRefreshTokens(decoded.sub);
}

export async function getSessionUser(): Promise<AdminUser | null> {
  if (!isFirebaseAdminConfigured()) return null;

  const jar = await cookies();
  const session = jar.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const decoded = await adminAuth().verifySessionCookie(session, true);
    return getAdminUserByUid(decoded.uid);
  } catch {
    return null;
  }
}

export async function requireSessionUser(
  permission?: AdminPermission | "manage_users",
): Promise<AdminUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new AuthError("Unauthorized", 401);
  }
  if (permission && !can(user, permission)) {
    throw new AuthError("Forbidden", 403);
  }
  return user;
}

export async function getAdminUserByUid(uid: string): Promise<AdminUser | null> {
  const snap = await adminDb().collection("users").doc(uid).get();
  if (!snap.exists) {
    // Bootstrap first super admin by email match
    const authUser = await adminAuth().getUser(uid);
    const superEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase();
    if (
      superEmail &&
      authUser.email?.toLowerCase() === superEmail
    ) {
      return ensureUserDoc({
        uid,
        email: authUser.email,
        displayName: authUser.displayName || "Super Admin",
        role: "super_admin",
        permissions: [],
      });
    }
    return null;
  }

  const data = snap.data()!;
  return {
    uid,
    email: data.email,
    displayName: data.displayName ?? "",
    role: data.role as UserRole,
    permissions: Array.isArray(data.permissions)
      ? data.permissions.filter(isValidPermission)
      : [],
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

export async function ensureUserDoc(input: {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  permissions: AdminPermission[];
}): Promise<AdminUser> {
  const now = new Date().toISOString();
  const doc = {
    email: input.email,
    displayName: input.displayName,
    role: input.role,
    permissions: input.role === "super_admin" ? [] : input.permissions,
    createdAt: now,
    updatedAt: now,
  };
  await adminDb().collection("users").doc(input.uid).set(doc, { merge: true });
  return { uid: input.uid, ...doc };
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export { can };
