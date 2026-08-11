"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Leader } from "@/constants/company";
import { cn } from "@/lib/utils";

import { LeaderCard } from "./leader-card";

const control = cn(
  "grid size-11 place-items-center rounded-pill border border-border",
  "text-fg-muted transition-colors duration-(--duration-fast)",
  "hover:border-accent/50 hover:bg-accent-muted hover:text-accent",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:pointer-events-none disabled:opacity-40",
);

/**
 * Leadership carousel.
 *
 * A real carousel at every width, not a grid that becomes a rail on phones.
 *
 * That means controls: a swipe is discoverable on a touch screen, but on a
 * desktop a horizontally scrolling row with no buttons is something people
 * simply do not find. Arrows and dots are what make it a carousel there
 * rather than a row that happens to overflow.
 *
 * No autoplay. These are colleagues, not a pitch — nothing here needs to move
 * on its own, and motion that starts by itself would need a pause control to
 * satisfy WCAG 2.2.2 for no gain.
 *
 * `containScroll: "trimSnaps"` stops the last page scrolling past the final
 * card into empty space, which is what makes the end of the track feel
 * deliberate rather than broken.
 */
export function TeamCarousel({ leaders }: { leaders: readonly Leader[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnaps(emblaApi.scrollSnapList());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div
      className="mt-14"
      role="group"
      aria-roledescription="carousel"
      aria-label="Leadership team"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex touch-pan-y">
          {leaders.map((leader, index) => (
            <li
              key={leader.name}
              /*
               * One card on a phone, four on a wide screen. `flex-[0_0_%]`
               * rather than a width, because Embla measures slides from their
               * flex basis when working out where the snap points are.
               */
              className={cn(
                "min-w-0 flex-[0_0_82%] pl-4",
                "sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]",
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${leaders.length}`}
            >
              <LeaderCard leader={leader} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        {/* Dots double as a position readout and as direct navigation. One per
            page rather than per card, since several cards share a snap. */}
        <ul className="flex items-center gap-2">
          {snaps.map((_, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={selected === index}
                className={cn(
                  "h-1.5 rounded-pill transition-all duration-(--duration-fast)",
                  "focus-visible:outline-2 focus-visible:outline-offset-3",
                  "focus-visible:outline-ring",
                  selected === index
                    ? "w-8 bg-accent"
                    : "w-4 bg-border-strong hover:bg-fg-subtle",
                )}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className={control}
            aria-label="Previous team members"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className={control}
            aria-label="Next team members"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
