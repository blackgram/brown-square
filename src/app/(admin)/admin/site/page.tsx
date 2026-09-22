import { redirect } from "next/navigation";
import { SiteAdminClient } from "@/components/admin/SiteAdminClient";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "Site details" };

export default async function AdminSitePage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, "site_manager")) redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl tracking-[-0.04em]">
        Site details
      </h1>
      <SiteAdminClient />
    </div>
  );
}
