import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { PRODUCTS } from "@/constants/products";
import { cn } from "@/lib/utils";

/**
 * The other products, from a product page.
 *
 * Three of the four are adjacent enough to be confused — two of them are
 * restaurant systems — so someone who read this far may simply have opened the
 * wrong one.
 */
export function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const others = PRODUCTS.filter((product) => product.slug !== currentSlug);

  return (
    <Section tone="subtle" backdrop className="border-y border-border">
      <Container>
        <SectionHeading eyebrow="Also from Wizard" title="The rest of the suite." />

        <Stagger
          stagger={0.06}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((product) => {
            const Icon = product.icon;

            return (
              <StaggerItem key={product.slug}>
                <Card interactive className="h-full">
                  <Link
                    href={`/products/${product.slug}`}
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
                          "size-5 shrink-0 text-fg-subtle",
                          "transition-[color,transform]",
                          "duration-(--duration-fast) ease-(--ease-out-quart)",
                          "group-hover/card:-translate-y-0.5",
                          "group-hover/card:translate-x-0.5",
                          "group-hover/card:text-accent",
                          "motion-reduce:translate-none",
                        )}
                      />
                    </span>

                    <span className="font-display text-heading-sm mt-5 text-balance text-fg">
                      {product.name}
                    </span>
                    <span className="text-body-sm mt-2 text-fg-muted">
                      {product.tagline}
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
