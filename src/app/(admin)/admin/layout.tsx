import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="min-h-full bg-[#f7f5f1] text-ink">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <Link href="/admin" className="shrink-0 text-sm font-semibold tracking-[-0.03em]">
              BrownSquare Admin
            </Link>
            <div className="flex items-center gap-4 text-sm md:hidden">
              {user ? (
                <>
                  <Link href="/admin/account" className="text-muted hover:text-ink">
                    Account
                  </Link>
                  <AdminSignOut />
                </>
              ) : (
                <Link href="/admin/login" className="hover:opacity-70">
                  Sign in
                </Link>
              )}
              <Link href="/" className="text-muted hover:text-ink">
                View site
              </Link>
            </div>
          </div>
          {user ? <AdminNav user={user} /> : null}
          <div className="hidden items-center gap-4 text-sm md:flex">
            {user ? (
              <>
                <span className="text-muted">{user.email}</span>
                <Link href="/admin/account" className="text-muted hover:text-ink">
                  Account
                </Link>
                <AdminSignOut />
              </>
            ) : (
              <Link href="/admin/login" className="hover:opacity-70">
                Sign in
              </Link>
            )}
            <Link href="/" className="text-muted hover:text-ink">
              View site
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-[min(1200px,calc(100%-32px))] py-10">{children}</main>
    </div>
  );
}
