import type { Project } from "@/types/content";

/**
 * Featured case studies published on wizardcomm.net. Descriptions are the
 * client's own copy; tags are derived from the technologies each write-up
 * mentions.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "service-works",
    title: "Service Works",
    category: "Software Application",
    description:
      "Service Works is an end-to-end solution to run your entire business. From inventory management to tracking sales, our cloud-based SAS tool is meant to boost operational efficiency.",
    monogram: "SW",
    tags: ["Cloud SaaS", "Inventory", "Analytics"],
  },
  {
    slug: "itc-limited",
    title: "ITC Limited",
    category: "Software Application",
    description:
      "A fragrance development and approval platform for one of India's largest FMCG groups, digitising a formulation workflow that previously ran on paper.",
    monogram: "IT",
    tags: ["Enterprise", "Workflow", "FMCG"],
  },
  {
    slug: "k-middle-east",
    title: "K Middle East",
    category: "Web Project",
    description:
      "An immigration service provider specialising in visa processing for Canada, Turkey and the Schengen area, with applicant tracking built into the site.",
    monogram: "KM",
    tags: ["Web Platform", "Case Tracking", "Multi-region"],
  },
  {
    slug: "cosmetic-company",
    title: "Cosmetic Company",
    category: "Ecommerce Development",
    description:
      "Wizard built a user-friendly online store for Cosmetic Company, an emerging beauty and wellness brand gaining traction among Bangladeshi women, to increase visibility and sales.",
    monogram: "CC",
    tags: ["Ecommerce", "Payments", "Brand"],
  },
  {
    slug: "wondr-years",
    title: "Wondr Years",
    category: "e-Learning",
    description:
      "An educational platform with a fully responsive website and a set of third-party integrations connecting content, assessment and reporting.",
    monogram: "WY",
    tags: ["e-Learning", "Responsive", "Integrations"],
  },
] as const;
