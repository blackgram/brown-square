import { site as localSite } from "@/content/site";
import type { SiteClient, SiteSettings } from "./types";

export const localSiteClient: SiteClient = {
  async getSettings() {
    return {
      name: localSite.name,
      tagline: localSite.tagline,
      fullName: localSite.fullName,
      description: localSite.description,
      email: localSite.email,
      footerTitle: localSite.footerTitle,
      footerMeta: localSite.footerMeta,
      reach: localSite.reach,
    } satisfies SiteSettings;
  },
};
