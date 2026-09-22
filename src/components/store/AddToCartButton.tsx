"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/CartProvider";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/content/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      onClick={() => addItem(product.id)}
      className="border-accent bg-accent text-paper hover:bg-ink hover:text-paper"
    >
      Add to cart — {formatMoney(product.priceCents, product.currency)}
    </Button>
  );
}
