import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { ServiceStep } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

/**
 * Delivery process, as a numbered track.
 *
 * The connecting rule is drawn per step rather than as one line behind the
 * row, because the steps wrap: one absolutely-positioned line would cut
 * straight across the gap between rows at every breakpoint where the count
 * does not divide evenly. Each step draws the segment to its own right and the
 * last one draws none, so the track breaks correctly wherever it wraps.
 *
 * Below `md` the same markup reads as a vertical list — the rule is simply
 * hidden, since a stack already implies sequence.
 */
export function ServiceProcess({
  heading,
  lead,
  steps,
  tone = "default",
}: {
  heading: string;
  lead?: string;
  steps: readonly ServiceStep[];
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-y border-border" : undefined}
    >
      <Container>
        <SectionHeading eyebrow="How we work" title={heading} description={lead} />

        <Stagger
          stagger={0.07}
          className={cn(
            "mt-14 grid gap-x-6 gap-y-10",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-pill",
                    "border border-accent/35 bg-accent-muted",
                    "font-display text-body-sm text-accent",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Segment to the next step. Hidden on the last one, and on
                    stacked layouts where the sequence is already implied. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-border sm:block"
                  />
                ) : null}
              </div>

              <h3 className="font-display text-heading-sm mt-5 text-fg">
                {step.title}
              </h3>
              <p className="text-body-sm mt-2.5 text-fg-muted">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
