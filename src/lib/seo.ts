import type { Metadata } from "next";

import { SITE } from "@/constants/site";

/**
 * Absolute site origin. `NEXT_PUBLIC_SITE_URL` lets preview deployments
 * generate correct canonical and Open Graph URLs.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

/**
 * Build a page's metadata from the shared defaults.
 *
 * Titles flow through the root template (`… | Wizard Communications`), and
 * every page gets a canonical URL plus matching Open Graph and Twitter cards.
 */
export function buildMetadata({
  title,
  description = SITE.metaDescription,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const url = new URL(path, siteUrl).toString();
  const resolvedTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;

  return {
    title: title ?? { absolute: resolvedTitle },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: resolvedTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}
