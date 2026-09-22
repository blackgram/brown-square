"use client";

import { type ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Stagger, StaggerItem } from "./Reveal";

export function PageIntro({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Stagger
      as="section"
      immediate
      className={`flex flex-col pt-10 pb-12 max-md:pt-8 max-md:pb-10 ${className}`}
    >
      <StaggerItem>
        <Eyebrow>{eyebrow}</Eyebrow>
      </StaggerItem>
      <StaggerItem>
        <h1 className="mt-6 max-w-[1250px] font-display text-[clamp(62px,8.5vw,132px)] font-normal leading-[0.82] tracking-[-0.055em]">
          {title}
        </h1>
      </StaggerItem>
      {lead ? (
        <StaggerItem>
          <p className="lead ml-auto mt-9 max-w-[650px] text-[19px] leading-[1.55] max-md:ml-0">
            {lead}
          </p>
        </StaggerItem>
      ) : null}
    </Stagger>
  );
}
