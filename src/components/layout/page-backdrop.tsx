import { GridBeams } from "@/components/motion/grid-beams";

/**
 * Page-wide ambient backdrop: a fixed blueprint grid with beams running along
 * it, sitting behind everything.
 *
 * Because it is `fixed`, the grid holds still while content scrolls over it
 * and the beams keep travelling the whole way down the page rather than
 * restarting per section.
 *
 * It only shows through sections that declare no background of their own
 * (`<Section tone="default">`), which is what gives the page its alternating
 * lit / solid rhythm. Sections that *do* paint a background and still want the
 * effect — WhyWizard, the footer — carry their own grid and beams.
 *
 * Server Component, pure CSS: nothing here reaches the client bundle.
 */
export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <GridBeams variant="ambient" />
    </div>
  );
}
