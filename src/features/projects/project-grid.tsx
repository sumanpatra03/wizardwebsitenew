"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Images } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  projectLink,
} from "@/constants/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/** Search-param key holding the active category. */
const PARAM = "category";

/**
 * Filterable project grid.
 *
 * ## Why the URL is read after mount, not through `useSearchParams`
 *
 * `useSearchParams` opts the whole subtree out of static rendering: with it,
 * this page prerendered an empty Suspense fallback and all twenty-one cards —
 * every title, description and image — existed only after hydration. That is
 * a bad trade for a portfolio, which is exactly the page a crawler should see
 * in full.
 *
 * So the server renders the unfiltered grid, and the query string is applied
 * on mount. A filtered link still works and is still shareable; the only cost
 * is that arriving at one shows the full grid for a frame.
 *
 * `replaceState`, not `pushState`: filtering refines one view rather than
 * navigating, so it should not stack twenty entries in the history for
 * someone clicking along the row. The `popstate` listener keeps the grid in
 * step when a user does navigate back into a filtered URL.
 *
 * ## Why the layout animation is gated
 *
 * Re-laying out twenty-one cards is the most expensive motion on the site.
 * Under `prefers-reduced-motion` the cards appear in their new positions with
 * no travel at all, which is what the rest of this codebase does.
 */
export function ProjectGrid() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  // Sync from the URL on mount, and whenever the user navigates history.
  useEffect(() => {
    const read = () => {
      const value = new URLSearchParams(window.location.search).get(PARAM);
      // Ignore a category nothing uses, so a stale or hand-edited link falls
      // back to the full grid rather than an empty one.
      setActive(
        value && PROJECTS.some((project) => project.category === value)
          ? value
          : null,
      );
    };

    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const shown = useMemo(
    () =>
      active
        ? PROJECTS.filter((project) => project.category === active)
        : PROJECTS,
    [active],
  );

  const select = useCallback((category: string | null) => {
    setActive(category);

    const url = new URL(window.location.href);
    if (category) url.searchParams.set(PARAM, category);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <>
      {/* Filter bar. Buttons rather than links: this refines what is already
          on screen, it does not navigate somewhere new. `aria-pressed` is what
          tells a screen reader which one is on. */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterChip
              label="All work"
              count={PROJECTS.length}
              active={!active}
              onClick={() => select(null)}
            />
          </li>
          {PROJECT_CATEGORIES.map((category) => (
            <li key={category.name}>
              <FilterChip
                label={category.name}
                count={category.count}
                active={active === category.name}
                onClick={() => select(category.name)}
              />
            </li>
          ))}
        </ul>

        {/* Announced politely so a screen reader hears the new total after a
            filter without the focus being yanked out of the chip row. */}
        <p
          aria-live="polite"
          className="text-body-sm shrink-0 text-fg-subtle"
        >
          Showing {shown.length} of {PROJECTS.length} projects
        </p>
      </div>

      {/*
       * Five across once there is room for it.
       *
       * Narrower columns are the only way to shrink these cards without
       * cropping the artwork: the media slot is a ratio, so its height falls
       * with the column width. A shorter aspect would instead cut into
       * posters that carry the client's mark at the top and a headline at the
       * bottom.
       */}
      <motion.ul
        layout={!prefersReducedMotion}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => {
            const link = projectLink(project);

            return (
              <motion.li
                key={project.slug}
                layout={!prefersReducedMotion}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card
                  interactive={Boolean(link)}
                  className="flex h-full flex-col"
                >
                  <div
                    aria-hidden="true"
                    className="relative aspect-[9/10] overflow-hidden border-b border-border"
                  >
                    <Image
                      src={project.image ?? ""}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      className={cn(
                        "object-cover transition-transform",
                        "duration-(--duration-base) ease-(--ease-out-expo)",
                        "group-hover/card:scale-105",
                        "motion-reduce:transition-none",
                        "motion-reduce:group-hover/card:scale-100",
                      )}
                    />
                    <span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-surface" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <Badge variant="accent" className="self-start">
                      {project.category}
                    </Badge>

                    <h2 className="font-display text-heading-sm mt-3.5 text-balance text-fg">
                      {project.title}
                    </h2>

                    {/* Clamped so titles and tag rows stay level across a row.
                        These descriptions run from one line to four, which at
                        four-up left every card in the row misaligned. */}
                    <p className="text-body-sm mt-2.5 line-clamp-2 flex-1 text-fg-muted">
                      {project.description}
                    </p>

                    {/* Two tags, not all of them. A third almost always wraps
                        to a second row at this width, which costs more height
                        than the tag is worth. */}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <li key={tag}>
                          <Badge variant="outline">{tag}</Badge>
                        </li>
                      ))}
                    </ul>

                    {link ? (
                      <div className="mt-4 border-t border-border pt-4">
                        <a
                          href={link.href}
                          {...(link.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className={cn(
                            "text-body-sm inline-flex items-center gap-2",
                            "font-medium text-accent",
                            "after:absolute after:inset-0 after:content-['']",
                            "transition-colors duration-(--duration-fast)",
                            "hover:text-accent-hover focus-visible:outline-2",
                            "focus-visible:outline-offset-2 focus-visible:outline-ring",
                          )}
                        >
                          {link.label}
                          {link.external ? (
                            <ArrowUpRight
                              aria-hidden="true"
                              className={cn(
                                "size-4 transition-transform",
                                "duration-(--duration-fast) ease-(--ease-out-quart)",
                                "group-hover/card:-translate-y-0.5",
                                "group-hover/card:translate-x-0.5",
                                "motion-reduce:translate-none",
                              )}
                            />
                          ) : (
                            <Images aria-hidden="true" className="size-4" />
                          )}
                          <span className="sr-only">
                            {` — ${project.title}${
                              link.external ? " (opens in a new tab)" : ""
                            }`}
                          </span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 ? (
        <p className="text-body-base mt-12 text-fg-muted">
          No projects in that category yet.
        </p>
      ) : null}
    </>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "text-body-sm flex items-center gap-2 rounded-pill border px-4 py-2",
        "transition-[color,background-color,border-color,transform]",
        "duration-(--duration-fast) ease-(--ease-out-quart)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-ring",
        active
          ? "border-accent bg-accent-muted font-medium text-accent"
          : "border-border bg-surface text-fg-muted hover:border-accent/45 hover:text-fg",
      )}
    >
      {label}
      <span
        className={cn(
          "text-label tabular-nums",
          active ? "text-accent/70" : "text-fg-subtle",
        )}
      >
        {count}
      </span>
    </button>
  );
}
