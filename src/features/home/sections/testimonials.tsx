"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";
import { SECTION_COPY } from "@/constants/home";
import { TESTIMONIALS } from "@/constants/testimonials";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const controlClass = cn(
  "grid size-11 place-items-center rounded-pill border border-border",
  "text-fg-muted transition-colors duration-(--duration-fast)",
  "hover:border-accent/50 hover:bg-accent-muted hover:text-accent",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:pointer-events-none disabled:opacity-40",
);

/**
 * Testimonials carousel.
 *
 * Website A autoplays its card carousels but always exposes a pause control;
 * we do the same, which is also what WCAG 2.2.2 requires of any motion that
 * starts automatically and runs more than five seconds.
 *
 * Autoplay never starts when reduced motion is requested. Slides are marked
 * up as a labelled group with `aria-roledescription`, and the whole track is
 * reachable by keyboard.
 */
export function Testimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Lazily-initialised state, not a ref: the plugin instance is read during
  // render (to seed the carousel) and must stay stable across re-renders.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false, playOnInit: false }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [autoplay],
  );

  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  // Derived, not stored: autoplay runs unless the user paused it or asked for
  // reduced motion. Keeping it derived means the reduced-motion preference
  // changing mid-session is honoured without a reconciliation effect.
  const playing = !prefersReducedMotion && !paused;

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Push the desired play state onto the plugin — a genuine
  // synchronise-with-an-external-system effect.
  useEffect(() => {
    if (!emblaApi) return;
    if (playing) autoplay.play();
    else autoplay.stop();
  }, [emblaApi, autoplay, playing]);

  const toggleAutoplay = useCallback(() => setPaused((prev) => !prev), []);

  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          eyebrow={SECTION_COPY.testimonials.eyebrow}
          title={SECTION_COPY.testimonials.title}
        />

        <div
          className="mt-14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="-ml-5 flex touch-pan-y">
              {TESTIMONIALS.map((testimonial, index) => (
                <li
                  key={testimonial.author}
                  className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%] xl:flex-[0_0_33.333%]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${TESTIMONIALS.length}`}
                >
                  <Card className="flex h-full flex-col p-7 sm:p-8">
                    <Quote
                      aria-hidden="true"
                      className="size-8 shrink-0 text-accent/35"
                    />

                    <blockquote className="text-body-base mt-5 flex-1 text-fg">
                      {testimonial.quote}
                    </blockquote>

                    <figcaption className="mt-7 border-t border-border pt-5">
                      <p className="text-body-sm font-semibold text-fg">
                        {testimonial.author}
                      </p>
                      <p className="text-body-sm mt-0.5 text-fg-muted">
                        {[testimonial.role, testimonial.organization]
                          .filter(Boolean)
                          .join(", ")}
                        {testimonial.location ? ` — ${testimonial.location}` : ""}
                      </p>
                    </figcaption>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 flex items-center justify-between gap-6">
            {/* Dots double as position indicator and direct navigation. */}
            <ul className="flex items-center gap-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <li key={testimonial.author}>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={selected === index}
                    className={cn(
                      "h-1.5 rounded-pill transition-all duration-(--duration-fast)",
                      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
                      selected === index
                        ? "w-8 bg-accent"
                        : "w-4 bg-border-strong hover:bg-fg-subtle",
                    )}
                  />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAutoplay}
                className={controlClass}
                aria-label={
                  playing ? "Pause testimonial autoplay" : "Play testimonial autoplay"
                }
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-4" />
                ) : (
                  <Play aria-hidden="true" className="size-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className={controlClass}
                aria-label="Previous testimonial"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className={controlClass}
                aria-label="Next testimonial"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
