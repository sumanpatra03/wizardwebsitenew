import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import type { ServiceItem } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

import { SectionBackdrop } from "./section-backdrop";

/**
 * "Why choose us" — the differentiator cards.
 *
 * Five items, which is an awkward count: a three-up grid leaves two orphans on
 * the last row. The first card is given both columns on `sm` so the remainder
 * divides evenly, which also lets the strongest claim lead at a larger size.
 */
export function ServiceWhy({
  heading,
  lead,
  items,
  backdrop,
  tone = "subtle",
}: {
  heading: string;
  lead?: string;
  items: readonly ServiceItem[];
  /** Photograph behind the section, in place of the blueprint grid. */
  backdrop?: string;
  tone?: "default" | "subtle";
}) {
  const promoteFirst = items.length % 3 === 2;

  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle" && !backdrop}
      className={cn(
        tone === "subtle" && "border-y border-border",
        backdrop && "relative overflow-hidden",
      )}
    >
      {backdrop ? <SectionBackdrop src={backdrop} tone={tone} /> : null}

      <Container>
        <SectionHeading eyebrow="Why Wizard" title={heading} description={lead} />

        <Stagger
          stagger={0.06}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <StaggerItem
              key={item.title}
              className={cn(
                promoteFirst && index === 0 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <Card interactive className="flex h-full flex-col p-7">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 place-items-center rounded-lg",
                    "bg-accent-muted text-accent transition-transform",
                    "duration-(--duration-fast) group-hover/card:scale-110",
                    "motion-reduce:group-hover/card:scale-100",
                  )}
                >
                  <Check className="size-5" />
                </span>

                <h3 className="font-display text-heading-md mt-6 text-balance text-fg">
                  {item.title}
                </h3>
                <p className="text-body-sm mt-3 text-fg-muted">{item.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
