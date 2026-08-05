import { ArrowUpRight, Minus } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { SectionBackdrop } from "./section-backdrop";

type OutcomeList = { heading: string; items: readonly string[] };

/**
 * Problem / outcome panel.
 *
 * Where a service publishes both — the pain today and the result afterwards —
 * they sit side by side, because the pairing is the argument. Where only the
 * outcomes exist the benefits panel runs full width rather than being padded
 * out with a column of invented complaints.
 *
 * The two sides are deliberately not styled alike: the problems are muted with
 * a dash, the outcomes accented with an arrow, so which column is which is
 * legible before a word is read.
 *
 * An optional `backdrop` photograph sits behind the whole section. It replaces
 * the blueprint grid rather than joining it — the two patterns compete — and
 * carries a scrim heavy enough to keep the panels and the closing line at AA.
 */
export function ServiceOutcomes({
  heading,
  lead,
  problems,
  benefits,
  closing,
  backdrop,
  tone = "subtle",
}: {
  heading: string;
  lead?: string;
  problems?: OutcomeList;
  benefits: OutcomeList;
  closing?: string;
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
        <Reveal className="max-w-3xl">
          <h2 className="text-display-lg text-balance text-fg">{heading}</h2>
          {lead ? (
            <p className="text-body-lg mt-6 text-fg-muted">{lead}</p>
          ) : null}
        </Reveal>

        <div
          className={cn(
            "mt-12 grid gap-4",
            problems ? "lg:grid-cols-2" : undefined,
          )}
        >
          {problems ? (
            <Card variant="flat" className="bg-bg/40 p-7 sm:p-8">
              <h3 className="text-label uppercase text-fg-subtle">
                {problems.heading}
              </h3>
              <Stagger as="ul" stagger={0.05} className="mt-6 flex flex-col gap-3.5">
                {problems.items.map((item) => (
                  <StaggerItem
                    key={item}
                    as="li"
                    className="text-body-base flex items-start gap-3 text-fg-muted"
                  >
                    <Minus
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-fg-subtle"
                    />
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          ) : null}

          <Card
            className={cn(
              "border-accent/25 bg-bg-elevated p-7 sm:p-8",
              // The mesh is what stops the accented panel reading as a flat
              // block of colour beside the muted one.
              "bg-mesh",
            )}
          >
            <h3 className="text-label uppercase text-accent">
              {benefits.heading}
            </h3>
            <Stagger
              as="ul"
              stagger={0.05}
              delay={0.08}
              className={cn(
                "mt-6 grid gap-3.5",
                !problems && benefits.items.length > 4 ? "sm:grid-cols-2" : undefined,
              )}
            >
              {benefits.items.map((item) => (
                <StaggerItem
                  key={item}
                  as="li"
                  className="text-body-base flex items-start gap-3 text-fg"
                >
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-accent"
                  />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </Card>
        </div>

        {closing ? (
          <Reveal delay={0.15}>
            {/* `display-md` for the same reason as the feature titles: there
                is no `heading-lg` step in the scale, so that class was inert
                and this closing line sat at body size. */}
            <p className="font-display text-display-md mt-12 max-w-3xl text-balance text-accent">
              {closing}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
