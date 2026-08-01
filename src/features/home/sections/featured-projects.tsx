"use client";

import { useEffect, useRef } from "react";

import { keepScrollTriggersFresh } from "@/animations/scroll";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { SECTION_COPY } from "@/constants/home";
import { PROJECTS } from "@/constants/projects";
import { useIsDesktop } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ProjectCard, ProjectsEndCard } from "./project-card";

/**
 * Featured projects.
 *
 * On desktop the section pins and the card rail scrolls sideways as the page
 * scrolls down — Website A's case-study carousel, driven by scroll position
 * instead of arrow buttons.
 *
 * This is the one effect on the site where GSAP earns its place: pinning
 * requires taking the element out of flow while preserving layout, and
 * ScrollTrigger does that far more reliably than a hand-rolled solution.
 * It is imported dynamically, so the library never enters the initial bundle
 * and is never fetched at all on mobile or under reduced motion.
 *
 * Below `lg`, or whenever reduced motion is requested, the same rail becomes
 * an ordinary swipeable, scroll-snapping list — the content and its order are
 * identical either way.
 */
export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const pinned = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (!pinned) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const section = sectionRef.current;
      const rail = railRef.current;
      if (cancelled || !section || !rail) return;

      gsap.registerPlugin(ScrollTrigger);

      // Lenis drives scroll from its own rAF loop, so ScrollTrigger has to be
      // told when that loop moves — otherwise the pin lags behind the page.
      const lenis = window.__lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);

      // Lazy-loaded photography above this section changes page height after
      // the trigger is built, which leaves its cached offsets stale.
      const stopWatching = keepScrollTriggersFresh(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Recomputed on every refresh (resize, font load) rather than
        // captured once, so the pin length always matches real content width.
        const distance = () =>
          Math.max(0, rail.scrollWidth - document.documentElement.clientWidth);

        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            // Offset by the header height so the section heading stays clear
            // of the fixed bar for the whole duration of the pin.
            start: "top top+=88",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
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
  }, [pinned]);

  const cardClass = "w-[82vw] max-w-sm shrink-0 snap-start sm:w-[26rem] lg:w-[24rem]";

  return (
    <Section>
      {/* The pin trigger. Clipping lives on the rail viewport *inside* this
          element rather than on an ancestor — an ancestor with a non-visible
          overflow would clip the position:fixed element ScrollTrigger creates
          while pinning. */}
      <div ref={sectionRef}>
        <Container>
          <SectionHeading
            eyebrow={SECTION_COPY.projects.eyebrow}
            title={SECTION_COPY.projects.title}
            action={
              <Button asChild variant="outline">
                <Link href={SECTION_COPY.projects.cta.href}>
                  {SECTION_COPY.projects.cta.label}
                </Link>
              </Button>
            }
          />
        </Container>

        <div
          className={cn(
            "mt-14",
            // Pinned: GSAP moves the rail, so the viewport only clips.
            // Otherwise: a native snapping scroller the user swipes.
            pinned
              ? "overflow-hidden"
              : "no-scrollbar snap-x snap-mandatory overflow-x-auto pb-2",
          )}
        >
          <ul
            ref={railRef}
            className={cn(
              "flex w-max gap-5 px-gutter",
              pinned && "will-change-transform",
            )}
          >
            {PROJECTS.map((project) => (
              <li key={project.slug} className={cardClass}>
                <ProjectCard project={project} />
              </li>
            ))}

            <li className={cardClass}>
              <ProjectsEndCard
                href={SECTION_COPY.projects.cta.href}
                label={SECTION_COPY.projects.cta.label}
                className="min-h-full"
              />
            </li>
          </ul>
        </div>

        {!pinned ? (
          <Container>
            <p className="text-body-sm mt-6 text-fg-subtle lg:hidden">
              Swipe to explore more projects.
            </p>
          </Container>
        ) : null}
      </div>
    </Section>
  );
}
