import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FinalCta } from "@/components/ui/FinalCta";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Shell } from "@/components/ui/Shell";
import { processSteps, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <Shell>
        <Stagger
          immediate
          className="flex flex-col pt-10 pb-12 max-md:pt-8 max-md:pb-10"
        >
          <StaggerItem>
            <Eyebrow>What we do</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-[35px] font-display text-[clamp(65px,9vw,140px)] font-normal leading-[0.8] tracking-[-0.055em]">
              Five disciplines.
              <br />
              One point of view.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-9 max-w-[720px] text-[19px] leading-[1.55]">
              Every engagement draws on the same combination of creative instinct
              and commercial rigour, applied wherever culture, reputation, and
              business transformation meet.
            </p>
          </StaggerItem>
        </Stagger>
      </Shell>

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <Stagger>
            {services.map((service) => (
              <StaggerItem
                key={service.id}
                className="grid grid-cols-[60px_0.9fr_1.1fr] gap-[35px] border-t border-line py-[52px] transition-[padding] duration-250 last:border-b hover:pl-3 max-md:grid-cols-[42px_1fr]"
              >
                <span className="text-[10px] text-muted">{service.num}</span>
                <h2 className="font-display text-[clamp(35px,4vw,58px)] font-normal leading-[0.95] tracking-[-0.055em]">
                  {service.title}
                  <small className="mt-[15px] block font-sans text-[11px] uppercase tracking-[0.12em]">
                    {service.subtitle}
                  </small>
                </h2>
                <p className="m-0 text-[17px] leading-[1.7] max-md:col-start-2">
                  {service.detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-black py-16 text-cream max-md:py-12">
        <Shell>
          <Eyebrow className="text-[#999]">How we think</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Understand.
            <br />
            Design. Move.
          </h2>
          <Stagger className="mt-[70px] grid grid-cols-3 border-t border-white/20 max-md:grid-cols-1">
            {processSteps.map((step, index) => (
              <StaggerItem
                key={step.num}
                className={`min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0 ${
                  index < processSteps.length - 1 ? "border-r max-md:border-r-0" : ""
                } ${index > 0 ? "pl-[30px] max-md:pl-0" : ""}`}
              >
                <span className="text-[10px] text-[#999]">{step.num}</span>
                <h3 className="mt-[45px] mb-[15px] font-display text-[30px] font-normal tracking-[-0.055em] max-md:my-4">
                  {step.title}
                </h3>
                <p className="leading-[1.55] text-[#bbb6ac]">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Reveal>

      <FinalCta
        title="Tell us what you're building, or protecting."
        href="/contact"
        label="Start a conversation ↗"
      />
    </>
  );
}
