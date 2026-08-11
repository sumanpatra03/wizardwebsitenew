import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CASE_STUDIES, getCaseStudy } from "@/constants/project-pages";
import { PROJECTS } from "@/constants/projects";
import { ServiceCta } from "@/features/services/service-cta";
import { ServiceOutcomes } from "@/features/services/service-outcomes";
import { ServiceProcess } from "@/features/services/service-process";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Params = { slug: string };

/**
 * Every project gets a page, not only the seven with a written case study.
 *
 * The other fourteen render a shorter version built from what the index
 * already holds — artwork, category, description, tags and the client's own
 * site. Nothing about them is invented to fill a template; they simply stop
 * after the facts we have. That is still better than a card that leaves the
 * site, because it keeps a reader inside the work rather than handing them
 * off at the first click.
 */
export function generateStaticParams(): Params[] {
  /*
   * Fail the build, not the page.
   *
   * A case study whose slug has no entry in `projects.ts` has no title,
   * category or artwork to render, so the page falls through to `notFound()`
   * — and a prerendered 404 looks exactly like a working build. Checking the
   * pairing here turns that into an error at the only point where anyone is
   * watching.
   */
  const orphans = CASE_STUDIES.filter(
    (study) => !PROJECTS.some((project) => project.slug === study.slug),
  ).map((study) => study.slug);

  if (orphans.length > 0) {
    throw new Error(
      `Case studies with no matching project in constants/projects.ts: ${orphans.join(", ")}`,
    );
  }

  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return buildMetadata({ title: "Project" });

  const study = getCaseStudy(slug);

  return buildMetadata({
    title: study ? `${project.title} — case study` : project.title,
    description: study?.metaDescription ?? project.description,
    path: `/projects/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const study = getCaseStudy(slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title },
  ] as const;

  /*
   * Related work: written case studies first, since those are the pages worth
   * arriving at, then anything else in the same category. A project with no
   * write-up would otherwise end on three cards that say as little as it does.
   */
  const others = [
    ...PROJECTS.filter(
      (item) => item.slug !== slug && CASE_STUDIES.some((s) => s.slug === item.slug),
    ),
    ...PROJECTS.filter(
      (item) =>
        item.slug !== slug &&
        item.category === project.category &&
        !CASE_STUDIES.some((s) => s.slug === item.slug),
    ),
  ].slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={project.category}
        titleLines={[project.title]}
        aside={
          project.image ? (
            <div className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
                  "bg-accent/12 blur-3xl",
                )}
              />
              {/*
               * 9:10, the ratio these poster cards are drawn at, so the
               * artwork is never cropped — and capped rather than filling the
               * hero column.
               *
               * The source files are 360×400. Left to fill the aside they
               * rendered near 660px wide, an 1.8× upscale that was both
               * oversized against the heading and visibly soft. 28rem is the
               * balance: large enough to hold its half of the composition,
               * and close enough to native that these flat posters stay
               * crisp.
               */}
              <div
                className={cn(
                  "relative mx-auto aspect-[9/10] w-full max-w-sm",
                  "overflow-hidden rounded-xl border border-border shadow-card",
                  "lg:max-w-md",
                )}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority
                  // Capped by `max-w`, so a fixed hint beats a viewport one.
                  sizes="(min-width: 1024px) 448px, 384px"
                  className="object-cover"
                />
              </div>
            </div>
          ) : undefined
        }
      >
        {/* With a write-up, its tagline leads and the index description moves
            below it. Without one, that description is all there is, so it
            carries the hero on its own rather than being repeated. */}
        {study ? (
          <>
            <p className="font-display text-heading-md max-w-3xl text-balance text-accent">
              {study.tagline}
            </p>
            <p className="text-body-lg mt-6 max-w-3xl text-fg-muted">
              {study.lead}
            </p>
          </>
        ) : (
          <p className="text-body-lg max-w-3xl text-fg-muted">
            {project.description}
          </p>
        )}

        {/* What the client ended up with, where we have it; otherwise the
            technologies the index already lists. Both are short strings, so
            badges rather than a section of their own. */}
        <div className="mt-8">
          <p className="text-label uppercase text-fg-subtle">
            {study ? "Delivered" : "Scope"}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {(study?.assets ?? project.tags).map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              Start a project like this
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
            <Link href="/projects">All projects</Link>
          </Button>

          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "text-body-sm inline-flex items-center gap-2 text-fg-subtle",
                "transition-colors duration-(--duration-fast) hover:text-accent",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-ring",
              )}
            >
              <ArrowUpRight aria-hidden="true" className="size-4" />
              Visit the live site
            </a>
          ) : null}
        </div>
      </PageHero>

      {/*
       * Challenge and impact, side by side — only where there is a write-up.
       *
       * This is the pairing a case study is actually making, the state before
       * and the state after, and `ServiceOutcomes` already renders exactly
       * that: muted on one side, accented on the other. The other fourteen
       * projects skip both this and the approach rather than being padded out
       * with claims nobody wrote.
       */}
      {study ? (
        <>
          <ServiceOutcomes
            heading="What the work had to fix."
            lead={project.description}
            problems={{ heading: "The challenge", items: study.challenge }}
            benefits={{ heading: "Business impact", items: study.impact }}
            tone="subtle"
          />

          <ServiceProcess
            heading="How we built it."
            eyebrow="Approach"
            steps={study.steps}
            tone="default"
          />
        </>
      ) : null}

      {/* Three more projects, so the page ends on somewhere to go. */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading eyebrow="More work" title="Other projects." />

          <Stagger
            stagger={0.06}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {others.map((item) => (
              <StaggerItem key={item.slug}>
                <Card interactive className="h-full">
                  <Link
                    href={`/projects/${item.slug}`}
                    className={cn(
                      "flex h-full flex-col p-6",
                      "after:absolute after:inset-0 after:content-['']",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-ring",
                    )}
                  >
                    <Badge variant="accent" className="self-start">
                      {item.category}
                    </Badge>
                    <span className="font-display text-heading-sm mt-4 text-balance text-fg">
                      {item.title}
                    </span>
                    <span className="text-body-sm mt-2 line-clamp-3 text-fg-muted">
                      {item.description}
                    </span>
                    <span
                      className={cn(
                        "text-body-sm mt-5 inline-flex items-center gap-2",
                        "font-medium text-accent",
                      )}
                    >
                      Read the case study
                      <ArrowRight
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform",
                          "duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:translate-x-1",
                          "motion-reduce:translate-none",
                        )}
                      />
                    </span>
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <ServiceCta
        title="Have a problem shaped like this one?"
        body="Tell us what your business needs to do, and we will tell you what it takes to build it."
        label="Start a conversation"
      />
    </>
  );
}
