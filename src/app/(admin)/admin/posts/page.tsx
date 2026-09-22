import { redirect } from "next/navigation";
import { PostsAdminClient } from "@/components/admin/PostsAdminClient";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = { title: "Posts" };

export default async function AdminPostsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, "editor")) redirect("/admin");

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl tracking-[-0.04em]">Posts</h1>
      <PostsAdminClient />
    </div>
  );
}
