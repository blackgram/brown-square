import Link from "next/link";
import { redirect } from "next/navigation";
import { can } from "@/lib/auth/permissions";
import { getSessionUser } from "@/lib/auth/session";

export const metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  const cards = [
    {
      href: "/admin/posts",
      title: "Posts",
      body: "Create and publish One Story World articles.",
      show: can(user, "editor"),
    },
    {
      href: "/admin/products",
      title: "Products",
      body: "Manage the BrownSquare Toolkit store.",
      show: can(user, "product_manager"),
    },
    {
      href: "/admin/site",
      title: "Site details",
      body: "Update contact email, reach line, and footer copy.",
      show: can(user, "site_manager"),
    },
    {
      href: "/admin/users",
      title: "Users",
      body: "Create admins and assign permissions.",
      show: can(user, "manage_users"),
    },
  ].filter((c) => c.show);

  return (
    <div>
      <h1 className="font-display text-4xl tracking-[-0.04em]">Dashboard</h1>
      <p className="mt-2 text-muted">
        Signed in as {user.displayName || user.email} ({user.role})
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-line bg-paper p-6 transition-colors hover:border-accent/40"
          >
            <h2 className="font-display text-2xl tracking-[-0.03em]">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
