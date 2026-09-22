"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { Product, ProductCategory } from "@/content/products";
import { productCategories } from "@/content/products";
import { formatMoney } from "@/lib/money";

type AdminProduct = Product & { published: boolean };

const categories = productCategories.filter(
  (c): c is ProductCategory => c !== "All Products",
);

export function ProductsAdminClient() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/products");
    const json = (await res.json()) as {
      products?: AdminProduct[];
      message?: string;
    };
    if (!res.ok) {
      setError(json.message || "Failed to load products");
      return;
    }
    setProducts(json.products || []);
  }

  useEffect(() => {
    void load();
  }, []);

  function startNew() {
    setEditing({
      id: "",
      slug: "",
      title: "",
      description: "",
      longDescription: "",
      priceCents: 0,
      currency: "NGN",
      category: "Consultations",
      imageLabel: "",
      image: "",
      published: true,
    });
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setPending(true);
    setError(null);
    try {
      const exists = products.some((p) => p.id === editing.id);
      const res = await fetch("/api/admin/products", {
        method: exists ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(json.message || "Save failed");
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm(`Delete ${id}?`)) return;
    const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = (await res.json()) as { message?: string };
      setError(json.message || "Delete failed");
      return;
    }
    await load();
  }

  async function onUpload(file: File) {
    const form = new FormData();
    form.set("folder", "products");
    form.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const json = (await res.json()) as { url?: string; message?: string };
    if (!res.ok || !json.url) {
      setError(json.message || "Upload failed");
      return;
    }
    setEditing((prev) => (prev ? { ...prev, image: json.url! } : prev));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{products.length} products</p>
        <button
          type="button"
          onClick={startNew}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper"
        >
          New product
        </button>
      </div>

      {error ? <p className="text-sm text-accent">{error}</p> : null}

      {editing ? (
        <form onSubmit={onSave} className="space-y-4 border border-line bg-paper p-6">
          <h2 className="font-display text-2xl">
            {products.some((p) => p.id === editing.id) ? "Edit product" : "New product"}
          </h2>
          <label className="grid gap-1 text-sm">
            ID / slug
            <input
              required
              value={editing.id}
              disabled={products.some((p) => p.id === editing.id)}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  id: e.target.value,
                  slug: e.target.value,
                })
              }
              className="border-b border-ink bg-transparent py-2 outline-none disabled:opacity-60"
            />
          </label>
          <label className="grid gap-1 text-sm">
            Title
            <input
              required
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="border-b border-ink bg-transparent py-2 outline-none"
            />
          </label>
          <label className="grid gap-1 text-sm">
            Short description
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              className="min-h-20 border border-line p-3 outline-none"
            />
          </label>
          <label className="grid gap-1 text-sm">
            Long description
            <textarea
              value={editing.longDescription}
              onChange={(e) =>
                setEditing({ ...editing, longDescription: e.target.value })
              }
              className="min-h-28 border border-line p-3 outline-none"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Price (kobo)
              <input
                type="number"
                required
                value={editing.priceCents}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    priceCents: Number(e.target.value) || 0,
                  })
                }
                className="border-b border-ink bg-transparent py-2 outline-none"
              />
              <span className="text-xs text-muted">
                Preview: {formatMoney(editing.priceCents, "NGN")}
              </span>
            </label>
            <label className="grid gap-1 text-sm">
              Category
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    category: e.target.value as ProductCategory,
                  })
                }
                className="border border-line bg-paper px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            Image label
            <input
              value={editing.imageLabel}
              onChange={(e) =>
                setEditing({ ...editing, imageLabel: e.target.value })
              }
              className="border-b border-ink bg-transparent py-2 outline-none"
            />
          </label>
          <label className="grid gap-1 text-sm">
            Image URL
            <input
              value={editing.image || ""}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              className="border-b border-ink bg-transparent py-2 outline-none"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onUpload(file);
            }}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(e) =>
                setEditing({ ...editing, published: e.target.checked })
              }
            />
            Published
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="text-sm text-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="divide-y divide-line border border-line bg-paper">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-wrap items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-xs text-muted">
                {product.id} · {formatMoney(product.priceCents, product.currency)} ·{" "}
                {product.published ? "published" : "draft"}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/store/${product.slug}`} className="text-muted hover:text-ink">
                View
              </Link>
              <button type="button" onClick={() => setEditing(product)}>
                Edit
              </button>
              <button
                type="button"
                className="text-accent"
                onClick={() => void onDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
