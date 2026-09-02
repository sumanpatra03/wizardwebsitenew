import {
  BrainCircuit,
  Briefcase,
  Building2,
  Code2,
  FileText,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  Megaphone,
  Rss,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import type { FooterColumn, NavItem, NavLink } from "@/types/content";
import { PRODUCTS } from "./products";
import { SITE } from "./site";

/**
 * Navigation.
 *
 * Header and footer are built from the same link groups declared below, so
 * the two cannot drift apart on a label, a URL or an ordering. Previously
 * they were two independent lists and had already diverged — the footer said
 * "Software Development" where the menu said "Custom Software Development",
 * "Digital Marketing, SEO" where the menu said "Digital Marketing", and
 * "Who We Serve" for the page the header calls "Industries". Change a label
 * here and both places move together.
 */

const COMPANY_LINKS: readonly NavLink[] = [
  {
    label: "About Us",
    href: "/about-us",
    description: "Who we are, and the 20 years behind the name.",
    icon: Building2,
  },
  {
    label: "Why Wizard",
    href: "/why-wizard",
    description: "Because growth doesn't happen by accident.",
    icon: Sparkles,
  },
  {
    label: "Work With Us",
    href: "/work-with-us",
    description: "How to engage our teams and specialists.",
    icon: UsersRound,
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Build your career with our engineering team.",
    icon: Briefcase,
  },
];

/**
 * The services landing page, first in its own menu.
 *
 * `/services` has always existed, but nothing reached it: the header's
 * SERVICES item opens the panel instead of navigating, and the footer linked
 * only to the seven individual services. This entry is the way in.
 */
const ALL_SERVICES: NavLink = {
  label: "All Services",
  href: "/services",
  description: "Every capability, in one place.",
  icon: LayoutGrid,
};

const SERVICE_LINKS: readonly NavLink[] = [
  {
    label: "Custom Software Development",
    href: "/services/custom-software-development",
    description: "Custom software solutions for growth.",
    icon: Code2,
  },
  {
    label: "Mobile App Development",
    href: "/services/mobile-app-development",
    description: "Native and cross-platform apps that ship.",
    icon: Smartphone,
  },
  {
    label: "Artificial Intelligence",
    href: "/services/artificial-intelligence",
    description: "AI solutions to optimize operations.",
    icon: BrainCircuit,
  },
  {
    label: "E-Learning Solutions",
    href: "/services/e-learning-solutions",
    description: "Courseware, LMS and localisation that lands.",
    icon: GraduationCap,
  },
  {
    label: "Security",
    href: "/services/security",
    description: "Protecting data with robust cybersecurity.",
    icon: ShieldCheck,
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Boosting visibility and online engagement.",
    icon: Megaphone,
  },
  {
    label: "On Demand Hiring",
    href: "/services/on-demand-hiring",
    description: "Flexible talent for immediate needs.",
    icon: UsersRound,
  },
];

const ALL_PRODUCTS: NavLink = {
  label: "All Products",
  href: "/products",
  description: "The full product line.",
  icon: LayoutGrid,
};

/**
 * Derived from `PRODUCTS` rather than re-typed, so a product renamed in one
 * place is renamed in the header, the footer and the cards at once.
 */
const PRODUCT_LINKS: readonly NavLink[] = PRODUCTS.map((product) => ({
  label: product.name,
  href: `/products/${product.slug}`,
  description: product.tagline,
  icon: product.icon,
}));

/**
 * Resources.
 *
 * The three streams are sections of the `/resources` landing page, not routes
 * of their own — there is no published blog, insight or article yet, and a
 * menu item pointing at an empty route is worse than one pointing at the
 * section that explains what is coming. Promote these to real pages the
 * moment there is content behind them.
 */
const RESOURCE_LINKS: readonly NavLink[] = [
  {
    label: "Blog",
    href: "/resources#blog",
    description: "Notes from the team, as we build.",
    icon: Rss,
  },
  {
    label: "Insights",
    href: "/resources#insights",
    description: "What we are seeing across client work.",
    icon: Lightbulb,
  },
  {
    label: "Articles",
    href: "/resources#articles",
    description: "Longer pieces on technology and delivery.",
    icon: FileText,
  },
];

/**
 * Primary navigation, mirroring wizardcomm.net's information architecture.
 * Items with `children` render as a mega-menu on desktop and as an accordion
 * inside the mobile drawer.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "COMPANY",
    // There is no `/company` landing page. This href is never navigated to —
    // an item with children opens the mega-menu on desktop and an accordion
    // on mobile, where it serves only as the panel's identifier — but it
    // points at the section's first real page so nothing can route to a 404.
    href: "/about-us",
    children: COMPANY_LINKS,
  },
  {
    label: "SERVICES",
    href: "/services",
    children: [ALL_SERVICES, ...SERVICE_LINKS],
  },
  {
    label: "PRODUCTS",
    href: "/products",
    children: [ALL_PRODUCTS, ...PRODUCT_LINKS],
  },
  { label: "PROJECTS", href: "/projects" },
  { label: "INDUSTRIES", href: "/industries" },
  {
    label: "RESOURCES",
    href: "/resources",
    children: RESOURCE_LINKS,
  },
  { label: "CONTACT", href: "/contact" },
] as const;

/** Header call-to-action. */
export const HEADER_CTA = { label: "Get in Touch", href: "/contact" } as const;

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  { title: "Company", links: COMPANY_LINKS },
  { title: "Services", links: [ALL_SERVICES, ...SERVICE_LINKS] },
  { title: "Products", links: [ALL_PRODUCTS, ...PRODUCT_LINKS] },
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      // The header calls this "Industries", so the footer does too — it used
      // to say "Who We Serve" for the same page.
      { label: "Industries", href: "/industries" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

/**
 * Terms of Use is deliberately absent.
 *
 * It linked to a route that did not exist, and the honest fix is not to
 * invent one: terms are a binding legal document that has to come from the
 * company's own counsel, not from whoever built the site. A missing link is
 * better than a 404, and both are better than terms nobody agreed to.
 * Restore this entry once the copy exists.
 */
export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} ${SITE.legalName}. All rights reserved.`;
