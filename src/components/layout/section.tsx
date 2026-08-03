import type { ComponentPropsWithoutRef } from "react";

import { GridBeams } from "@/components/motion/grid-beams";
import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Vertical rhythm. `sm` is for tight bands like the marquee. */
  spacing?: "none" | "sm" | "base";
  /** Background treatment. */
  tone?: "default" | "subtle" | "elevated";
  /**
   * Draw a blueprint grid with travelling beams behind this section.
   *
   * Only needed on sections that paint their own background: those are opaque,
   * so the fixed `PageBackdrop` cannot show through them and they would
   * otherwise sit flat between two lit ones. A `tone="default"` section needs
   * nothing — the page backdrop already reaches it.
   */
  backdrop?: boolean;
};

/**
 * Vertical rhythm wrapper.
 *
 * All section padding flows from the `--spacing-section` token, so the page's
 * whole vertical scale can be retuned in one place. `isolate` gives each
 * section its own stacking context, keeping decorative layers from bleeding
 * across section boundaries.
 */
export function Section({
  className,
  spacing = "base",
  tone = "default",
  backdrop = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-themed=""
      className={cn(
        "relative isolate w-full",
        spacing === "base" && "py-section",
        spacing === "sm" && "py-section-sm",
        tone === "subtle" && "bg-bg-subtle",
        tone === "elevated" && "bg-bg-elevated",
        className,
      )}
      {...props}
    >
      {backdrop ? (
        // One masked, clipped layer so the grid and the beams fade out
        // together at the section edges.
        //
        // `-z-10` is required, not cosmetic: an absolutely-positioned sibling
        // paints above in-flow content, so without it this layer would cover
        // the section's own children. `isolate` on the section keeps that
        // negative index from escaping.
        <div
          aria-hidden="true"
          className="mask-fade-y pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="bg-grid absolute inset-0 opacity-60" />
          <GridBeams variant="ambient" />
        </div>
      ) : null}

      {children}
    </section>
  );
}
