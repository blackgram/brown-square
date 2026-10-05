export const site = {
  name: "BrownSquare",
  tagline: "Insight",
  fullName: "BrownSquare Insight",
  description:
    "BrownSquare Insight — strategy and communications consultancy.",
  email: "hello@brownsquareconsult.com",
  footerTitle: "Human-led. Technology-powered. Forever remarkable.",
  footerMeta: "Strategy · Communications · Culture",
  reach: "Working with clients worldwide.",
} as const;

export type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/store", label: "Store" },
  { href: "/intelligence-journal", label: "Intelligence Journal" },
  { href: "/thip", label: "THIP" },
  { href: "/contact", label: "Get in touch ↗︎", cta: true },
];

export const footerLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/store", label: "Store" },
  { href: "/intelligence-journal", label: "Intelligence Journal" },
  { href: "/thip", label: "THIP" },
  { href: "/contact", label: "Contact" },
];
