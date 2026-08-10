import {
  Banknote,
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Rocket,
  ShoppingBag,
  ShoppingBasket,
  Truck,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { HoverCardItem } from "@/types/content";

/**
 * Who Wizard serves.
 *
 * Drawn from the sectors named on wizardcomm.net's About page — "businesses,
 * enterprises, government organizations, educational institutions, healthcare
 * providers, startups, and global brands" — and grounded in the clients their
 * case studies actually name.
 *
 * Each `imagePrompt` is written to be pasted straight into an image generator.
 * They share a deliberate house style (cinematic, desaturated, cyan key light,
 * shallow depth of field, no text, no logos) so that whichever tool produces
 * them, the five read as one set.
 */
export const INDUSTRIES: readonly HoverCardItem[] = [
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Manufacturing & FMCG",
    description:
      "Digitising workflows that still run on paper — like the fragrance development and approval platform we built for ITC Limited.",
    buttonText: "Explore enterprise work",
    href: "/projects",
    imagePrompt:
      "Cinematic wide shot of a modern manufacturing control room at night, engineers silhouetted against large data screens, volumetric haze, cyan and teal key light against deep charcoal, shallow depth of field, anamorphic lens flare, photorealistic, 16:9, no text, no logos",
    icon: "building",
  },
  {
    id: "government",
    category: "Public Sector",
    title: "Government & Culture",
    description:
      "Digital experience for public institutions, including the visitor experience set up for the Parliament Museum of India.",
    buttonText: "Explore public sector work",
    href: "/projects",
    imagePrompt:
      "Cinematic interior of a contemporary museum gallery at dusk, sweeping architectural curves, a lone visitor at an interactive display, cyan accent lighting against warm stone, volumetric light shafts, shallow depth of field, photorealistic, 16:9, no text, no logos",
    icon: "landmark",
  },
  {
    id: "education",
    category: "Education",
    title: "Learning Platforms",
    description:
      "Learning platforms and localisation, from Wondr Years to flagship programme delivery for Adayana Learning Solutions.",
    buttonText: "Explore education work",
    href: "/projects",
    imagePrompt:
      "Cinematic shot of a modern university study space at blue hour, students working at illuminated desks, floating translucent interface panels, cyan and soft amber light, deep charcoal background, shallow depth of field, photorealistic, 16:9, no text, no logos",
    icon: "graduation",
  },
  {
    id: "healthcare",
    category: "Healthcare",
    title: "Clinical Systems",
    description:
      "Secure, compliant systems for clinical and administrative teams, built with protection in every layer.",
    buttonText: "Explore healthcare work",
    href: "/services/security",
    imagePrompt:
      "Cinematic wide shot of a modern hospital corridor at night, clinician walking away from camera, soft cyan monitor glow, clean minimal architecture, volumetric haze, shallow depth of field, cool desaturated grade, photorealistic, 16:9, no text, no logos",
    icon: "health",
  },
  {
    id: "commerce",
    category: "Retail & Commerce",
    title: "Commerce Platforms",
    description:
      "Storefronts and commerce operations end to end — our Smart Commerce Suite, and online stores for growing beauty brands.",
    buttonText: "Explore commerce work",
    href: "/products/smart-commerce-suite",
    imagePrompt:
      "Cinematic shot of a premium retail interior at night, minimal product plinths lit from above, glossy reflective floor, cyan rim light against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
    icon: "commerce",
  },
] as const;

export const INDUSTRIES_COPY = {
  eyebrow: "Who We Serve",
  title: "Built for the sectors we know best.",
  description:
    "Enterprises, government, education, healthcare, startups and global brands — 200+ clients across the world and across industries.",
} as const;

/* ------------------------------------------------------------------ */
/* The full sector list                                                */
/* ------------------------------------------------------------------ */

export type Sector = {
  name: string;
  /** What Wizard actually builds for this sector. */
  body: string;
  icon: LucideIcon;
};

/**
 * The thirteen sectors wizardcomm.net names under "Industries We Serve",
 * in its order.
 *
 * The published version is a grid of bare labels. A name alone tells a reader
 * nothing they did not already know about themselves, so each carries a line
 * on what we build for it — that is the difference between a logo wall and a
 * page someone can find themselves in. The lines are drawn from the work named
 * elsewhere on this site, not invented.
 */
export const SECTORS: readonly Sector[] = [
  {
    name: "Manufacturing",
    body: "Production, quality and asset systems for plants that still run critical steps on paper.",
    icon: Factory,
  },
  {
    name: "Healthcare",
    body: "Secure, compliant systems for clinical and administrative teams, with protection in every layer.",
    icon: HeartPulse,
  },
  {
    name: "FMCG",
    body: "Formulation, approval and distribution workflows — the ground our ITC Limited platform covers.",
    icon: ShoppingBasket,
  },
  {
    name: "Enterprises",
    body: "Line-of-business platforms built for scale, governance and a long service life.",
    icon: Building2,
  },
  {
    name: "Hospitality",
    body: "Restaurant management, point of sale and housekeeping operations under one roof.",
    icon: Hotel,
  },
  {
    name: "Education & eLearning",
    body: "Learning platforms, courseware and localisation, from Wondr Years to Adayana.",
    icon: GraduationCap,
  },
  {
    name: "Retail & eCommerce",
    body: "Storefronts, inventory and last-mile delivery, end to end on the Smart Commerce Suite.",
    icon: ShoppingBag,
  },
  {
    name: "Finance & Insurance",
    body: "Systems where auditability, access control and data integrity are the requirement.",
    icon: Banknote,
  },
  {
    name: "Government & Public Sector",
    body: "Public digital experience and citizen-facing portals, including the Parliament Museum of India.",
    icon: Landmark,
  },
  {
    name: "Professional Services",
    body: "Practice, resourcing and client delivery tools for firms that bill their time.",
    icon: Briefcase,
  },
  {
    name: "Startups & Technology Companies",
    body: "MVPs in weeks and engineering pods that scale with the round you just closed.",
    icon: Rocket,
  },
  {
    name: "Logistics & Transportation",
    body: "Tracking, scheduling and route optimisation, the engine behind Service Works.",
    icon: Truck,
  },
  {
    name: "Real Estate",
    body: "Property, asset and facility management with full lifecycle visibility.",
    icon: Warehouse,
  },
] as const;

/** Copy for the `/industries` page. */
export const INDUSTRIES_PAGE = {
  eyebrow: "Industries",
  titleLines: ["Industry expertise", "that delivers results"],
  lead: "Every industry faces unique challenges.",
  body: "Our domain specialists understand your business and build software solutions tailored to your operational realities.",
  sectors: {
    eyebrow: "Industries We Serve",
    title: "Thirteen sectors. One delivery team.",
    description:
      "The industry decides what the software has to respect — the audit trail, the compliance regime, the shift pattern. These are the ones we already know.",
  },
  deepDive: {
    eyebrow: "In depth",
    title: "Where we have gone deepest.",
    description:
      "Five sectors where the work is named, the clients are public, and the systems are still running.",
  },
} as const;
