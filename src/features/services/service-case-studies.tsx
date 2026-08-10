import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { hasCaseStudy } from "@/constants/project-pages";
import { PROJECTS } from "@/constants/projects";
import { cn } from "@/lib/utils";

/**
 * Work delivered in this service's line, on the service page.
 *
 * Takes project slugs rather than restating any of the copy: the title,
 * category, description and artwork all come from `projects.ts`, so a card
 * here and the same card on `/projects` can never drift apart, and updating a
 * project updates every service page that cites it.
 *
 * An unknown slug is skipped rather than rendered blank, so a typo costs one
 * card instead of breaking the section.
 */
export function ServiceCaseStudies({
  heading,
  lead,
  slugs,
  tone = "subtle",
}: {
  heading: string;
  lead?: string;
  slugs: readonly string[];
  tone?: "default" | "subtle";
}) {
  const projects = slugs
    .map((slug) => PROJECTS.find((project) => project.slug === slug))
    .filter((project): project is (typeof PROJECTS)[number] => Boolean(project));

  if (projects.length === 0) return null;

  /*
   * One case study gets a row, not a card.
   *
   * A lone card in a three-column grid reads as a section that failed to
   * load. Given the whole width, the same content becomes a featured row —
   * artwork beside the copy, at a size that actually shows the work.
   */
  const featured = projects.length === 1 ? projects[0] : undefined;

  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-border border-y" : undefined}
    >
      <Container>
        <SectionHeading
          eyebrow={featured ? "Featured case study" : "Recent case studies"}
          title={heading}
          description={lead}
        />

        {featured ? (
          <Card
            interactive
            className="mt-14 grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14"
          >
            {featured.image ? (
              <div
                aria-hidden="true"
                className={cn(
                  "relative mx-auto aspect-[9/10] w-full max-w-xs overflow-hidden",
                  "border-border rounded-xl border lg:max-w-sm",
                )}
              >
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  className={cn(
                    "object-cover transition-transform",
                    "duration-(--duration-base) ease-(--ease-out-expo)",
                    "group-hover/card:scale-105",
                    "motion-reduce:transition-none",
                    "motion-reduce:group-hover/card:scale-100",
                  )}
                />
              </div>
            ) : null}

            <div className="flex flex-col items-start">
              <Badge variant="accent">{featured.category}</Badge>

              <h3 className="font-display text-display-md text-fg mt-5 text-balance">
                {featured.title}
              </h3>

              <p className="text-body-base text-fg-muted mt-4">
                {featured.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>

              <Link
                href={`/projects/${featured.slug}`}
                className={cn(
                  "text-body-sm mt-7 inline-flex items-center gap-2",
                  "text-accent font-medium",
                  "after:absolute after:inset-0 after:content-['']",
                  "transition-colors duration-(--duration-fast)",
                  "hover:text-accent-hover focus-visible:outline-2",
                  "focus-visible:outline-ring focus-visible:outline-offset-2",
                )}
              >
                {hasCaseStudy(featured.slug) ? "Read the case study" : "View project"}
                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform",
                    "duration-(--duration-fast) ease-(--ease-out-quart)",
                    "group-hover/card:translate-x-1",
                    "motion-reduce:translate-none",
                  )}
                />
              </Link>
            </div>
          </Card>
        ) : null}

        {featured ? null : (
          <Stagger
            stagger={0.06}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <Card interactive className="flex h-full flex-col">
                  {project.image ? (
                    <div
                      aria-hidden="true"
                      className="border-border relative aspect-square overflow-hidden border-b"
                    >
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        className={cn(
                          "object-cover transition-transform",
                          "duration-(--duration-base) ease-(--ease-out-expo)",
                          "group-hover/card:scale-105",
                          "motion-reduce:transition-none",
                          "motion-reduce:group-hover/card:scale-100",
                        )}
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="accent" className="self-start">
                      {project.category}
                    </Badge>

                    <h3 className="font-display text-heading-sm text-fg mt-3.5 text-balance">
                      {project.title}
                    </h3>

                    <p className="text-body-sm text-fg-muted mt-2.5 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    <Link
                      href={`/projects/${project.slug}`}
                      className={cn(
                        "text-body-sm mt-5 inline-flex items-center gap-2",
                        "text-accent font-medium",
                        "after:absolute after:inset-0 after:content-['']",
                        "transition-colors duration-(--duration-fast)",
                        "hover:text-accent-hover focus-visible:outline-2",
                        "focus-visible:outline-ring focus-visible:outline-offset-2",
                      )}
                    >
                      {hasCaseStudy(project.slug)
                        ? "Read the case study"
                        : "View project"}
                      <ArrowRight
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform",
                          "duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:translate-x-1",
                          "motion-reduce:translate-none",
                        )}
                      />
                    </Link>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </Section>
  );
}
