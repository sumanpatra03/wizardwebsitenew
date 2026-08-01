import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { STATS, STATS_CAPTION } from "@/constants/stats";

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
          className="grid gap-10 border-y border-border py-14 sm:grid-cols-3 sm:gap-0"
        >
          {STATS.map((stat, index) => (
            <StaggerItem
              key={stat.label}
              className={
                index > 0 ? "sm:border-l sm:border-border sm:pl-8" : "sm:pr-8"
              }
            >
              <p className="font-display text-display-xl leading-none text-fg">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-body-lg mt-3 text-fg-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="text-body-base mt-8 text-fg-subtle">{STATS_CAPTION}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
