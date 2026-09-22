import { unstable_cache } from "next/cache";
import { localCommerceClient, type CommerceClient } from "./local";
import { firebaseCommerceClient } from "./firebase";
import { CONTENT_TAGS } from "@/lib/revalidate";
import { createPaystackCheckout } from "@/lib/paystack/checkout";
import type { CheckoutLine } from "./types";

function rawCommerceClient(): CommerceClient {
  const provider = process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? "local";
  if (provider === "firebase" || provider === "paystack") {
    return firebaseCommerceClient;
  }
  return {
    ...localCommerceClient,
    createCheckoutSession: async (lines: CheckoutLine[]) => {
      if (process.env.PAYSTACK_SECRET_KEY) {
        return createPaystackCheckout(lines);
      }
      return localCommerceClient.createCheckoutSession(lines);
    },
  };
}

export function getCommerceClient(): CommerceClient {
  const client = rawCommerceClient();
  return {
    listProducts: unstable_cache(
      () => client.listProducts(),
      ["products-list", process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? "local"],
      { tags: [CONTENT_TAGS.products] },
    ),
    getProduct: (slug: string) =>
      unstable_cache(
        () => client.getProduct(slug),
        ["product", slug, process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? "local"],
        { tags: [CONTENT_TAGS.products, `product:${slug}`] },
      )(),
    createCheckoutSession: (lines) => client.createCheckoutSession(lines),
  };
}

export type { CommerceClient } from "./local";
export type {
  CartLine,
  CheckoutLine,
  CheckoutSessionResult,
} from "./types";
