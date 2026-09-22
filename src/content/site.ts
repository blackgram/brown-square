export const site = {
  name: "BrownSquare",
  tagline: "Consult & Insight",
  fullName: "BrownSquare Consult & Insight",
  description:
    "BrownSquare Consult & Insight — strategy and communications consultancy.",
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
  { href: "/store", label: "Store" },
  { href: "/onestoryworld", label: "One Story World" },
  { href: "/contact", label: "Get in touch ↗", cta: true },
];

export const footerLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/onestoryworld", label: "One Story World" },
  { href: "/contact", label: "Contact" },
];
