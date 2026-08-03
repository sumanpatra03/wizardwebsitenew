import {
  CloudCog,
  Coins,
  Gauge,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
  TrendingUpDown,
} from "lucide-react";

import type { Differentiator } from "@/types/content";

/**
 * The nine attributes listed on wizardcomm.net/why-wizard, with their
 * published one-line descriptions verbatim.
 */
export const WHY_WIZARD_HEADLINE = "Because Growth Doesn't Happen by Accident.";

export const WHY_WIZARD_INTRO =
  "It happens when strategy, creativity, technology, and ambition work together.";

export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    title: "Security First",
    description: "Protection built into every layer.",
    icon: ShieldCheck,
  },
  {
    title: "Purpose-Built Solutions",
    description: "Designed around your business, not ours.",
    icon: Target,
  },
  {
    title: "Proven Performance",
    description: "Trusted by organizations that expect results.",
    icon: TrendingUp,
  },
  {
    title: "Industry Intelligence",
    description: "Expertise shaped by real-world experience.",
    icon: Lightbulb,
  },
  {
    title: "Cloud Flexibility",
    description: "Deploy the way your business demands.",
    icon: CloudCog,
  },
  {
    title: "Maximum Value",
    description: "Smarter investments. Stronger outcomes.",
    icon: Coins,
  },
  {
    title: "Ready to Scale",
    description: "Built for growth from day one.",
    icon: TrendingUpDown,
  },
  {
    title: "Faster Time-to-Value",
    description: "Launch sooner. Realize benefits faster.",
    icon: Gauge,
  },
  {
    title: "People-Powered Adoption",
    description: "Training that drives confidence and success.",
    icon: GraduationCap,
  },
] as const;

/** The partnership promises, from "Why Clients Choose Wizard". */
export const PARTNERSHIP_PROMISES: readonly string[] = [
  "Because we think beyond projects",
  "Because we ask better questions",
  "Because we care as much about outcomes as we do about ideas",
  "Most importantly, because we work as partners — not vendors",
] as const;
