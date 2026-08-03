import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  /** Omitted on the final crumb, which is the current page. */
  href?: string;
};

/**
 * Breadcrumb trail for inner pages.
 *
 * An ordered list inside a labelled `<nav>` — the trail is a sequence, and
 * `<ol>` is what conveys that. The final crumb is plain text carrying
 * `aria-current="page"` rather than a link to where the user already is.
 *
 * The separators are `aria-hidden`, so the trail is announced as its labels
 * and nothing else.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: readonly Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-body-sm text-fg-muted rounded-sm",
                    "transition-colors duration-(--duration-fast) hover:text-accent",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-ring",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-body-sm text-fg">
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-fg-subtle"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
