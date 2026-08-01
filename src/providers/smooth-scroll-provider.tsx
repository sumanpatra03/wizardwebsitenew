"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Global smooth scrolling.
 *
 * Lenis drives scroll from a rAF loop, which also gives GSAP ScrollTrigger a
 * single synchronised clock (see `features/home/sections/featured-projects`).
 *
 * Completely disabled when the user prefers reduced motion — hijacking scroll
 * is exactly the kind of motion that setting is asking us not to do.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch devices feels better than an emulated one.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Let other modules (ScrollTrigger, anchor links) reach the instance.
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
