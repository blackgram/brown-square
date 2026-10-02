import { redirect } from "next/navigation";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "Account" };

export default async function AdminAccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div>
      <h1 className="mb-2 font-display text-4xl tracking-[-0.04em]">Account</h1>
      <p className="mb-8 text-sm text-muted">
        {user.displayName || user.email} · {user.email} · {user.role}
      </p>
      <ChangePasswordForm />
    </div>
  );
}
