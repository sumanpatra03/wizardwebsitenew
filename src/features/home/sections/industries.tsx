import { CardsSection } from "@/components/cards/cards-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { INDUSTRIES, INDUSTRIES_COPY } from "@/constants/industries";

/**
 * Who We Serve.
 *
 * A Server Component that hands real content to the reusable
 * `<CardsSection>`; only the interaction lives on the client.
 */
export function Industries() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={INDUSTRIES_COPY.eyebrow}
          title={INDUSTRIES_COPY.title}
          description={INDUSTRIES_COPY.description}
        />

        <CardsSection
          cards={INDUSTRIES}
          label="Sectors we serve"
          className="mt-14"
        />
      </Container>
    </Section>
  );
}
