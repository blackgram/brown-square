"use client";

import { useCart } from "@/lib/cart/CartProvider";

export function CartButton({ className = "" }: { className?: string }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`inline-flex items-center gap-1 text-[13px] transition-colors hover:opacity-70 ${className}`}
      aria-label={`Open cart, ${itemCount} items`}
    >
      Cart
      <span className="bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-paper">
        | {itemCount} |
      </span>
    </button>
  );
}
