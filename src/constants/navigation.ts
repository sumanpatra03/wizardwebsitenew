import {
  BrainCircuit,
  Briefcase,
  Building2,
  Code2,
  Megaphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import type { FooterColumn, NavItem } from "@/types/content";
import { SITE } from "./site";

/**
 * Primary navigation, mirroring wizardcomm.net's information architecture.
 * Items with `children` render as a mega-menu on desktop and as an accordion
 * inside the mobile drawer.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "COMPANY",
    href: "/company",
    children: [
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
        description: "Build your career with our engineering team.",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "SERVICES",
    href: "/services",
    children: [
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
    ],
  },
  { label: "PRODUCTS", href: "/products" },
  { label: "PROJECTS", href: "/projects" },
  { label: "INDUSTRIES", href: "/industries" },
  { label: "CONTACT", href: "/contact" },
] as const;

/** Header call-to-action. */
export const HEADER_CTA = { label: "Get in Touch", href: "/contact" } as const;

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why Wizard", href: "/why-wizard" },
      { label: "Who We Serve", href: "/who-we-serve" },
      { label: "Work With Us", href: "/work-with-us" },
      { label: "Career", href: "/career" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Software Development", href: "/services/custom-software-development" },
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "Artificial Intelligence", href: "/services/artificial-intelligence" },
      { label: "Security", href: "/services/security" },
      { label: "Digital Marketing, SEO", href: "/services/digital-marketing" },
      { label: "On Demand Hiring", href: "/services/on-demand-hiring" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Smart Commerce Suite", href: "/products/smart-commerce-suite" },
      { label: "Smart Asset Management", href: "/products/smart-asset-management" },
      {
        label: "Smart Restaurant Management",
        href: "/products/smart-restaurant-management",
      },
      { label: "Smart Restaurant POS", href: "/products/smart-restaurant-pos" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} ${SITE.legalName}. All rights reserved.`;
