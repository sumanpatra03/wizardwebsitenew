import {
  Handshake,
  Layers,
  LineChart,
  PenTool,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Company section content, transcribed from wizardcomm.net's About Us,
 * Why Wizard and Work With Us pages. Wording is theirs; only the grouping is
 * new, to fit this site's section rhythm.
 */

/* ------------------------------------------------------------------ */
/* About Us                                                            */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  eyebrow: "About Us",
  title:
    "Helping businesses grow by turning complex technology into simple, powerful solutions",
  lead: "Where Vision Meets Velocity. Because growth isn't accidental — it's engineered.",
  closing:
    "Wizard is a software development company based in Kolkata, India, operating since 2004.",
} as const;

export const MISSION_VISION = [
  {
    label: "Our Mission",
    body: "Our mission is to make technology simple, powerful, and accessible for every business. We listen, we understand, and we deliver solutions that actually work — helping you save time, reduce stress, and focus on what matters most: growing your business.",
  },
  {
    label: "Our Vision",
    body: "To be the technology partner that businesses actually love working with. Not just a vendor. Not just a service provider. But a true partner who understands your goals, shares your ambitions, and works tirelessly to help you grow, scale, and lead.",
  },
] as const;

export const VALUES = {
  principle:
    "Everything we do at Wizard is guided by one simple principle — do the right thing, every time.",
  body: "Honesty, transparency, and relationships rooted in trust and a genuine commitment to our clients' success.",
} as const;

export type TimelineEntry = {
  period: string;
  title: string;
  body: string;
  /** Named clients or products from that era. */
  highlights?: readonly string[];
};

export const TIMELINE: readonly TimelineEntry[] = [
  {
    period: "1999 – 2004",
    title: "The idea, then the company",
    body: "Conceptualised in 1999 by a group of creative enthusiasts, and officially established in 2004.",
  },
  {
    period: "2004 – 2008",
    title: "Building a creative legacy",
    body: "Creative solutions in e-learning, website development and web portal development for government organisations, corporates and educational institutions.",
    highlights: [
      "Chartered Institute of Marketing (UK)",
      "Jadavpur University",
      "Parliament Museum of India",
      "National Science Museum of Yemen",
      "UNICEF",
      "UIDAI – Aadhaar",
      "Hindustan Unilever Ltd",
    ],
  },
  {
    period: "2008 – 2012",
    title: "Diversification through innovation",
    body: "Transitioned from a creative design organisation into a technology-driven software development company, adding custom software development, database solutions and enterprise solutions.",
  },
  {
    period: "2012 – 2016",
    title: "The transition into software excellence",
    body: "Adopted modern development frameworks and expanded into mobile application and responsive website development. ServiceWorks, our field service management software, shipped by the end of 2014 and is used widely across the USA.",
    highlights: ["ServiceWorks"],
  },
  {
    period: "2016 – 2020",
    title: "Growth and market expansion",
    body: "Served clients across healthcare, government, retail and education, and developed the portal for ITC Infotech — strengthening our credibility as a trusted technology solutions provider.",
    highlights: ["ITC Infotech"],
  },
  {
    period: "2020 – 2024",
    title: "Digital transformation",
    body: "Focused on innovation and scalable software architecture. Introduced the Smart Commerce Management Suite during the pandemic, and worked in staff augmentation for NEC Japan.",
    highlights: ["Smart Commerce Management Suite", "NEC Japan"],
  },
  {
    period: "2024 – Present",
    title: "Leading the future of technology",
    body: "Smart Commerce Management Suite, asset management systems, restaurant management and POS, project management tools, AI-powered chatbots, and business solutions for sales, purchase, HRMS and delivery management.",
  },
] as const;

export type Leader = {
  name: string;
  role: string;
  bio: string;
  /** Initials for the generated portrait tile. */
  initials: string;
};

