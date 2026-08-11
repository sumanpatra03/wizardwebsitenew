import { ArrowRight, Briefcase, Clock, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CAREER_PAGE, ROLES, applyHref } from "@/constants/career-page";
import { ApplyDialog } from "@/features/career/apply-dialog";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { findPublicImage } from "@/lib/public-image";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Career" },
] as const;

export const metadata = buildMetadata({
  title: "Career",
  description:
    "Eight open roles at Wizard Communications — full stack, .NET, QA, Scrum Master, data engineering and pricing. Kolkata and Noida, hybrid and remote.",
  path: "/career",
});

export default function CareerPage() {
  /*
   * The team photograph the home careers section already uses — a real
   * picture of the people you would be joining, which is the one image a
   * careers page should lead with. The live page runs a stock social-media
   * illustration here instead.
   */
  const heroImage = findPublicImage("careers", "team");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={CAREER_PAGE.eyebrow}
        titleLines={CAREER_PAGE.titleLines}
        lead={CAREER_PAGE.lead}
        aside={
          heroImage ? (
            <div className="relative">
              {/* Photograph, so it gets the framed treatment the service and
                  product heroes use — not the frameless one the transparent
                  illustrations get. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
                  "bg-accent/12 blur-3xl",
                )}
              />
              <div
                className={cn(
                  "relative aspect-[3/2] w-full overflow-hidden rounded-xl",
                  "border border-border shadow-card",
                )}
              >
                <Image
                  src={heroImage}
                  // Decorative: the <h1> beside it already frames the page.
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 92vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg/35 to-transparent"
                />
              </div>
            </div>
          ) : undefined
        }
      >
        <p className="text-body-base max-w-3xl text-fg-muted">
          {CAREER_PAGE.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="#open-positions">
              See open positions
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-(--duration-fast)",
                  "group-hover:translate-x-1 motion-reduce:translate-none",
                )}
              />
            </Link>
          </Button>
          <p className="text-body-sm text-fg-subtle">
            {ROLES.length} roles open
          </p>
        </div>
      </PageHero>

      {/*
       * Open positions.
       *
       * An accordion because each of these carries up to ten requirement
       * lines: laid out flat the page runs to eight screens of bullets, and
       * nobody reads eight job specs — they scan for the one they might be
       * right for. `type="single"` so the list stays scannable while one is
       * open.
       */}
      <Section
        id="open-positions"
        tone="subtle"
        backdrop
        className="scroll-mt-header border-y border-border"
      >
        <Container>
          <SectionHeading
            eyebrow={CAREER_PAGE.roles.eyebrow}
            title={CAREER_PAGE.roles.title}
            description={CAREER_PAGE.roles.description}
          />

          {/*
           * Deliberately not wrapped in `<Reveal>`.
           *
           * `Reveal` starts at `opacity: 0` and animates in once a quarter of
           * the element is on screen. A list this tall can never satisfy that
           * on a laptop, so the entrance never fired and the whole section sat
           * invisible. A list of roles does not need an entrance animation
           * badly enough to risk that.
           */}
          <div>
            <Accordion type="single" collapsible className="mt-14 w-full">
              {ROLES.map((role) => (
                <AccordionItem key={role.id} value={role.id}>
                  <AccordionTrigger className="py-6">
                    <span className="flex flex-col gap-1.5 text-left">
                      <span className="font-display text-heading-md text-fg">
                        {role.title}
                      </span>
                      <span className="text-body-sm font-normal text-fg-muted">
                        {role.summary}
                      </span>
                    </span>
                  </AccordionTrigger>

                  {/*
                   * `forceMount` so every job spec is in the served HTML,
                   * not only after someone expands it.
                   *
                   * Radix unmounts closed content by default, which on a
                   * careers page means the roles — the entire reason for the
                   * page — are invisible to a crawler and to anyone without
                   * JavaScript. Kept in the DOM and hidden with CSS instead;
                   * `hidden` is what keeps it out of the tab order and the
                   * accessibility tree while closed — Radix applies it for us
                   * once `forceMount` is set.
                   */}
                  <AccordionContent forceMount className="pb-8">
                    {/* The four things anyone checks before reading the rest,
                        pulled out of the requirement list. */}
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {role.experience ? (
                        <Meta icon={Briefcase} label={role.experience} />
                      ) : null}
                      {role.qualification ? (
                        <Meta icon={GraduationCap} label={role.qualification} />
                      ) : null}
                      {role.location ? (
                        <Meta icon={MapPin} label={role.location} />
                      ) : null}
                      {role.shift ? (
                        <Meta icon={Clock} label={role.shift} />
                      ) : null}
                    </ul>

                    <p className="text-label mt-7 uppercase text-fg-subtle">
                      Key skills
                    </p>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {role.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-body-sm flex items-start gap-3 text-fg-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-pill bg-accent"
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>

                    {/* Opens the application form, with the role carried
                        through so it never has to be restated. The mailto
                        beneath it is the route for anyone whose JavaScript
                        has not loaded, or who would simply rather email. */}
                    <ApplyDialog role={role.title} />

                    <p className="text-body-sm mt-4 text-fg-subtle">
                      Or{" "}
                      <a
                        href={applyHref(role.title)}
                        className={cn(
                          "text-accent transition-colors",
                          "duration-(--duration-fast) hover:underline",
                          "focus-visible:outline-2 focus-visible:outline-offset-2",
                          "focus-visible:outline-ring",
                        )}
                      >
                        email your CV
                      </a>{" "}
                      for this role.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* How to apply */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-label uppercase text-accent">
                {CAREER_PAGE.apply.eyebrow}
              </p>
              <h2 className="font-display text-display-md mt-5 text-balance text-fg">
                {CAREER_PAGE.apply.title}
              </h2>
              <p className="text-body-lg mt-6 text-fg-muted">
                {CAREER_PAGE.apply.body}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a href={`mailto:${CAREER_PAGE.apply.email}`}>
                    {CAREER_PAGE.apply.email}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/work-with-us">How we work</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-12 flex flex-wrap justify-center gap-2">
                {ROLES.map((role) => (
                  <li key={role.id}>
                    <Badge variant="outline">{role.title}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <TestimonialsCarousel
        eyebrow="Client Voices"
        title={TESTIMONIALS_HEADING}
      />
    </>
  );
}

function Meta({
  icon: Icon,
  label,
}: {
  icon: typeof Briefcase;
  label: string;
}) {
  return (
    <li className="text-body-sm flex items-start gap-2.5 text-fg-muted">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
      {label}
    </li>
  );
}
