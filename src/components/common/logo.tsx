import Image from "next/image";

import { cn } from "@/lib/utils";

/** Intrinsic size of the source artwork, used for aspect-ratio reservation. */
const LOGO_WIDTH = 182;
const LOGO_HEIGHT = 57;

type LogoProps = {
  className?: string;
  /** Rendered height in Tailwind units. Width follows the aspect ratio. */
  size?: "sm" | "md" | "lg";
  /** Prioritise the fetch — set on the header logo, which is above the fold. */
  priority?: boolean;
};

/**
 * Render heights.
 *
 * Worth knowing the ceiling: the only artwork Wizard publishes is 182x57, so
 * a lockup wider than ~91 CSS px is already below 2x on a retina screen. `md`
 * renders 115-128px wide, which trades some of that sharpness for presence in
 * the header. Supply an SVG (or a 2x PNG pair) and these can grow freely
 * without the trade.
 */
const SIZES = {
  sm: "h-7",
  md: "h-9 sm:h-11",
  lg: "h-12",
} as const;

/**
 * Wizard Communications logo.
 *
 * Two artworks ship: the original, and a reversed build whose neutral ink is
 * lifted to the foreground colour while the brand cyan is left untouched
 * (generated from the original — see the note in the README).
 *
 * The swap is done in CSS on `data-logo-theme`, not with `useTheme`: the theme
 * class is on <html> before first paint, so the correct artwork is chosen
 * without a client render and without a flash.
 *
 * Both images are decorative here — every call site wraps this in a link that
 * already carries an `aria-label`, so an `alt` would only duplicate the name.
 */
export function Logo({ className, size = "md", priority = false }: LogoProps) {
  const shared = cn(SIZES[size], "w-auto select-none");

  // `unoptimized`: the source is a 8.7 kB two-colour PNG. Re-encoding it to
  // lossy WebP at q=75 smears the flat-colour edges and saves nothing, so the
  // original is both sharper and smaller than any generated variant.
  const common = {
    "aria-hidden": true,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    priority,
    unoptimized: true,
    className: shared,
  } as const;

  // `alt` stays inline on each element rather than in `common` — the
  // jsx-a11y rule cannot see it through a spread.
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image src="/wizard-logo-dark.png" alt="" data-logo-theme="dark" {...common} />
      <Image src="/wizard-logo.png" alt="" data-logo-theme="light" {...common} />
    </span>
  );
}
