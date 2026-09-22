export type Service = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    id: "strategic-communications",
    num: "01",
    title: "Strategic Communications",
    subtitle: "Narrative & positioning",
    summary:
      "Narrative & positioning. Shaping the stories that carry brands, leaders, and institutions through change.",
    detail:
      "Shaping the stories that carry brands, leaders, and institutions through change. We build positioning that holds up under pressure, grounded in how audiences actually make decisions, not in frameworks imported from elsewhere.",
  },
  {
    id: "public-relations",
    num: "02",
    title: "Public Relations",
    subtitle: "Reputation management & design",
    summary:
      "Reputation management and design. Protecting and building reputation in public, in the press, and online.",
    detail:
      "Managing reputation in public, in the press, and online. From proactive positioning to crisis response, we protect what an organisation or individual has built, and build further on it, with judgement and discretion.",
  },
  {
    id: "talent-management",
    num: "03",
    title: "Talent Management",
    subtitle: "Guiding public figures",
    summary:
      "Public figures. Guiding public figures and creatives through the business of visibility.",
    detail:
      "Guiding public figures and creatives through the business of visibility, from PR to brand partnerships to long-term reputation strategy. We work with a variety of African global stars and some of Nollywood's largest releases.",
  },
  {
    id: "consumer-experience",
    num: "04",
    title: "Consumer Experience",
    subtitle: "Designing brand encounters",
    summary:
      "Brand encounters. Designing how people meet, feel about, and remember a brand.",
    detail:
      "Designing how people meet, feel about, and remember a brand, every touchpoint considered as part of one experience, built from the inside out rather than bolted on.",
  },
  {
    id: "leadership-development",
    num: "05",
    title: "Leadership Development",
    subtitle: "Communication as a craft",
    summary:
      "Communication craft. Equipping leaders to communicate with clarity and conviction.",
    detail:
      "Equipping leaders to communicate with clarity and conviction, in the boardroom, on stage, and under scrutiny. We build the skill, not just the script.",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Understand",
    body: "We begin with people, context, culture and the commercial reality surrounding the problem.",
  },
  {
    num: "02",
    title: "Design",
    body: "We turn that understanding into a narrative, experience or communications system built for the situation.",
  },
  {
    num: "03",
    title: "Move",
    body: "We help the work travel through the audiences, institutions and conversations that matter.",
  },
] as const;

export const values = [
  {
    num: "01",
    title: "Human-led",
    body: "Every strategy is shaped by people who understand the culture it has to move through, not a template applied from elsewhere.",
  },
  {
    num: "02",
    title: "Culturally rooted",
    body: "We start from how influence and trust actually operate in this part of the world, not from imported playbooks.",
  },
  {
    num: "03",
    title: "Commercially rigorous",
    body: "Creative instinct is paired with the discipline of business transformation, so the work holds up where it matters: the bottom line.",
  },
  {
    num: "04",
    title: "Discreet",
    body: "From boardrooms to red carpets, we handle reputation with the judgement and confidentiality it demands.",
  },
] as const;

export const audiences = [
  {
    tag: "Brands & institutions",
    title: "Strategic communications partners for organisations worldwide.",
    image: "/home/home-organisations.jpg",
    imageAlt: "A modern boardroom overlooking the city at dusk",
  },
  {
    tag: "Public figures",
    title: "PR and talent management for some of Africa's biggest global stars.",
    image: "/home/home-reputation.jpg",
    imageAlt: "A speaker on stage under a warm spotlight",
  },
  {
    tag: "Film & entertainment",
    title:
      "Campaign support for some of Nollywood's largest theatrical releases.",
    image: "/home/home-brands.jpg",
    imageAlt: "A creative team reviewing materials in a bright studio",
  },
] as const;
