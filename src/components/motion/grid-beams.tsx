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
   * Breakpoint gate. A beam on line 20 is off-screen below `2xl`, and an
   * off-screen element still burns animation frames — so it is not rendered
   * until its line actually exists on that viewport.
   */
  visibility?: string;
};

type BeamSet = {
  horizontal: readonly Beam[];
  vertical: readonly Beam[];
};

/** Dense, quick traffic. For the hero, where the grid is the main artwork. */
const HERO: BeamSet = {
  horizontal: [
    { line: 1, duration: 3.4, delay: 0 },
    { line: 3, duration: 2.7, delay: 1.1 },
    { line: 5, duration: 4.1, delay: 0.4 },
    { line: 7, duration: 3.0, delay: 2.0, visibility: "hidden sm:block" },
    { line: 9, duration: 3.7, delay: 0.9, visibility: "hidden sm:block" },
    { line: 11, duration: 2.5, delay: 2.6, visibility: "hidden lg:block" },
    { line: 13, duration: 4.4, delay: 1.5, visibility: "hidden lg:block" },
  ],
  vertical: [
    { line: 1, duration: 3.5, delay: 0.6 },
    { line: 3, duration: 2.8, delay: 1.8 },
    { line: 5, duration: 4.3, delay: 0.2 },
    { line: 8, duration: 3.1, delay: 2.3, visibility: "hidden sm:block" },
    { line: 11, duration: 3.8, delay: 1.0, visibility: "hidden md:block" },
    { line: 14, duration: 2.6, delay: 2.8, visibility: "hidden lg:block" },
    { line: 17, duration: 4.0, delay: 0.7, visibility: "hidden xl:block" },
    { line: 20, duration: 3.2, delay: 1.9, visibility: "hidden 2xl:block" },
  ],
};

/**
 * A lighter dusting for the page backdrop and the secondary grid sections,
 * where beams are ambience behind real content rather than the subject.
 */
const AMBIENT: BeamSet = {
  horizontal: [
    { line: 2, duration: 4.6, delay: 0.8 },
    { line: 5, duration: 5.4, delay: 2.4 },
    { line: 8, duration: 4.2, delay: 1.2, visibility: "hidden md:block" },
    { line: 11, duration: 5.8, delay: 3.1, visibility: "hidden lg:block" },
  ],
  vertical: [
    { line: 2, duration: 5.0, delay: 0.3 },
    { line: 6, duration: 4.4, delay: 2.1 },
    { line: 10, duration: 5.6, delay: 1.4, visibility: "hidden md:block" },
    { line: 15, duration: 4.8, delay: 3.0, visibility: "hidden xl:block" },
    { line: 19, duration: 5.2, delay: 1.7, visibility: "hidden 2xl:block" },
  ],
};

const BEAM_SETS = { hero: HERO, ambient: AMBIENT } as const;

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

const BEAM_SKIN =
  "shadow-[0_0_8px_0_var(--beam-glow)] absolute block";

type GridBeamsProps = {
  className?: string;
  /** `hero` is dense and quick; `ambient` is sparser and calmer. */
  variant?: keyof typeof BEAM_SETS;
};

/**
 * Light pulses travelling along a blueprint grid.
 *
 * Each beam is a short gradient segment sitting on a track that spans one grid
 * line; the segment is 25% of its track, so translating it from -100% to 400%
 * of its own width sweeps the full line and exits cleanly.
 *
 * Pure CSS — no JavaScript, no timers — and only `transform`/`opacity`
 * animate, so the whole effect stays on the compositor. Being server-safe, it
 * adds nothing to the client bundle.
 *
 * Decorative: `aria-hidden`, `pointer-events-none`, and hidden outright under
 * `prefers-reduced-motion` by a rule in `globals.css` keyed on the
 * `data-grid-beams` attribute — the global reduced-motion rule only collapses
 * durations, which would strand the beams as static stray lines.
 */
export function GridBeams({ className, variant = "hero" }: GridBeamsProps) {
  const { horizontal, vertical } = BEAM_SETS[variant];

  return (
    <div
      aria-hidden="true"
      data-grid-beams=""
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // Ambience should never compete with the copy sitting on top of it.
        variant === "ambient" && "opacity-70",
        className,
      )}
    >
      {horizontal.map((beam) => (
        <div
          key={`h-${beam.line}`}
          className={cn("absolute inset-x-0 h-px", beam.visibility)}
          style={{ top: beam.line * GRID_SIZE }}
        >
          <span
            className={cn(
              BEAM_SKIN,
              "animate-beam-x inset-y-0 left-0 w-1/4",
              "bg-[linear-gradient(90deg,transparent,var(--beam-line),transparent)]",
            )}
            style={beamTiming(beam)}
          />
        </div>
      ))}

      {vertical.map((beam) => (
        <div
          key={`v-${beam.line}`}
          className={cn("absolute inset-y-0 w-px", beam.visibility)}
          style={{ left: beam.line * GRID_SIZE }}
        >
          <span
            className={cn(
              BEAM_SKIN,
              "animate-beam-y inset-x-0 top-0 h-1/4",
              "bg-[linear-gradient(180deg,transparent,var(--beam-line),transparent)]",
            )}
            style={beamTiming(beam)}
          />
        </div>
      ))}
    </div>
  );
}
