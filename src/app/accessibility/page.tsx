import { Mail } from "lucide-react";

import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { ACCESSIBILITY } from "@/constants/legal";
import { SITE } from "@/constants/site";
import { LegalDocument } from "@/features/legal/legal-document";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Accessibility" },
] as const;

export const metadata = buildMetadata({
  title: "Accessibility",
  description:
    "How this site is built for keyboard, screen reader, magnification and reduced-motion use — what we have done, what we know is not perfect, and how to tell us.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={ACCESSIBILITY.eyebrow}
        titleLines={[ACCESSIBILITY.title]}
        lead={ACCESSIBILITY.lead}
      >
        <p className="text-body-sm text-fg-subtle">
          Last updated{" "}
          <time dateTime="2026-08-11" className="text-fg-muted">
            {ACCESSIBILITY.updated}
          </time>
        </p>
      </PageHero>

      <LegalDocument sections={ACCESSIBILITY.sections}>
        <a
          href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Accessibility")}`}
          className={cn(
            "text-body-base inline-flex items-center gap-3 text-accent",
            "transition-colors duration-(--duration-fast) hover:underline",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-ring",
          )}
        >
          <Mail aria-hidden="true" className="size-4" />
          {SITE.contact.email}
        </a>
      </LegalDocument>
    </>
  );
}
