import { Check } from "lucide-react";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { COMPETENCIES, WHY_WIZARD_PAGE } from "@/constants/company";
import {
  DIFFERENTIATORS,
  PARTNERSHIP_PROMISES,
} from "@/constants/differentiators";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Why Wizard" },
] as const;

export const metadata = buildMetadata({
  title: "Why Wizard",
  description:
    "Strategy, experience design, technology, marketing and managed services under one roof — and a way of working built on partnership rather than ticket-taking.",
  path: "/why-wizard",
});

export default function WhyWizardPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={WHY_WIZARD_PAGE.eyebrow}
        titleLines={["Because growth", "doesn't happen", "by accident."]}
        lead={WHY_WIZARD_PAGE.lead}
      />

      {/* End-to-end expertise */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="End-to-End Expertise"
            title="Five disciplines that usually live in five different agencies."
            description="Which is why the handoffs between them are where most projects lose their momentum. Here they do not exist."
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
                    <h2 className="font-display text-heading-md mt-6 text-fg">
                      {item.name}
                    </h2>
                    <p className="text-body-sm mt-3 text-fg-muted">{item.body}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Attributes */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-label mb-6 uppercase text-accent">
                  How We Work
                </p>
                <h2 className="text-display-lg text-balance text-fg">
                  What you actually get.
                </h2>
              </Reveal>

              <Stagger delay={0.15} className="mt-9 flex flex-col gap-3.5">
                {PARTNERSHIP_PROMISES.map((promise) => (
                  <StaggerItem
                    key={promise}
                    as="p"
                    direction="left"
                    className="text-body-base flex items-start gap-3 text-fg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill bg-accent-muted text-accent"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {promise}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Stagger
              stagger={0.07}
              className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
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
                      <h3 className="font-display text-heading-sm mt-5 text-fg">
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

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
