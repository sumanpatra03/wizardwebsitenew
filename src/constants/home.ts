import { SITE } from "./site";

/**
 * Home page copy. Hero, intro statement and CTA text are taken verbatim from
 * wizardcomm.net; eyebrows and section labels are new editorial framing.
 */
export const HERO = {
  eyebrow: "Technology & Strategic Consulting",
  headline: SITE.tagline,
  subheadline:
    "With over 22 years of experience, Wizard empowers businesses to build exceptional products. Whether for your users or customers, our innovative solutions are designed to deliver outstanding results.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
  secondaryCta: { label: "All Projects", href: "/projects" },
} as const;

export const INTRO_STATEMENT = {
  eyebrow: "Who We Are",
  statement: SITE.description,
  supporting:
    "",
} as const;

export const CTA_BAND = {
  eyebrow: "Connect With Us",
  headline: "Let's build what's next, together.",
  body: "Contact us today, and get a reply within 24 hours.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
} as const;

export const SECTION_COPY = {
  services: {
    eyebrow: "What We Do",
    title: "Capabilities that carry an idea from strategy to production.",
  },
  projects: {
    eyebrow: "Our Work",
    title: "Proof,not promises.",
    cta: { label: "All Projects", href: "/projects" },
  },
  products: {
    eyebrow: "Our Products",
    title: "Ready to run, day one.",
    cta: { label: "Explore Products", href: "/products" },
  },
  testimonials: {
    eyebrow: "Client Voices",
    title: "Trusted by the people we build for.",
  },
  tech: {
    eyebrow: "Our Stack",
    title: "The technology behind the work.",
  },
} as const;
