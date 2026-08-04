"use client";

import { useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/constants/company";

/** How many entries start expanded. */
const INITIALLY_OPEN = 3;

/**
 * Where the fill line tracks, as a fraction of viewport height. The rail fills
 * to wherever this line has reached inside the list, and whichever row it is
 * currently over is the "active" one.
 */
const TRACK_POINT = 0.55;

/** How hard the fill chases the scroll position. Lower is heavier. */
const SMOOTHING = 0.18;

/**
 * Company timeline.
 *
 * Each era is an accordion row: the period and title are always visible, the
 * detail expands. The first three open on load so the section reads as
 * content rather than a closed filing cabinet.
 *
 * Beside it, a sticky panel shows whichever era the scroll position is
 * currently over — which is both the animation filling what was a large empty
 * right-hand column, and a position readout for a list this long.
 *
 * ## Measurement
 *
 * Progress is read from `getBoundingClientRect()` each frame rather than from
 * a cached offset: opening or closing a row changes the list's height, so
 * anything measured once would immediately be wrong.
 *
 * The rail's height is written straight to the DOM through a ref. Putting it
 * in React state would re-render this whole subtree sixty times a second for
 * a value nothing else reads. Only the active *index* is state, and that
 * changes a handful of times per scroll.
 *
 * The loop is gated by an IntersectionObserver, so it costs nothing while the
 * section is off screen.
 */
export function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    const fillEl = fillRef.current;
    if (!list || !fillEl) return;

    // A scroll-position indicator is not decorative motion, but there is no
    // reason to burn frames on it either — show it complete and stop.
    if (prefersReducedMotion) {
      fillEl.style.height = "100%";
      return;
    }

    let smoothed = 0;
    let frame = 0;
    let running = false;
    let lastActive = -1;

    const measure = () => {
      const rect = list.getBoundingClientRect();
      if (rect.height <= 0) return 0;
      const point = window.innerHeight * TRACK_POINT;
      return Math.min(1, Math.max(0, (point - rect.top) / rect.height));
    };

    /** Whichever row the tracking line currently sits over. */
    const activeIndex = () => {
      const point = window.innerHeight * TRACK_POINT;
      const rows = list.querySelectorAll<HTMLElement>("[data-timeline-row]");
      let index = 0;
      rows.forEach((row, i) => {
        if (row.getBoundingClientRect().top <= point) index = i;
      });
      return index;
    };

    const tick = () => {
      const target = measure();
      smoothed += (target - smoothed) * SMOOTHING;
      if (Math.abs(target - smoothed) < 0.001) smoothed = target;
      fillEl.style.height = `${smoothed * 100}%`;

      const next = activeIndex();
      if (next !== lastActive) {
        lastActive = next;
        setActive(next);
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      smoothed = measure();
      fillEl.style.height = `${smoothed * 100}%`;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" },
    );
    observer.observe(list);

    return () => {
      stop();
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const initiallyOpen = entries
    .slice(0, INITIALLY_OPEN)
    .map((entry) => entry.period);

  const current = entries[active] ?? entries[0];
  const total = String(entries.length).padStart(2, "0");

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div ref={listRef} className="relative lg:col-span-7">
        {/* Rail track, with the fill as its child so the percentage is of the
            track rather than of the whole section. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-3 bottom-3 left-[7px] w-px overflow-hidden bg-border",
            "sm:left-[9px]",
          )}
        >
          <span ref={fillRef} className="block w-full bg-accent" />
        </span>

        <Accordion type="multiple" defaultValue={initiallyOpen} className="w-full">
          {entries.map((entry) => (
            <AccordionItem
              key={entry.period}
              value={entry.period}
              data-timeline-row=""
              className="group/row relative border-b-0 pl-9 sm:pl-12"
            >
              {/* Node. Fills in once its row is open. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-6 left-0 grid size-[15px] place-items-center sm:size-[19px]",
                  "rounded-pill border-2 bg-bg transition-colors",
                  "duration-(--duration-fast)",
                  "border-border-strong group-data-[state=open]/row:border-accent",
                )}
              >
                <span
                  className={cn(
                    "size-1 rounded-pill transition-colors sm:size-1.5",
                    "duration-(--duration-fast) bg-transparent",
                    "group-data-[state=open]/row:bg-accent",
                  )}
                />
              </span>

              <AccordionTrigger className="py-6 hover:no-underline">
                {/* Spans, not headings: Radix already wraps this trigger in a
                    heading element, so nesting another would double it up. */}
                <span className="flex flex-col gap-2 text-left">
                  {/* `font-sans` because the trigger sets `font-display`,
                      which would otherwise put this eyebrow in Archivo while
                      every other eyebrow on the site is Inter. */}
                  <span className="text-label font-sans uppercase text-accent">
                    {entry.period}
                  </span>
                  <span className="font-display text-heading-md text-balance text-fg">
                    {entry.title}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-8">
                <div className="flex flex-col gap-3">
                  {entry.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-body-base text-fg-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Two per row at most. Left to wrap freely these ran the
                    full width of the column in a single ragged line. */}
                {entry.highlights ? (
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="min-w-0">
                        <Badge
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          {highlight}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/*
       * Sticky era panel.
       *
       * Fills the right-hand column, which was empty, and doubles as a
       * position readout. Hidden below `lg`, where there is no spare column
       * and the rail alone carries the sense of progress.
       */}
      <aside
        aria-hidden="true"
        className="hidden lg:col-span-5 lg:block"
      >
        <div className="sticky top-[calc(var(--spacing-header)+4rem)]">
          <p className="text-label uppercase text-fg-subtle">
            {String(active + 1).padStart(2, "0")}
            <span className="text-fg-subtle/60"> / {total}</span>
          </p>

          {/* Re-keyed on the active era so the entrance animation replays. */}
          <p
            key={`period-${current?.period}`}
            className="animate-rise-in font-display text-display-lg mt-6 text-accent motion-reduce:animate-none"
          >
            {current?.period}
          </p>

          <p
            key={`title-${current?.period}`}
            className="animate-rise-in text-body-lg mt-4 max-w-xs text-balance text-fg-muted [animation-delay:80ms] motion-reduce:animate-none"
          >
            {current?.title}
          </p>

          {/* Era ticks — a compact map of the whole list. */}
          <ul className="mt-10 flex flex-col gap-2">
            {entries.map((entry, index) => (
              <li key={entry.period} className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-px transition-all duration-(--duration-base)",
                    "ease-(--ease-out-expo)",
                    index <= active ? "w-10 bg-accent" : "w-5 bg-border-strong",
                    "motion-reduce:transition-none",
                  )}
                />
                <span
                  className={cn(
                    "text-body-sm transition-colors duration-(--duration-base)",
                    index === active ? "text-fg" : "text-fg-subtle",
                  )}
                >
                  {entry.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
