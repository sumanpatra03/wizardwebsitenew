import Image from "next/image";

import { ClientWall } from "@/components/common/client-wall";
import { Gallery } from "@/components/common/gallery";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Timeline } from "@/components/common/timeline";
import { Container } from "@/components/layout/container";
import { HeroImage } from "@/components/layout/hero-image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import {
  ABOUT,
  CLIENTS_COPY,
  GALLERY,
  GALLERY_COPY,
  GROWTH_PARTNER,
  LEADERSHIP,
  MILESTONES,
  PILLARS,
  STORY,
  TEAM,
  TIMELINE,
  VELOCITY,
} from "@/constants/company";
import { STATS } from "@/constants/stats";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { TeamCarousel } from "@/features/about/team-carousel";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "About Us" },
] as const;

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "From a small room in Kolkata in 2004 to a digital transformation partner for corporates, government and global brands — 200+ projects and 100+ clients.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={ABOUT.eyebrow}
        titleLines={ABOUT.titleLines}
        lead={ABOUT.lead}
        aside={<HeroImage src="/about/about_us2.jpg" />}
      />

      {/* Proof points */}
      <Section spacing="sm">
        <Container>
          <Stagger
            stagger={0.12}
            className="border-border grid gap-10 border-y py-14 sm:grid-cols-3 sm:gap-8"
          >
            {STATS.map((stat, index) => (
              <StaggerItem
                key={stat.label}
                className={
                  index > 0 ? "sm:border-border sm:border-l sm:pl-8" : "sm:pr-2"
                }
              >
                <p className="font-display text-display-xl text-fg leading-none">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <span className="sr-only"> {stat.label}</span>
                </p>
                <p className="text-body-base text-fg-muted mt-4 max-w-xs">
                  {stat.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Team group photo.
          Sits between the stats and Our Story, matching where it falls on the
          live page. Full-bleed to the wide container so it reads as a band
          rather than a card. */}
      <Section spacing="sm">
        <Container size="wide">
          <Reveal direction="scale">
            <div className="border-border relative aspect-16/10 w-full overflow-hidden rounded-xl border sm:aspect-21/9">
              <Image
                src="/about/team-group.jpeg"
                alt="The Wizard Communications team together at an office gathering."
                fill
                sizes="(min-width: 1600px) 1664px, 100vw"
                className="object-cover"
              />
              {/* Keeps the photo in the page's palette without hiding faces. */}
              <div
                aria-hidden="true"
                className="from-bg/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Our Story */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <p className="text-label text-accent uppercase">{STORY.eyebrow}</p>
              <h2 className="text-display-md text-fg mt-5 text-balance">
                {STORY.title}
              </h2>
            </Reveal>

            <Stagger delay={0.1} className="flex flex-col gap-6 lg:col-span-7">
              {STORY.paragraphs.map((paragraph) => (
                <StaggerItem
                  key={paragraph.slice(0, 40)}
                  as="p"
                  className="text-body-lg text-fg-muted"
                >
                  {paragraph}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* Where Vision Meets Velocity.
          Carries the same growth-chart backdrop the live page uses on this
          container, behind a scrim heavy enough to keep the copy at AA. */}
      <Section className="border-border relative overflow-hidden border-y">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/about/growth-backdrop.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="bg-bg/82 absolute inset-0" />
          <div className="from-bg via-bg/70 absolute inset-0 bg-gradient-to-r to-transparent" />
        </div>

        <Container>
          <Reveal>
            <h2 className="text-display-lg text-fg max-w-3xl text-balance">
              {VELOCITY.title}
            </h2>
            <p className="text-body-lg text-fg-muted mt-6 max-w-3xl">{VELOCITY.lead}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="font-display text-display-md text-accent mt-10 max-w-3xl text-balance">
              {VELOCITY.emphasis}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-body-lg text-fg-muted mt-8 max-w-3xl">{VELOCITY.body}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Mission, Values, Vision */}
      <Section>
        <Container>
          <Stagger stagger={0.1} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.label}>
                <Card className="h-full p-7 sm:p-8">
                  <p className="text-label text-accent uppercase">{pillar.label}</p>
                  {"lead" in pillar && pillar.lead ? (
                    <p className="font-display text-heading-md text-fg mt-5 text-balance">
                      {pillar.lead}
                    </p>
                  ) : null}
                  <p
                    className={cn(
                      "text-body-base text-fg-muted",
                      "lead" in pillar && pillar.lead ? "mt-4" : "mt-5",
                    )}
                  >
                    {pillar.body}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Milestones */}
      <Section tone="subtle" backdrop className="border-border border-y">
        <Container>
          <SectionHeading eyebrow={MILESTONES.eyebrow} title={MILESTONES.title} />
          <Timeline entries={TIMELINE} />
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <SectionHeading eyebrow={TEAM.eyebrow} title={TEAM.title} />

          <TeamCarousel leaders={LEADERSHIP} />
        </Container>
      </Section>

      {/* Gallery */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={GALLERY_COPY.eyebrow}
            title={GALLERY_COPY.title}
            description={GALLERY_COPY.body}
          />
          <Gallery photos={GALLERY} className="mt-14" />
        </Container>
      </Section>

      {/* Growth partner */}
      <Section tone="subtle" backdrop className="border-border border-y">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-label text-accent uppercase">
                {GROWTH_PARTNER.eyebrow}
              </p>
              <h2 className="text-display-lg text-fg mt-5 text-balance">
                {GROWTH_PARTNER.title}
              </h2>
              <p className="text-body-lg text-fg-muted mt-6">{GROWTH_PARTNER.body}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-display text-heading-md text-accent mt-8">
                {GROWTH_PARTNER.emphasis}
              </p>
            </Reveal>

            {/* Partner mark. On a light chip for the same reason the client
                carousel uses one: the wordmark is black ink on transparency
                and would vanish on the dark canvas. */}
            <Reveal delay={0.2}>
              <span
                className={cn(
                  "mt-10 inline-grid h-20 place-items-center rounded-xl",
                  "ring-ink-950/8 bg-white px-8 ring-1",
                )}
              >
                <Image
                  src={GROWTH_PARTNER.partner.logo}
                  alt={GROWTH_PARTNER.partner.name}
                  width={GROWTH_PARTNER.partner.width}
                  height={GROWTH_PARTNER.partner.height}
                  className="h-9 w-auto object-contain"
                />
              </span>
            </Reveal>
          </div>
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

      {/* Testimonials — the same carousel the home page uses. */}
      <TestimonialsCarousel
        eyebrow="Client Voices"
        title={TESTIMONIALS_HEADING}
        tone="subtle"
      />

      <Section spacing="sm">
        <Container>
          <Reveal>
            <p className="text-body-base text-fg-subtle">{ABOUT.closing}</p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
