import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { INTRO_STATEMENT } from "@/constants/home";

/**
 * Editorial positioning statement.
 *
 * Website A gives its manifesto copy a full section at display size with no
 * competing elements. The words reveal individually as the block scrolls in.
 */
export function IntroStatement() {
  return (
    <Section>
      <Container>
        <Reveal>
          <p className="text-label mb-8 uppercase text-accent">
            {INTRO_STATEMENT.eyebrow}
          </p>
        </Reveal>

        <TextReveal
          as="p"
          text={INTRO_STATEMENT.statement}
          className="font-display text-display-lg max-w-5xl text-fg"
        />

        <Reveal delay={0.15}>
          <p className="text-body-lg mt-10 max-w-2xl text-fg-muted">
            {INTRO_STATEMENT.supporting}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
