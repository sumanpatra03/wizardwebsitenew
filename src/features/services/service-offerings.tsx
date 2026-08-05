import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import type { ServiceItem } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

/**
 * The list of things a service actually delivers.
 *
 * Numbered rather than icon-led. These lists run to ten entries on Custom
 * Software, and inventing ten distinct icons for "Enterprise Applications" and
 * "Web Application Development" would produce ten near-identical glyphs that
 * carry no information — a sequence at least tells you where you are in the
 * list.
 */
export function ServiceOfferings({
  heading,
  lead,
  items,
  tone = "default",
}: {
  heading: string;
  lead?: string;
  items: readonly ServiceItem[];
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-y border-border" : undefined}
    >
      <Container>
        <SectionHeading eyebrow="What we offer" title={heading} description={lead} />

        <Stagger
          stagger={0.05}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <Card interactive className="h-full p-7">
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-display text-heading-sm block text-accent/45",
                    "transition-colors duration-(--duration-fast)",
                    "group-hover/card:text-accent",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-heading-md mt-5 text-balance text-fg">
                  {item.title}
                </h3>
                <p className="text-body-sm mt-3 text-fg-muted">{item.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
