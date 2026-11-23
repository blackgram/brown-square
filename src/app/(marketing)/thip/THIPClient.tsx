"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Shell";
import { RESERVATION_URL } from "@/content/thip";

const EARLY_BIRD_CLOSES = "2026-12-13T23:59:59";

const DESCRIBES_YOU = [
  "I run a business or lead a team",
  "I'm a creator, talent or public figure",
  "I'm building my professional career",
  "I'm simply curious",
] as const;

const body = "text-[17px] leading-[1.6] text-[#49463f]";
const display = "font-display font-normal leading-[0.95] tracking-[-0.05em]";

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
    <div className="bg-paper text-ink">
      <Reveal
        as="section"
        immediate
        className="pt-12 pb-14 max-md:pt-8 max-md:pb-10 lg:pt-20"
      >
        <Shell>
          <h1
            className={`max-w-[14ch] text-[clamp(48px,6.4vw,96px)] ${display}`}
          >
            The Human Intelligence Project
          </h1>
          <figure className="mt-10 overflow-hidden">
            <Image
              src="/think-lab-001/IMG_5989.PNG"
              alt="Speaking at The Think Lab in Lagos"
              width={1600}
              height={1067}
              priority
              className="h-auto w-full object-cover"
            />
          </figure>
          <div className="mt-12 grid grid-cols-[1.2fr_0.8fr] items-end gap-x-16 gap-y-6 max-md:grid-cols-1">
            <p className={`max-w-[16ch] text-[clamp(32px,4vw,56px)] ${display}`}>
              Intelligence changes everything.
            </p>
            <p className={`max-w-[420px] ${body}`}>
              A place to question what you know, examine what you believe, and
              develop the intelligence to build.
            </p>
          </div>
        </Shell>
      </Reveal>

      <Reveal
        as="section"
        className="border-y border-line bg-cream py-10 max-md:py-8"
      >
        <Shell className="flex flex-col items-center text-center">
          <Eyebrow>Early bird reservation closes soon</Eyebrow>
          <CountdownTimer target={EARLY_BIRD_CLOSES} />
        </Shell>
      </Reveal>

      <Reveal as="section" className="grid grid-cols-2 bg-ink text-paper max-md:grid-cols-1">
        <div className="relative min-h-[560px] max-md:min-h-[320px]">
          <Image
            src="/think-lab-001/IMG_6043.PNG"
            alt="Presenting The Human Intelligence Project"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 max-md:px-4 max-md:py-12 md:px-14 lg:px-20">
          <Eyebrow className="text-[#c8c3b8]">Our next experience</Eyebrow>
          <h2 className={`mt-4 max-w-[10ch] text-[clamp(48px,5.4vw,84px)] ${display}`}>
            The Elements of Branding
          </h2>
          <p className="mt-6 text-[clamp(22px,2.4vw,30px)] tracking-[-0.03em]">
            30th January, 2027
          </p>
          <ReserveLink tone="paper" className="mt-10" />
        </div>
      </Reveal>

      <Reveal as="section" className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="flex flex-col justify-center px-8 py-16 max-md:px-4 max-md:py-12 md:px-14 lg:px-20">
          <h2 className={`text-[clamp(44px,5vw,72px)] ${display}`}>
            The Think Lab
          </h2>
          <p className={`mt-8 max-w-[16ch] text-[clamp(26px,2.8vw,36px)] ${display}`}>
            A room for questions that deserve more than easy answers.
          </p>
          <p className={`mt-6 max-w-[460px] ${body}`}>
            The Think Lab brings people from different backgrounds together to
            examine the ideas, decisions and perceptions that shape their work
            and lives.
          </p>
        </div>
        <div className="relative min-h-[560px] max-md:min-h-[320px]">
          <Image
            src="/think-lab-001/IMG_6028.PNG"
            alt="The Think Lab in conversation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_20%]"
          />
        </div>
      </Reveal>

      <Reveal as="section" className="border-t border-line py-20 max-md:py-14">
        <Shell>
          <Eyebrow>The idea</Eyebrow>
          <h2 className={`mt-6 max-w-[14ch] text-[clamp(44px,5.6vw,84px)] ${display}`}>
            What if the way you see things is the very thing holding you back?
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-x-16 gap-y-6 max-md:grid-cols-1">
            <p className="text-[19px] leading-[1.55]">
              The Human Intelligence Project exists to challenge assumptions,
              expand perspectives and help people develop the judgement to
              navigate their personal and professional lives.
            </p>
            <p className="text-[19px] leading-[1.55]">
              We believe that intelligence grows when knowledge is questioned,
              experience is shared and ideas are put to the test.
            </p>
          </div>
        </Shell>
      </Reveal>

      <Reveal as="section" className="grid grid-cols-2 border-t border-line max-md:grid-cols-1">
        <div className="relative min-h-[520px] max-md:min-h-[300px]">
          <Image
            src="/think-lab-001/IMG_6044.PNG"
            alt="Participants at Think Lab 001 in Lagos"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 max-md:px-4 max-md:py-12 md:px-14 lg:px-20">
          <Eyebrow>Recent project experience</Eyebrow>
          <h2 className={`mt-4 max-w-[12ch] text-[clamp(36px,4vw,60px)] ${display}`}>
            What Makes Your Brand Valuable?
          </h2>
          <p className="mt-5 text-[18px] tracking-[-0.02em]">November 7, 2026</p>
          <Button href="/thip/think-lab-001" className="mt-10 w-max">
            See update
          </Button>
        </div>
      </Reveal>

      <Reveal as="section" className="bg-ink py-24 text-center text-paper max-md:py-16">
        <Shell className="flex flex-col items-center">
          <h2 className={`max-w-[12ch] text-[clamp(48px,6.2vw,92px)] ${display}`}>
            The next conversation is waiting.
          </h2>
          <p className={`mt-8 text-[clamp(28px,3.2vw,44px)] ${display}`}>
            The Elements of Branding
          </p>
          <p className="mt-3 text-[18px] tracking-[0.04em] text-[#c8c3b8]">
            30th January, 2027
          </p>
          <ReserveLink tone="paper" className="mt-10" />
          <p className="mt-6 text-[15px] text-[#c8c3b8]">
            Early bird reservation closes 13th December 2026.
          </p>
        </Shell>
      </Reveal>

      <Reveal as="section" className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="relative min-h-[520px] max-md:min-h-[300px]">
          <Image
            src="/think-lab-001/IMG_6040.PNG"
            alt="A conversation at Think Lab 001"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 max-md:px-4 max-md:py-12 md:px-14 lg:px-20">
          <h2 className={`max-w-[12ch] text-[clamp(40px,4.6vw,64px)] ${display}`}>
            Curious About The Think Lab?
          </h2>
          <p className={`mt-6 max-w-[420px] text-[19px] leading-[1.55]`}>
            Wondering what we&apos;re bringing people together to explore?
          </p>
          <p className={`mt-4 max-w-[420px] text-[19px] leading-[1.55]`}>
            If you&apos;re curious, we&apos;d love to know what interests you.
          </p>
          <Button type="button" onClick={openModal} className="mt-10 w-max">
            Let&apos;s have a conversation
          </Button>
        </div>
      </Reveal>

      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
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
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mt-10 text-sm uppercase tracking-wider"
                  >
                    Back to the page
                  </button>
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
                      <legend className="block text-xs font-[700] uppercase tracking-wider text-muted">
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
    </div>
  );
}

function ReserveLink({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const tones =
    tone === "paper"
      ? "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
      : "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink";

  return (
    <a
      href={RESERVATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-max items-center border px-5 py-3.5 text-[14px] transition-colors duration-200 ${tones} ${className}`}
    >
      Reserve your seat now
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
    return <div className="mt-6 h-18" aria-hidden />;
  }

  if (remaining <= 0) {
    return (
      <p className="mt-6 font-display text-[28px] leading-tight">
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

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block w-full">
      <span className="block text-xs font-[700] uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
