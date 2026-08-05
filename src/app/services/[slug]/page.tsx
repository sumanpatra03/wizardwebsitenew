import { ArrowRight } from "lucide-react";
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
import { SERVICE_PAGES, getServicePage } from "@/constants/service-pages";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { RelatedServices } from "@/features/services/related-services";
import { ServiceCta } from "@/features/services/service-cta";
import { ServiceFaqs } from "@/features/services/service-faqs";
import { ServiceFeatures } from "@/features/services/service-features";
import { ServiceIndustries } from "@/features/services/service-industries";
import { ServiceOfferings } from "@/features/services/service-offerings";
import { ServiceOutcomes } from "@/features/services/service-outcomes";
import { ServiceProcess } from "@/features/services/service-process";
import { ServiceWhy } from "@/features/services/service-why";
import { TechStack } from "@/features/services/tech-stack";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Params = { slug: string };

/**
 * All six pages are known at build time, so prerender them and refuse
 * anything else — `dynamicParams: false` turns an unknown slug into a static
 * 404 rather than an on-demand render of a page that cannot exist.
 */
export function generateStaticParams(): Params[] {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return buildMetadata({ title: "Service" });

  return buildMetadata({
    title: page.label,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: page.label },
  ] as const;

  // Destructured so TypeScript narrows each optional block once, rather than
  // at every use inside the JSX below.
  const {
    offerings,
    features,
    why,
    process: workflow,
    outcomes,
    tech,
    industries,
    faqs,
  } = page;

  /**
   * The body sections, in reading order.
   *
   * Collected as functions of `tone` rather than as finished elements because
   * the light/dark banding has to alternate across whichever sections this
   * particular service happens to define. Cyber Security has no technology
   * stack and no industries list, so hard-coding a tone per section type would
   * put two identical bands next to each other on four of the six pages.
   */
  const blocks: ((tone: "default" | "subtle") => ReactNode)[] = [];

  if (offerings) {
    blocks.push((tone) => (
      <ServiceOfferings key="offerings" {...offerings} tone={tone} />
    ));
  }
  if (features) {
    blocks.push((tone) => (
      <ServiceFeatures key="features" {...features} tone={tone} />
    ));
  }
  if (why) {
    blocks.push((tone) => <ServiceWhy key="why" {...why} tone={tone} />);
  }
  if (workflow) {
    blocks.push((tone) => (
      <ServiceProcess key="process" {...workflow} tone={tone} />
    ));
  }
  if (outcomes) {
    blocks.push((tone) => (
      <ServiceOutcomes key="outcomes" {...outcomes} tone={tone} />
    ));
  }
  if (tech) {
    blocks.push((tone) => <TechStack key="tech" {...tech} tone={tone} />);
  }
  if (industries) {
    blocks.push((tone) => (
      <ServiceIndustries key="industries" {...industries} tone={tone} />
    ));
  }
  // The FAQ is deliberately not in this list — it renders near the foot of the
  // page, after the proof sections, where it answers the last objections
  // standing between someone and the call to action.

  /**
   * Hero artwork, set beside the heading.
   *
   * Held at 16:9 rather than letterboxed further. Several of these are
   * illustrations composed inside the frame, and a tighter crop cuts elements
   * in half where it would only trim background from a photograph.
   *
   * The scrim is deliberately light. At half width there is far less image to
   * read than in a full-bleed band, so a heavy wash would dull it rather than
   * settle it into the page.
   */
  const heroImage = (
    <div className="relative">
      {/* Accent bloom behind the frame. Without it the artwork sits on the
          dark canvas as a flat rectangle; this gives the half of the
          composition it occupies some weight of its own. */}
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
          src={page.image}
          // Decorative: the <h1> beside it already names the service.
          alt=""
          fill
          priority
          // The larger of the two hero columns from `lg`, near-full width
          // below it.
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

        <div className="mt-10 flex flex-wrap gap-4">
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
            <Link href="/services">All services</Link>
          </Button>
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

      {/* `default`, not the component's own `subtle`: the testimonials band
          directly above is subtle, and two together would merge into one
          undifferentiated block. */}
      {faqs ? <ServiceFaqs {...faqs} tone="default" /> : null}

      <RelatedServices currentSlug={page.slug} />

      <ServiceCta {...page.cta} />
    </>
  );
}