export const LEADERSHIP: readonly Leader[] = [
  {
    name: "Sumit Sarkar",
    role: "Founder & CEO",
    initials: "SS",
    bio: "20+ years driving innovation across design services, software solutions, interaction design and product management — leading strategy and delivering impactful, user-centric products.",
  },
  {
    name: "Biswajit Banerjee",
    role: "CTO",
    initials: "BB",
    bio: "Engineering leader with 14+ years driving scalable solutions and technical strategy, with a strong foundation in software development and team leadership.",
  },
  {
    name: "Vishwarup Bal",
    role: "IT Manager & Sr. Development",
    initials: "VB",
    bio: "20+ years delivering reliable, scalable solutions across the development lifecycle, with a strong focus on quality, performance and continuous improvement.",
  },
  {
    name: "Anup Kumar Ghosh",
    role: "Senior IT Manager",
    initials: "AG",
    bio: "Expert in .NET with 19+ years in client/server and web development, delivering end-to-end solutions with strong problem-solving and a focus on high customer satisfaction.",
  },
  {
    name: "Joydeep Mukherjee",
    role: "Senior Software Engineer",
    initials: "JM",
    bio: "13+ years specialising in Microsoft SQL Server and ASP.NET, delivering robust solutions and driving innovation through continuous improvement.",
  },
  {
    name: "Tirthankar Dey",
    role: "Senior Software Engineer",
    initials: "TD",
    bio: "14 years in .NET technologies, specialising in system design, application development and client collaboration, delivering high-quality solutions.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Why Wizard                                                          */
/* ------------------------------------------------------------------ */

export const WHY_WIZARD_PAGE = {
  eyebrow: "Why Wizard",
  title: "Because growth doesn't happen by accident.",
  lead: "Built for today. Ready for what's next. Strategy, creativity, technology and ambition working together to solve real business challenges.",
} as const;

export type Competency = {
  name: string;
  body: string;
  icon: LucideIcon;
};

/** The end-to-end expertise listed on wizardcomm.net/why-wizard. */
export const COMPETENCIES: readonly Competency[] = [
  {
    name: "Strategy",
    body: "Asking better questions before writing a line of code, so the build solves the actual problem.",
    icon: LineChart,
  },
  {
    name: "Experience Design",
    body: "Seamless, intuitive interfaces designed around the people who have to use them every day.",
    icon: PenTool,
  },
  {
    name: "Technology",
    body: "Full-stack engineering across cloud, data and AI — connected ecosystems rather than isolated tools.",
    icon: Layers,
  },
  {
    name: "Marketing",
    body: "Visibility and engagement that compound, from technical SEO through to campaign measurement.",
    icon: Users,
  },
  {
    name: "Managed Services",
    body: "Keeping it running after launch: monitoring, security, releases and support.",
    icon: ShieldCheck,
  },
  {
    name: "Partnership",
    body: "Your goals, challenges and growth become our priorities. Partners, not vendors.",
    icon: Handshake,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Work With Us                                                        */
/* ------------------------------------------------------------------ */

export const WORK_WITH_US = {
  eyebrow: "Work With Us",
  title: "Work with our talented minds to achieve your business needs",
  lead: "Experienced professionals available full-time or for partial engagement to build and maintain your systems. Tell us what you need and we will shape the right arrangement around it.",
  culture: {
    title: "Are you seeking to work with an organisation that values your dedication?",
    body: "Challenging opportunities and a supportive, collaborative environment — with the kind of impact you would expect from a much larger company.",
  },
} as const;

export type EngagementModel = {
  name: string;
  summary: string;
  detail: readonly string[];
};

export const ENGAGEMENT_MODELS: readonly EngagementModel[] = [
  {
    name: "Dedicated Associates",
    summary:
      "Exclusive resources or expert teams focused solely on your requirements, functioning as an extension of your own team.",
    detail: [
      "Full-time, dedicated capacity",
      "Works to your process and tooling",
      "Long-term product ownership",
    ],
  },
  {
    name: "Flexi Hiring",
    summary:
      "Flexible scaling from a minimum 40-hour purchase, giving you access to experts for maintenance, bug fixes and small tasks.",
    detail: [
      "Minimum 40-hour blocks",
      "Renewable as you need them",
      "Ideal for maintenance and fixes",
    ],
  },
  {
    name: "Staff Augmentation",
    summary:
      "Qualified professionals matched to your project, whether short-term or specialised, integrating with your existing team.",
    detail: [
      "Specialist skills on demand",
      "Short or long engagements",
      "Slots into your existing team",
    ],
  },
] as const;
