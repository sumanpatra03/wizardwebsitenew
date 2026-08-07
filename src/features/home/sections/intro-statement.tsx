import { ExpandableText } from "@/components/common/expandable-text";
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

        {/* No `max-w` cap: the statement is meant to run the full width of
            the content column so it reads as three long lines rather than a
            narrow seven-line block. */}
        <TextReveal
          as="p"
          text={INTRO_STATEMENT.statement}
          className="font-display text-display-md lg:text-display-lg text-fg"
        />

        {/* Only rendered when there is copy for it. An empty string still
            produced a paragraph carrying `mt-10` and a line box, which read
            as an unexplained gap under the statement. */}
        {INTRO_STATEMENT.supporting ? (
          <Reveal delay={0.15}>
            {/* Clamped to four lines. At full length this paragraph runs
                longer than the statement it is meant to support, which
                inverted the section's hierarchy. */}
            <ExpandableText
              text={INTRO_STATEMENT.supporting}
              lines={4}
              className="mt-10 max-w-2xl"
            />
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
