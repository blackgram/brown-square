import { products, type Product } from "@/content/products";
import type { CheckoutLine, CheckoutSessionResult } from "./types";

export type CommerceClient = {
  listProducts: () => Promise<Product[]>;
  getProduct: (slug: string) => Promise<Product | null>;
  createCheckoutSession: (
    lines: CheckoutLine[],
  ) => Promise<CheckoutSessionResult>;
};

export const localCommerceClient: CommerceClient = {
  async listProducts() {
    return products;
  },
  async getProduct(slug) {
    return products.find((p) => p.slug === slug) ?? null;
  },
  async createCheckoutSession(_lines) {
    // Swap for Stripe (or other) when NEXT_PUBLIC_COMMERCE_PROVIDER !== "local"
    return {
      url: null,
      message: "Checkout coming soon. Payment provider not configured.",
    };
  },
};
