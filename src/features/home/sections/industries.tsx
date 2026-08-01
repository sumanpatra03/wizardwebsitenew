import { existsSync } from "node:fs";
import { join } from "node:path";

import { CardsSection } from "@/components/cards/cards-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { INDUSTRIES, INDUSTRIES_COPY } from "@/constants/industries";
import type { HoverCardItem } from "@/types/content";

/** Where card photography lives. See `public/cards/README.md`. */
const CARDS_DIR = join(process.cwd(), "public", "cards");
const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png"] as const;

/**
 * Look for a photograph matching a card's id, preferring modern formats.
 *
 * This is why dropping `healthcare.jpg` into `public/cards/` is the entire
 * install step: no import to add, no field to edit. A card with no matching
 * file keeps the generated `CardArtwork` fallback, so the section is never
 * broken mid-way through supplying images.
 *
 * Runs on the server at build time — this page is statically prerendered, so
 * a new file is picked up on the next build.
 */
function findCardImage(id: string): string | undefined {
  for (const ext of EXTENSIONS) {
    if (existsSync(join(CARDS_DIR, `${id}${ext}`))) return `/cards/${id}${ext}`;
  }
  return undefined;
}

/**
 * Who We Serve.
 *
 * A Server Component that hands real content to the reusable
 * `<CardsSection>`; only the interaction lives on the client.
 */
export function Industries() {
  const cards: HoverCardItem[] = INDUSTRIES.map((card) => {
    const image = findCardImage(card.id);
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
