import type Lenis from "lenis";

declare global {
  interface Window {
    /**
     * The active Lenis instance, published by `SmoothScrollProvider` so that
     * GSAP ScrollTrigger and the scroll-lock hook can coordinate with it.
     * Undefined when the user prefers reduced motion.
     */
    __lenis?: Lenis;
  }
}

export {};
