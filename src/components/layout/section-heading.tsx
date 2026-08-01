import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level. Defaults to h2 — h1 is reserved for the hero. */
  as?: "h2" | "h3";
  align?: "left" | "center";
  /** Slot for a trailing CTA on the same row (desktop only). */
  action?: ReactNode;
  className?: string;
};

/**
 * Standard section header: eyebrow, title, optional description and action.
 *
 * Keeping this in one component is what guarantees a consistent heading
 * hierarchy and identical spacing between every section on the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "left" &&
          action &&
          "md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <p className="text-label mb-4 uppercase text-accent">{eyebrow}</p>
        ) : null}

        <Tag className="text-display-lg text-fg">{title}</Tag>

        {description ? (
          <p className="text-body-lg mt-5 text-fg-muted">{description}</p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
