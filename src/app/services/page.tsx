import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { CLIENTS_COPY, COMPETENCIES } from "@/constants/company";
import { SERVICES_INDEX, SERVICE_PAGES } from "@/constants/service-pages";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Services" },
] as const;

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Custom software, mobile apps, generative AI, cyber security, digital marketing and on-demand hiring — the full range of what Wizard builds and runs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={SERVICES_INDEX.eyebrow}
        titleLines={SERVICES_INDEX.titleLines}
        lead={SERVICES_INDEX.lead}
      />

      {/* The six services.
          Photograph-led cards rather than the home page's flip cards: this is
          the page someone lands on to choose, so both the name and what it
          covers have to be readable without an interaction first. */}
      <Section>
        <Container>
          <Stagger
            stagger={0.07}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICE_PAGES.map((service) => {
              const Icon = service.icon;

              return (
                <StaggerItem key={service.slug}>
                  <Card interactive className="h-full">
                    {/* One stretched link over the whole card, rather than
                        several nested ones pointing at the same place. */}
                    <Link
                      href={`/services/${service.slug}`}
                      className={cn(
                        "flex h-full flex-col",
                        "after:absolute after:inset-0 after:content-['']",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-ring",
                      )}
                    >
                      <span className="relative block aspect-[16/10] overflow-hidden">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                          className={cn(
                            "object-cover transition-transform",
                            "duration-(--duration-slow) ease-(--ease-out-expo)",
                            "group-hover/card:scale-105",
                            "motion-reduce:transition-none",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        />
                        {/* Ties the photograph into the card surface. */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent"
                        />

                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-4 left-4 grid size-11 place-items-center",
                            "rounded-lg border border-accent/30 bg-bg/80 text-accent",
                            "backdrop-blur-sm transition-transform",
                            "duration-(--duration-fast)",
                            "group-hover/card:scale-110",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                      </span>

                      <span className="flex flex-1 flex-col p-6 sm:p-7">
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-display text-heading-md text-balance text-fg">
                            {service.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className={cn(
                              "mt-1 size-5 shrink-0 text-fg-subtle",
                              "transition-[color,transform]",
                              "duration-(--duration-fast) ease-(--ease-out-quart)",
                              "group-hover/card:-translate-y-0.5",
                              "group-hover/card:translate-x-0.5",
                              "group-hover/card:text-accent",
                              "motion-reduce:translate-none",
                            )}
                          />
                        </span>

                        <span className="text-body-sm mt-3 text-fg-muted">
                          {service.tagline}
                        </span>

                        <span className="text-label mt-6 block uppercase text-accent">
                          Explore
                        </span>
                      </span>
                    </Link>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* End-to-end expertise — the same five disciplines Why Wizard sets out,
          restated here because this is where someone is comparing us against
          five separate specialist agencies. */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow={SERVICES_INDEX.capability.eyebrow}
            title={SERVICES_INDEX.capability.title}
            description={SERVICES_INDEX.capability.description}
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

      <TestimonialsCarousel
        eyebrow="Client Voices"
        title={TESTIMONIALS_HEADING}
      />

      <CtaBand />
    </>
  );
}
