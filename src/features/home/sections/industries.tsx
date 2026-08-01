import { CardsSection } from "@/components/cards/cards-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { INDUSTRIES, INDUSTRIES_COPY } from "@/constants/industries";
import { findPublicImage } from "@/lib/public-image";
import type { HoverCardItem } from "@/types/content";

/**
 * Who We Serve.
 *
 * A Server Component that hands real content to the reusable
 * `<CardsSection>`; only the interaction lives on the client.
 */
export function Industries() {
  // Drop a file into `public/cards/` named after the card id and it appears —
  // see `public/cards/README.md`.
  const cards: HoverCardItem[] = INDUSTRIES.map((card) => {
    const image = findPublicImage("cards", card.id);
    return image ? { ...card, image } : card;
  });

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={INDUSTRIES_COPY.eyebrow}
          title={INDUSTRIES_COPY.title}
          description={INDUSTRIES_COPY.description}
        />

        <CardsSection
          cards={cards}
          label="Sectors we serve"
          className="mt-14"
        />
      </Container>
    </Section>
  );
}
