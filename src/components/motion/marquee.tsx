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
  // Duplicated once so the -50% translate lands back where it started.
  const track = [...items, ...items];

  return (
    <div
      className={cn("mask-fade-x group relative overflow-hidden", className)}
      // `aria-hidden`, not `role="presentation"`: presentation strips only the
      // element's own semantics and leaves its descendants in the tree, so the
      // duplicated track was still announced — every technology twice over.
      // `aria-hidden` removes the subtree, which is what this wants: the strip
      // is decorative reinforcement of the tech list rendered beneath it.
      aria-hidden="true"
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
