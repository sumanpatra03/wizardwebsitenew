import type { LucideIcon } from "lucide-react";

import type { CardIconName } from "@/components/cards/card-icons";

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
  /** Eyebrow label above the card title, e.g. "Engineering". */
  category: string;
  icon: LucideIcon;
  /**
   * Brief for this card's photograph, kept in the data so the artwork can be
   * regenerated consistently. See `public/services/README.md`; a file dropped
   * there replaces the generated `ServiceArtwork` automatically.
   */
  imagePrompt: string;
  /** Explicit card image path under `public/`. Overrides the `findPublicImage` slug lookup. */
  image?: string;
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
  /**
   * Card image, as published on wizardcomm.net.
   *
   * An explicit path rather than the `findPublicImage` drop-in convention the
   * service cards use: `ProjectCard` is rendered inside the GSAP-driven rail,
   * which is a Client Component, and that lookup is server-only.
   *
   * Optional — a project without one keeps the generated monogram panel, so
   * the rail is never half-broken while images are still being supplied.
   */
  image?: string;
  /** The client's own site, where the live portfolio links straight out. */
  externalUrl?: string;
  /**
   * Extra shots the live site opens in a modal. Intrinsic dimensions are
   * recorded because `<Gallery>` lays these out as masonry and needs the
   * ratios up front to reserve space.
   */
  gallery?: readonly {
    src: string;
    caption: string;
    width: number;
    height: number;
  }[];
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
  /** Card and hero artwork, as published on wizardcomm.net. */
  image: string;
};

export type Stat = {
  /** Numeric target for the count-up animation. */
  value: number;
  /** Rendered straight after the figure, e.g. "+" or "yrs". */
  suffix: string;
  /** Short name. Used as the React key and to caption the figure for
   *  assistive tech — not rendered on its own. */
  label: string;
  /** The sentence shown beneath the figure. */
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  organization: string;
  location?: string;
  /** Portrait or organisation mark, where one is published. */
  avatar?: string;
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

/**
 * A card in an expanding `<CardsSection>`.
 *
 * `image` is optional. When absent the card falls back to generated artwork,
 * so the section is complete without any binary assets; setting it to a path
 * under `public/` switches that card to a real photograph with no other
 * change.
 *
 * `imagePrompt` is the brief for that photograph. It is kept in the data — not
 * in a design doc — so the artwork can be regenerated consistently later, and
 * so a replacement can be checked against what the card actually says.
 */
export type HoverCardItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  image?: string;
  imagePrompt: string;
  /**
   * Drives the generated fallback artwork.
   *
   * A name rather than a component: this data crosses from a Server Component
   * into a Client one, and React components are not serialisable. Resolved
   * against `CARD_ICONS` on the client.
   */
  icon: CardIconName;
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
