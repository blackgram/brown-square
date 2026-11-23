import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Shell } from "@/components/ui/Shell";
import { site } from "@/content/site";
import {
  THINK_LAB_001_PATH,
  THIP_PATH,
  thinkLab001Description,
  thinkLab001Image,
} from "@/content/thip";
import { getSiteUrl } from "@/lib/site/url";

const title = "Think Lab 001: What Makes Your Brand Valuable?";

export const metadata: Metadata = {
  title,
  description: thinkLab001Description,
  alternates: { canonical: THINK_LAB_001_PATH },
  openGraph: {
    title,
    description: thinkLab001Description,
    url: THINK_LAB_001_PATH,
    siteName: site.fullName,
    type: "article",
    images: [{ url: thinkLab001Image.src, alt: thinkLab001Image.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: thinkLab001Description,
    images: [thinkLab001Image.src],
  },
};

const gallery = [
  {
    src: "/think-lab-001/IMG_6044.PNG",
    alt: "The Think Lab 001 group in Lagos",
  },
  {
    src: "/think-lab-001/IMG_6043.PNG",
    alt: "Presenting The Human Intelligence Project",
  },
  {
    src: "/think-lab-001/IMG_6028.PNG",
    alt: "A conversation around the Think Lab table",
  },
  {
    src: "/think-lab-001/IMG_6034.PNG",
    alt: "Participants after Think Lab 001",
  },
  {
    src: "/think-lab-001/IMG_6040.PNG",
    alt: "A conversation during Think Lab 001",
  },
  {
    src: "/think-lab-001/IMG_6041.PNG",
    alt: "Participants at Think Lab 001",
  },
  {
    src: "/think-lab-001/IMG_5989.PNG",
    alt: "Speaking during Think Lab 001",
  },
] as const;

export default function ThinkLab001Page() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${THINK_LAB_001_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: title,
        description: thinkLab001Description,
        startDate: "2026-11-07",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Lagos",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
        },
        image: `${siteUrl}${thinkLab001Image.src}`,
        url: pageUrl,
        organizer: {
          "@type": "Organization",
          name: "The Human Intelligence Project",
          url: `${siteUrl}${THIP_PATH}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "The Human Intelligence Project",
            item: `${siteUrl}${THIP_PATH}`,
          },
          { "@type": "ListItem", position: 3, name: title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <article className="bg-paper pb-20 pt-12 text-ink max-md:pt-8">
      <JsonLd data={jsonLd} />
      <Shell>
        <Link
          href="/thip"
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted"
        >
          The Human Intelligence Project
        </Link>
        <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(44px,6vw,84px)] font-normal leading-[0.95] tracking-[-0.05em]">
          It started with a question.
        </h1>
        <figure className="relative mt-10 aspect-[16/9] overflow-hidden">
          <Image
            src="/think-lab-001/IMG_6032.PNG"
            alt="Think Lab 001 in session in Lagos"
            fill
            priority
            sizes="(max-width: 1380px) 100vw, 1380px"
            className="object-cover object-[center_40%]"
          />
        </figure>
        <div className="mt-14 grid grid-cols-[0.9fr_1.1fr] gap-x-16 gap-y-8 max-md:grid-cols-1">
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-normal leading-[0.95] tracking-[-0.05em]">
            What Makes Your Brand Valuable?
          </h2>
          <div className="flex flex-col gap-5 text-[18px] leading-[1.6]">
            <p>
              On November 7, 2026, the inaugural Think Lab brought together
              entrepreneurs and professionals in Lagos to explore one question.
            </p>
            <p>
              Participants examined the relationship between capability,
              perception, reputation and value.
            </p>
            <p>
              The experience was designed around the quality of the
              conversation, not the prominence of the people contributing to
              it.
            </p>
            <p>
              The Human Intelligence Project is an initiative of BrownSquare
              Insight, bringing together practical learning, critical thinking,
              branding, reputation and talent development.
            </p>
            <p>
              Our work is designed to prove that what you know matters, but
              what you do with what you know matters even more.
            </p>
          </div>
        </div>
        <Eyebrow className="mt-20">Think Lab 001</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {gallery.map((photo) => (
            <figure key={photo.src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </Shell>
    </article>
  );
}
