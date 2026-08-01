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
    imagePrompt:
      "Cinematic over-the-shoulder shot of a developer workspace at night, several monitors showing softly blurred abstract interface panels with no legible text, cyan and teal screen glow against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic close-up of a designer desk at blue hour, translucent wireframe panels floating above a drawing tablet, stylus in hand, cyan key light against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic macro shot of a glowing neural network sculpture, translucent nodes and filaments suspended in darkness, cyan and teal internal illumination, volumetric haze, shallow depth of field, photorealistic render, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic wide shot of a modern collaborative studio at dusk, a small engineering team silhouetted around a lit table, cyan accent light against warm charcoal, volumetric light shafts, shallow depth of field, photorealistic, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic wide shot of a modern data centre aisle at night, server racks receding into darkness with cyan status lights, reflective floor, volumetric haze, shallow depth of field, cool desaturated grade, photorealistic, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic shot of a translucent geometric shield form suspended in darkness, refracting cyan light, a fine particle field drifting around it, volumetric haze, shallow depth of field, photorealistic render, 4:3, no text, no logos",
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
    imagePrompt:
      "Cinematic shot of an abstract ascending data landscape, glowing cyan ridges rising through dark mist toward the horizon, soft rim light, volumetric haze, shallow depth of field, photorealistic render, 4:3, no text, no logos",
    icon: Megaphone,
    capabilities: [
      "Technical and on-page SEO",
      "Performance marketing",
      "Content and campaign strategy",
      "Analytics and attribution",
    ],
  },
] as const;
