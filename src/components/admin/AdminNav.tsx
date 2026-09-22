"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { can, type AdminUser } from "@/lib/auth/permissions";

const links = [
  { href: "/admin/posts", label: "Posts", permission: "editor" as const },
  {
    href: "/admin/products",
    label: "Products",
    permission: "product_manager" as const,
  },
  { href: "/admin/site", label: "Site", permission: "site_manager" as const },
  {
    href: "/admin/users",
    label: "Users",
    permission: "manage_users" as const,
  },
];

export function AdminNav({ user }: { user: AdminUser }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-4 text-[13px]">
      {links.map((link) => {
        if (!can(user, link.permission)) return null;
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active ? "font-bold text-accent" : "text-muted hover:text-ink"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
