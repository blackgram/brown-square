"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/content/site";
import { Shell } from "@/components/ui/Shell";
import { CartButton } from "@/components/store/CartButton";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-[14px] transition-[box-shadow,background] duration-250 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.05)]" : ""
        }`}
      >
        <Shell className="flex h-[82px] items-center justify-between">
          <Link href="/" className="text-[21px] font-semibold tracking-[-0.04em]">
            {site.name}
            <small className="mt-px block text-[9px] font-normal uppercase tracking-[0.16em]">
              {site.tagline}
            </small>
          </Link>

          <nav className="flex items-center gap-7 text-[13px] max-md:hidden">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              if (item.cta) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-4 border border-ink px-[17px] py-3 transition-colors duration-200 hover:bg-ink hover:text-paper"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "font-bold text-accent"
                      : "hover:opacity-70"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <CartButton />
          </nav>

          <div className="hidden items-center gap-4 max-md:flex">
            <CartButton />
            <button
              type="button"
              className="border-0 bg-transparent text-xs uppercase tracking-[0.12em]"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </Shell>
      </header>

      {menuOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-[78px] z-[19] flex flex-col gap-2 bg-cream px-4 py-[45px] md:hidden">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-line py-2 font-display text-[44px] tracking-[-0.05em] ${
                  active ? "font-bold text-accent" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.cta ? "Contact" : item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
