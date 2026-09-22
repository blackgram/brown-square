import type { Product } from "@/content/products";
import { products as localProducts } from "@/content/products";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import type { CheckoutLine, CheckoutSessionResult } from "./types";
import type { CommerceClient } from "./local";
import { createPaystackCheckout } from "@/lib/paystack/checkout";

type ProductDoc = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  longDescription?: string;
  priceCents?: number;
  currency?: "NGN" | "GBP";
  category?: Product["category"];
  imageLabel?: string;
  image?: string;
  published?: boolean;
};

function mapProduct(id: string, data: ProductDoc): Product {
  return {
    id: data.id ?? id,
    slug: data.slug ?? id,
    title: data.title ?? "",
    description: data.description ?? "",
    longDescription: data.longDescription ?? "",
    priceCents: data.priceCents ?? 0,
    currency: (data.currency as Product["currency"]) ?? "NGN",
    category: data.category ?? "Consultations",
    imageLabel: data.imageLabel ?? data.title ?? "",
    image: data.image,
  };
}

export const firebaseCommerceClient: CommerceClient = {
  async listProducts() {
    if (!isFirebaseAdminConfigured()) return [];
    const snap = await adminDb()
      .collection("products")
      .where("published", "==", true)
      .get();
    return snap.docs.map((doc) => mapProduct(doc.id, doc.data() as ProductDoc));
  },

  async getProduct(slug) {
    if (!isFirebaseAdminConfigured()) return null;
    const bySlug = await adminDb()
      .collection("products")
      .where("slug", "==", slug)
      .limit(1)
      .get();
    if (!bySlug.empty) {
      const doc = bySlug.docs[0]!;
      const data = doc.data() as ProductDoc;
      if (data.published === false) return null;
      return mapProduct(doc.id, data);
    }
    const byId = await adminDb().collection("products").doc(slug).get();
    if (!byId.exists) return null;
    const data = byId.data() as ProductDoc;
    if (data.published === false) return null;
    return mapProduct(byId.id, data);
  },

  async createCheckoutSession(lines: CheckoutLine[]) {
    return createPaystackCheckout(lines);
  },
};

export async function listAllProductsAdmin(): Promise<
  Array<Product & { published: boolean; image?: string }>
> {
  const snap = await adminDb().collection("products").get();
  return snap.docs.map((doc) => {
    const data = doc.data() as ProductDoc;
    return {
      ...mapProduct(doc.id, data),
      published: data.published !== false,
      image: data.image,
    };
  });
}

export async function getProductAdmin(id: string) {
  const snap = await adminDb().collection("products").doc(id).get();
  if (!snap.exists) return null;
  const data = snap.data() as ProductDoc;
  return {
    ...mapProduct(snap.id, data),
    published: data.published !== false,
    image: data.image,
  };
}

export { localProducts };
