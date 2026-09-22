import { unstable_cache } from "next/cache";
import { CONTENT_TAGS } from "@/lib/revalidate";
import { localSiteClient } from "./local";
import { firebaseSiteClient } from "./firebase";
import type { SiteClient } from "./types";

function rawSiteClient(): SiteClient {
  const provider = process.env.SITE_PROVIDER ?? "local";
  if (provider === "firebase") return firebaseSiteClient;
  return localSiteClient;
}

export function getSiteClient(): SiteClient {
  const client = rawSiteClient();
  return {
    getSettings: unstable_cache(
      () => client.getSettings(),
      ["site-settings", process.env.SITE_PROVIDER ?? "local"],
      { tags: [CONTENT_TAGS.site] },
    ),
  };
}

export type { SiteSettings, SiteClient } from "./types";
