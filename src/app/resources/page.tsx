import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  RESOURCES_EMPTY_STATE,
  RESOURCES_INDEX,
  RESOURCE_STREAMS,
} from "@/constants/resources";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Resources" },
] as const;

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Blog, insights and articles from the Wizard Communications team — engineering notes, industry analysis and long-form pieces on technology and delivery.",
  path: "/resources",
});

/**
 * Resources landing page.
 *
 * The parent for Blog, Insights and Articles. Each stream is a section on
 * this page rather than a route of its own, because none of them has anything
 * published yet — see `constants/resources.ts` for the note on promoting them
 * once they do. Every stream carries an honest empty state instead of
 * placeholder posts.
 */
export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={RESOURCES_INDEX.eyebrow}
        titleLines={RESOURCES_INDEX.titleLines}
        lead={RESOURCES_INDEX.lead}
      >
        <p className="text-body-lg max-w-3xl text-fg-muted">
          {RESOURCES_INDEX.body}
        </p>
      </PageHero>

      {/* One section per stream, each with the id the global menu links to.
          `scroll-mt-header` keeps the fixed header from covering the heading
          when an anchor lands on it. */}
      {RESOURCE_STREAMS.map((stream, index) => {
        const Icon = stream.icon;

        return (
          <Section
            key={stream.id}
            id={stream.id}
            tone={index % 2 === 0 ? "default" : "subtle"}
            backdrop={index % 2 !== 0}
            className={cn(
              "scroll-mt-header",
              index % 2 !== 0 && "border-y border-border",
            )}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
                <div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-12 place-items-center rounded-lg",
                      "bg-accent-muted text-accent",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>

                  <h2 className="font-display text-display-lg mt-6 text-fg">
                    {stream.title}
                  </h2>

                  <p className="text-body-lg mt-5 max-w-xl text-fg-muted">
                    {stream.summary}
                  </p>

                  <ul className="mt-8 grid gap-3">
                    {stream.covers.map((item) => (
                      <li
                        key={item}
                        className="text-body-sm flex items-start gap-3 text-fg-muted"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 text-accent"
                          strokeWidth={3}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Empty state, not placeholder posts. */}
                <Stagger stagger={0.08} className="flex">
                  <StaggerItem className="w-full">
                    <Card className="flex h-full flex-col justify-center p-8 sm:p-10">
                      <p className="text-label uppercase text-fg-subtle">
                        {RESOURCES_EMPTY_STATE.label}
                      </p>
                      <p className="text-body-base mt-4 text-fg-muted">
                        {RESOURCES_EMPTY_STATE.body}
                      </p>
                      <div className="mt-8">
                        <Button asChild variant="outline">
                          <Link href={RESOURCES_EMPTY_STATE.cta.href}>
                            {RESOURCES_EMPTY_STATE.cta.label}
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </StaggerItem>
                </Stagger>
              </div>
            </Container>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
