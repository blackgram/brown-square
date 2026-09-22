"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMoneyExact } from "@/lib/money";
import { useCart } from "@/lib/cart/CartProvider";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    subtotalCents,
    setQuantity,
    removeItem,
  } = useCart();
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  async function checkout() {
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url: string | null; message: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setStatus(data.message || "Checkout coming soon.");
    } catch {
      setStatus("Unable to start checkout. Try again later.");
    } finally {
      setPending(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={closeCart}
      />
      <aside className="relative flex h-full w-full max-w-[440px] flex-col bg-warm shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl tracking-[-0.04em]">Your cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="flex justify-between px-6 pt-4 text-[11px] uppercase tracking-[0.1em] text-muted">
          <span>Product</span>
          <span>Total</span>
        </div>
        <div className="mx-6 mt-2 border-t border-line" />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-ink p-1 text-center text-[7px] uppercase leading-tight tracking-wider text-accent">
                    {item.imageLabel}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/store/${item.slug}`}
                          onClick={closeCart}
                          className="font-semibold"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        {formatMoneyExact(item.priceCents * item.quantity)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          setQuantity(
                            item.productId,
                            Number.parseInt(e.target.value, 10) || 1,
                          )
                        }
                        className="w-12 border border-line bg-paper px-2 py-1 text-center text-sm"
                        aria-label={`Quantity for ${item.title}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-muted hover:text-ink"
                        aria-label={`Remove ${item.title}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Estimated total</span>
            <span className="font-semibold">
              {formatMoneyExact(subtotalCents)} NGN
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            By completing your purchase, you agree to our{" "}
            <span className="underline">Terms of Sale</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
          {status ? (
            <p className="mt-3 text-xs text-accent" role="status">
              {status}
            </p>
          ) : null}
          <button
            type="button"
            disabled={items.length === 0 || pending}
            onClick={checkout}
            className="mt-4 w-full bg-accent py-3.5 text-center font-medium text-paper transition-opacity disabled:opacity-40"
          >
            {pending ? "Starting checkout…" : "Checkout"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
