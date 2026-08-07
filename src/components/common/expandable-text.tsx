"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExpandableTextProps = {
  text: string;
  /** Lines shown before the control appears. */
  lines?: number;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
};

/**
 * A paragraph clamped to a few lines, with a control that reveals the rest.
 *
 * The control only appears when the copy actually overflows. That is measured
 * rather than assumed: this component is fed from the content constants, and a
 * "Read more" sitting under three lines of text that are already fully visible
 * is worse than no control at all.
 *
 * Measurement compares the paragraph's scroll height against its clamped
 * height, re-running on resize because the same string wraps to four lines on
 * a desktop column and nine on a phone. Once expanded the two heights are
 * equal by definition, so the result is frozen while open — otherwise the
 * control would remove itself the moment it was used.
 *
 * The clamp is an inline style rather than a `line-clamp-*` utility because
 * `lines` is a prop; Tailwind can only generate classes it can see as complete
 * strings at build time.
 */
export function ExpandableText({
  text,
  lines = 4,
  moreLabel = "Read more",
  lessLabel = "Read less",
  className,
}: ExpandableTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      // While open, clientHeight has grown to meet scrollHeight and the
      // comparison would always read false — so keep the last known answer.
      if (expanded) return;
      setOverflows(el.scrollHeight > el.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, text, lines]);

  const clamp: CSSProperties | undefined = expanded
    ? undefined
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        overflow: "hidden",
      };

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <p id={id} ref={ref} style={clamp} className="text-body-lg text-fg-muted">
        {text}
      </p>

      {/*
       * Rendered only once the paragraph is known to overflow. Before the
       * first measurement that is false, so nothing flashes in and out on a
       * viewport wide enough to fit the copy.
       */}
      {overflows ? (
        <Button
          type="button"
          variant="link"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-4 gap-1.5 font-medium"
        >
          {expanded ? lessLabel : moreLabel}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-(--duration-fast)",
              "ease-(--ease-out-quart)",
              expanded && "rotate-180",
              "motion-reduce:transition-none",
            )}
          />
        </Button>
      ) : null}
    </div>
  );
}
