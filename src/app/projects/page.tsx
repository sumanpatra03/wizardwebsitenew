import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { ClientWall } from "@/components/common/client-wall";
import { Gallery } from "@/components/common/gallery";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CLIENTS_COPY } from "@/constants/company";
import { PROJECTS, PROJECTS_COPY, projectHref } from "@/constants/projects";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Projects" },
] as const;

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Twenty projects across software, ecommerce, e-learning and digital experience — from a fragrance workflow for ITC to the Indian Parliament Museum's interactive kiosks.",
  path: "/projects",
});

/** Projects whose galleries get a section of their own below the grid. */
const GALLERIES = PROJECTS.filter((project) => project.gallery);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={PROJECTS_COPY.eyebrow}
        titleLines={PROJECTS_COPY.titleLines}
        lead={PROJECTS_COPY.lead}
      >
        <p className="text-body-base max-w-3xl text-fg-muted">
          {PROJECTS_COPY.body}
        </p>

        {/* The three figures the live page runs above its grid. Static text,
            not the animated `CountUp` used on the home page — two of the three
            are not plain numbers. */}
        <ul className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {PROJECTS_COPY.stats.map((stat) => (
            <li key={stat.label}>
              <p className="font-display text-display-md leading-none text-accent">
                {stat.value}
              </p>
              <p className="text-body-sm mt-3 text-fg-muted">{stat.label}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* The twenty projects */}
      <Section>
        <Container>
          <Stagger
            stagger={0.04}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROJECTS.map((project) => {
              const href = projectHref(project);

              return (
                <StaggerItem key={project.slug}>
                  <Card
                    interactive={Boolean(href)}
                    className="flex h-full flex-col"
                  >
                    {project.image ? (
                      <div
                        aria-hidden="true"
                        className="relative aspect-[9/10] overflow-hidden border-b border-border"
                      >
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                          className={cn(
                            "object-cover transition-transform",
                            "duration-(--duration-base) ease-(--ease-out-expo)",
                            "group-hover/card:scale-105",
                            "motion-reduce:transition-none",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        />
                        <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-surface" />
                      </div>
                    ) : (
                      /* Generated fallback, for the cards whose artwork the
                         live grid renders client-side and never serves. */
                      <div
                        aria-hidden="true"
                        className="bg-mesh relative aspect-[9/10] overflow-hidden border-b border-border"
                      >
                        <div className="bg-grid absolute inset-0 opacity-70" />
                        <span
                          className={cn(
                            "absolute inset-0 grid place-items-center",
                            "font-display text-[clamp(3rem,9vw,5rem)] leading-none",
                            "font-extrabold text-fg opacity-[0.09] select-none",
                            "transition-transform duration-(--duration-base)",
                            "ease-(--ease-out-expo) group-hover/card:scale-110",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        >
                          {project.monogram}
                        </span>
                        <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-surface" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <Badge variant="accent" className="self-start">
                        {project.category}
                      </Badge>

                      <h2 className="font-display text-heading-md mt-4 text-balance text-fg">
                        {project.title}
                      </h2>

                      <p className="text-body-sm mt-3 flex-1 text-fg-muted">
                        {project.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <Badge variant="outline">{tag}</Badge>
                          </li>
                        ))}
                      </ul>

                      {/* Only the twelve with a client site of their own get a
                          link. The seven case studies published on
                          wizardcomm.net have no page here yet, and the two
                          gallery entries are shown in full below. */}
                      {href ? (
                        <div className="mt-6 border-t border-border pt-5">
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={cn(
                              "text-body-sm inline-flex items-center gap-2",
                              "font-medium text-accent",
                              "after:absolute after:inset-0 after:content-['']",
                              "transition-colors duration-(--duration-fast)",
                              "hover:text-accent-hover focus-visible:outline-2",
                              "focus-visible:outline-offset-2 focus-visible:outline-ring",
                            )}
                          >
                            Visit site
                            <ArrowUpRight
                              aria-hidden="true"
                              className={cn(
                                "size-4 transition-transform",
                                "duration-(--duration-fast) ease-(--ease-out-quart)",
                                "group-hover/card:-translate-y-0.5",
                                "group-hover/card:translate-x-0.5",
                                "motion-reduce:translate-none",
                              )}
                            />
                            <span className="sr-only">
                              {` — ${project.title} (opens in a new tab)`}
                            </span>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* The two projects the live site opens as a gallery rather than a page.
          Shown in full here — a modal that cannot be linked to is worse than a
          section that can. */}
      {GALLERIES.map((project, index) => (
        <Section
          key={project.slug}
          tone={index % 2 === 0 ? "subtle" : "default"}
          backdrop={index % 2 === 0}
          className={index % 2 === 0 ? "border-y border-border" : undefined}
        >
          <Container>
            <SectionHeading
              eyebrow={project.category}
              title={project.title}
              description={project.description}
            />
            <Gallery photos={project.gallery ?? []} className="mt-14" />
          </Container>
        </Section>
      ))}

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
