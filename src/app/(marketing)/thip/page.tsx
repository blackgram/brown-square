import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import {
  RESERVATION_URL,
  THIP_PATH,
  THINK_LAB_001_PATH,
  thipDescription,
  thipImage,
} from "@/content/thip";
import { getSiteUrl } from "@/lib/site/url";
import THIPClient from "./THIPClient";

const title = "The Human Intelligence Project";

export const metadata: Metadata = {
  title,
  description: thipDescription,
  alternates: { canonical: THIP_PATH },
  openGraph: {
    title,
    description: thipDescription,
    url: THIP_PATH,
    siteName: site.fullName,
    type: "website",
    images: [{ url: thipImage.src, alt: thipImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: thipDescription,
    images: [thipImage.src],
  },
};

export default function THIPPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${THIP_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: thipDescription,
        isPartOf: {
          "@type": "WebSite",
          name: site.fullName,
          url: siteUrl,
        },
        about: { "@id": `${pageUrl}#project` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${thipImage.src}`,
        },
      },
      {
        "@type": "Project",
        "@id": `${pageUrl}#project`,
        name: title,
        alternateName: "THIP",
        description: thipDescription,
        url: pageUrl,
        image: `${siteUrl}${thipImage.src}`,
        parentOrganization: {
          "@type": "Organization",
          name: site.fullName,
          url: siteUrl,
          email: site.email,
        },
      },
      {
        "@type": "Event",
        "@id": `${pageUrl}#elements-of-branding`,
        name: "The Elements of Branding",
        description:
          "The next Think Lab from The Human Intelligence Project, on 30 January 2027.",
        startDate: "2027-01-30",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        organizer: { "@id": `${pageUrl}#project` },
        offers: {
          "@type": "Offer",
          url: RESERVATION_URL,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Event",
        name: "Think Lab 001: What Makes Your Brand Valuable?",
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
        organizer: { "@id": `${pageUrl}#project` },
        url: `${siteUrl}${THINK_LAB_001_PATH}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <THIPClient />
    </>
  );
}
