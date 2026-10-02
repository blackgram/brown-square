import { redirect } from "next/navigation";
import { ThipAdminClient } from "@/components/admin/ThipAdminClient";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "THIP Waitlist" };

export default async function AdminThipPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, "thip_manager")) redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl tracking-[-0.04em]">
        THIP Waitlist
      </h1>
      <ThipAdminClient />
    </div>
  );
}
