import { Quote } from "lucide-react";

import { JsonLd } from "@/components/common/json-ld";
import { Timeline } from "@/components/common/timeline";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import {
  ABOUT,
  LEADERSHIP,
  MISSION_VISION,
  TIMELINE,
  VALUES,
} from "@/constants/company";
import { STATS } from "@/constants/stats";
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
    "Wizard Communications has been building software in Kolkata since 2004 — e-learning and web portals, then custom software, now AI, commerce and managed platforms.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={ABOUT.eyebrow}
        titleLines={[
          "Turning complex",
          "technology into simple,",
          "powerful solutions",
        ]}
        lead={ABOUT.lead}
      />

      {/* Proof points */}
      <Section spacing="sm">
        <Container>
          <Stagger
            stagger={0.12}
            className="grid gap-10 border-y border-border py-14 sm:grid-cols-3 sm:gap-8"
          >
            {STATS.map((stat, index) => (
              <StaggerItem
                key={stat.label}
                className={
                  index > 0 ? "sm:border-l sm:border-border sm:pl-8" : "sm:pr-2"
                }
              >
                <p className="font-display text-display-xl leading-none text-fg">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <span className="sr-only"> {stat.label}</span>
                </p>
                <p className="text-body-base mt-4 max-w-xs text-fg-muted">
                  {stat.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Mission and vision */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="What Drives Us"
            title="A partner, not a vendor."
          />

          <Stagger stagger={0.1} className="mt-14 grid gap-5 lg:grid-cols-2">
            {MISSION_VISION.map((item) => (
              <StaggerItem key={item.label}>
                <Card className="h-full p-8 sm:p-10">
                  <p className="text-label uppercase text-accent">{item.label}</p>
                  <p className="text-body-lg mt-6 text-fg">{item.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <Quote
                aria-hidden="true"
                className="mx-auto size-10 text-accent/40"
              />
              <p className="font-display text-display-md mt-8 text-balance text-fg">
                {VALUES.principle}
              </p>
              <p className="text-body-lg mt-6 text-fg-muted">{VALUES.body}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* History */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          {/* No description here: the first timeline entry already carries the
              1999/2004 founding line, and repeating it two paragraphs apart
              read as an editing mistake. */}
          <SectionHeading
            eyebrow="Our Story"
            title="Two decades, one direction."
          />
          <Timeline entries={TIMELINE} />
        </Container>
      </Section>

      {/* Leadership */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for the work."
          />

          <Stagger
            stagger={0.07}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {LEADERSHIP.map((leader) => (
              <StaggerItem key={leader.name}>
                <Card className="h-full p-7">
                  {/* Monogram tile — no headshots are published, and a
                      generated initial reads better than a placeholder
                      silhouette. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-display grid size-14 place-items-center rounded-lg",
                      "bg-accent-muted text-heading-md text-accent",
                    )}
                  >
                    {leader.initials}
                  </span>

                  <h3 className="font-display text-heading-md mt-6 text-fg">
                    {leader.name}
                  </h3>
                  <p className="text-label mt-1.5 uppercase text-accent">
                    {leader.role}
                  </p>
                  <p className="text-body-sm mt-4 text-fg-muted">{leader.bio}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="text-body-base mt-12 text-fg-subtle">
              {ABOUT.closing}
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
