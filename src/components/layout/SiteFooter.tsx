import Link from "next/link";
import { footerLinks } from "@/content/site";
import { Shell } from "@/components/ui/Shell";
import { getSiteClient } from "@/lib/site";

export async function SiteFooter() {
  const site = await getSiteClient().getSettings();

  return (
    <footer className="bg-ink px-0 pb-7 pt-[55px] text-paper">
      <Shell>
        <div className="grid grid-cols-[1fr_auto] items-start gap-10 max-md:grid-cols-1">
          <div className="max-w-[750px] font-display text-[clamp(38px,5vw,72px)] leading-[0.96] tracking-[-0.05em]">
            {site.footerTitle}
          </div>
          <div className="grid gap-3 text-[13px] max-md:grid-cols-3 max-md:justify-start max-md:gap-[18px]">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-70">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-[70px] border-t border-white/18 pt-[25px] text-[11px] text-[#aaa59b]">
          {site.reach} ·{" "}
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
        </div>
        <div className="mt-[20px] flex justify-between border-t border-white/18 pt-5 text-[11px] uppercase tracking-[0.08em] text-[#aaa59b] max-md:flex-col max-md:gap-5">
          <span>© 2026 {site.fullName}.</span>
          <span>{site.footerMeta}</span>
        </div>
      </Shell>
    </footer>
  );
}
