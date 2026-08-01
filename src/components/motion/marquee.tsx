import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop. Larger = slower. */
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite horizontal ticker.
 *
 * Pure CSS: the track holds the items twice and translates by exactly -50%,
 * so the loop is seamless. Being CSS-only it needs no JavaScript, runs on the
 * compositor, and is paused by the global reduced-motion rule.
 *
 * Server Component — nothing here is interactive.
 */
export function Marquee({
  items,
  durationSeconds = 44,
  reverse = false,
  className,
}: MarqueeProps) {
  // Duplicated once; the second copy is aria-hidden so the list is
  // announced a single time.
  const track = [...items, ...items];

  return (
    <div
      className={cn("mask-fade-x group relative overflow-hidden", className)}
      // Keeps the whole strip out of the a11y tree: it is decorative
      // reinforcement of the tech list rendered elsewhere on the page.
      role="presentation"
    >
      <ul
        className={cn(
          "animate-marquee flex w-max items-center gap-10 sm:gap-14",
          "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={
          { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
        }
      >
        {track.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 sm:gap-14"
          >
            <span className="font-display text-heading-sm whitespace-nowrap text-fg-muted transition-colors duration-(--duration-fast) hover:text-accent sm:text-heading-md">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="size-1.5 rounded-pill bg-accent/50"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
