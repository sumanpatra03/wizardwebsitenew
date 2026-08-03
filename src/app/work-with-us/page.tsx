import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ENGAGEMENT_MODELS, WORK_WITH_US } from "@/constants/company";
import { SITE } from "@/constants/site";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Work With Us" },
] as const;

export const metadata = buildMetadata({
  title: "Work With Us",
  description:
    "Dedicated associates, flexi hiring from 40-hour blocks, or staff augmentation that slots into your existing team. Tell us what you need and we will shape the engagement around it.",
  path: "/work-with-us",
});

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={WORK_WITH_US.eyebrow}
        titleLines={["Work with our", "talented minds"]}
        lead={WORK_WITH_US.lead}
      >
        <Button asChild size="lg">
          <Link href="/contact">
            Tell us what you need
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
            />
          </Link>
        </Button>
      </PageHero>

      {/* Engagement models */}
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Three ways to bring our people onto your team."
          />

          <Stagger stagger={0.08} className="mt-14 grid gap-5 lg:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model, index) => (
              <StaggerItem key={model.name}>
                <Card interactive className="flex h-full flex-col p-7 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="font-display text-heading-md text-accent/50"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2 className="font-display text-heading-md mt-5 text-balance text-fg">
                    {model.name}
                  </h2>

                  <p className="text-body-sm mt-3 flex-1 text-fg-muted">
                    {model.summary}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                    {model.detail.map((point) => (
                      <li
                        key={point}
                        className="text-body-sm flex items-start gap-2.5 text-fg-muted"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 text-accent"
                          strokeWidth={3}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Culture */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-label mb-6 uppercase text-accent">
                  Join The Team
                </p>
                <h2 className="text-display-lg text-balance text-fg">
                  {WORK_WITH_US.culture.title}
                </h2>
                <p className="text-body-lg mt-6 max-w-xl text-fg-muted">
                  {WORK_WITH_US.culture.body}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" variant="outline">
                    <a href={`mailto:${SITE.contact.email}`}>
                      Send us your CV
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
                      />
                    </a>
                  </Button>
                  <p className="text-body-sm text-fg-subtle">
                    {SITE.contact.email}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* What you would be working with. */}
            <Reveal delay={0.2} className="lg:col-span-5">
              <Card className="h-full p-7 sm:p-8">
                <p className="text-label uppercase text-accent">Our Stack</p>
                <ul className="mt-6 flex flex-col gap-5">
                  {TECH_CATEGORIES.map((category) => (
                    <li key={category.label}>
                      <p className="text-body-sm font-semibold text-fg">
                        {category.label}
                      </p>
                      <p className="text-body-sm mt-1 text-fg-muted">
                        {category.items.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
