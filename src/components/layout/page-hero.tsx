import type { ReactNode } from "react";

import { Breadcrumb, type Crumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/layout/container";
import { GridBeams } from "@/components/motion/grid-beams";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  crumbs: readonly Crumb[];
  eyebrow: string;
  /** Split across lines; each becomes one masked line of the reveal. */
  titleLines: readonly string[];
  lead?: string;
  children?: ReactNode;
  /**
   * Content for a second column beside the heading, from `lg` up — artwork,
   * usually. Below `lg` it drops beneath the copy, since there is no room to
   * put anything alongside it.
   */
  aside?: ReactNode;
  className?: string;
};

/**
 * Opening block for inner pages.
 *
 * Deliberately shorter than the home hero — an inner page's job is to get to
 * its content, not to fill a viewport. It carries the page's single `<h1>`,
 * so no section beneath it should use one.
 *
 * `bg-bg` is load-bearing here for the same reason it is on the home hero: it
 * hides the fixed `PageBackdrop` so this block shows only its own grid rather
 * than two stacked on top of each other.
 */
export function PageHero({
  crumbs,
  eyebrow,
  titleLines,
  lead,
  children,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section
      data-themed=""
      className={cn(
        "relative isolate overflow-hidden bg-bg pt-header",
        "pb-section-sm",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-mesh pointer-events-none absolute inset-0 opacity-70"
      />

      {/* Grid and beams share one masked, clipped layer — the same treatment
          the home hero uses. This section sets `bg-bg` to hide the fixed
          PageBackdrop (otherwise two grids stack), which also hid its beams,
          so it has to carry its own. */}
      <div
        aria-hidden="true"
        className="mask-fade-y pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-grid absolute inset-0" />
        <GridBeams />
      </div>

      {/* `content`, not `wide`: every section beneath an inner page uses the
          content container, and a wider hero left the breadcrumb and heading
          hanging 80px to the left of everything below them. */}
      <Container className="relative pt-12 sm:pt-16">
        {/* The breadcrumb stays full width whatever the layout below it —
            indenting it into a column would break the left alignment it
            shares with every section further down the page. */}
        <Reveal direction="none">
          <Breadcrumb items={crumbs} />
        </Reveal>

        <div
          className={cn(
            // Artwork takes the larger share. `minmax(0,…)` on both tracks,
            // not a bare fraction: a grid column's default `auto` minimum
            // refuses to shrink below its content, which lets a long
            // unbroken word in the heading push the whole row wider than the
            // container.
            //
            // Top-aligned, not centred: centring floated the artwork against
            // a much taller column of copy, so it lined up with nothing. Its
            // top edge now sits on the same line the eyebrow starts on.
            aside &&
              "grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14",
          )}
        >
          <div>
            <Reveal delay={0.08}>
              <p className="text-label mt-8 uppercase text-accent">{eyebrow}</p>
            </Reveal>

            <MaskReveal
              as="h1"
              lines={titleLines}
              delay={0.16}
              className={cn(
                "mt-5 max-w-5xl text-fg",
                // One step down beside artwork. `display-xl` caps at 80px,
                // which is sized for the full container width — in half of it
                // a two-line title breaks to four and towers over everything
                // it is meant to sit level with.
                aside ? "text-display-lg" : "text-display-xl",
              )}
            />

            {lead ? (
              <Reveal delay={0.34}>
                <p className="text-body-lg mt-7 max-w-2xl text-fg-muted">
                  {lead}
                </p>
              </Reveal>
            ) : null}

            {children ? (
              <Reveal delay={0.42}>
                <div className="mt-10">{children}</div>
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            // `lg:mt-8` is the eyebrow's own top margin, repeated here so the
            // two columns share a top edge rather than one starting eight
            // units above the other.
            <Reveal delay={0.3} direction="right" className="lg:mt-8">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
