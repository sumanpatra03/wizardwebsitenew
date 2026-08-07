import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/constants/products";
import { PROJECTS } from "@/constants/projects";
import { SERVICE_PAGES } from "@/constants/service-pages";
import { siteUrl } from "@/lib/seo";

/**
 * Sitemap, generated from the same constants that render the pages, so new
 * services/products/projects are indexed automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, siteUrl).toString();

  // `satisfies` keeps the literal `changeFrequency` types through the .map(),
  // which a plain `MetadataRoute.Sitemap` annotation would widen to `string`.
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: url("/"), priority: 1, changeFrequency: "weekly" },
      { url: url("/about-us"), priority: 0.8, changeFrequency: "monthly" },
      { url: url("/why-wizard"), priority: 0.8, changeFrequency: "monthly" },
      { url: url("/services"), priority: 0.9, changeFrequency: "monthly" },
      { url: url("/products"), priority: 0.9, changeFrequency: "monthly" },
      { url: url("/projects"), priority: 0.8, changeFrequency: "monthly" },
      { url: url("/contact"), priority: 0.7, changeFrequency: "yearly" },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified }));

  // `SERVICE_PAGES`, not `SERVICES`: the latter is the home page's card list,
  // which includes services that have no page of their own — submitting those
  // URLs would put three 404s in the sitemap.
  //
  // Projects are deliberately absent: they are listed on `/projects` but have
  // no page each, so there is nothing per-project to submit.
  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...SERVICE_PAGES.map((item) => `/services/${item.slug}`),
    ...PRODUCTS.map((item) => `/products/${item.slug}`),
  ].map((path) => ({
    url: url(path),
    lastModified,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
