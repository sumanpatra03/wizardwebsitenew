import {
  BrainCircuit,
  Code2,
  LifeBuoy,
  Megaphone,
  PenTool,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import type { Service } from "@/types/content";

/**
 * The seven services listed on wizardcomm.net, with their original
 * one-line descriptors preserved verbatim. Capability bullets are drawn from
 * the technology stack and specialisations published on the same site.
 */
export const SERVICES: readonly Service[] = [
  {
    slug: "software-development",
    title: "Software Development",
    description: "Custom software solutions for growth",
    category: "Engineering",
    icon: Code2,
    capabilities: [
      "Full-stack product engineering",
      "Cloud-native SaaS platforms",
      "Legacy modernisation",
      "API and systems integration",
    ],
  },
  {
    slug: "ux-ui",
    title: "UX/UI",
    description: "Creating seamless, intuitive user experiences",
    category: "Experience Design",
    icon: PenTool,
    capabilities: [
      "Experience strategy and research",
      "Design systems",
      "Interactive prototyping",
      "Accessibility-first interfaces",
    ],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "AI solutions to optimize operations",
    category: "Intelligence",
    icon: BrainCircuit,
    capabilities: [
      "AI/ML model development",
      "OpenAI and LLM integration",
      "Business intelligence and analytics",
      "Intelligent chatbots and automation",
    ],
  },
  {
    slug: "on-demand-hiring",
    title: "On Demand Hiring",
    description: "Flexible talent for immediate needs",
    category: "Talent",
    icon: UsersRound,
    capabilities: [
      "Dedicated engineering pods",
      "Staff augmentation",
      "Rapid team scale-up",
      "Managed delivery teams",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ensuring seamless, secure system operations",
    category: "Managed Services",
    icon: LifeBuoy,
    capabilities: [
      "24/7 application support",
      "CI/CD and release management",
      "Performance monitoring",
      "Proactive issue resolution",
    ],
  },
  {
    slug: "security",
    title: "Security",
    description: "Protecting data with robust cybersecurity",
    category: "Trust & Safety",
    icon: ShieldCheck,
    capabilities: [
      "Security architecture reviews",
      "Vulnerability assessment",
      "Compliance and governance",
      "Secure cloud configuration",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing, SEO",
    description: "Boosting visibility and online engagement",
    category: "Growth",
    icon: Megaphone,
    capabilities: [
      "Technical and on-page SEO",
      "Performance marketing",
      "Content and campaign strategy",
      "Analytics and attribution",
    ],
  },
] as const;
