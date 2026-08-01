"use client";

import { useEffect } from "react";

/**
 * Freeze page scroll while an overlay is open.
 *
 * Compensates for the removed scrollbar with padding so the layout does not
 * shift sideways, and pauses Lenis so it does not fight the lock.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.__lenis?.stop();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      window.__lenis?.start();
    };
  }, [locked]);
}
