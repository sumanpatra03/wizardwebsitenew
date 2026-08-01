"use client";

import { useSyncExternalStore } from "react";

/** Nothing to subscribe to — the value is constant per environment. */
const noopSubscribe = () => () => {};

/**
 * `false` during server render and the hydration pass, `true` afterwards.
 *
 * Used by components whose output depends on browser-only state (resolved
 * theme, matchMedia) to render a stable placeholder until hydration.
 *
 * Built on `useSyncExternalStore` rather than a `useEffect` + `setState`
 * pair: React switches from the server snapshot to the client one as part of
 * hydration, so there is no extra render pass.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
