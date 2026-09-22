import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = {
  title: "Admin login",
};

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");

  return (
    <Suspense fallback={<p className="mt-16 text-center text-sm">Loading…</p>}>
      <AdminLoginForm />
    </Suspense>
  );
}
