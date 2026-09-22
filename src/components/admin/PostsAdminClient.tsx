"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { Post } from "@/content/posts";

type AdminPost = Post & { published: boolean };

export function PostsAdminClient() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminPost | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/posts");
    const json = (await res.json()) as { posts?: AdminPost[]; message?: string };
    if (!res.ok) {
      setError(json.message || "Failed to load posts");
      return;
    }
    setPosts(json.posts || []);
  }

  useEffect(() => {
    void load();
  }, []);

  function startNew() {
    setEditing({
      slug: "",
      title: "",
      excerpt: "",
      date: new Date().toISOString().slice(0, 10),
      readingTime: "5 min",
      category: "The Unseen",
      image: "",
      imageAlt: "",
      body: [""],
      published: true,
    });
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setPending(true);
    setError(null);
    try {
      const method = posts.some((p) => p.slug === editing.slug) ? "PUT" : "POST";
      const res = await fetch("/api/admin/posts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editing,
          bodyText: editing.body.join("\n\n"),
        }),
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

  async function onDelete(slug: string) {
    if (!confirm(`Delete ${slug}?`)) return;
    const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`, {
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
    form.set("folder", "posts");
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
        <p className="text-sm text-muted">{posts.length} posts</p>
        <button
          type="button"
          onClick={startNew}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper"
        >
          New post
        </button>
      </div>

      {error ? <p className="text-sm text-accent">{error}</p> : null}

      {editing ? (
        <form onSubmit={onSave} className="space-y-4 border border-line bg-paper p-6">
          <h2 className="font-display text-2xl">
            {editing.slug && posts.some((p) => p.slug === editing.slug)
              ? "Edit post"
              : "New post"}
          </h2>
          <Field label="Slug">
            <input
              required
              value={editing.slug}
              disabled={posts.some((p) => p.slug === editing.slug)}
              onChange={(e) =>
                setEditing({ ...editing, slug: e.target.value })
              }
              className="w-full border-b border-ink bg-transparent py-2 outline-none disabled:opacity-60"
            />
          </Field>
          <Field label="Title">
            <input
              required
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full border-b border-ink bg-transparent py-2 outline-none"
            />
          </Field>
          <Field label="Excerpt">
            <textarea
              value={editing.excerpt}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              className="min-h-20 w-full border border-line bg-transparent p-3 outline-none"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Date">
              <input
                type="date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full border-b border-ink bg-transparent py-2 outline-none"
              />
            </Field>
            <Field label="Reading time">
              <input
                value={editing.readingTime}
                onChange={(e) =>
                  setEditing({ ...editing, readingTime: e.target.value })
                }
                className="w-full border-b border-ink bg-transparent py-2 outline-none"
              />
            </Field>
            <Field label="Category">
              <input
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                className="w-full border-b border-ink bg-transparent py-2 outline-none"
              />
            </Field>
          </div>
          <Field label="Cover image URL">
            <input
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
              className="w-full border-b border-ink bg-transparent py-2 outline-none"
            />
          </Field>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onUpload(file);
            }}
          />
          <Field label="Body (paragraphs separated by blank lines)">
            <textarea
              value={editing.body.join("\n\n")}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  body: e.target.value.split(/\n\n+/).map((p) => p.trim()),
                })
              }
              className="min-h-48 w-full border border-line bg-transparent p-3 outline-none"
            />
          </Field>
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
              className="text-sm text-muted hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="divide-y divide-line border border-line bg-paper">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex flex-wrap items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-xs text-muted">
                {post.slug} · {post.date} ·{" "}
                {post.published ? "published" : "draft"}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link
                href={`/onestoryworld/${post.slug}`}
                className="text-muted hover:text-ink"
              >
                View
              </Link>
              <button
                type="button"
                onClick={() => setEditing(post)}
                className="hover:text-accent"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => void onDelete(post.slug)}
                className="text-accent"
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span>{label}</span>
      {children}
    </label>
  );
}
