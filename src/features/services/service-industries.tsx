import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Industries served.
 *
 * Thirteen short labels, so pills rather than cards — cards at this count
 * would take three screens to say what a wrapped row says at a glance.
 */
export function ServiceIndustries({
  heading,
  items,
  note,
  tone = "default",
}: {
  heading: string;
  items: readonly string[];
  note: string;
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-y border-border" : undefined}
    >
      <Container>
        <SectionHeading eyebrow="Who we build for" title={heading} />

        <Stagger as="ul" stagger={0.03} className="mt-12 flex flex-wrap gap-3">
          {items.map((item) => (
            <StaggerItem key={item} as="li">
              <span
                className={cn(
                  "text-body-sm block rounded-pill border border-border",
                  "bg-surface px-5 py-2.5 text-fg-muted",
                  "transition-[color,border-color,transform]",
                  "duration-(--duration-fast) ease-(--ease-out-quart)",
                  "hover:-translate-y-0.5 hover:border-accent/45 hover:text-fg",
                  "motion-reduce:hover:translate-y-0",
                )}
              >
                {item}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12}>
          <p className="font-display text-heading-md mt-10 max-w-2xl text-balance text-accent">
            {note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
