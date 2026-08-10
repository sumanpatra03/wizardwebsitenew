import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PRIVACY_POLICY, type LegalBlock } from "@/constants/legal";
import { FORMATTED_ADDRESS, SITE } from "@/constants/site";
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
            src="/legal/privacy-policy.png"
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

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/*
             * Contents rail. Thirteen sections is past the point where
             * scrolling to find one is reasonable, and a policy is a document
             * people arrive at looking for a specific clause rather than to
             * read end to end.
             */}
            <nav
              aria-label="On this page"
              className="lg:col-span-4 lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:self-start"
            >
              <h2 className="text-label uppercase text-fg-subtle">
                On this page
              </h2>
              <ol className="mt-5 flex flex-col gap-2.5">
                {PRIVACY_POLICY.sections.map((section, index) => (
                  <li key={section.id} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="text-label tabular-nums text-fg-subtle/70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "text-body-sm text-fg-muted transition-colors",
                        "duration-(--duration-fast) hover:text-accent",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-ring",
                      )}
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/*
             * `max-w-2xl` rather than the page's usual 3xl: at body-base this
             * lands near 70 characters, and a policy is the longest unbroken
             * reading on the site — the measure matters more here than the
             * column filling its column.
             */}
            <div className="flex flex-col gap-14 lg:col-span-8 lg:max-w-2xl">
              {PRIVACY_POLICY.sections.map((section, index) => (
                <Reveal key={section.id} delay={index === 0 ? 0 : 0.05}>
                  <section
                    id={section.id}
                    className="scroll-mt-[calc(var(--spacing-header)+2rem)]"
                  >
                    <h2 className="font-display text-heading-md text-balance text-fg">
                      {section.heading}
                    </h2>

                    <div className="mt-5 flex flex-col gap-5">
                      {section.blocks.map((block, blockIndex) => (
                        <Block key={blockIndex} block={block} />
                      ))}

                      {section.id === "contact" ? <ContactDetails /> : null}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "text") {
    return <p className="text-body-base text-fg-muted">{block.body}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="text-body-base flex items-start gap-3 text-fg-muted"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rounded-pill bg-accent"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  /*
   * A real `<dl>`, not a styled list. These are term-and-definition pairs,
   * and the markup is what lets assistive tech announce them as such.
   */
  return (
    <dl className="flex flex-col gap-4 border-l border-border pl-5">
      {block.items.map((item) => (
        <div key={item.term}>
          <dt className="text-body-sm font-semibold text-fg">{item.term}</dt>
          <dd className="text-body-sm mt-1 text-fg-muted">{item.body}</dd>
        </div>
      ))}
    </dl>
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
