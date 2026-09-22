"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Shell";
import { site } from "@/content/site";

export default function ContactClient() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { message: string };
      setStatus(json.message);
      if (res.ok) form.reset();
    } catch {
      setStatus("Something went wrong. Please email us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell className="grid grid-cols-[1.05fr_0.95fr] gap-[90px] pt-10 pb-20 max-md:grid-cols-1 max-md:gap-12 max-md:py-12">
      <Stagger immediate>
        <StaggerItem>
          <Eyebrow>Let&apos;s talk</Eyebrow>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mt-[25px] mb-10 font-display text-[clamp(60px,8vw,120px)] font-normal leading-[0.83] tracking-[-0.055em]">
            What are you building, protecting, or trying to say?
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-[720px] text-[19px] leading-[1.55]">
            Whether it&apos;s a brand, a leader, a launch, or a reputation in need
            of care, start the conversation and we&apos;ll take it from there.
          </p>
        </StaggerItem>
      </Stagger>

      <Reveal immediate delay={0.15} className="pt-[50px] max-md:pt-0">
        <form className="grid gap-7" onSubmit={onSubmit}>
          <Field label="Full name">
            <input
              name="name"
              required
              className="border-0 border-b border-ink bg-transparent py-3 outline-none"
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              className="border-0 border-b border-ink bg-transparent py-3 outline-none"
            />
          </Field>
          <Field label="Organisation">
            <input
              name="organisation"
              className="border-0 border-b border-ink bg-transparent py-3 outline-none"
            />
          </Field>
          <Field label="What can we help with?">
            <textarea
              name="message"
              required
              className="min-h-[110px] resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
            />
          </Field>
          <Button
            type="submit"
            disabled={pending}
            className="w-max bg-transparent disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send message ↗"}
          </Button>
          <div className="min-h-5 text-xs leading-relaxed" role="status">
            {status}
          </div>
        </form>

        <div className="mt-[50px] border-t border-line">
          <InfoRow label="Reach" value={site.reach} />
          <InfoRow
            label="Email"
            value={
              <a href={`mailto:${site.email}`} className="hover:opacity-70">
                {site.email}
              </a>
            }
          />
          <InfoRow
            label="New business"
            value="Strategic communications, PR, talent management, consumer experience, and leadership development."
          />
        </div>
      </Reveal>
    </Shell>
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
    <label className="grid gap-[9px]">
      <span className="text-[11px] uppercase tracking-[0.1em]">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] border-b border-line py-[22px] text-sm leading-normal">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
