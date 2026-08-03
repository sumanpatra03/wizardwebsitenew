import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { STATS } from "@/constants/stats";

/**
 * Proof-point band.
 *
 * Figures count up once as the band enters view. Dividers are drawn with
 * borders rather than extra elements, and only appear once the items sit on
 * one row, so the mobile stack stays clean.
 */
export function StatsBand() {
  return (
    <Section>
      <Container>
        <Stagger
          stagger={0.12}
          className="grid gap-10 border-y border-border py-14 sm:grid-cols-3 sm:gap-8"
        >
          {STATS.map((stat, index) => (
            <StaggerItem
              key={stat.label}
              className={
                index > 0 ? "sm:border-l sm:border-border sm:pl-8" : "sm:pr-2"
              }
            >
              <p className="font-display text-display-xl leading-none text-fg">
                <CountUp value={stat.value} suffix={stat.suffix} />
                {/* The figure alone is meaningless read aloud; this names it
                    without repeating the sentence below. */}
                <span className="sr-only"> {stat.label}</span>
              </p>
              <p className="text-body-base mt-4 max-w-xs text-fg-muted">
                {stat.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* The old caption ("200+ satisfied clients…") sat directly under a
            "200+" figure and repeated it. Each stat now carries its own line,
            so the caption has nothing left to add. The string is still in
            `constants/stats.ts` if it is wanted elsewhere. */}
      </Container>
    </Section>
  );
}
