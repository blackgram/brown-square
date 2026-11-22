"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Shell";

const RESERVATION_URL =
  "https://tix.africa/discover/the-elements-of-branding-by-thip/checkout?step=tickets";

const EARLY_BIRD_CLOSES = "2026-12-13T23:59:59";

const body = "text-[17px] leading-[1.6] text-[#49463f]";
const display =
  "font-display font-normal leading-[0.95] tracking-[-0.05em]";

export default function THIPClient() {
  return (
    <div className="bg-paper font-sans text-ink">
      <Reveal
        as="section"
        immediate
        className="pt-12 pb-16 max-md:pt-8 max-md:pb-12 lg:pt-20 lg:pb-24"
      >
        <Shell>
          <div className="grid grid-cols-[1.35fr_0.65fr] items-end gap-x-16 gap-y-8 max-md:grid-cols-1">
            <div>
              <Eyebrow>BrownSquare Insight</Eyebrow>
              <h1
                className={`mt-4 max-w-[12ch] text-[clamp(52px,7vw,108px)] ${display}`}
              >
                The Human Intelligence Project
              </h1>
            </div>
            <div className="max-w-[420px] pb-2 max-md:max-w-none">
              <p className={`${display} text-[clamp(26px,3vw,36px)]`}>
                Intelligence changes everything.
              </p>
              <p className={`mt-5 ${body}`}>
                A place to question what you know, examine what you believe,
                and develop the intelligence to build what comes next.
              </p>
            </div>
          </div>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-[#24170D] text-white">
        <Shell className="grid grid-cols-[1.15fr_0.85fr] items-end gap-x-16 gap-y-10 py-16 max-md:grid-cols-1 max-md:py-12 lg:py-24">
          <div>
            <Eyebrow className="text-white/55">Our next experience</Eyebrow>
            <h2 className={`mt-5 text-[clamp(44px,5.4vw,80px)] ${display}`}>
              The Think Lab
            </h2>
            <p className="mt-4 text-[clamp(22px,2.4vw,32px)] leading-tight tracking-[-0.03em]">
              The Elements of Branding
            </p>
          </div>
          <div className="max-w-[440px] md:justify-self-end">
            <CountdownTimer target={EARLY_BIRD_CLOSES} />
            <p className="mt-4 text-[16px] leading-relaxed text-white/75 md:text-right">
              Early bird reservation closes 13th December 2026.
            </p>
            <ReserveLink className="mt-8 md:ml-auto" />
          </div>
        </Shell>
      </Reveal>

      <Reveal as="section" className="py-6 max-md:py-2">
        <Shell>
          <article className="grid grid-cols-[72px_1fr_1fr] gap-x-10 gap-y-6 border-t border-line py-16 max-md:grid-cols-1 max-md:py-12">
            <Eyebrow className="pt-2 text-muted">01</Eyebrow>
            <h2 className={`text-[clamp(32px,3.4vw,48px)] ${display}`}>
              What if the way you see things is the very thing holding you back?
            </h2>
            <div className="flex flex-col gap-5 md:pt-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                The idea
              </p>
              <p className={body}>
                The Human Intelligence Project exists to challenge assumptions,
                expand perspectives and help people develop the judgement to
                navigate their personal and professional lives.
              </p>
              <p className={body}>
                We believe that intelligence grows when knowledge is questioned,
                experience is shared and ideas are put to the test.
              </p>
            </div>
          </article>

          <article className="grid grid-cols-[72px_0.9fr_1.1fr] gap-x-10 gap-y-6 border-t border-line py-16 max-md:grid-cols-1 max-md:py-12">
            <Eyebrow className="pt-2 text-muted">02</Eyebrow>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                The experience
              </p>
              <h2 className={`mt-4 text-[clamp(32px,3.4vw,48px)] ${display}`}>
                The Think Lab returns in January 2027.
              </h2>
              <p className="mt-4 text-[clamp(20px,2vw,26px)] leading-snug tracking-[-0.03em]">
                This edition: The Elements of Branding.
              </p>
              <p className={`mt-5 ${body}`}>
                Early bird reservation closes 13th December 2026.
              </p>
              <ReserveLink className="mt-8" />
            </div>
            <div className="flex flex-col gap-5 md:pt-9">
              <p className={body}>
                A room for questions that deserve more than easy answers.
              </p>
              <p className={body}>
                The Think Lab brings people from different backgrounds together
                to examine the ideas, decisions and perceptions that shape
                their work and lives.
              </p>
              <p className={body}>
                Before you build a brand, understand what makes one.
              </p>
              <p className={body}>
                An experience examining the foundations of branding, from
                identity and positioning to perception, value and trust.
              </p>
              <p className={body}>
                Not simply how a brand looks, but why it matters, what it
                represents and what makes people believe in it.
              </p>
            </div>
          </article>

          <article className="grid grid-cols-[72px_1fr_1fr] gap-x-10 gap-y-8 border-t border-line py-16 max-md:grid-cols-1 max-md:py-12">
            <Eyebrow className="pt-2 text-muted">03</Eyebrow>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                The first chapter
              </p>
              <h2 className={`mt-4 text-[clamp(32px,3.4vw,48px)] ${display}`}>
                It started with a question.
              </h2>
              <p className={`mt-6 ${body}`}>
                On November 7, 2026, the inaugural Think Lab brought together
                creators, entrepreneurs and professionals in Lagos to explore
                one question:
              </p>
              <p className={`mt-6 text-[clamp(24px,2.4vw,32px)] ${display}`}>
                What Makes Your Brand Valuable?
              </p>
              <p className={`mt-6 ${body}`}>
                Through practical exercises and conversations across industries,
                participants examined the relationship between capability,
                perception, reputation and value.
              </p>
              <p className={`mt-5 ${body}`}>
                The experience was designed around the quality of the
                conversation, not the prominence of the people contributing to
                it.
              </p>
            </div>
            <figure className="flex min-h-[420px] flex-col justify-end border border-line bg-warm p-6 max-md:min-h-[260px] md:mt-9">
              <figcaption className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                Think Lab 001
              </figcaption>
            </figure>
          </article>

          <article className="grid grid-cols-[72px_1.2fr_0.8fr] gap-x-10 gap-y-6 border-t border-line py-16 max-md:grid-cols-1 max-md:py-12">
            <Eyebrow className="pt-3 text-muted">04</Eyebrow>
            <h2 className={`text-[clamp(36px,4vw,60px)] ${display}`}>
              Built for people who are willing to think differently.
            </h2>
            <div className="flex flex-col gap-5 md:pt-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                The institution
              </p>
              <p className={body}>
                The Human Intelligence Project is an initiative of BrownSquare
                Insight, bringing together practical learning, critical
                thinking, branding, reputation and talent development.
              </p>
              <p className={body}>
                Our work is built on a simple belief: what you know matters,
                but what you do with what you know matters even more.
              </p>
            </div>
          </article>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-[#24170D] text-white">
        <Shell className="flex flex-col items-center px-6 py-24 text-center max-md:py-16">
          <h2 className={`max-w-[14ch] text-[clamp(44px,6vw,84px)] ${display}`}>
            The next conversation is waiting.
          </h2>
          <p className="mt-6 text-[clamp(22px,2.4vw,30px)] tracking-[-0.03em]">
            Find your room.
          </p>
          <ReserveLink className="mt-10" />
          <Eyebrow className="mt-16 text-white/50">BrownSquare Insight</Eyebrow>
        </Shell>
      </Reveal>
    </div>
  );
}

function ReserveLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={RESERVATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center border border-[#FFA41B] bg-[#FFA41B] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#24170D] transition-colors duration-200 hover:bg-[#24170D] hover:text-[#FFA41B] ${className}`}
    >
      Reserve your place
    </a>
  );
}

function CountdownTimer({ target }: { target: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (remaining === null) {
    return <div className="mt-6 h-16" aria-hidden />;
  }

  if (remaining <= 0) {
    return (
      <p className="mt-6 font-display text-[28px] leading-tight md:text-right">
        Early bird reservation has closed
      </p>
    );
  }

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div
      className="mt-6 flex items-start gap-5 md:justify-end max-md:gap-4"
      role="timer"
      aria-live="off"
    >
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="font-display text-[clamp(28px,4vw,44px)] leading-none tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-[11px] uppercase tracking-wider text-white/55">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
