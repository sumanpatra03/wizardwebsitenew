"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

const controlClass = cn(
  "grid size-11 place-items-center rounded-pill border border-border",
  "text-fg-muted transition-colors duration-(--duration-fast)",
  "hover:border-accent/50 hover:bg-accent-muted hover:text-accent",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:pointer-events-none disabled:opacity-40",
);

/**
 * Project gallery as a filmstrip carousel.
 *
 * Replaces the masonry `<Gallery>` for project shots. Masonry is right for the
 * office photographs it was built for — a set of candid images in three
 * similar ratios — and wrong here, because these galleries hold whatever the
 * project happens to have: Drift's are 1080×2196 phone captures, and in a
 * third-width masonry column each one rendered around 750px tall, so three
 * screenshots filled the page.
 *
 * ## Why a fixed height rather than a fixed width
 *
 * Every slide is the same height and takes its width from its own ratio, so a
 * portrait capture becomes a narrow card and a 4:3 still becomes a wide one —
 * both at a size the section can carry, and neither cropped to a common box.
 * Sizing by width instead is what produced the original problem: the same
 * column width applied to a 1:2 image is twice the height of a 4:3 one.
 *
 * Captions sit under each frame rather than over it. Several of these are dark
 * UI screens with their own type, and an overlay caption lands on top of it.
 */
export function GalleryCarousel({
  photos,
  /** Names the carousel for assistive tech — the project it belongs to. */
  label,
  className,
}: {
  photos: NonNullable<Project["gallery"]>;
  label: string;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
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

  /*
   * Controls are hidden when the whole set already fits.
   *
   * Two of these galleries are three or four images wide, so on a desktop
   * there is nothing to scroll to — and arrows that cannot move, next to dots
   * that cannot change, read as broken rather than as complete.
   */
  const scrollable = snaps.length > 1;

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} gallery`}
    >
      {/* Bleeds to the viewport edges on a phone and puts the gutter back as
          track padding, so the first frame lines up with the copy above while
          the strip itself runs full width. */}
      <div className="-mx-gutter px-gutter overflow-hidden lg:mx-0 lg:px-0" ref={emblaRef}>
        <ul className="flex touch-pan-y items-start gap-5">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              /*
               * Width is stated, not inferred.
               *
               * Left to size itself the slide would take the width of its
               * widest child, and that is the caption, not the picture — so a
               * narrow phone capture would sit in a slide twice its width with
               * a gap beside it. Deriving the width from the shared frame
               * height and this image's own ratio keeps slide and frame
               * identical, and the caption then wraps to the picture.
               */
              className={cn(
                "flex-none [--frame-h:17rem] sm:[--frame-h:20rem]",
                "lg:[--frame-h:24rem]",
                // The `min()` is for a landscape still on a phone, which at
                // full height would be wider than the screen.
                "w-[min(78vw,calc(var(--frame-h)*var(--frame-ratio)))]",
              )}
              style={
                {
                  "--frame-ratio": `${photo.width / photo.height}`,
                } as React.CSSProperties
              }
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
            >
              <figure className="flex flex-col gap-3">
                <div
                  className={cn(
                    "relative h-[var(--frame-h)] w-full overflow-hidden",
                    "rounded-xl border border-border bg-bg-elevated shadow-card",
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    // Widest case is a 4:3 still at the `lg` frame height.
                    sizes="(min-width: 1024px) 512px, 78vw"
                    className="object-cover"
                  />
                </div>

                <figcaption className="text-body-sm text-fg-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {scrollable ? (
        <div className="mt-8 flex items-center justify-between gap-6">
          <ul className="flex items-center gap-2">
            {snaps.map((snap, index) => (
              <li key={snap}>
                <button
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to ${label} image ${index + 1}`}
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
              className={controlClass}
              aria-label={`Previous ${label} image`}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className={controlClass}
              aria-label={`Next ${label} image`}
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
