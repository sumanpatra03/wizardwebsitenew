import type { LucideIcon } from "lucide-react";

/**
 * Content model.
 *
 * Every piece of copy on the site is typed data in `src/constants`, never
 * inline JSX. Swapping in a CMS later means replacing the loaders in that
 * folder and nothing else.
 */

export type NavLink = {
  label: string;
  href: string;
  /** Short blurb shown in the desktop mega-menu. */
  description?: string;
  icon?: LucideIcon;
};

export type NavItem = {
  label: string;
  href: string;
  /** Present on items that open a mega-menu / accordion panel. */
  children?: readonly NavLink[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Capability bullets revealed on card expansion. */
  capabilities: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Two-letter monogram used by the generative card artwork. */
  monogram: string;
  tags: readonly string[];
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: readonly string[];
  externalUrl?: string;
};

export type Stat = {
  /** Numeric target for the count-up animation. */
  value: number;
  suffix: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  organization: string;
  location?: string;
};

export type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type TechCategory = {
  label: string;
  items: readonly string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type FooterColumn = {
  title: string;
  links: readonly NavLink[];
};
