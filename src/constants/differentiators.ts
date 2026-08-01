import {
  CloudCog,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import type { Differentiator } from "@/types/content";

/**
 * "Why Wizard" attributes, from wizardcomm.net/why-wizard.
 * Headline and intro are the client's own words.
 */
export const WHY_WIZARD_HEADLINE = "Because Growth Doesn't Happen by Accident.";

export const WHY_WIZARD_INTRO =
  "Built for today. Ready for what's next. Strategy, creativity, technology and ambition working together to solve real business challenges.";

export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    title: "Security First",
    description: "Protection built into every layer.",
    icon: ShieldCheck,
  },
  {
    title: "Purpose-Built Solutions",
    description: "Designed around your business.",
    icon: Target,
  },
  {
    title: "Proven Performance",
    description: "Trusted by organizations that expect results.",
    icon: TrendingUp,
  },
  {
    title: "Industry Intelligence",
    description: "Connected ecosystems that help you innovate, scale and thrive.",
    icon: Lightbulb,
  },
  {
    title: "Cloud Flexibility",
    description: "Ready to scale, wherever your workloads run.",
    icon: CloudCog,
  },
  {
    title: "Faster Time-to-Value",
    description: "People-powered adoption from day one.",
    icon: Gauge,
  },
] as const;

/** The partnership promises listed alongside the attributes. */
export const PARTNERSHIP_PROMISES: readonly string[] = [
  "We think beyond projects",
  "We ask better questions",
  "We work as partners — not vendors",
  "We care equally about outcomes and ideas",
] as const;
