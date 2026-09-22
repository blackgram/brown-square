export type ProductCategory =
  | "Consultations"
  | "Mentorship"
  | "Playbooks"
  | "Subscription";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  priceCents: number;
  currency: "NGN" | "GBP";
  category: ProductCategory;
  imageLabel: string;
  image?: string;
};

export const productCategories: Array<ProductCategory | "All Products"> = [
  "All Products",
  "Consultations",
  "Mentorship",
  "Playbooks",
  "Subscription",
];

export const products: Product[] = [
  {
    id: "mentorship-consultation",
    slug: "mentorship-consultation",
    title: "Mentorship Consultation",
    description:
      "A focused 1:1 session to unpack your goals, blocks, or next bold move in PR, comms, or employer branding.",
    longDescription:
      "A focused 1:1 session to unpack your goals, blocks, or next bold move in PR, communications, or employer branding. Leave with clarity on what to say, who to say it to, and how to move.",
    priceCents: 15000000,
    currency: "NGN",
    category: "Mentorship",
    imageLabel: "LET'S UNLOCK YOUR NEXT MOVE",
  },
  {
    id: "reputation-audit",
    slug: "reputation-audit",
    title: "Reputation Audit",
    description:
      "A structured review of how you show up in public — press, platforms, and perception — with clear next steps.",
    longDescription:
      "We map how your reputation currently travels, where trust is strong, and where the story frays. You receive a concise audit and a prioritised plan for the next 90 days.",
    priceCents: 30000000,
    currency: "NGN",
    category: "Consultations",
    imageLabel: "SEE HOW YOU'RE SEEN",
  },
  {
    id: "narrative-playbook",
    slug: "narrative-playbook",
    title: "Narrative Playbook",
    description:
      "A practical guide to positioning, messaging pillars, and proof points you can use across channels.",
    longDescription:
      "A downloadable playbook for building a narrative that holds under pressure — messaging pillars, proof points, and channel-ready language for brands and leaders.",
    priceCents: 12000000,
    currency: "NGN",
    category: "Playbooks",
    imageLabel: "WORDS THAT HOLD",
  },
  {
    id: "leadership-comms-session",
    slug: "leadership-comms-session",
    title: "Leadership Comms Session",
    description:
      "Boardroom-to-stage coaching for clarity, conviction, and composure under scrutiny.",
    longDescription:
      "A working session for leaders who need to communicate with clarity and conviction — in the boardroom, on stage, and under scrutiny. We build the craft, not just the script.",
    priceCents: 37500000,
    currency: "NGN",
    category: "Consultations",
    imageLabel: "SPEAK WITH CONVICTION",
  },
  {
    id: "insight-subscription",
    slug: "insight-subscription",
    title: "Insight Briefing",
    description:
      "Monthly cultural and reputation notes for teams who need to stay ahead of the conversation.",
    longDescription:
      "A monthly briefing on culture, reputation, and communications patterns that matter for African and diaspora audiences — curated for strategists and leaders.",
    priceCents: 4500000,
    currency: "NGN",
    category: "Subscription",
    imageLabel: "STAY AHEAD OF THE ROOM",
  },
  {
    id: "talent-strategy-session",
    slug: "talent-strategy-session",
    title: "Talent Strategy Session",
    description:
      "Guidance for public figures and creatives on visibility, partnerships, and long-term reputation.",
    longDescription:
      "A strategy session for public figures and creatives navigating the business of visibility — from partnerships to long-term reputation design.",
    priceCents: 45000000,
    currency: "NGN",
    category: "Mentorship",
    imageLabel: "OWN YOUR VISIBILITY",
  },
];
