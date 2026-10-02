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
    href: "/admin/thip",
    label: "THIP Waitlist",
    permission: "thip_manager" as const,
  },
  {
    href: "/admin/users",
    label: "Users",
    permission: "manage_users" as const,
  },
];

export function AdminNav({ user }: { user: AdminUser }) {
  const pathname = usePathname();

  return (
    <nav className="-mx-4 flex items-center gap-4 overflow-x-auto whitespace-nowrap px-4 text-[13px] md:mx-0 md:flex-wrap md:overflow-visible md:whitespace-normal md:px-0">
      {links.map((link) => {
        if (!can(user, link.permission)) return null;
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "shrink-0 font-bold text-accent"
                : "shrink-0 text-muted hover:text-ink"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
