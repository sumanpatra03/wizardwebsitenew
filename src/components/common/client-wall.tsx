import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CLIENT_LOGOS } from "@/constants/company";
import { cn } from "@/lib/utils";

type ClientWallProps = {
  className?: string;
  /**
   * `grid` is the static wall, `carousel` the continuously scrolling strip.
   * Both render the marks monochrome.
   */
  variant?: "grid" | "carousel";
  /** Carousel only. Seconds for one full loop; larger is slower. */
  durationSeconds?: number;
};

/**
 * Client logos, in two layouts and one treatment.
 *
 * ## The treatment
 *
 * Both variants render the marks monochrome — white on the dark theme, black
 * on light — via `[data-client-logo]` in `globals.css`, with nothing behind
 * them.
 *
 * That is not a stylistic whim. Eight of the eleven published marks are dark
 * ink on a transparent background (measured average ink luminance below 90),
 * so untinted they are effectively invisible on this site's canvas. Tinting
 * the whole set to a single colour is the only treatment that renders all
 * eleven legibly in both themes without a surface behind each one and without
 * editing anyone's logo — and it is the usual convention for a wall like this.
 *
 * ## The layouts
 *
 * `grid` is a static wall. `carousel` is a continuously scrolling strip, on a
 * pure-CSS loop: the track holds the set twice and translates by exactly
 * -50%, so it is seamless, runs on the compositor, needs no JavaScript, and
 * is paused by the global reduced-motion rule.
 */
export function ClientWall({
  className,
  variant = "grid",
  durationSeconds = 38,
}: ClientWallProps) {
  if (variant === "carousel") {
    // Duplicated once. The second copy is aria-hidden so screen readers hear
    // the client list a single time.
    return (
      <div className={cn("mask-fade-x relative overflow-hidden", className)}>
        <ul
          className={cn(
            "animate-marquee flex w-max items-center gap-10 sm:gap-14",
            "hover:[animation-play-state:paused]",
          )}
          style={
            {
              "--marquee-duration": `${durationSeconds}s`,
            } as React.CSSProperties
          }
        >
          {[0, 1].flatMap((copy) =>
            CLIENT_LOGOS.map((client) => (
              <li
                key={`${client.name}-${copy}`}
                aria-hidden={copy === 1 ? "true" : undefined}
                className={cn(
                  // No tile, no border, no fill — the marks sit straight on
                  // the canvas. A common slot width is all that is left of the
                  // box, and it is still needed: without it a wide wordmark
                  // and a square badge pass at completely different rhythms.
                  "group/logo grid h-20 w-48 shrink-0 place-items-center",
                  "sm:w-64 transition-transform duration-(--duration-fast)",
                  "hover:scale-105 motion-reduce:hover:scale-100",
                )}
              >
                {/* Tinted to a single colour by `[data-client-logo]` in
                    `globals.css` — white on the dark theme, black on light.
                    Eight of the eleven marks are near-black ink on
                    transparency, so untinted they would simply not be there
                    on this canvas.

                    Opacity carries the hover. It cannot be a filter utility:
                    those compose into `filter`, which that rule already owns,
                    and the winner would come down to specificity. */}
                <Image
                  src={client.src}
                  alt={copy === 1 ? "" : client.name}
                  width={288}
                  height={80}
                  data-client-logo=""
                  className={cn(
                    // Capped at 56px because the source files are only ~63px
                    // tall — past that these would be upscaled, and a logo is
                    // the last thing that should look soft.
                    "max-h-11 w-auto max-w-full object-contain sm:max-h-14",
                    "opacity-70 transition-opacity duration-(--duration-fast)",
                    "group-hover/logo:opacity-100",
                  )}
                />
              </li>
            )),
          )}
        </ul>
      </div>
    );
  }

  return (
    <Stagger
      as="ul"
      stagger={0.05}
      className={cn(
        "grid grid-cols-2 items-center gap-x-6 gap-y-10",
        "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        className,
      )}
    >
      {CLIENT_LOGOS.map((client) => (
        <StaggerItem key={client.name} as="li" className="flex justify-center">
          <Image
            src={client.src}
            alt={client.name}
            width={144}
            height={40}
            data-client-logo=""
            className={cn(
              "h-8 w-auto max-w-[144px] object-contain opacity-60",
              "transition-opacity duration-(--duration-fast) hover:opacity-100",
            )}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
