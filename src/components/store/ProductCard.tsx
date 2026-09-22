import Link from "next/link";
import type { Product } from "@/content/products";
import { formatMoney } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/store/${product.slug}`} className="group block">
      <div className="flex aspect-square items-center justify-center bg-warm p-8">
        <div className="flex aspect-[3/4] w-[55%] items-center justify-center bg-ink p-4 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-accent transition-transform duration-300 group-hover:scale-[1.02]">
          {product.imageLabel}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl tracking-[-0.03em]">{product.title}</h3>
        <span className="shrink-0 font-display text-xl tracking-[-0.03em]">
          {formatMoney(product.priceCents, product.currency)}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#555149]">
        {product.description}
      </p>
    </Link>
  );
}
