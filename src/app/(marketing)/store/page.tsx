import type { Metadata } from "next";
import { Shell } from "@/components/ui/Shell";
import { StoreCatalog } from "@/components/store/StoreCatalog";
import { getCommerceClient } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Store",
};

export default async function StorePage() {
  const products = await getCommerceClient().listProducts();

  return (
    <Shell className="py-10 md:py-14">
      <StoreCatalog products={products} />
    </Shell>
  );
}
