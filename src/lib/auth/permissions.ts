export const ADMIN_PERMISSIONS = [
  "editor",
  "product_manager",
  "site_manager",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];
export type UserRole = "super_admin" | "admin";

export type AdminUser = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  permissions: AdminPermission[];
  createdAt: string;
  updatedAt: string;
};

export function can(
  user: Pick<AdminUser, "role" | "permissions"> | null | undefined,
  permission: AdminPermission | "manage_users",
): boolean {
  if (!user) return false;
  if (user.role === "super_admin") return true;
  if (permission === "manage_users") return false;
  return user.permissions.includes(permission);
}

export function isValidPermission(value: string): value is AdminPermission {
  return (ADMIN_PERMISSIONS as readonly string[]).includes(value);
}
