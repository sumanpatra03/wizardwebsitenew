import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { SECTION_COPY } from "@/constants/home";

/**
 * Home page testimonials.
 *
 * A thin wrapper over the shared carousel, which the company pages use too —
 * only the heading copy differs between them.
 */
export function Testimonials() {
  return (
    <TestimonialsCarousel
      eyebrow={SECTION_COPY.testimonials.eyebrow}
      title={SECTION_COPY.testimonials.title}
      tone="subtle"
    />
  );
}
