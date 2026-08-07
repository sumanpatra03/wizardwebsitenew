import Image from "next/image";

import { ClientWall } from "@/components/common/client-wall";
import { Gallery } from "@/components/common/gallery";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CLIENTS_COPY } from "@/constants/company";
import { PROJECTS, PROJECTS_COPY } from "@/constants/projects";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { CtaBand } from "@/features/home/sections/cta-band";
import { ProjectGrid } from "@/features/projects/project-grid";
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
        aside={
          /*
           * No frame, no scrim, no crop — unlike the service and product
           * heroes, which carry photographs. This is transparent line art, so
           * a card around it would box in something that has no edges, and
           * `object-cover` in a 16:9 frame would slice through a composition
           * that runs to all four sides of its own square.
           */
          <Image
            src="/projects/projects-banner.png"
            // Decorative: the <h1> beside it already says what the page is.
            alt=""
            width={641}
            height={667}
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="mx-auto h-auto w-full max-w-md lg:max-w-none"
          />
        }
      >
        <p className="text-body-base max-w-3xl text-fg-muted">
          {PROJECTS_COPY.body}
        </p>

        {/* The three figures the live page runs above its grid. Static text,
            not the animated `CountUp` used on the home page — two of the three
            are not plain numbers. */}
        {/*
         * `auto-fit` with a floor, not `grid-cols-3`.
         *
         * Tailwind's `grid-cols-3` compiles to `repeat(3, minmax(0, 1fr))`,
         * and that zero minimum lets a track shrink below its own content — so
         * in the hero's left half the figures outgrew their columns and ran
         * into one another, which no amount of `gap` can prevent because the
         * text is overflowing the track, not filling it. A `9rem` floor makes
         * the row drop to two across, then one, before that can happen.
         */}
        <ul
          className={cn(
            "mt-14 grid border-t border-border pt-12",
            // Two across on phones. The `9rem` floor below would drop to a
            // single column on a 360px screen, and the figures are small
            // enough at that size that a fixed pair never collides.
            "grid-cols-2 gap-x-6 gap-y-10",
            "sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] sm:gap-x-10",
          )}
        >
          {PROJECTS_COPY.stats.map((stat) => (
            <li key={stat.label}>
              {/* `tabular-nums` so the three figures sit on a common width and
                  the labels beneath them line up. */}
              <p className="font-display text-display-lg leading-none tabular-nums text-accent">
                {stat.value}
              </p>
              <p className="text-body-base mt-4 text-fg-muted">{stat.label}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* The projects. A Client Component so the grid can filter and re-lay
          out, but it renders its full unfiltered markup on the server — every
          card is in the served HTML. */}
      <Section>
        <Container>
          <ProjectGrid />
        </Container>
      </Section>

      {/* The two projects the live site opens as a gallery rather than a page.
          Shown in full here — a modal that cannot be linked to is worse than a
          section that can. */}
      {GALLERIES.map((project, index) => (
        <Section
          key={project.slug}
          // The target of that project's card control up in the grid.
          // `scroll-mt` clears the fixed header, which would otherwise cover
          // the heading the anchor lands on.
          id={project.slug}
          tone={index % 2 === 0 ? "subtle" : "default"}
          backdrop={index % 2 === 0}
          className={cn(
            "scroll-mt-header",
            index % 2 === 0 && "border-y border-border",
          )}
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
