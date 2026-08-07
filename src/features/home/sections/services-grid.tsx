import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SECTION_COPY } from "@/constants/home";
import { serviceHref } from "@/constants/service-pages";
import { SERVICES } from "@/constants/services";
import { findPublicImage } from "@/lib/public-image";
import { cn } from "@/lib/utils";

import { ServiceArtwork } from "./service-artwork";
import { ServiceFlipCard } from "./service-flip-card";

/**
 * Card height.
 *
 * A flip needs a definite box: both faces are absolutely positioned and must
 * occupy exactly the same space, so the card cannot size itself from the
 * taller of the two. This value fits the longest back face — a four-line
 * description plus four capabilities plus the expand row.
 */
const CARD_HEIGHT = "h-[25rem] sm:h-[27rem]";

/** Shared by both faces, so front and back sit exactly on top of each other. */
const FACE = [
  "absolute inset-0 flex flex-col overflow-hidden rounded-xl border",
  "p-6 backface-hidden sm:p-7",
];

/**
 * One slide of the mobile rail, and one cell of the grid from `sm` up.
 *
 * Below `sm` the eight cards are a snapping swipe rail rather than a single
 * stacked column: eight tall cards end to end is a long scroll past the same
 * shape eight times. At `82vw` the next card stays part-visible, so the rail
 * reads as swipeable without arrows or dots.
 */
