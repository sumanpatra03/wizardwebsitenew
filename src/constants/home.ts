import { SITE } from "./site";

/**
 * Home page copy. Hero, intro statement and CTA text are taken verbatim from
 * wizardcomm.net; eyebrows and section labels are new editorial framing.
 */
export const HERO = {
  eyebrow: "Technology & Strategic Consulting",
  headline: SITE.tagline,
  subheadline:
    "Since 2004, Wizard has been empowering businesses to build exceptional products. Whether for your users or customers, our innovative solutions are designed to deliver outstanding results.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
  secondaryCta: { label: "All Projects", href: "/projects" },
} as const;

export const INTRO_STATEMENT = {
  eyebrow: "Who We Are",
  statement: SITE.description,
  supporting:
    "Wizard Communication is a trusted global partner in technology and strategic consulting, delivering end to end IT services and digital transformation solutions. We collaborate with organizations to tackle complex business challenges through forward thinking innovation, disciplined development practices, and data driven insights. Our team empowers clients to design and implement impactful digital solutions that align with their goals, leveraging the right technologies and proven industry standards. With a focus on customization and scalability, we craft technology and business strategies that not only meet immediate needs but also drive sustainable growth for the future.",
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
    title: "Proof, not promises.",
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
