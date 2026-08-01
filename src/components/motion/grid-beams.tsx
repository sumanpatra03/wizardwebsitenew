import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Must match the `background-size` of the `bg-grid` utility in `globals.css`.
 * Beams ride real grid lines, so the two values have to stay in step.
 */
const GRID_SIZE = 64;

type Beam = {
  /** Which grid line to ride, counted from the container's top/left edge. */
  line: number;
  /** Seconds for one full traverse. Varied so beams never march in lockstep. */
  duration: number;
  /** Seconds before the first traverse. */
  delay: number;
  /**
   * Breakpoint gate. A beam on line 19 is off-screen below `xl`, and an
   * off-screen element still burns animation frames — so it is not rendered
   * until its line actually exists on that viewport.
   */
  visibility?: string;
};

const HORIZONTAL: readonly Beam[] = [
  { line: 3, duration: 7, delay: 0 },
  { line: 6, duration: 9.5, delay: 2.2 },
  { line: 9, duration: 8, delay: 4.6, visibility: "hidden sm:block" },
  { line: 12, duration: 11, delay: 1.4, visibility: "hidden lg:block" },
];

const VERTICAL: readonly Beam[] = [
  { line: 2, duration: 8.5, delay: 1.1 },
  { line: 5, duration: 10.5, delay: 3.6 },
  { line: 9, duration: 9, delay: 0.5, visibility: "hidden sm:block" },
  { line: 14, duration: 12, delay: 2.9, visibility: "hidden lg:block" },
  { line: 19, duration: 8, delay: 5.2, visibility: "hidden xl:block" },
];

/**
 * Per-beam timing, applied as inline longhands.
 *
 * These have to be inline rather than custom properties on the element: the
 * `--animate-beam-*` tokens compute on `:root`, so any `var()` inside them is
 * substituted there and every beam would inherit identical timing.
 */
const beamTiming = (beam: Beam): CSSProperties => ({
  animationDuration: `${beam.duration}s`,
  animationDelay: `${beam.delay}s`,
});

/**
 * Light pulses travelling along the blueprint grid.
 *
 * Each beam is a short gradient segment sitting on a track that spans one grid
 * line; the segment is 25% of its track, so translating it from -100% to 400%
 * of its own width sweeps the full line and exits cleanly.
 *
 * Pure CSS — no JavaScript, no timers, and only `transform`/`opacity` animate,
 * so the whole effect stays on the compositor.
 *
 * Decorative: `aria-hidden` and `pointer-events-none`. Callers must not render
 * it when the user prefers reduced motion — the global reduced-motion rule
 * collapses the duration, which would strand the beams as static stray lines
 * rather than removing them.
 */
export function GridBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {HORIZONTAL.map((beam) => (
        <div
          key={`h-${beam.line}`}
          className={cn("absolute inset-x-0 h-px", beam.visibility)}
          style={{ top: beam.line * GRID_SIZE }}
        >
          <span
            className={cn(
              "animate-beam-x absolute inset-y-0 left-0 block w-1/4",
              "bg-[linear-gradient(90deg,transparent,var(--accent-vivid),transparent)]",
              "shadow-[0_0_12px_0_var(--beam-glow)]",
            )}
            style={beamTiming(beam)}
          />
        </div>
      ))}

      {VERTICAL.map((beam) => (
        <div
          key={`v-${beam.line}`}
          className={cn("absolute inset-y-0 w-px", beam.visibility)}
          style={{ left: beam.line * GRID_SIZE }}
        >
          <span
            className={cn(
              "animate-beam-y absolute inset-x-0 top-0 block h-1/4",
              "bg-[linear-gradient(180deg,transparent,var(--accent-vivid),transparent)]",
              "shadow-[0_0_12px_0_var(--beam-glow)]",
            )}
            style={beamTiming(beam)}
          />
        </div>
      ))}
    </div>
  );
}
