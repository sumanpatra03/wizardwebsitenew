import { SERVICES } from "@/constants/services";
import { SITE } from "@/constants/site";

import { siteUrl } from "./seo";

/**
 * Structured data.
 *
 * Emitted from Server Components as `application/ld+json`. Values are derived
 * from the same constants the visible page renders, so the markup can never
 * drift from the content.
 */

export function organizationJsonLd() {
  const { address, email, phones } = SITE.contact;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: siteUrl,
    description: SITE.description,
    foundingDate: String(SITE.foundedYear),
    slogan: SITE.tagline,
    email,
    telephone: phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      areaServed: address.country,
      availableLanguage: ["en"],
    })),
    sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.instagram],
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };
}

/**
 * BreadcrumbList for an inner page.
 *
 * Mirrors the visible `<Breadcrumb>` exactly — search engines penalise
 * structured data that describes something the page does not show, so both
 * should be fed the same array.
 */
export function breadcrumbJsonLd(
  crumbs: readonly { label: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, siteUrl).toString() } : {}),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE.name,
    url: siteUrl,
    description: SITE.metaDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-IN",
  };
}
