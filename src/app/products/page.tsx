import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CLIENTS_COPY } from "@/constants/company";
import { PRODUCTS_INDEX } from "@/constants/product-pages";
import { PRODUCTS } from "@/constants/products";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { CtaBand } from "@/features/home/sections/cta-band";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Products" },
] as const;

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Smart Commerce Management Suite, Smart Asset Management, Smart Restaurant Management and Smart Restaurant POS — scalable digital products built for modern enterprises.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={PRODUCTS_INDEX.eyebrow}
        titleLines={PRODUCTS_INDEX.titleLines}
        lead={PRODUCTS_INDEX.lead}
      >
        <p className="text-body-lg max-w-3xl text-fg-muted">
          {PRODUCTS_INDEX.body}
        </p>
      </PageHero>

      {/* The four products.
          Two-up rather than four-up: each card carries a feature list as well
          as a description, and at a quarter width those lists wrapped to one
          word per line. */}
      <Section>
        <Container>
          <Stagger stagger={0.08} className="grid gap-5 lg:grid-cols-2">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;

              return (
                <StaggerItem key={product.slug}>
                  <Card interactive className="h-full">
                    {/* One stretched link over the card, rather than several
                        nested ones pointing at the same place. The external
                        product-site link below sits above it on its own. */}
                    <Link
                      href={`/products/${product.slug}`}
                      className={cn(
                        "flex h-full flex-col",
                        "after:absolute after:inset-0 after:content-['']",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-ring",
                      )}
                    >
                      <span className="relative block aspect-[16/9] overflow-hidden">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 46vw, 92vw"
                          className={cn(
                            "object-cover transition-transform",
                            "duration-(--duration-slow) ease-(--ease-out-expo)",
                            "group-hover/card:scale-105",
                            "motion-reduce:transition-none",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-4 left-4 grid size-11 place-items-center",
                            "rounded-lg border border-accent/30 bg-bg/80 text-accent",
                            "backdrop-blur-sm transition-transform",
                            "duration-(--duration-fast)",
                            "group-hover/card:scale-110",
                            "motion-reduce:group-hover/card:scale-100",
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                      </span>

                      <span className="flex flex-1 flex-col p-7 sm:p-8">
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-display text-heading-md text-balance text-fg">
                            {product.name}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className={cn(
                              "mt-1 size-5 shrink-0 text-fg-subtle",
                              "transition-[color,transform]",
                              "duration-(--duration-fast) ease-(--ease-out-quart)",
                              "group-hover/card:-translate-y-0.5",
                              "group-hover/card:translate-x-0.5",
                              "group-hover/card:text-accent",
                              "motion-reduce:translate-none",
                            )}
                          />
                        </span>

                        <span className="text-label mt-2 block uppercase text-accent">
                          {product.tagline}
                        </span>

                        <span className="text-body-sm mt-4 text-fg-muted">
                          {product.description}
                        </span>

                        <span className="mt-6 flex flex-wrap gap-2">
                          {product.features.map((feature) => (
                            <Badge key={feature} variant="outline">
                              {feature}
                            </Badge>
                          ))}
                        </span>
                      </span>
                    </Link>

                    {/* Sits above the stretched link so it stays clickable in
                        its own right — this one leaves the site. */}
                    {product.externalUrl ? (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cn(
                          "text-body-sm relative z-10 mx-7 mb-7 inline-flex w-fit",
                          "items-center gap-2 text-fg-subtle sm:mx-8 sm:mb-8",
                          "transition-colors duration-(--duration-fast)",
                          "hover:text-accent focus-visible:outline-2",
                          "focus-visible:outline-offset-2 focus-visible:outline-ring",
                        )}
                      >
                        <ExternalLink aria-hidden="true" className="size-4" />
                        {product.externalUrl.replace(/^https?:\/\//, "")}
                      </a>
                    ) : null}
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Featured clients */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow={CLIENTS_COPY.eyebrow}
            title="Trusted by corporates and government alike."
            description={CLIENTS_COPY.body}
          />
          <ClientWall variant="carousel" className="mt-14" />
        </Container>
      </Section>

      <TestimonialsCarousel
        eyebrow="Client Voices"
        title={TESTIMONIALS_HEADING}
        tone="default"
      />

      <CtaBand />
    </>
  );
}
