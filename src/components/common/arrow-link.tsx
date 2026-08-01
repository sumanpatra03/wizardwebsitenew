import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Stretch a transparent hit area over the nearest positioned ancestor. */
  stretched?: boolean;
};

/**
 * Text link with a diagonal arrow that slides on hover — Website A's "Expand"
 * affordance, rebuilt.
 *
 * `stretched` turns the whole enclosing card into the click target while
 * keeping a single, correctly-labelled link in the tab order (the pattern
 * Bootstrap calls a stretched link).
 */
export function ArrowLink({
  href,
  children,
  className,
  stretched = false,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-body-sm font-medium",
        "text-fg transition-colors duration-(--duration-fast) hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        stretched && "after:absolute after:inset-0 after:content-['']",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "size-4 transition-transform duration-(--duration-fast) ease-(--ease-out-quart)",
          "group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5",
          "group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5",
          "motion-reduce:transform-none",
        )}
      />
    </Link>
  );
}
