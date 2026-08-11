import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { HeroImage } from "@/components/layout/hero-image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CLIENTS_COPY, ENGAGEMENT_MODELS, WORK_WITH_US } from "@/constants/company";
import { SITE } from "@/constants/site";
import { TECH_CATEGORIES } from "@/constants/tech-stack";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
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
    "Dedicated associates, flexi hiring from 40-hour blocks, or staff augmentation that blends into your existing team. Tell us your requirement and we will suggest the way out.",
  path: "/work-with-us",
});

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        eyebrow={WORK_WITH_US.eyebrow}
        titleLines={WORK_WITH_US.titleLines}
        lead={WORK_WITH_US.lead}
        aside={<HeroImage src="/about/team-brainstorming.webp" />}
      />

      {/* Engagement models */}
      <Section tone="subtle" backdrop className="border-border border-y">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title={WORK_WITH_US.models.title}
            description={WORK_WITH_US.models.body}
            action={
              <Button asChild size="lg">
                <Link href={WORK_WITH_US.models.cta.href}>
                  {WORK_WITH_US.models.cta.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
                  />
                </Link>
              </Button>
            }
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

                  <h3 className="font-display text-heading-md text-fg mt-5 text-balance">
                    {model.name}
                  </h3>

                  <p className="text-body-sm text-fg-muted mt-3 flex-1">
                    {model.summary}
                  </p>

                  <ul className="border-border mt-6 flex flex-col gap-2.5 border-t pt-6">
                    {model.detail.map((point) => (
                      <li
                        key={point}
                        className="text-body-sm text-fg-muted flex items-start gap-2.5"
                      >
                        <Check
                          aria-hidden="true"
                          className="text-accent mt-1 size-3.5 shrink-0"
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

      {/* Join the team */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-label text-accent mb-6 uppercase">
                  {WORK_WITH_US.culture.eyebrow}
                </p>
                <h2 className="text-display-lg text-fg text-balance">
                  {WORK_WITH_US.culture.title}
                </h2>
              </Reveal>

              <Stagger delay={0.12} className="mt-6 flex flex-col gap-5">
                {WORK_WITH_US.culture.paragraphs.map((paragraph) => (
                  <StaggerItem
                    key={paragraph.slice(0, 40)}
                    as="p"
                    className="text-body-lg text-fg-muted max-w-xl"
                  >
                    {paragraph}
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.28}>
                <p className="font-display text-heading-md text-accent mt-8">
                  {WORK_WITH_US.culture.closing}
                </p>
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
                  <p className="text-body-sm text-fg-subtle">{SITE.contact.email}</p>
                </div>
              </Reveal>
            </div>

            {/* What you would be working with. */}
            <Reveal delay={0.2} className="lg:col-span-5">
              <Card className="h-full p-7 sm:p-8">
                <p className="text-label text-accent uppercase">Our Stack</p>
                <ul className="mt-6 flex flex-col gap-5">
                  {TECH_CATEGORIES.map((category) => (
                    <li key={category.label}>
                      <p className="text-body-sm text-fg font-semibold">
                        {category.label}
                      </p>
                      <p className="text-body-sm text-fg-muted mt-1">
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

      {/* Featured clients */}
      <Section tone="subtle" backdrop className="border-border border-y">
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
        tone="default"
      />

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
    </>
  );
}
