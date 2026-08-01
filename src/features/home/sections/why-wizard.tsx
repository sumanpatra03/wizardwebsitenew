import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/text-reveal";
import {
  DIFFERENTIATORS,
  PARTNERSHIP_PROMISES,
  WHY_WIZARD_INTRO,
} from "@/constants/differentiators";
import { cn } from "@/lib/utils";

/**
 * Why Wizard.
 *
 * A two-column editorial split: the manifesto and promises hold the left rail
 * while the attribute cards cascade on the right — the shape Website A uses
 * for its awards and value sections.
 */
export function WhyWizard() {
  return (
    <Section tone="subtle" className="border-y border-border">
      {/* Decorative grid, masked so it fades before the section edges. */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-50"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-label mb-6 uppercase text-accent">Why Wizard</p>
            </Reveal>

            <MaskReveal
              as="h2"
              lines={["Because Growth", "Doesn't Happen", "by Accident."]}
              className="text-display-lg text-fg"
            />

            <Reveal delay={0.2}>
              <p className="text-body-lg mt-7 max-w-md text-fg-muted">
                {WHY_WIZARD_INTRO}
              </p>
            </Reveal>

            <Stagger delay={0.3} className="mt-9 flex flex-col gap-3.5">
              {PARTNERSHIP_PROMISES.map((promise) => (
                <StaggerItem
                  key={promise}
                  as="p"
                  direction="left"
                  className="text-body-base flex items-start gap-3 text-fg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill bg-accent-muted text-accent"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {promise}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Stagger
            stagger={0.07}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
          >
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div
                    className={cn(
                      "group/card h-full rounded-xl border border-border bg-bg p-6",
                      "transition-[border-color,box-shadow,transform]",
                      "duration-(--duration-fast) ease-(--ease-out-quart)",
                      "hover:-translate-y-1 hover:border-accent/45 hover:shadow-card-hover",
                      "motion-reduce:hover:translate-y-0",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-11 place-items-center rounded-lg",
                        "bg-accent-muted text-accent transition-transform",
                        "duration-(--duration-fast) group-hover/card:scale-110",
                        "motion-reduce:group-hover/card:scale-100",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>

                    <h3 className="font-display text-heading-sm mt-5 text-fg">
                      {item.title}
                    </h3>
                    <p className="text-body-sm mt-2 text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
