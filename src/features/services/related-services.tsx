import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { SERVICE_PAGES } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

/**
 * The other services, from a service page.
 *
 * A dead end at the foot of a detail page is a wasted exit: someone who read
 * this far is interested but may have landed on the wrong one of the six.
 */
export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const others = SERVICE_PAGES.filter((page) => page.slug !== currentSlug);

  return (
    <Section tone="subtle" backdrop className="border-y border-border">
      <Container>
        <SectionHeading eyebrow="Keep exploring" title="The rest of what we do." />

        <Stagger
          stagger={0.05}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem key={service.slug}>
                <Card interactive className="h-full">
                  {/* The whole card is the target. `after` stretches this one
                      link over the card instead of nesting several, which
                      would put the same destination in the tab order twice. */}
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "flex h-full flex-col p-6",
                      "after:absolute after:inset-0 after:content-['']",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-ring",
                    )}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-10 place-items-center rounded-lg",
                          "bg-accent-muted text-accent transition-transform",
                          "duration-(--duration-fast)",
                          "group-hover/card:scale-110",
                          "motion-reduce:group-hover/card:scale-100",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "size-5 shrink-0 text-fg-subtle transition-[color,transform]",
                          "duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:-translate-y-0.5",
                          "group-hover/card:translate-x-0.5",
                          "group-hover/card:text-accent",
                          "motion-reduce:translate-none",
                        )}
                      />
                    </span>

                    <span className="font-display text-heading-sm mt-5 text-balance text-fg">
                      {service.label}
                    </span>
                    <span className="text-body-sm mt-2 text-fg-muted">
                      {service.summary}
                    </span>
                  </Link>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
