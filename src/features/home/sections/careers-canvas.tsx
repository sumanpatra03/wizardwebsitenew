"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { CAREERS } from "@/constants/careers";
import { useIsDesktop } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Panel geometry once the transition completes.
 *
 * Taken from Website A's own careers module, measured in the browser: its
 * image goes from 1440x960 (full-bleed, taller than the viewport) to 704x469
 * anchored hard against the left edge, with the copy in the right half. 704 of
 * 1440 is 49%, hence the width below.
 */
const END = {
  desktop: { width: "49%", height: "78%", top: "11%" },
  mobile: { width: "100%", height: "48%", top: "0%" },
} as const;

const RADIUS = 28;

/**
 * Where the transition runs, as a fraction of viewport height.
 *
 * Progress is 0 while the section's top is still this far down the viewport,
 * and 1 by the time it reaches the top — roughly the window Website A uses.
 */
const TRAVEL = 0.55;

/** How hard the panel chases the scroll position. Lower is heavier. */
const SMOOTHING = 0.16;

type CareersCanvasProps = {
  /** Resolved on the server from `public/careers/`; undefined falls back. */
  image?: string;
};

/**
 * Careers.
 *
 * The image fills the frame, then shrinks to a panel as the section scrolls
 * into view while the copy fades up beside it. Scrolling back up reverses
 * both, because progress is read from scroll position rather than fired as a
 * one-way reveal.
 *
 * ## Why there is no pin
 *
 * The first build of this pinned the section for a 240vh runway. Measuring
 * Website A's own careers module showed that is not what it does at all: its
 * section is 681px tall, nothing is sticky, and the image simply resizes as
 * the section enters view before the whole thing scrolls away normally. A pin
 * makes the visitor scroll two extra viewports to get past one paragraph.
 * This matches the real behaviour instead.
 *
 * ## Why progress is measured per frame
 *
 * ScrollTrigger caches a trigger's page offset when it is built, and this
 * section sits behind a dozen lazily-loaded photographs. As those decode, the
 * section moves about a thousand pixels down and the cached offsets stop
 * describing it — measured behaviour was the panel sitting at its finished
 * state at *every* scroll position. `getBoundingClientRect()` is read against
 * live layout each frame, so it cannot go stale. GSAP still owns the
 * interpolation; only the clock changed.
 *
 * The rAF loop is gated by an IntersectionObserver, so it costs nothing while
 * the section is off-screen.
 *
 * The panel is absolutely positioned, so resizing it reflows nothing else on
 * the page — Website A's version changes its own section height as the image
 * shrinks, which shifts everything below it mid-scroll.
 */
export function CareersCanvas({ image }: CareersCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");

      const section = sectionRef.current;
      const media = mediaRef.current;
      const copy = copyRef.current;
      if (cancelled || !section || !media || !copy) return;

      const end = isDesktop ? END.desktop : END.mobile;

      const timeline = gsap.timeline({ paused: true });

      timeline.fromTo(
        media,
        { width: "100%", height: "100%", top: "0%", borderRadius: 0 },
        {
          width: end.width,
          height: end.height,
          top: end.top,
          // Round only the edges the panel pulls away from, so it still reads
          // as bleeding off the edge it stays anchored to.
          ...(isDesktop
            ? { borderTopRightRadius: RADIUS, borderBottomRightRadius: RADIUS }
            : { borderBottomLeftRadius: RADIUS, borderBottomRightRadius: RADIUS }),
          ease: "none",
        },
        0,
      );

      // Rises from below. Starts part-way in so it lands as the panel is
      // already clearing rather than fighting it for the space.
      timeline.fromTo(
        copy,
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, ease: "none" },
        0.4,
      );

      let smoothed = 0;
      let frame = 0;
      let running = false;

      /** Live progress: 0 before the section arrives, 1 once it reaches top. */
      const measure = () => {
        const { top } = section.getBoundingClientRect();
        const travel = window.innerHeight * TRAVEL;
        if (travel <= 0) return 0;
        return Math.min(1, Math.max(0, (travel - top) / travel));
      };

      const tick = () => {
        const target = measure();
        smoothed += (target - smoothed) * SMOOTHING;
        if (Math.abs(target - smoothed) < 0.0005) smoothed = target;
        timeline.progress(smoothed);
        frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (running) return;
        running = true;
        // Land on the right value immediately rather than easing in from
        // wherever the last visit left it.
        smoothed = measure();
        timeline.progress(smoothed);
        frame = requestAnimationFrame(tick);
      };

      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(frame);
      };

      // Only spend frames while the section is anywhere near the viewport.
      const observer = new IntersectionObserver(
        ([entry]) => (entry?.isIntersecting ? start() : stop()),
        { rootMargin: "300px 0px" },
      );
      observer.observe(section);

      cleanup = () => {
        stop();
        observer.disconnect();
        timeline.kill();
        // Drop inline styles so a breakpoint change starts from the
        // stylesheet's values rather than the previous layout's.
        gsap.set([media, copy], { clearProps: "all" });
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion, isDesktop]);

  const media = (
    <>
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center lg:object-left"
        />
      ) : (
        <div aria-hidden="true" className="bg-mesh bg-ink-950 absolute inset-0">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
      )}
      {/* Keeps the panel in the page's palette and stops a bright frame
          overpowering the copy beside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/5"
      />
    </>
  );

  const copy = (
    <>
      <p className="text-label text-accent uppercase">{CAREERS.eyebrow}</p>
      <h2 className="text-display-md lg:text-display-lg text-fg mt-4 text-balance">
        {CAREERS.headline}
      </h2>
      <p className="text-body-base lg:text-body-lg text-fg-muted mt-4 max-w-lg lg:mt-6">
        {CAREERS.body}
      </p>
      {/* `self-start` matters: the copy column is a flex column, so without it
          the button stretches to the full column width. */}
      <Button asChild size="lg" className="mt-7 self-start lg:mt-9">
        <Link href={CAREERS.cta.href}>
          {CAREERS.cta.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
          />
        </Link>
      </Button>
    </>
  );

  // Reduced motion: no transition at all — the two blocks, laid out plainly.
  if (prefersReducedMotion) {
    return (
      <section data-themed="" className="py-section">
        <div className="container-wide">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            {media}
          </div>
          <div className="mt-10">{copy}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-themed=""
      // One viewport tall and scrolling normally — no runway, no pin.
      className="relative h-svh overflow-hidden"
    >
      {/* Opens filling the whole frame and is scrubbed down to END. Absolute,
          so resizing it reflows nothing around it. */}
      <div
        ref={mediaRef}
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
      >
        {media}
      </div>

      {/* Sits where the panel will not be: the right half on desktop, the
          lower half on mobile. */}
      <div
        ref={copyRef}
        className={[
          "px-gutter absolute flex flex-col justify-center",
          "inset-x-0 bottom-0 h-[52%]",
          "lg:inset-y-0 lg:right-0 lg:left-[49%] lg:h-auto",
          "lg:pr-[max(var(--spacing-gutter),4vw)] lg:pl-[max(var(--spacing-gutter),3vw)]",
        ].join(" ")}
      >
        {copy}
      </div>
    </section>
  );
}
