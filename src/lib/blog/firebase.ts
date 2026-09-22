import type { Post } from "@/content/posts";
import { posts as localPosts } from "@/content/posts";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import type { BlogClient } from "./local";

type PostDoc = {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  readingTime?: string;
  category?: string;
  image?: string;
  imageAlt?: string;
  body?: string[];
  published?: boolean;
};

function mapPost(id: string, data: PostDoc): Post {
  return {
    slug: data.slug ?? id,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    readingTime: data.readingTime ?? "",
    category: data.category ?? "One Story World",
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? data.title ?? "",
    body: Array.isArray(data.body) ? data.body : [],
  };
}

export const firebaseBlogClient: BlogClient = {
  async listPosts() {
    if (!isFirebaseAdminConfigured()) return [];
    const snap = await adminDb()
      .collection("posts")
      .where("published", "==", true)
      .get();
    return snap.docs
      .map((doc) => mapPost(doc.id, doc.data() as PostDoc))
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  async getPost(slug) {
    if (!isFirebaseAdminConfigured()) return null;
    const snap = await adminDb().collection("posts").doc(slug).get();
    if (!snap.exists) return null;
    const data = snap.data() as PostDoc;
    if (data.published === false) return null;
    return mapPost(snap.id, data);
  },
};

export async function listAllPostsAdmin(): Promise<
  Array<Post & { published: boolean }>
> {
  const snap = await adminDb().collection("posts").get();
  return snap.docs
    .map((doc) => {
      const data = doc.data() as PostDoc;
      return {
        ...mapPost(doc.id, data),
        published: data.published !== false,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostAdmin(slug: string) {
  const snap = await adminDb().collection("posts").doc(slug).get();
  if (!snap.exists) return null;
  const data = snap.data() as PostDoc;
  return {
    ...mapPost(snap.id, data),
    published: data.published !== false,
  };
}

export { localPosts };
