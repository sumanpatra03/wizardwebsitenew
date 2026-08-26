import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";
import { siteUrl } from "@/lib/seo";

/**
 * Only the production deployment invites crawlers.
 *
 * Every page canonicalises to `SITE.url`, which is the right signal but only
 * a hint — a preview deployment answering on its own hostname
 * (`*.vercel.app`) can still be crawled and indexed under that hostname
 * before the domain cutover. Anything that is not the production deployment
 * therefore disallows everything outright, which is a directive rather than a
 * hint.
 *
 * Two independent tests, because either one alone leaves a gap. `VERCEL_ENV`
 * is set automatically on every Vercel deployment and is the only thing that
 * distinguishes a preview when `NEXT_PUBLIC_SITE_URL` has been left unset —
 * which is exactly the case that gets a preview indexed. The origin check
 * covers hosts that set no `VERCEL_ENV` at all.
 */
const vercelEnv = process.env.VERCEL_ENV;
const isProduction =
  (vercelEnv === undefined || vercelEnv === "production") &&
  siteUrl === SITE.url;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
