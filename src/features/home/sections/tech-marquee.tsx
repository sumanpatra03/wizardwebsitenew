import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_COPY } from "@/constants/home";
import { TECH_CATEGORIES, TECH_MARQUEE_ITEMS } from "@/constants/tech-stack";

/**
 * Technology ticker.
 *
 * Two counter-scrolling rails give the band movement without demanding
 * attention. The rails are decorative; the same stack is listed as real,
 * readable text underneath, so nothing is only available in motion.
 */
export function TechMarquee() {
  const half = Math.ceil(TECH_MARQUEE_ITEMS.length / 2);
  const topRow = TECH_MARQUEE_ITEMS.slice(0, half);
  const bottomRow = TECH_MARQUEE_ITEMS.slice(half);

  return (
    <Section spacing="sm" tone="subtle" className="border-y border-border">
      <Container size="wide">
        <Reveal>
          <p className="text-label mb-8 text-center uppercase text-fg-subtle">
            {SECTION_COPY.tech.title}
          </p>
        </Reveal>
      </Container>

      <div className="flex flex-col gap-5">
        <Marquee items={topRow} durationSeconds={52} />
        <Marquee items={bottomRow} durationSeconds={46} reverse />
      </div>

      <Container size="wide">
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_CATEGORIES.map((category) => (
            <li key={category.label}>
              <h3 className="text-label mb-2.5 uppercase text-accent">
                {category.label}
              </h3>
              <p className="text-body-sm text-fg-muted">
                {category.items.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
