import dynamic from "next/dynamic";

import { ProjectsSkeleton, TestimonialsSkeleton } from "@/features/home/skeletons";
import { CtaBand } from "@/features/home/sections/cta-band";
import { Hero } from "@/features/home/sections/hero";
import { Industries } from "@/features/home/sections/industries";
import { IntroStatement } from "@/features/home/sections/intro-statement";
import { ProductsSection } from "@/features/home/sections/products-section";
import { ServicesGrid } from "@/features/home/sections/services-grid";
import { StatsBand } from "@/features/home/sections/stats-band";
import { TechMarquee } from "@/features/home/sections/tech-marquee";
import { WhyWizard } from "@/features/home/sections/why-wizard";
import { buildMetadata } from "@/lib/seo";

/**
 * The two heaviest sections are the only ones pulling extra libraries — GSAP
 * for the pinned rail, Embla for the carousel. Splitting them out keeps both
 * off the critical path; each shows a height-matched skeleton while its chunk
 * loads, and both sit well below the fold.
 */
const FeaturedProjects = dynamic(
  () =>
    import("@/features/home/sections/featured-projects").then(
      (mod) => mod.FeaturedProjects,
    ),
  { loading: () => <ProjectsSkeleton /> },
);

const Testimonials = dynamic(
  () =>
    import("@/features/home/sections/testimonials").then((mod) => mod.Testimonials),
  { loading: () => <TestimonialsSkeleton /> },
);

export const metadata = buildMetadata({ path: "/" });

/**
 * Home page.
 *
 * A Server Component composing the section list. Each section renders its
 * copy on the server and delegates only its animation wrappers to the client,
 * so the full text is present in the served HTML.
 *
 * Section order follows Website A's rhythm: statement → capability → proof →
 * work → differentiators → products → voices → call to action.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <IntroStatement />
      <ServicesGrid />
      <StatsBand />
      <Industries />
      <FeaturedProjects />
      <WhyWizard />
      <ProductsSection />
      <Testimonials />
      <CtaBand />
    </>
  );
}
