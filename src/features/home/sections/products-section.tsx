import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { ArrowLink } from "@/components/common/arrow-link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SECTION_COPY } from "@/constants/home";
import { PRODUCTS } from "@/constants/products";
import { cn } from "@/lib/utils";

/**
 * Products.
 *
 * Wider two-column cards, since each product carries a full paragraph plus a
 * feature list — the density Website A gives its report callouts.
 */
export function ProductsSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={SECTION_COPY.products.eyebrow}
          title={SECTION_COPY.products.title}
          action={
            <Button asChild variant="outline">
              <Link href={SECTION_COPY.products.cta.href}>
                {SECTION_COPY.products.cta.label}
              </Link>
            </Button>
          }
        />

        <Stagger stagger={0.08} className="mt-14 grid gap-5 lg:grid-cols-2">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <StaggerItem key={product.slug}>
                <Card interactive className="h-full p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-lg",
                        "bg-accent-muted text-accent transition-transform",
                        "duration-(--duration-fast) group-hover/card:scale-110",
                        "motion-reduce:group-hover/card:scale-100",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="text-label rounded-pill border border-border px-3 py-1.5 text-right uppercase text-fg-subtle">
                      {product.tagline}
                    </span>
                  </div>

                  <h3 className="font-display text-heading-md mt-6 text-fg">
                    {product.name}
                  </h3>

                  <p className="text-body-sm mt-3 text-fg-muted">
                    {product.description}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-body-sm flex items-start gap-2.5 text-fg-muted"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 text-accent"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
                    <ArrowLink href={`/products/${product.slug}`} stretched>
                      More details
                    </ArrowLink>

                    {product.externalUrl ? (
                      // Sits above the stretched link's overlay so it stays
                      // independently clickable.
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "relative z-10 inline-flex items-center gap-1.5",
                          "text-body-sm text-fg-muted transition-colors hover:text-accent",
                          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
                        )}
                      >
                        Visit site
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
