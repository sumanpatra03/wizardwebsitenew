"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { keepScrollTriggersFresh } from "@/animations/scroll";
import { Button } from "@/components/ui/button";
import { CAREERS } from "@/constants/careers";
import { useIsDesktop } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/** Runway length. The sticky child is 100svh, so this leaves 140vh of scrub. */
const RUNWAY = "240vh";

/** Panel geometry at the end of the scrub. */
const END = { width: "46%", height: "78%", radius: 28 };

type CareersCanvasProps = {
  /** Resolved on the server from `public/careers/`; undefined falls back. */
  image?: string;
};

/**
 * Careers.
 *
 * The image opens full-bleed and shrinks to a panel as the section scrolls,
 * with the copy arriving in the space it vacates.
 *
 * The pin is `position: sticky`, not ScrollTrigger's `pin`. That matters:
 * ScrollTrigger pins by cloning the element into a fixed-position spacer,
 * which is fragile around the fixed header and any ancestor that clips. Sticky
 * has none of those failure modes, so GSAP is left to do the one thing it is
 * genuinely better at — scrubbing values against scroll progress.
 *
 * The scrub animates `width`/`height`, which are layout properties rather than
 * compositor ones. That is unavoidable here: the point of the effect is that
 * the panel's box actually changes and the copy reflows beside it. It is a
 * single element, so the cost stays well inside frame budget.
 *
 * Below `lg`, and under `prefers-reduced-motion`, the whole mechanism is
 * dropped for a plain stacked layout — no sticky, no GSAP, no scroll runway.
 */
export function CareersCanvas({ image }: CareersCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrubbed = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (!scrubbed) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const section = sectionRef.current;
      const media = mediaRef.current;
      const copy = copyRef.current;
      if (cancelled || !section || !media || !copy) return;

      gsap.registerPlugin(ScrollTrigger);

      // Lenis drives scroll from its own rAF loop, so ScrollTrigger has to be
      // told when that loop moves.
      const lenis = window.__lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      // Photography above this section loads lazily and pushes it down the
      // page; without this the trigger keeps its original offsets and the
      // panel sits at its end state from the start.
      const stopWatching = keepScrollTriggersFresh(ScrollTrigger);

      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          media,
          { width: "100%", height: "100%", borderRadius: 0 },
          {
            width: END.width,
            height: END.height,
            borderTopRightRadius: END.radius,
            borderBottomRightRadius: END.radius,
            ease: "none",
          },
          0,
        );

        // Starts a third of the way in, so the copy lands as the panel is
        // already clearing rather than fighting it for the same space.
        timeline.fromTo(
          copy,
          { autoAlpha: 0, x: 56 },
          { autoAlpha: 1, x: 0, ease: "none" },
          0.34,
        );
      }, section);

      cleanup = () => {
        stopWatching();
        lenis?.off("scroll", onLenisScroll);
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scrubbed]);

  const media = (
    <>
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
      ) : (
        <div aria-hidden="true" className="bg-mesh absolute inset-0 bg-ink-950">
          <div className="bg-grid absolute inset-0 opacity-50" />
        </div>
      )}
      {/* Keeps the panel in the page's palette and stops a bright frame
          overpowering the copy beside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10"
      />
    </>
  );

  const copy = (
    <>
      <p className="text-label uppercase text-accent">{CAREERS.eyebrow}</p>
      <h2 className="text-display-lg mt-5 text-balance text-fg">
        {CAREERS.headline}
      </h2>
      <p className="text-body-lg mt-6 max-w-lg text-fg-muted">{CAREERS.body}</p>
      <Button asChild size="lg" className="mt-9">
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

  // Stacked fallback: no runway, no sticky, no GSAP.
  if (!scrubbed) {
    return (
      <section
        data-themed=""
        aria-labelledby="careers-heading"
        className="py-section"
      >
        <div className="container-wide">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            {media}
          </div>
          <div id="careers-heading" className="mt-10">
            {copy}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-themed=""
      aria-labelledby="careers-heading"
      style={{ height: RUNWAY }}
      className="relative"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="flex h-full items-center">
          {/* Opens at 100% x 100% — a full-screen frame — and is scrubbed
              down to the END geometry. `shrink-0` stops flexbox pre-empting
              the width GSAP is driving. */}
          <div
            ref={mediaRef}
            className="relative h-full w-full shrink-0 overflow-hidden"
          >
            {media}
          </div>

          <div
            ref={copyRef}
            id="careers-heading"
            className={cn("min-w-0 flex-1 px-gutter", "lg:pr-[max(var(--spacing-gutter),4vw)]")}
          >
            {copy}
          </div>
        </div>
      </div>
    </section>
  );
}
