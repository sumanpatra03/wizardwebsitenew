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
    href: "/projects/itc-limited",
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
    href: "/projects/wondr-years",
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
