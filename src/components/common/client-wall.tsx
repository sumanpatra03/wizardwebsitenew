import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CLIENT_LOGOS } from "@/constants/company";
import { cn } from "@/lib/utils";

type ClientWallProps = {
  className?: string;
  /**
   * `grid` is the static monochrome wall. `carousel` is a continuously
   * scrolling strip of full-colour marks on light chips.
   */
  variant?: "grid" | "carousel";
  /** Carousel only. Seconds for one full loop; larger is slower. */
  durationSeconds?: number;
};

/**
 * Client logos.
 *
 * ## `grid` — monochrome
 *
 * Rendered monochrome — white on the dark theme, black on light — via
 * `[data-client-logo]` in `globals.css`.
 *
 * That is not a stylistic whim. Eight of the eleven published marks are dark
 * ink on a transparent background (measured average ink luminance below 90),
 * so they are effectively invisible on this site's canvas. Tinting the whole
 * set to a single colour is the only treatment that renders all eleven
 * legibly in both themes without editing anyone's logo, and it is the usual
 * convention for a wall like this.
 *
 * ## `carousel` — full colour
 *
 * Same logos, untinted, each on its own identical light tile.
 *
 * The tile is doing two jobs. It is what lets brand colour survive the dark
 * theme: the marks above are near-black ink on transparency, so a light
 * surface beneath them is the only thing that makes colour legible on both
 * canvases short of re-cutting eleven logo files. And it is what makes them
 * a uniform size — eleven marks of eleven different proportions cannot
 * otherwise share a footprint without being stretched.
 *
 * The loop is pure CSS: the track holds the set twice and translates by
 * exactly -50%, so it is seamless, runs on the compositor, needs no
 * JavaScript, and is paused by the global reduced-motion rule.
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
                  // One identical tile per client. A fixed box is what makes
                  // eleven logos of eleven different proportions occupy the
                  // same footprint; the mark inside is only ever fitted to it,
                  // never stretched, so no one's logo is distorted.
                  "group/logo grid h-20 w-40 shrink-0 place-items-center",
                  "rounded-xl bg-white px-5 sm:h-22 sm:w-48 sm:px-6",
                  "ring-1 ring-ink-950/8 transition-transform",
                  "duration-(--duration-fast) hover:scale-105",
                  "motion-reduce:hover:scale-100",
                )}
              >
                {/* Held back at rest so hover reads as the mark coming
                    forward. Opacity only, no Tailwind filter utilities: they
                    compose into `filter`, and a `filter` here would knock the
                    colour back out of the artwork. */}
                <Image
                  src={client.src}
                  alt={copy === 1 ? "" : client.name}
                  width={288}
                  height={80}
                  className={cn(
                    "max-h-10 w-auto max-w-full object-contain sm:max-h-11",
                    "opacity-85 transition-opacity duration-(--duration-fast)",
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
