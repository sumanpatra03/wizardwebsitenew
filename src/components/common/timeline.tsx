import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/constants/company";

/**
 * Vertical company timeline.
 *
 * The rail is a single `::before` line on the list with a node per item,
 * rather than a border on every row — that way the line runs continuously
 * behind the nodes instead of restarting at each entry.
 *
 * Semantically an ordered list: these are dated eras in sequence, and the
 * order carries meaning.
 */
export function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
  return (
    <Stagger
      as="ol"
      stagger={0.08}
      className={cn(
        "relative mt-14 flex flex-col gap-10",
        // The rail. Sits under the nodes, inset to their centre.
        "before:absolute before:top-2 before:bottom-2 before:left-[7px]",
        "before:w-px before:bg-border before:content-['']",
        "sm:before:left-[9px]",
      )}
    >
      {entries.map((entry) => (
        <StaggerItem
          key={entry.period}
          as="li"
          direction="left"
          className="relative pl-9 sm:pl-12"
        >
          {/* Node */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 left-0 grid size-[15px] place-items-center",
              "rounded-pill border-2 border-accent bg-bg sm:size-[19px]",
            )}
          >
            <span className="size-1 rounded-pill bg-accent sm:size-1.5" />
          </span>

          <p className="text-label uppercase text-accent">{entry.period}</p>

          <h3 className="font-display text-heading-md mt-2 text-balance text-fg">
            {entry.title}
          </h3>

          <div className="mt-3 flex max-w-2xl flex-col gap-3">
            {entry.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-body-base text-fg-muted">
                {paragraph}
              </p>
            ))}
          </div>

          {entry.highlights ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>
                  <Badge variant="outline">{highlight}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
