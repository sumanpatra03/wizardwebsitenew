import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { ServiceFeature } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

/**
 * Illustrated deep-dive rows.
 *
 * The image side alternates left and right down the page. That is not
 * decoration: these bodies run to a hundred words each, and four identical
 * image-left rows read as one undifferentiated wall. Alternating gives the eye
 * a reason to travel and marks where one topic ends and the next begins.
 *
 * `order` handles the alternation rather than two separate branches of JSX, so
 * the DOM order is always heading-then-image — which is also the reading order
 * a screen reader and a mobile viewport get.
 */
export function ServiceFeatures({
  heading,
  lead,
  items,
  tone = "default",
}: {
  heading: string;
  lead?: string;
  items: readonly ServiceFeature[];
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-y border-border" : undefined}
    >
      <Container>
        <SectionHeading eyebrow="In detail" title={heading} description={lead} />

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {items.map((item, index) => {
            const flipped = index % 2 === 1;

            return (
              <div
                key={item.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <Reveal
                  direction={flipped ? "right" : "left"}
                  className={cn(flipped && "lg:order-2")}
                >
                  <p className="text-label uppercase text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {/* `display-md`, not `heading-lg` — that step does not exist
                      in the scale (`tokens.css` jumps display-md → heading-md),
                      so the class generated nothing and this title had been
                      rendering at the inherited body size. */}
                  <h3 className="font-display text-display-md mt-4 text-balance text-fg">
                    {item.title}
                  </h3>
                  {/* `max-w-3xl` does no work in the two-column layout, where
                      the track is already narrower than that — it is here for
                      the stacked layout below `lg`, which would otherwise run
                      these hundred-word bodies the full width of the
                      container at a measure too long to track a line in. */}
                  <p className="text-body-lg mt-5 max-w-3xl text-fg-muted">
                    {item.body}
                  </p>
                </Reveal>

                <Reveal
                  delay={0.12}
                  direction={flipped ? "left" : "right"}
                  className={cn(flipped && "lg:order-1")}
                >
                  <div
                    className={cn(
                      "group/shot relative aspect-[16/10] overflow-hidden",
                      "rounded-xl border border-border bg-bg-elevated",
                    )}
                  >
                    <Image
                      src={item.image}
                      // Decorative: the heading beside it already names the
                      // topic, so an alt would only repeat it.
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      className={cn(
                        "object-cover transition-transform",
                        "duration-(--duration-slow) ease-(--ease-out-expo)",
                        "group-hover/shot:scale-105",
                        "motion-reduce:transition-none motion-reduce:group-hover/shot:scale-100",
                      )}
                    />
                    {/* Ties the photograph into the page's palette. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
