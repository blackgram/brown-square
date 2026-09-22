import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { localSiteClient } from "./local";
import type { SiteClient, SiteSettings } from "./types";

export const firebaseSiteClient: SiteClient = {
  async getSettings() {
    if (!isFirebaseAdminConfigured()) {
      return localSiteClient.getSettings();
    }
    const snap = await adminDb().collection("site").doc("settings").get();
    if (!snap.exists) {
      return localSiteClient.getSettings();
    }
    const data = snap.data() as Partial<SiteSettings>;
    const fallback = await localSiteClient.getSettings();
    return {
      name: data.name ?? fallback.name,
      tagline: data.tagline ?? fallback.tagline,
      fullName: data.fullName ?? fallback.fullName,
      description: data.description ?? fallback.description,
      email: data.email ?? fallback.email,
      footerTitle: data.footerTitle ?? fallback.footerTitle,
      footerMeta: data.footerMeta ?? fallback.footerMeta,
      reach: data.reach ?? fallback.reach,
    };
  },
};
