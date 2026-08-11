import Image from "next/image";

import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * App screenshots as a compact horizontal rail.
 *
 * Not the masonry `<Gallery>`, which is right for the office photographs it
 * was built for and wrong for these. Phone captures are around 1:2, so in a
 * third-width masonry column each one renders close to 800px tall and four of
 * them turn into several screens of scrolling.
 *
 * At a fixed 13rem the whole set fits across a desktop container, so nothing
 * is hidden and no arrows are needed; below that the row snaps and swipes.
 * That is the reason there are no controls — not an omission.
 *
 * Captions sit under each screen rather than over it: these are dark UI
 * gradients with their own type, and an overlay would land on top of it.
 */
export function ScreensRail({
  screens,
  className,
}: {
  screens: NonNullable<Project["gallery"]>;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "no-scrollbar -mx-gutter px-gutter flex snap-x snap-mandatory",
        "gap-5 overflow-x-auto pb-2",
        // Once they all fit, the rail stops behaving like one.
        "lg:mx-0 lg:snap-none lg:justify-start lg:overflow-visible lg:px-0",
        className,
      )}
    >
      {screens.map((screen) => (
        <li
          key={screen.src}
          className="w-40 shrink-0 snap-center sm:w-48 lg:w-52"
        >
          <figure className="flex flex-col gap-3">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border border-border",
                "bg-bg-elevated shadow-card",
              )}
              // The capture's own ratio, so the screen is never cropped.
              style={{ aspectRatio: `${screen.width} / ${screen.height}` }}
            >
              <Image
                src={screen.src}
                alt={screen.caption}
                fill
                sizes="(min-width: 1024px) 208px, (min-width: 640px) 192px, 160px"
                className="object-cover"
              />
            </div>

            <figcaption className="text-body-sm text-fg-muted">
              {screen.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
