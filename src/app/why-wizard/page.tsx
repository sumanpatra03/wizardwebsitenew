import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BEYOND,
  CHOOSE_WIZARD,
  CLIENTS_COPY,
  COMPETENCIES,
  NUMBERS_BEHIND,
  WHY_WIZARD_PAGE,
} from "@/constants/company";
import { DIFFERENTIATORS } from "@/constants/differentiators";
import { STATS } from "@/constants/stats";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Why Wizard" },
] as const;

/** Captions from this page, in the same order as STATS. */
const NUMBER_CAPTIONS = [
  NUMBERS_BEHIND.captions.years,
  NUMBERS_BEHIND.captions.projects,
  NUMBERS_BEHIND.captions.clients,
] as const;

export const metadata = buildMetadata({
  title: "Why Wizard",
  description:
    "Strategy, experience design, technology, marketing and managed services under one roof — connected ecosystems that keep creating value long after launch.",
  path: "/why-wizard",
});

export default function WhyWizardPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={WHY_WIZARD_PAGE.eyebrow}
        titleLines={WHY_WIZARD_PAGE.titleLines}
        lead={WHY_WIZARD_PAGE.lead}
      >
        <p className="text-body-lg mb-8 max-w-2xl text-fg-muted">
          {WHY_WIZARD_PAGE.body}
        </p>
        <p className="font-display text-heading-md mb-8 text-accent">
          {WHY_WIZARD_PAGE.emphasis}
        </p>
        <Button asChild size="lg">
          <Link href={WHY_WIZARD_PAGE.cta.href}>
            {WHY_WIZARD_PAGE.cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
            />
          </Link>
        </Button>
      </PageHero>

      {/* Beyond deliverables */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <h2 className="text-display-lg text-balance text-fg">
                {BEYOND.title}
              </h2>
            </Reveal>

            <div className="lg:col-span-7">
              <Stagger stagger={0.09} className="flex flex-col gap-2">
                {BEYOND.anyone.map((line) => (
                  <StaggerItem
                    key={line}
                    as="p"
                    direction="left"
                    className="font-display text-display-md text-fg-subtle"
                  >
                    {line}
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.2}>
                <p className="text-body-lg mt-8 text-fg-muted">
                  {BEYOND.difference}
                </p>
                <p className="font-display text-heading-md mt-6 text-accent">
                  {BEYOND.hook}
                </p>
                <p className="text-body-lg mt-6 text-fg-muted">{BEYOND.body}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* The numbers behind the story */}
      <Section>
        <Container>
          <SectionHeading eyebrow="By The Numbers" title={NUMBERS_BEHIND.title} />

          <Stagger
            stagger={0.12}
            className="mt-14 grid gap-10 border-y border-border py-14 sm:grid-cols-3 sm:gap-8"
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
                  {NUMBER_CAPTIONS[index]}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* End-to-end expertise */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="End-to-End Expertise"
            title="Five disciplines that usually live in five different agencies."
            description="Which is why the handoffs between them are where most projects lose momentum. Here they do not exist."
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

      {/* Why clients choose Wizard */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-display-lg text-balance text-fg">
                  {CHOOSE_WIZARD.title}
                </h2>
              </Reveal>

              <Stagger delay={0.12} className="mt-9 flex flex-col gap-3.5">
                {CHOOSE_WIZARD.reasons.map((reason) => (
                  <StaggerItem
                    key={reason}
                    as="p"
                    direction="left"
                    className="text-body-lg flex items-start gap-3 text-fg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-pill bg-accent-muted text-accent"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {reason}
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.3}>
                <div className="mt-10 border-l-2 border-accent pl-6">
                  {CHOOSE_WIZARD.closing.map((line) => (
                    <p
                      key={line}
                      className="font-display text-heading-md text-fg"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <Stagger
              stagger={0.06}
              className="grid gap-4 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-3"
            >
              {DIFFERENTIATORS.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <div
                      className={cn(
                        "group/card h-full rounded-xl border border-border bg-surface p-6",
                        "transition-[border-color,box-shadow,transform]",
                        "duration-(--duration-fast) ease-(--ease-out-quart)",
                        "hover:-translate-y-1 hover:border-accent/45 hover:shadow-card-hover",
                        "motion-reduce:hover:translate-y-0",
                      )}
                    >
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
                        {item.title}
                      </h3>
                      <p className="text-body-sm mt-2 text-fg-muted">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* Featured clients */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow={CLIENTS_COPY.eyebrow}
            title="Trusted by corporates and government alike."
            description={CLIENTS_COPY.body}
          />
          <ClientWall className="mt-14" />
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
