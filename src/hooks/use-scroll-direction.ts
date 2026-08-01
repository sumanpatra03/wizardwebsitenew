"use client";

import { useEffect, useState } from "react";

export type ScrollState = {
  /** Page has scrolled past `threshold` — used to solidify the header. */
  scrolled: boolean;
  /** Last committed scroll direction. */
  direction: "up" | "down";
};

/**
 * Tracks scroll position and direction, sampled on animation frames so the
 * scroll listener itself never does layout work.
 *
 * @param threshold Distance in px before `scrolled` flips to true.
 * @param delta     Minimum movement before a direction change is committed,
 *                  which stops the header flickering on trackpad jitter.
 */
export function useScrollDirection(threshold = 24, delta = 6): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    direction: "up",
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      setState((prev) => {
        const scrolled = y > threshold;
        const moved = y - lastY;

        let direction = prev.direction;
        if (Math.abs(moved) > delta) {
          direction = moved > 0 && y > threshold ? "down" : "up";
          lastY = y;
        }

        if (prev.scrolled === scrolled && prev.direction === direction) {
          return prev;
        }
        return { scrolled, direction };
      });

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, delta]);

  return state;
}
