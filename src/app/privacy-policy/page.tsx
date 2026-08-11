import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { PRIVACY_POLICY } from "@/constants/legal";
import { FORMATTED_ADDRESS, SITE } from "@/constants/site";
import { LegalDocument } from "@/features/legal/legal-document";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy" },
] as const;

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Wizard Communications collects, uses, shares, retains and protects your personal data, and how to have it deleted.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={PRIVACY_POLICY.eyebrow}
        titleLines={[PRIVACY_POLICY.title]}
        lead={PRIVACY_POLICY.lead}
        aside={
          /*
           * Frameless, like the other transparent artwork on the site — a
           * bordered card would draw a box around something with no edges.
           *
           * Capped below its native 500px so it is never upscaled. The
           * illustration renders "PRIVACY POLICY" as part of the artwork, but
           * the <h1> beside it already says that, so an alt would only repeat
           * what a screen reader has just read.
           */
          <Image
            src="/legal/privacy-policy.webp"
            alt=""
            width={500}
            height={500}
            priority
            sizes="(min-width: 1024px) 448px, 384px"
            className="mx-auto h-auto w-full max-w-sm lg:max-w-md"
          />
        }
      >
        <p className="text-body-sm text-fg-subtle">
          Last updated{" "}
          <time dateTime="2025-04-01" className="text-fg-muted">
            {PRIVACY_POLICY.updated}
          </time>
        </p>
      </PageHero>

      <LegalDocument sections={PRIVACY_POLICY.sections}>
        <ContactDetails />
      </LegalDocument>
    </>
  );
}

function ContactDetails() {
  return (
    <ul className="mt-1 flex flex-col gap-4">
      <li className="flex items-start gap-3">
        <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
        <a
          href={`mailto:${SITE.contact.email}`}
          className={cn(
            "text-body-base text-fg-muted transition-colors",
            "duration-(--duration-fast) hover:text-accent",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-ring",
          )}
        >
          {SITE.contact.email}
        </a>
      </li>
      <li className="flex items-start gap-3">
        <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
        <span className="text-body-base text-fg-muted">{FORMATTED_ADDRESS}</span>
      </li>
    </ul>
  );
}
