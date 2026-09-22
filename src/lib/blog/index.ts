import { unstable_cache } from "next/cache";
import { localBlogClient, type BlogClient } from "./local";
import { firebaseBlogClient } from "./firebase";
import { CONTENT_TAGS } from "@/lib/revalidate";

function rawBlogClient(): BlogClient {
  const provider = process.env.BLOG_PROVIDER ?? "local";
  if (provider === "firebase") return firebaseBlogClient;
  return localBlogClient;
}

export function getBlogClient(): BlogClient {
  const client = rawBlogClient();
  return {
    listPosts: unstable_cache(
      () => client.listPosts(),
      ["blog-list", process.env.BLOG_PROVIDER ?? "local"],
      { tags: [CONTENT_TAGS.posts] },
    ),
    getPost: (slug: string) =>
      unstable_cache(
        () => client.getPost(slug),
        ["blog-post", slug, process.env.BLOG_PROVIDER ?? "local"],
        { tags: [CONTENT_TAGS.posts, `post:${slug}`] },
      )(),
  };
}

export type { BlogClient } from "./local";
export type { Post } from "@/content/posts";
