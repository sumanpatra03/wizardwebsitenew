/** The slice of ScrollTrigger's API this helper needs. */
type Refreshable = { refresh: () => void };

/**
 * Keep ScrollTrigger's cached start/end positions honest.
 *
 * ScrollTrigger measures a trigger's offset once, when the trigger is created.
 * Anything that changes page height afterwards — and lazy-loaded images above
 * the fold do exactly that — leaves those measurements stale, so the effect
 * fires at the wrong scroll position or, if the section has moved far enough,
 * reads as permanently finished.
 *
 * That is not hypothetical: the careers panel sat locked at its end state at
 * every scroll position until this was added, because the service and card
 * photography above it loaded after the trigger was built and pushed the
 * section ~1000px down the page.
 *
 * `invalidateOnRefresh` alone does not help — it governs what happens *during*
 * a refresh, not when one is triggered. Something has to ask.
 *
 * @returns a cleanup that removes both listeners.
 */
export function keepScrollTriggersFresh(ScrollTrigger: Refreshable): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  // Debounced: a page of lazy images settles as a burst of resize
  // notifications, and refresh() re-measures every trigger on the page.
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  window.addEventListener("load", refresh);
  const observer = new ResizeObserver(refresh);
  observer.observe(document.body);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("load", refresh);
    observer.disconnect();
  };
}
