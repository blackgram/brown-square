import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHead } from "@/components/ui/SectionHead";
import { Shell } from "@/components/ui/Shell";
import { audiences, services } from "@/content/services";
import { getBlogClient } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const stories = (await getBlogClient().listPosts()).slice(0, 3);

  return (
    <>
      <Shell>
        <Stagger
          immediate
          className="grid grid-cols-[1.35fr_0.65fr] items-end gap-10 pt-10 pb-14 max-md:grid-cols-1 lg:py-28 xl:py-32"
        >
          <StaggerItem>
            <Eyebrow>Strategy & Communications Consultancy</Eyebrow>
            <h1 className="mt-1 max-w-[1050px] font-display text-[clamp(54px,7.4vw,116px)] font-normal leading-[0.89] tracking-[-0.055em]">
              Strategy that starts with how people actually think.
            </h1>
          </StaggerItem>
          <StaggerItem className="pb-2 max-md:max-w-[550px]">
            <p className="my-5 max-w-[460px] text-[17px] leading-[1.55]">
              BrownSquare is a strategy and communications consultancy operating
              at the intersection of culture, reputation, and business
              transformation, for brands, public figures, and organisations
              worldwide.
            </p>
            <Button href="/services">
              Our services <span>↗</span>
            </Button>
          </StaggerItem>
        </Stagger>
      </Shell>

      <Rule />

      <Reveal as="section" className="py-14 max-md:py-12">
        <Shell>
          <p className="m-0 max-w-[1200px] font-display text-[clamp(30px,4vw,60px)] leading-[1.08] tracking-[-0.045em]">
            Most agencies split creative instinct and commercial rigour between
            two different departments. BrownSquare brings them into one room.
          </p>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-ink text-paper">
        <div className="grid grid-cols-2 max-md:grid-cols-1">
          <div className="relative min-h-[420px] overflow-hidden max-md:min-h-[280px] max-md:order-2">
            <Image
              src="/home/home-culture.jpg"
              alt="A warm gathering in conversation around a shared table"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-16 max-md:px-4 max-md:py-12 md:px-16 lg:px-20">
            <Eyebrow className="text-[#c8c3b8]">The BrownSquare Difference</Eyebrow>
            <h2 className="mt-4 max-w-[560px] font-display text-[clamp(42px,5vw,72px)] font-normal leading-[0.93] tracking-[-0.055em]">
              Build from culture.
            </h2>
            <p className="mt-8 max-w-[480px] text-[18px] leading-[1.55] text-[#c8c3b8]">
              Rather than importing frameworks designed for Western contexts, we
              build experiences from the inside out, rooted in how trust actually
              moves, how influence actually operates, and how audiences in this
              part of the world actually make decisions.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Five disciplines,
                <br />
                one point of view.
              </>
            }
          />
          <Stagger className="border-t border-line">
            {services.map((service) => (
              <StaggerItem
                key={service.id}
                className="grid grid-cols-[70px_1fr_1fr_40px] items-start gap-6 border-b border-line py-[27px] max-md:grid-cols-[45px_1fr_25px]"
              >
                <span className="text-[11px] text-muted">{service.num}</span>
                <h3 className="font-display text-[27px] font-normal tracking-[-0.055em]">
                  {service.title}
                </h3>
                <p className="m-0 max-w-[520px] leading-[1.55] text-[#49463f] max-md:col-span-2 max-md:col-start-2">
                  {service.summary}
                </p>
                <span className="text-[22px] max-md:col-start-3 max-md:row-start-1">
                  ↗
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-black py-16 text-cream max-md:py-12">
        <Shell>
          <div className="grid grid-cols-[1fr_auto] items-end gap-10 max-md:grid-cols-1 max-md:gap-8">
            <div>
              <Image
                src="/onestoryworldlogo.png"
                alt="One Story World"
                width={360}
                height={72}
                className="h-12 w-auto md:h-14"
              />
              <h2 className="mt-8 max-w-[800px] font-display text-[clamp(40px,5vw,72px)] font-normal leading-[0.95] tracking-[-0.05em]">
                Explaining the world one story at a time.
              </h2>
              <p className="mt-6 max-w-[540px] text-[17px] leading-[1.55] text-[#bbb6ac]">
                Culture, reputation, and the work — told from the inside. Read
                the latest from One Story World.
              </p>
            </div>
            <Button
              href="/onestoryworld"
              className="border-cream text-cream hover:bg-cream hover:text-ink"
            >
              Enter One Story World ↗
            </Button>
          </div>

          <Stagger className="mt-14 grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {stories.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/onestoryworld/${post.slug}`}
                  className="group block border border-white/15 transition-colors hover:border-white/35"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#999]">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-[22px] font-normal leading-[1.15] tracking-[-0.04em] transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <SectionHead
            eyebrow="Who we work with"
            title="Trusted with reputation at scale."
          />
          <Stagger className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {audiences.map((card) => (
              <StaggerItem key={card.tag} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-warm">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border border-t-0 border-line bg-paper p-7">
                  <span className="text-[11px] uppercase tracking-[0.1em] text-muted">
                    {card.tag}
                  </span>
                  <h3 className="mt-5 font-display text-[28px] font-normal leading-[1.05] tracking-[-0.045em]">
                    {card.title}
                  </h3>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal
            delay={0.1}
            className="grid grid-cols-[1fr_auto] items-end gap-10 py-14 max-md:grid-cols-1 max-md:gap-9 max-md:py-12"
          >
            <h2 className="max-w-[900px] font-display text-[clamp(50px,6vw,90px)] font-normal leading-[0.92] tracking-[-0.055em]">
              Let&apos;s build something that moves people.
            </h2>
            <Button href="/contact">Start a conversation ↗</Button>
          </Reveal>
        </Shell>
      </Reveal>
    </>
  );
}
