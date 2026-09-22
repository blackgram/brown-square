import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/ui/Shell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { getCommerceClient } from "@/lib/commerce";
import { formatMoney } from "@/lib/money";
import { products } from "@/content/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCommerceClient().getProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getCommerceClient().getProduct(slug);
  if (!product) notFound();

  return (
    <Shell className="grid grid-cols-2 gap-16 py-10 max-md:grid-cols-1 md:py-14">
      <Reveal immediate>
        <div className="flex aspect-square items-center justify-center bg-warm p-10">
          <div className="flex aspect-[3/4] w-[60%] items-center justify-center bg-ink p-6 text-center text-xs font-semibold uppercase leading-tight tracking-[0.14em] text-accent">
            {product.imageLabel}
          </div>
        </div>
      </Reveal>
      <Stagger immediate className="flex flex-col justify-center">
        <StaggerItem>
          <Eyebrow>{product.category}</Eyebrow>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mt-4 font-display text-[clamp(40px,5vw,72px)] font-normal leading-[0.95] tracking-[-0.05em]">
            {product.title}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 font-display text-3xl tracking-[-0.03em]">
            {formatMoney(product.priceCents, product.currency)}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[#555149]">
            {product.longDescription}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-10">
          <AddToCartButton product={product} />
        </StaggerItem>
      </Stagger>
    </Shell>
  );
}
