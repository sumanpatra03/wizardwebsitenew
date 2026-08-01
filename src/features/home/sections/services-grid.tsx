import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { SECTION_COPY } from "@/constants/home";
import { SERVICES } from "@/constants/services";
import { cn } from "@/lib/utils";

/**
 * Services grid.
 *
 * Website A's card pattern: an icon, a title, a short descriptor and a
 * corner arrow, with the detail — here the capability list — revealed on
 * hover or keyboard focus.
 *
 * The reveal is CSS-only (grid-template-rows 0fr → 1fr), which animates
 * smoothly without measuring heights in JavaScript. The list is always in
 * the DOM, so screen readers and search engines see the full content.
 */
export function ServicesGrid() {
  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          eyebrow={SECTION_COPY.services.eyebrow}
          title={SECTION_COPY.services.title}
        />

        <Stagger stagger={0.06} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <Card interactive className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col p-7 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-12 place-items-center rounded-lg",
                          "bg-accent-muted text-accent",
                          "transition-transform duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:scale-110 motion-reduce:group-hover/card:scale-100",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "size-5 text-fg-subtle",
                          "transition-all duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5",
                          "group-hover/card:text-accent motion-reduce:transform-none",
                        )}
                      />
                    </span>

                    <h3 className="font-display text-heading-md mt-6 text-fg">
                      {service.title}
                    </h3>
                    <p className="text-body-sm mt-2 text-fg-muted">
                      {service.description}
                    </p>

                    {/* Expanding detail. The 0fr → 1fr grid trick animates an
                        unknown height with no JS measurement. */}
                    <span
                      className={cn(
                        "grid grid-rows-[0fr] transition-[grid-template-rows,opacity]",
                        "opacity-0 duration-(--duration-base) ease-(--ease-out-expo)",
                        "group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100",
                        "group-focus-within/card:grid-rows-[1fr] group-focus-within/card:opacity-100",
                        "motion-reduce:transition-none",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                          {service.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="text-body-sm flex items-start gap-2.5 text-fg-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-pill bg-accent"
                              />
                              {capability}
                            </span>
                          ))}
                        </span>
                      </span>
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
