import { posts, type Post } from "@/content/posts";

export type BlogClient = {
  listPosts: () => Promise<Post[]>;
  getPost: (slug: string) => Promise<Post | null>;
};

export const localBlogClient: BlogClient = {
  async listPosts() {
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  },
  async getPost(slug) {
    return posts.find((p) => p.slug === slug) ?? null;
  },
};
