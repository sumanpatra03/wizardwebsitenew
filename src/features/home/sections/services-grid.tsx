import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SECTION_COPY } from "@/constants/home";
import { SERVICES } from "@/constants/services";
import { findPublicImage } from "@/lib/public-image";
import { cn } from "@/lib/utils";

import { ServiceArtwork } from "./service-artwork";

/** Shared by both media layers so the hover swap stays in step. */
const MEDIA_TRANSITION = [
  "col-start-1 row-start-1 self-stretch",
  "transition-[opacity,transform] duration-(--duration-base)",
  "ease-(--ease-out-expo)",
  "group-hover/card:-translate-y-2 group-hover/card:opacity-0",
  "group-focus-within/card:-translate-y-2 group-focus-within/card:opacity-0",
  "motion-reduce:transition-none motion-reduce:transform-none",
];

/**
 * Services grid.
 *
 * Website A's card pattern, rebuilt: tall portrait cards in a four-up grid,
 * each led by an eyebrow and a large title, with artwork filling the lower
 * half. On hover — or keyboard focus — the artwork gives way to the service's
 * description, its capability list and an expand affordance.
 *
 * The swap is CSS only (opacity plus a small translate on two stacked grid
 * layers), so it needs no JavaScript and no height measurement. Both layers
 * stay in the DOM at all times, which keeps the copy available to search
 * engines and screen readers whatever the pointer is doing.
 *
 * Server Component; only the stagger wrapper is client-side.
 */
export function ServicesGrid() {
  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          eyebrow={SECTION_COPY.services.eyebrow}
          title={SECTION_COPY.services.title}
        />

        <Stagger
          stagger={0.06}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service, index) => {
            const accented = index % 2 === 1;
            // Drop a file into `public/services/` named after the slug and it
            // replaces the generated artwork — see `public/services/README.md`.
            const image = findPublicImage("services", service.slug);

            return (
              <StaggerItem key={service.slug}>
                <article
                  className={cn(
                    "group/card relative isolate h-full overflow-hidden rounded-xl border",
                    "transition-[transform,box-shadow,border-color]",
                    "duration-(--duration-fast) ease-(--ease-out-quart)",
                    "hover:-translate-y-1 hover:shadow-card-hover",
                    "focus-within:-translate-y-1",
                    "motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0",
                    accented
                      ? "border-accent/25 bg-bg-elevated bg-mesh hover:border-accent/50"
                      : "border-border bg-surface hover:border-accent/40",
                  )}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "flex h-full min-h-[24rem] flex-col p-6 sm:min-h-[26rem] sm:p-7",
                      "focus-visible:outline-2 focus-visible:-outline-offset-2",
                      "focus-visible:outline-ring",
                    )}
                  >
                    <p
                      className={cn(
                        "text-label uppercase",
                        accented ? "text-accent" : "text-fg-subtle",
                      )}
                    >
                      {service.category}
                    </p>

                    <h3 className="font-display text-heading-md mt-4 text-balance text-fg">
                      {service.title}
                    </h3>

                    {/* Two stacked layers occupying the same grid cell: the
                        artwork, and the detail that replaces it on hover. */}
                    <span className="relative mt-6 grid flex-1 grid-cols-1 grid-rows-1">
                      {image ? (
                        <span
                          className={cn(
                            MEDIA_TRANSITION,
                            "relative block overflow-hidden rounded-lg",
                          )}
                        >
                          <Image
                            src={image}
                            // Decorative: the title above already names the
                            // service, so an alt would only repeat it.
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 88vw"
                            className="object-cover"
                          />
                          {/* Ties the photograph into the card's palette and
                              keeps the surrounding text dominant. */}
                          <span className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                        </span>
                      ) : (
                        <ServiceArtwork
                          icon={service.icon}
                          index={index}
                          className={cn(MEDIA_TRANSITION)}
                        />
                      )}

                      <span
                        className={cn(
                          "col-start-1 row-start-1 flex translate-y-2 flex-col",
                          "opacity-0 transition-[opacity,transform]",
                          "duration-(--duration-base) ease-(--ease-out-expo)",
                          "group-hover/card:translate-y-0 group-hover/card:opacity-100",
                          "group-focus-within/card:translate-y-0",
                          "group-focus-within/card:opacity-100",
                          "motion-reduce:transition-none motion-reduce:transform-none",
                        )}
                      >
                        <span className="text-body-sm text-fg-muted">
                          {service.description}.
                        </span>

                        <span className="mt-4 flex flex-col gap-1.5">
                          {service.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="text-body-sm flex items-start gap-2 text-fg-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-pill bg-accent"
                              />
                              {capability}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>

                    {/* Expand affordance, always visible so the card never
                        looks inert before the pointer arrives. */}
                    <span
                      className={cn(
                        "mt-6 flex items-center justify-between gap-3 border-t pt-4",
                        "text-body-sm font-medium",
                        "transition-colors duration-(--duration-fast)",
                        accented
                          ? "border-accent/20 text-accent"
                          : "border-border text-fg group-hover/card:text-accent",
                      )}
                    >
                      Expand
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform duration-(--duration-fast)",
                          "ease-(--ease-out-quart) group-hover/card:translate-x-1",
                          "motion-reduce:transform-none",
                        )}
                      />
                    </span>
                  </Link>
                </article>
              </StaggerItem>
            );
          })}

          {/* Eighth slot. Seven services would leave a hole in the four-up
              grid; this closes it and doubles as the route to the full list. */}
          <StaggerItem>
            <article
              className={cn(
                "group/card relative isolate h-full overflow-hidden rounded-xl",
                "border border-dashed border-border-strong bg-transparent",
                "transition-[transform,border-color] duration-(--duration-fast)",
                "ease-(--ease-out-quart) hover:-translate-y-1 hover:border-accent",
                "focus-within:-translate-y-1 focus-within:border-accent",
                "motion-reduce:hover:translate-y-0",
                "motion-reduce:focus-within:translate-y-0",
              )}
            >
              <Link
                href="/services"
                className={cn(
                  "flex h-full min-h-[24rem] flex-col justify-end p-6",
                  "sm:min-h-[26rem] sm:p-7",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2",
                  "focus-visible:outline-ring",
                )}
              >
                <span className="font-display text-heading-md text-balance text-fg">
                  Every capability, in one place.
                </span>
                <span className="text-body-sm mt-3 text-fg-muted">
                  See the full range of what we build and run.
                </span>
                <span
                  className={cn(
                    "text-body-sm mt-6 flex items-center justify-between gap-3",
                    "border-t border-border pt-4 font-medium text-accent",
                  )}
                >
                  All services
                  <ChevronRight
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform duration-(--duration-fast)",
                      "ease-(--ease-out-quart) group-hover/card:translate-x-1",
                      "motion-reduce:transform-none",
                    )}
                  />
                </span>
              </Link>
            </article>
          </StaggerItem>
        </Stagger>
      </Container>
    </Section>
  );
}
