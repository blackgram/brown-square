"use client";

import { type ReactNode } from "react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Shell } from "./Shell";

export function FinalCta({
  title,
  href,
  label,
}: {
  title: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Reveal as="section" className="py-14 max-md:py-12">
      <Shell className="grid grid-cols-[1fr_auto] items-end gap-10 max-md:grid-cols-1 max-md:gap-9">
        <h2 className="max-w-[900px] font-display text-[clamp(50px,6vw,90px)] font-normal leading-[0.92] tracking-[-0.055em]">
          {title}
        </h2>
        <Button href={href}>{label}</Button>
      </Shell>
    </Reveal>
  );
}
