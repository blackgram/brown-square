"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/content/products";
import type { CartLine } from "@/lib/commerce/types";

const STORAGE_KEY = "brownsquare-cart-v1";

type CartItem = CartLine & {
  title: string;
  description: string;
  priceCents: number;
  currency: Product["currency"];
  imageLabel: string;
  slug: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore corrupt storage
    }

    void fetch("/api/products")
      .then((res) => res.json())
      .then((json: { products?: Product[] }) => {
        if (Array.isArray(json.products)) setCatalog(json.products);
      })
      .catch(() => {
        // catalog stays empty; cart lines hydrate when available
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = catalog.find((p) => p.id === line.productId);
        if (!product || line.quantity < 1) return null;
        return {
          productId: product.id,
          quantity: line.quantity,
          title: product.title,
          description: product.description,
          priceCents: product.priceCents,
          currency: product.currency,
          imageLabel: product.imageLabel,
          slug: product.slug,
        };
      })
      .filter(Boolean) as CartItem[];
  }, [lines, catalog]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity < 1) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) =>
        l.productId === productId ? { ...l, quantity } : l,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotalCents: items.reduce(
        (sum, i) => sum + i.priceCents * i.quantity,
        0,
      ),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((o) => !o),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [items, isOpen, addItem, setQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
