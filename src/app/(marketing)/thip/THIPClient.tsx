"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Shell } from "@/components/ui/Shell";

const OPEN_SESSION_LINK = "https://tix.africa/discover/thip1";

const sessionLinkClass =
  "mt-4 inline-block border border-cream px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-cream hover:text-black";

const DESCRIBES_YOU = [
  "I run a business or lead a team",
  "I'm a creator, talent or public figure",
  "I'm building my professional career",
  "I'm simply curious",
] as const;

export default function THIPClient() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("thip-modal-open", modalOpen);
    return () => document.body.classList.remove("thip-modal-open");
  }, [modalOpen]);

  function openModal() {
    setSubmitted(false);
    setStatus(null);
    setModalOpen(true);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/thip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "think-lab",
          name: data.get("name"),
          email: data.get("email"),
          description: data.get("description"),
          curiosity: data.get("curiosity"),
          explore: data.get("explore"),
        }),
      });
      const json = (await res.json()) as { message: string };
      if (res.ok) {
        form.reset();
        setSubmitted(true);
      } else {
        setStatus(json.message);
      }
    } catch {
      setStatus("Something went wrong. Please email us directly.");
    } finally {
      setPending(false);
    }
  }

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
            <StaggerItem>
              <p className="mt-6 max-w-[720px] text-[19px] leading-[1.55]">
                We are bringing together people at different stages of their
                lives and careers to take part in{" "}
                <span className="font-[500]">The Human Intelligence Project</span>
                .
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
          <h2 className="font-display text-[clamp(36px,6vw,88px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Request Access to THIP Think Lab
          </h2>
          <Stagger className="mt-[70px] grid grid-cols-2 gap-[60px] border-t border-white/20 max-md:grid-cols-1">
            <StaggerItem className="min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0">
              <h3 className="font-display text-[28px] font-normal leading-tight">
                Open Session
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                What makes people recognise, trust and value you or your
                business? The Think Lab brings real-life situations, challenging
                questions and shared perspectives into one room to explore how
                reputation, perception and opportunities are shaped.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                This session will be documented.
              </p>
              <a
                href={OPEN_SESSION_LINK}
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
                Curious About The Think Lab?
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                Wondering what we&apos;re bringing people together to explore?
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                The Think Lab is an intimate, interactive experience exploring
                branding, perception, reputation and the decisions that shape
                how people and businesses are seen, understood and valued.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                If you&apos;re curious, we&apos;d love to know what interests
                you.
              </p>
              <button
                type="button"
                onClick={openModal}
                className={sessionLinkClass}
              >
                Tell us you&apos;re curious
              </button>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper">
            <div className="flex items-center justify-between border-b border-line px-4 py-4 max-md:px-4">
              <h2 className="font-display text-[32px] font-normal leading-tight">
                Tell Us a Little About Yourself
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-sm uppercase tracking-wider hover:opacity-70"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {submitted ? (
                <Shell className="flex max-w-2xl flex-col items-start py-16 max-md:py-12">
                  <Eyebrow>You&apos;re on the list</Eyebrow>
                  <h3 className="mt-6 font-display text-[clamp(36px,5vw,56px)] font-normal leading-[0.95] tracking-[-0.055em]">
                    Thanks for telling us you&apos;re curious.
                  </h3>
                  <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6]">
                    We&apos;ll be in touch using the email you shared.
                  </p>
                  <Link href="/" className="mt-10 inline-block">
                    <Button className="w-max bg-transparent">
                      Back to Home
                    </Button>
                  </Link>
                </Shell>
              ) : (
                <Shell className="max-w-3xl py-16 max-md:py-12">
                  <form
                    className="grid grid-cols-1 gap-x-10 gap-y-8"
                    onSubmit={onSubmit}
                  >
                    <p className="text-[19px] leading-[1.55]">
                      We&apos;re glad you&apos;re curious. A few questions to
                      help us understand what brings you here.
                    </p>

                    <Field label="1. What's your name?">
                      <input
                        name="name"
                        required
                        className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                      />
                    </Field>
                    <Field label="2. What's your email address?">
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                      />
                    </Field>
                    <fieldset>
                      <legend className="block text-xs uppercase tracking-wider text-muted font-[700]">
                        3. Which best describes you?
                      </legend>
                      <div className="mt-4 space-y-3">
                        {DESCRIBES_YOU.map((option) => (
                          <label
                            key={option}
                            className="flex items-start gap-3 text-[16px] leading-[1.5]"
                          >
                            <input
                              type="radio"
                              name="description"
                              value={option}
                              required
                              className="mt-1"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <Field label="4. What made you curious about The Think Lab?">
                      <textarea
                        name="curiosity"
                        required
                        className="min-h-[80px] w-full resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
                      />
                    </Field>
                    <Field label="5. Is there something you'd love us to explore?">
                      <textarea
                        name="explore"
                        className="min-h-[80px] w-full resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
                      />
                    </Field>
                    <Button
                      type="submit"
                      disabled={pending}
                      className="w-max bg-transparent disabled:opacity-50"
                    >
                      {pending ? "Submitting…" : "Submit"}
                    </Button>
                    <div className="min-h-5 text-xs leading-relaxed" role="status">
                      {status}
                    </div>
                  </form>
                </Shell>
              )}
            </div>
          </div>
        </>
      )}

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

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block w-full">
      <span className="block text-xs uppercase tracking-wider text-muted font-[700]">
        {label}
      </span>
      {children}
    </label>
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
