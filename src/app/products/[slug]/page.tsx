import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ClientWall } from "@/components/common/client-wall";
import { JsonLd } from "@/components/common/json-ld";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { CLIENTS_COPY } from "@/constants/company";
import { PRODUCT_PAGES, getProductPage } from "@/constants/product-pages";
import { PRODUCTS } from "@/constants/products";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { RelatedProducts } from "@/features/products/related-products";
import { ServiceCta } from "@/features/services/service-cta";
import { ServiceFeatures } from "@/features/services/service-features";
import { ServiceOfferings } from "@/features/services/service-offerings";
import { ServiceWhy } from "@/features/services/service-why";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Params = { slug: string };

/**
 * All four pages are known at build time, so prerender them and refuse
 * anything else — `dynamicParams: false` turns an unknown slug into a static
 * 404 rather than an on-demand render of a page that cannot exist.
 */
export function generateStaticParams(): Params[] {
  return PRODUCT_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getProductPage(slug);
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!page || !product) return buildMetadata({ title: "Product" });

  return buildMetadata({
    title: product.name,
    description: page.metaDescription,
    path: `/products/${page.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getProductPage(slug);
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!page || !product) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ] as const;

  const { modules, highlights, benefits, advanced, why } = page;

  /**
   * The body sections, in reading order.
   *
   * Collected as functions of `tone` so the light/dark banding alternates
   * across whichever sections this product happens to define — the POS page
   * publishes no illustrated highlights and no advanced-features list, and
   * hard-coding a tone per section type would leave two identical bands
   * adjacent there.
   */
  const blocks: ((tone: "default" | "subtle") => ReactNode)[] = [
    (tone) => (
      <ServiceOfferings key="modules" eyebrow="Modules" {...modules} tone={tone} />
    ),
  ];

  if (highlights) {
    blocks.push((tone) => (
      <ServiceFeatures
        key="highlights"
        eyebrow="In practice"
        {...highlights}
        tone={tone}
      />
    ));
  }

  blocks.push((tone) => (
    <ServiceWhy
      key="benefits"
      eyebrow="Business benefits"
      {...benefits}
      tone={tone}
    />
  ));

  if (advanced) {
    blocks.push((tone) => (
      <ServiceOfferings
        key="advanced"
        eyebrow="Advanced features"
        {...advanced}
        tone={tone}
      />
    ));
  }

  blocks.push((tone) => (
    <ServiceWhy key="why" eyebrow="Why Wizard" {...why} tone={tone} />
  ));

  const heroImage = (
    <div className="relative">
      {/* Accent bloom behind the frame, matching the service pages. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
          "bg-accent/12 blur-3xl",
        )}
      />
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden rounded-xl",
          "border border-border shadow-card",
        )}
      >
        <Image
          src={product.image}
          // Decorative: the <h1> beside it already names the product.
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 92vw"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg/35 to-transparent"
        />
      </div>
    </div>
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow}
        titleLines={page.titleLines}
        aside={heroImage}
      >
        <p className="font-display text-heading-md max-w-3xl text-balance text-accent">
          {page.tagline}
        </p>

        <p className="text-body-lg mt-6 max-w-3xl text-fg-muted">{page.lead}</p>

        {page.body?.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-body-base mt-5 max-w-3xl text-fg-muted"
          >
            {paragraph}
          </p>
        ))}

        {page.emphasis ? (
          <p className="font-display text-heading-sm mt-8 max-w-3xl text-balance text-fg">
            {page.emphasis}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              {page.cta.label}
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-(--duration-fast)",
                  "group-hover:translate-x-1 motion-reduce:translate-none",
                )}
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">All products</Link>
          </Button>

          {product.externalUrl ? (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "text-body-sm inline-flex items-center gap-2 text-fg-subtle",
                "transition-colors duration-(--duration-fast) hover:text-accent",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-ring",
              )}
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              {product.externalUrl.replace(/^https?:\/\//, "")}
            </a>
          ) : null}
        </div>
      </PageHero>

      {blocks.map((block, index) => block(index % 2 === 0 ? "default" : "subtle"))}

      {/* Featured clients */}
      <Section>
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
      />

      <RelatedProducts currentSlug={page.slug} />

      <ServiceCta {...page.cta} />
    </>
  );
}
