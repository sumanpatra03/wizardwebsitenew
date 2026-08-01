"use client";

import { motion, useScroll, useTransform } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Hero artwork: a slow-drifting gradient mesh over a blueprint grid.
 *
 * This is the site's substitute for hero photography — pure CSS, so there is
 * nothing to download, nothing to lay out, and it recolours with the theme.
 *
 * The mesh drifts on page scroll (`transform` and `opacity` only) and the
 * whole effect flattens to a static wash when reduced motion is requested.
 */
export function HeroBackdrop() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const meshY = useTransform(scrollYProgress, [0, 0.35], ["0%", "18%"]);
  const gridY = useTransform(scrollYProgress, [0, 0.35], ["0%", "8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.3], [1, 0.25]);

  if (prefersReducedMotion) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-y absolute inset-0" />
        <div className="bg-mesh absolute inset-0" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={{ y: gridY }}
        className="bg-grid mask-fade-y absolute inset-0 will-change-transform"
      />

      <motion.div
        style={{ y: meshY, opacity: fade }}
        className="bg-mesh animate-float absolute inset-0 will-change-transform"
      />

      {/* Soft floor so the mesh dissolves into the next section instead of
          ending on a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
