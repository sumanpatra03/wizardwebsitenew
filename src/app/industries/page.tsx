import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CardsSection } from "@/components/cards/cards-section";
import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CLIENTS_COPY, COMPETENCIES } from "@/constants/company";
import {
  INDUSTRIES,
  INDUSTRIES_PAGE,
  SECTORS,
} from "@/constants/industries";

import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { findPublicImage } from "@/lib/public-image";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { HoverCardItem } from "@/types/content";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Industries" },
] as const;

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Thirteen sectors served — manufacturing, healthcare, FMCG, hospitality, education, retail, finance, government, logistics and more, with domain specialists on every engagement.",
  path: "/industries",
});

export default function IndustriesPage() {
  /*
   * Resolve each sector's photograph the same way the home section does:
   * a file in `public/cards/` named after the card id replaces the generated
   * artwork. Doing it here rather than rendering `<Industries>` keeps the
   * panels' imagery without also nesting that component's own `<Section>`,
   * `<Container>` and heading inside this one — which would double the section
   * padding, double the gutter, and print two headings above the same row.
   */
  const deepDive: HoverCardItem[] = INDUSTRIES.map((card) => {
    const image = findPublicImage("cards", card.id);
    return image ? { ...card, image } : card;
  });

  /*
   * Hero artwork, resolved the same drop-in way: `public/industries/
   * industries.<ext>` appears here on the next build with no code change.
   * Absent, the hero simply runs full width — so the page is never left
   * pointing at an image that does not exist.
   */
  const heroImage = findPublicImage("industries", "industries");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={INDUSTRIES_PAGE.eyebrow}
        titleLines={INDUSTRIES_PAGE.titleLines}
        lead={INDUSTRIES_PAGE.lead}
        aside={
          heroImage ? (
            <div className="relative">
              {/* Accent bloom behind the frame, as on the service and product
                  heroes. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
                  "bg-accent/12 blur-3xl",
                )}
              />
              <div
                className={cn(
                  "relative aspect-[16/9] w-full overflow-hidden rounded-xl",
                  "border border-border shadow-card",
                )}
              >
                <Image
                  src={heroImage}
                  /*
                   * Not decorative: this composite carries the name and
                   * summary of all thirteen sectors as baked-in type, which
                   * no screen reader can read. The alt names what it shows;
                   * the section below carries the same thirteen as real text.
                   */
                  alt="The thirteen industries Wizard serves, each shown with the systems built for it"
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : undefined
        }
      >
        <p className="text-body-lg max-w-3xl text-fg-muted">
          {INDUSTRIES_PAGE.body}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              Talk to a domain specialist
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-(--duration-fast)",
                  "group-hover:translate-x-1 motion-reduce:translate-none",
                )}
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">See the work</Link>
          </Button>
        </div>
      </PageHero>

      {/*
       * Industries We Serve.
       *
       * The published version is a grid of bare labels. Each card here carries
       * a line on what we actually build for that sector — a name on its own
       * tells a reader nothing they did not already know about themselves.
       */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow={INDUSTRIES_PAGE.sectors.eyebrow}
            title={INDUSTRIES_PAGE.sectors.title}
            description={INDUSTRIES_PAGE.sectors.description}
          />

          <Stagger
            stagger={0.04}
            className={cn(
              "mt-14 grid gap-4",
              "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {SECTORS.map((sector) => {
              const Icon = sector.icon;

              return (
                <StaggerItem key={sector.name}>
                  <Card interactive className="flex h-full flex-col p-6">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-11 place-items-center rounded-lg",
                        "bg-accent-muted text-accent transition-transform",
                        "duration-(--duration-fast) group-hover/card:scale-110",
                        "motion-reduce:group-hover/card:scale-100",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>

                    <h3 className="font-display text-heading-sm mt-5 text-balance text-fg">
                      {sector.name}
                    </h3>
                    <p className="text-body-sm mt-2.5 text-fg-muted">
                      {sector.body}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Where we have gone deepest — the five sectors with named, public
          work, using the expanding panels the home page uses. */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={INDUSTRIES_PAGE.deepDive.eyebrow}
            title={INDUSTRIES_PAGE.deepDive.title}
            description={INDUSTRIES_PAGE.deepDive.description}
          />
          <CardsSection
            cards={deepDive}
            label="Sectors we have gone deepest in"
            className="mt-14"
          />
        </Container>
      </Section>

      {/* What every engagement brings, whatever the sector. */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="What you get either way"
            title="The industry changes. The delivery team does not."
            description="Whichever sector you are in, the same five disciplines sit on the engagement — which is why the handoffs between them never become your problem."
          />

          <Stagger
            stagger={0.07}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {COMPETENCIES.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.name}>
                  <Card interactive className="h-full p-7">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 place-items-center rounded-lg",
                        "bg-accent-muted text-accent transition-transform",
                        "duration-(--duration-fast) group-hover/card:scale-110",
                        "motion-reduce:group-hover/card:scale-100",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-heading-md mt-6 text-fg">
                      {item.name}
                    </h3>
                    <p className="text-body-sm mt-3 text-fg-muted">{item.body}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Featured clients */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={CLIENTS_COPY.eyebrow}
            title="Trusted by corporates and government alike."
            description={CLIENTS_COPY.body}
          />
          <ClientWall variant="carousel" className="mt-14" />
        </Container>
      </Section>

  

      <CtaBand />
    </>
  );
}