const RAIL_ITEM = [
  "w-[82vw] max-w-sm shrink-0 snap-center",
  "sm:w-auto sm:max-w-none sm:shrink sm:snap-align-none",
];

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
          className={cn(
            // Rail below `sm`. Bleeds to the viewport edges and puts the
            // gutter back as padding, so the first card sits flush with the
            // heading above while the rail itself runs the full width.
            "no-scrollbar -mx-gutter px-gutter mt-14 flex snap-x snap-mandatory",
            "gap-4 overflow-x-auto pb-2",
            // Grid from `sm` up. Every rail property has to be unwound
            // explicitly: `grid-cols` on a flex container does nothing.
            "sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0",
            "lg:grid-cols-4",
          )}
        >
          {SERVICES.map((service, index) => {
            const accented = index % 2 === 1;
            // Drop a file into `public/services/` named after the slug and it
            // replaces the generated artwork — see `public/services/README.md`.
            const image = findPublicImage("services", service.slug);

            const faceTone = accented
              ? "border-accent/25 bg-bg-elevated bg-mesh"
              : "border-border bg-surface";

            return (
              <StaggerItem key={service.slug} className={cn(RAIL_ITEM)}>
                {/*
                 * The flip.
                 *
                 * The shell is a Client Component because the turn has to be
                 * triggerable on touch, where there is no hover. Both faces
                 * below are still rendered here on the server and passed
                 * through as children, so nothing has to serialise.
                 */}
                <ServiceFlipCard
                  title={service.title}
                  titleId={`${service.slug}-title`}
                  height={CARD_HEIGHT}
                >
                  {/*
                   * The two faces. Neither is a link: only the Explore control
                   * on the back navigates, so the card itself is inert to
                   * clicks.
                   *
                   * Keyboard still reaches the back: tabbing to that link puts
                   * focus inside the card, `focus-within` turns it, and the
                   * link it landed on is the thing now facing the user.
                   */}
                  <>
                    {/* Front — category, title, artwork. */}
                    <div className={cn(FACE, faceTone)}>
                      <p
                        className={cn(
                          "text-label uppercase",
                          accented ? "text-accent" : "text-fg-subtle",
                        )}
                      >
                        {service.category}
                      </p>

                      <h3
                        id={`${service.slug}-title`}
                        className="font-display text-heading-md mt-4 text-balance text-fg"
                      >
                        {service.title}
                      </h3>

                      <div className="relative mt-6 flex-1 overflow-hidden rounded-lg">
                        {image ? (
                          <>
                            <Image
                              src={image}
                              // Decorative: the title above already names the
                              // service, so an alt would only repeat it.
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 88vw"
                              className="object-cover"
                            />
                            {/* Ties the photograph into the card's palette. */}
                            <span className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                          </>
                        ) : (
                          <ServiceArtwork
                            icon={service.icon}
                            index={index}
                            className="absolute inset-0"
                          />
                        )}
                      </div>
                    </div>

                    {/*
                     * Back — pre-rotated a half turn so it reads correctly
                     * once the card has turned. `backface-hidden` on both
                     * faces is what stops each showing through the other.
                     *
                     * The category and title repeat the front purely for
                     * layout, so they are hidden from assistive tech — the
                     * <h3> on the front already names this card.
                     */}
                    <div className={cn(FACE, faceTone, "rotate-y-180")}>
                      <p
                        aria-hidden="true"
                        className={cn(
                          "text-label uppercase",
                          accented ? "text-accent" : "text-fg-subtle",
                        )}
                      >
                        {service.category}
                      </p>

                      <p
                        aria-hidden="true"
                        className="font-display text-heading-md mt-4 text-balance text-fg"
                      >
                        {service.title}
                      </p>

                      <p className="text-body-sm mt-4 text-fg-muted">
                        {service.description}.
                      </p>

                      <ul className="mt-4 flex flex-1 flex-col gap-1.5">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="text-body-sm flex items-start gap-2 text-fg-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 rounded-pill bg-accent"
                            />
                            {capability}
                          </li>
                        ))}
                      </ul>

                      {/*
                       * The only navigable thing in the card. Its label
                       * carries the service name, because "Explore" alone
                       * tells a screen-reader user nothing about where seven
                       * near-identical links each lead.
                       */}
                      <Link
                        href={serviceHref(service.slug)}
                        aria-label={`Explore ${service.title}`}
                        className={cn(
                          "text-body-sm mt-5 flex items-center justify-between",
                          "gap-3 border-t pt-4 font-medium text-accent",
                          "transition-colors duration-(--duration-fast)",
                          "hover:text-accent-hover",
                          "focus-visible:outline-2 focus-visible:outline-offset-2",
                          "focus-visible:outline-ring",
                          accented ? "border-accent/20" : "border-border",
                        )}
                      >
                        Explore
                        <ChevronRight
                          aria-hidden="true"
                          className={cn(
                            "size-4 transition-transform duration-(--duration-fast)",
                            "ease-(--ease-out-quart) group-hover/card:translate-x-1",
                            "motion-reduce:translate-none",
                          )}
                        />
                      </Link>
                    </div>
                  </>
                </ServiceFlipCard>
              </StaggerItem>
            );
          })}

          {/* Eighth slot. Seven services would leave a hole in the four-up
              grid; this closes it and doubles as the route to the full list.
              It does not flip — there is no second side to show, so it carries
              no tap control either. */}
          <StaggerItem className={cn(RAIL_ITEM)}>
            <article
              className={cn(
                "group/card relative overflow-hidden rounded-xl",
                CARD_HEIGHT,
                "border border-dashed border-border-strong bg-transparent",
                "transition-[transform,border-color] duration-(--duration-fast)",
                "ease-(--ease-out-quart) hover:-translate-y-1 hover:border-accent",
                "focus-within:-translate-y-1 focus-within:border-accent",
                "motion-reduce:translate-none motion-reduce:transition-none",
              )}
            >
              {/* Card body is inert, matching the seven above it — only the
                  link at the bottom navigates. */}
              <div className="flex size-full flex-col justify-end p-6 sm:p-7">
                <h3 className="font-display text-heading-md text-balance text-fg">
                  Every capability, in one place.
                </h3>
                <p className="text-body-sm mt-3 text-fg-muted">
                  See the full range of what we build and run.
                </p>
                <Link
                  href="/services"
                  className={cn(
                    "text-body-sm mt-6 flex items-center justify-between gap-3",
                    "border-t border-border pt-4 font-medium text-accent",
                    "transition-colors duration-(--duration-fast)",
                    "hover:text-accent-hover",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-ring",
                  )}
                >
                  All services
                  <ChevronRight
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform duration-(--duration-fast)",
                      "ease-(--ease-out-quart) group-hover/card:translate-x-1",
                      "motion-reduce:translate-none",
                    )}
                  />
                </Link>
              </div>
            </article>
          </StaggerItem>
        </Stagger>
      </Container>
    </Section>
  );
}
