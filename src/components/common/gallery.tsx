import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/constants/company";

/**
 * Office photo gallery.
 *
 * Two layouts, one set of markup.
 *
 * ## Masonry, from `sm` up
 *
 * These are candid photographs in three different ratios — one portrait, one
 * widescreen, the rest 4:3 — and a grid of equal tiles would have to crop
 * every one of them to a common box, which on group photos means cutting
 * people out of the edges. CSS multi-column lays each out at its own ratio
 * instead, costs no JavaScript, and needs no measuring pass.
 *
 * `break-inside-avoid` is what keeps a figure from being split across a
 * column boundary — without it the column algorithm will happily leave half a
 * photograph at the foot of one column and the caption at the head of the
 * next.
 *
 * ## Swipeable rail, below `sm`
 *
 * A single stacked column of eight photographs is a long scroll on a phone
 * for what is a secondary section, so there the same figures become a
 * snapping horizontal rail — the pattern the featured-projects rail already
 * uses on this site. Cards are `78vw`, so the next one is always part-visible
 * and the rail reads as swipeable without needing arrows or dots.
 *
 * Here the photographs *are* cropped to a common 4:3, because a rail of
 * ragged heights looks like a mistake in a way a masonry column does not.
 *
 * The switch is pure CSS — one DOM, no breakpoint hook, no duplicate markup —
 * so nothing is downloaded twice and the server render is correct at any
 * width.
 */
export function Gallery({
  photos,
  className,
}: {
  photos: readonly GalleryPhoto[];
  className?: string;
}) {
  return (
    <Stagger
      stagger={0.06}
      className={cn(
        // Rail. Bleeds to the viewport edges and puts the gutter back as
        // padding, so the first and last photo sit flush with the copy above
        // while the rail itself runs the full width.
        "no-scrollbar -mx-gutter px-gutter flex snap-x snap-mandatory gap-4",
        "overflow-x-auto pb-2",
        // Masonry. Every rail property has to be unwound explicitly:
        // `columns` on a flex container does nothing.
        "sm:mx-0 sm:block sm:columns-2 sm:overflow-visible sm:px-0 sm:pb-0",
        "lg:columns-3 sm:[&>*]:mb-4",
        className,
      )}
    >
      {photos.map((photo) => (
        <StaggerItem
          key={photo.src}
          className={cn(
            "w-[78vw] max-w-sm shrink-0 snap-center",
            "sm:w-auto sm:max-w-none sm:shrink sm:snap-align-none",
            "sm:break-inside-avoid",
          )}
        >
          <figure
            className={cn(
              "group/photo relative overflow-hidden rounded-xl",
              "border border-border bg-bg-elevated",
              // Cropped on the rail, natural in the masonry.
              "aspect-[4/3] sm:aspect-auto",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
              className={cn(
                "h-full w-full object-cover sm:h-auto",
                "transition-transform duration-(--duration-base)",
                "ease-(--ease-out-expo) group-hover/photo:scale-105",
                "motion-reduce:transition-none motion-reduce:group-hover/photo:scale-100",
              )}
            />

            <figcaption
              className={cn(
                "absolute inset-x-0 bottom-0 p-4",
                "bg-gradient-to-t from-ink-950/85 via-ink-950/50 to-transparent",
                "text-body-sm text-white",
                "transition-opacity duration-(--duration-fast)",
                // Always shown where there is no hover to reveal them.
                "lg:opacity-0 lg:group-hover/photo:opacity-100",
                "motion-reduce:transition-none",
              )}
            >
              {photo.caption}
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
