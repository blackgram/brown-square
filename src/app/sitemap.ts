import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { THINK_LAB_001_PATH, THIP_PATH } from "@/content/thip";
import { getSiteUrl } from "@/lib/site/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.4 },
    {
      url: `${siteUrl}/intelligence-journal`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${siteUrl}${THIP_PATH}`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${siteUrl}${THINK_LAB_001_PATH}`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  for (const post of posts) {
    routes.push({
      url: `${siteUrl}/intelligence-journal/${post.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return routes;
}
