import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateContent(paths: string[], tags: string[] = []) {
  for (const path of paths) {
    revalidatePath(path);
  }
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}

export const CONTENT_TAGS = {
  posts: "posts",
  products: "products",
  site: "site",
} as const;
