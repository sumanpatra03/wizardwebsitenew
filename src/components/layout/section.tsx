import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Vertical rhythm. `sm` is for tight bands like the marquee. */
  spacing?: "none" | "sm" | "base";
  /** Background treatment. */
  tone?: "default" | "subtle" | "elevated";
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
    />
  );
}
