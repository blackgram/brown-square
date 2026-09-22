export type SiteSettings = {
  name: string;
  tagline: string;
  fullName: string;
  description: string;
  email: string;
  footerTitle: string;
  footerMeta: string;
  reach: string;
};

export type SiteClient = {
  getSettings: () => Promise<SiteSettings>;
};
