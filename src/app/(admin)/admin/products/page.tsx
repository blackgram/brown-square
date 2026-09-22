import { redirect } from "next/navigation";
import { ProductsAdminClient } from "@/components/admin/ProductsAdminClient";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, "product_manager")) redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl tracking-[-0.04em]">Products</h1>
      <ProductsAdminClient />
    </div>
  );
}
