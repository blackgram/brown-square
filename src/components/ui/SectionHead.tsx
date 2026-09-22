import { type ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHead({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-10 grid grid-cols-[0.7fr_1.3fr] gap-10 max-md:mb-8 max-md:grid-cols-1 max-md:gap-5 ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-[800px] font-display text-[clamp(42px,5vw,76px)] font-normal leading-[0.95] tracking-[-0.055em]">
        {title}
      </h2>
    </div>
  );
}
