"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * @param query   Any media query string, e.g. `"(min-width: 1024px)"`.
 * @param ssrValue What to report before hydration. Defaults to `false`.
 */
export function useMediaQuery(query: string, ssrValue = false): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => ssrValue);
}

/** Matches the `lg` breakpoint — the point where the desktop nav appears. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
