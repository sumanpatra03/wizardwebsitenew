import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { TechChip } from "@/constants/service-pages";
import { cn } from "@/lib/utils";

import { SectionBackdrop } from "./section-backdrop";

/**
 * Technology stack, grouped by layer.
 *
 * Each technology is a chip carrying its published logo on a light tile, for
 * the same reason the client carousel does: these are third-party brand marks
 * drawn for a white page, and several of them — .NET, Python, WordPress — are
 * dark ink on transparency that would disappear entirely on this site's dark
 * canvas.
 *
 * Logos render at 24px. The source files vary wildly, from a 2560px Azure mark
 * down to a 33px React icon, and 24px is the largest size the smallest of them
 * can fill without visibly softening. The name is set beside the mark rather
 * than relying on it, so the chip still reads if a logo is unfamiliar.
 */
export function TechStack({
  heading,
  lead,
  groups,
  backdrop,
  tone = "subtle",
}: {
  heading: string;
  lead?: string;
  groups: readonly { label: string; chips: readonly TechChip[] }[];
  /** Photograph behind the section, in place of the blueprint grid. */
  backdrop?: string;
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle" && !backdrop}
      className={cn(
        tone === "subtle" && "border-y border-border",
        backdrop && "relative overflow-hidden",
      )}
    >
      {backdrop ? <SectionBackdrop src={backdrop} tone={tone} /> : null}

      <Container>
        <SectionHeading eyebrow="Built with" title={heading} description={lead} />

        <div className="mt-14 flex flex-col gap-10">
          {groups.map((group) => (
            <div
              key={group.label}
              className="grid gap-5 md:grid-cols-12 md:items-start md:gap-8"
            >
              <Reveal className="md:col-span-3">
                <h3 className="text-label uppercase text-fg-subtle">
                  {group.label}
                </h3>
              </Reveal>

              <Stagger
                as="ul"
                stagger={0.04}
                className="flex flex-wrap gap-3 md:col-span-9"
              >
                {group.chips.map((chip) => (
                  <StaggerItem key={chip.name} as="li">
                    <span
                      className={cn(
                        "group/chip flex items-center gap-3 rounded-pill",
                        "border border-border bg-surface py-2 pr-5 pl-2",
                        "transition-[transform,border-color]",
                        "duration-(--duration-fast) ease-(--ease-out-quart)",
                        "hover:-translate-y-0.5 hover:border-accent/45",
                        "motion-reduce:hover:translate-y-0",
                      )}
                    >
                      {/* Light tile — these marks were drawn for a white
                          page and most vanish without one. */}
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-pill",
                          "bg-white ring-1 ring-ink-950/8",
                        )}
                      >
                        <Image
                          src={chip.logo}
                          alt=""
                          width={48}
                          height={48}
                          className="size-6 object-contain"
                        />
                      </span>

                      <span className="text-body-sm font-medium whitespace-nowrap text-fg">
                        {chip.name}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
