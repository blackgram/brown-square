import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FinalCta } from "@/components/ui/FinalCta";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHead } from "@/components/ui/SectionHead";
import { Shell } from "@/components/ui/Shell";
import { values } from "@/content/services";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Shell>
        <PageIntro
          eyebrow="About BrownSquare"
          title="A human-led firm built for African realities."
          lead="BrownSquare Consult & Insight is a human-led creative thinking and design firm, powered by technology, serving brands, public figures, and some of Nollywood's largest releases."
        />
      </Shell>

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell className="grid grid-cols-[220px_1fr] gap-[60px] max-md:grid-cols-1">
          <Eyebrow>Who we are</Eyebrow>
          <div>
            <h2 className="font-display text-[clamp(48px,6vw,90px)] font-normal leading-[0.93] tracking-[-0.055em]">
              Culture, reputation and business transformation, in one room.
            </h2>
            <div className="ml-auto mt-10 max-w-[760px] max-md:ml-0">
              <p className="text-[18px] leading-[1.7]">
                We work with brands, public figures, and organisations
                worldwide, offering a rare combination of creative instinct and
                commercial rigour that most agencies split between two different
                departments.
              </p>
            </div>
          </div>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-ink py-16 text-paper max-md:py-12">
        <Shell className="grid grid-cols-[220px_1fr] gap-[60px] max-md:grid-cols-1">
          <Eyebrow className="text-[#c8c3b8]">How we see the work</Eyebrow>
          <div>
            <h2 className="font-display text-[clamp(48px,6vw,90px)] font-normal leading-[0.93] tracking-[-0.055em]">
              Understanding before execution.
            </h2>
            <div className="ml-auto mt-10 max-w-[760px] max-md:ml-0">
              <p className="text-[18px] leading-[1.7] text-[#c8c3b8]">
                Where BrownSquare distinguishes itself is in its understanding of
                African market realities. Rather than importing frameworks
                designed for Western contexts, we build experiences from the
                inside out, rooted in how trust actually moves, how influence
                actually operates, and how audiences in this part of the world
                actually make decisions.
              </p>
            </div>
          </div>
        </Shell>
      </Reveal>

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <SectionHead
            eyebrow="What guides us"
            title="Four commitments behind every engagement."
          />
          <Stagger>
            {values.map((value) => (
              <StaggerItem
                key={value.num}
                className="grid grid-cols-[55px_1fr_1fr] gap-[35px] border-t border-line py-[38px] last:border-b max-md:grid-cols-[42px_1fr]"
              >
                <span className="text-[11px] text-muted">{value.num}</span>
                <h3 className="font-display text-[35px] font-normal tracking-[-0.055em]">
                  {value.title}
                </h3>
                <p className="m-0 leading-[1.65] text-[#565149] max-md:col-start-2">
                  {value.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Reveal>

      <FinalCta
        title="Build from culture, not from elsewhere."
        href="/contact"
        label="Get in touch ↗"
      />
    </>
  );
}
