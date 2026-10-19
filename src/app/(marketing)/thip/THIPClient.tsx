"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Shell } from "@/components/ui/Shell";

const SESSION_LINKS = {
  private: "https://tix.africa/discover/thip2",
  open: "https://tix.africa/discover/thip1",
} as const;

const sessionLinkClass =
  "mt-4 inline-block border border-cream px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-cream hover:text-black";

export default function THIPClient() {
  return (
    <>
      <Shell className="flex flex-col pt-10 pb-12 max-md:pt-8 max-md:pb-10">
        <Stagger immediate>
          <StaggerItem>
            <div className="text-4xl font-bold">
              The Human Intelligence Project
            </div>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-[35px] font-display text-2xl font-normal">
              What happens when intelligence stops being something you know and
              becomes something you can use?
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-9 max-w-[720px] text-[19px] leading-[1.55] font-bold">
              How much of what we know actually survives real life?
            </p>
          </StaggerItem>
        </Stagger>
      </Shell>

      <Rule />

      <Reveal
        as="section"
        className="border-y border-line bg-cream py-10 max-md:py-8"
      >
        <Shell className="flex flex-col items-center text-center">
          <Eyebrow>Registration closes soon</Eyebrow>
          <CountdownTimer target="2026-11-04T23:59:59" />
        </Shell>
      </Reveal>

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <Stagger>
            {/* <StaggerItem>
              <h2 className="font-display text-[clamp(27px,7vw,100px)] font-semibold leading-[0.9] tracking-[-0.055em]">
                Open Call
              </h2>
            </StaggerItem> */}
            <StaggerItem>
              <p className="mt-6 max-w-[720px] text-[19px] leading-[1.55]">
                We are bringing together people at different stages of their
                lives and careers to take part in <span className="font-[500]">The Human Intelligence Project</span>.
              </p>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-4 max-w-[720px] list-disc space-y-2 pl-5 text-[19px] leading-[1.55]">
                <li>There are things you can learn from books.</li>
                <li>Things you can learn from experience.</li>
                <li>
                  And then there are things you only understand when you sit
                  with us in the square.
                </li>
              </ul>
            </StaggerItem>
            <StaggerItem className="mt-5">
              <span className="font-bold text-[19px] leading-[1.55]">
                We are interested in the third!
              </span>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[720px] text-[19px] leading-[1.55]">
                We&apos;ll test ideas. Interrogate assumptions. Study decisions.
                And put theory in situations where something actually has to
                happen.
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-black py-16 text-cream max-md:py-12">
        <Shell>
          <h2 className="font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Two Groups, Different Days
          </h2>
          <Stagger className="mt-[70px] grid grid-cols-2 gap-[60px] border-t border-white/20 max-md:grid-cols-1">
            <StaggerItem className="min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0">
              <h3 className="font-display text-[28px] font-normal leading-tight">
                Open Session
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                For emerging talents and creators. A more participatory
                experience involving simulations, real-life scenarios and
                exercises. These sessions will be documented.
              </p>
              <a
                href={SESSION_LINKS.open}
                target="_blank"
                rel="noopener noreferrer"
                className={sessionLinkClass}
              >
                Get tickets
              </a>
              <p className="mt-4 text-xs text-cream/60">
                Registration closes 4th November 2026.
              </p>
            </StaggerItem>
            <StaggerItem className="min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0">
              <h3 className="font-display text-[28px] font-normal leading-tight">
                Private Sessions
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                For public figures, CEOs and business owners. Closed-room
                sessions. Case studies. Conversations. Real situations.
                Participants will not be recorded.
              </p>
              <a
                href={SESSION_LINKS.private}
                target="_blank"
                rel="noopener noreferrer"
                className={sessionLinkClass}
              >
                Get tickets
              </a>
              <p className="mt-4 text-xs text-cream/60">
                Registration closes 4th November 2026.
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      {/* <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <Stagger>
            <StaggerItem>
              <h2 className="font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
                I&apos;m curious
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-[720px] text-[19px] leading-[1.55]">
                If this has made you curious, that&apos;s enough for now. Leave us a
                few details about yourself and we will be in touch.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[720px] text-[14px] leading-[1.6] text-muted">
                Registration of interest closes 10th October 2026. The Human
                Intelligence Project is a paid experience. Joining the waitlist
                requires no payment or commitment. Full participation details,
                including dates, fees and what comes next, will be shared with
                waitlist members after registration closes.
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal> */}

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell className="text-center">
          <Eyebrow>Powered by</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(40px,5vw,80px)] font-normal leading-tight tracking-[-0.055em]">
            BrownSquare Insight
          </h2>
        </Shell>
      </Reveal>
    </>
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
    // avoids a 0 -> real value flash before the first client tick
    return <div className="mt-6 h-18" aria-hidden />;
  }

  if (remaining <= 0) {
    return (
      <p className="mt-6 font-display text-[28px] leading-tight">
        Open call has closed
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
      className="mt-6 flex items-start gap-6 max-md:gap-4"
      role="timer"
      aria-live="off"
    >
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="font-display text-[clamp(32px,6vw,56px)] leading-none tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-[11px] uppercase tracking-wider text-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
