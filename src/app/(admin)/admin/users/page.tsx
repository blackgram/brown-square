import { redirect } from "next/navigation";
import { UsersAdminClient } from "@/components/admin/UsersAdminClient";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = {
  title: "Users",
};

export default async function AdminUsersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, "manage_users")) redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl tracking-[-0.04em]">Users</h1>
      <UsersAdminClient />
    </div>
  );
}
