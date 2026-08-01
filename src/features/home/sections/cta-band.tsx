import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import { CTA_BAND } from "@/constants/home";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Closing call to action.
 *
 * The page's one full-bleed accent moment: mesh over grid, centred type, one
 * primary action, with the direct contact details underneath for anyone who
 * would rather not use a form.
 */
export function CtaBand() {
  return (
    <Section className="overflow-hidden">
      {/* No grid of its own — this section paints no background, so the fixed
          PageBackdrop grid and its beams already show through. */}
      <div
        aria-hidden="true"
        className="bg-mesh pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-label mb-6 uppercase text-accent">
              {CTA_BAND.eyebrow}
            </p>
          </Reveal>

          <MaskReveal
            as="h2"
            lines={["Let's build what's", "next, together."]}
            className="text-display-xl text-fg"
          />

          <Reveal delay={0.25}>
            <p className="text-body-lg mt-6 text-fg-muted">{CTA_BAND.body}</p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href={CTA_BAND.primaryCta.href}>
                    {CTA_BAND.primaryCta.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
                    />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <ul
              className={cn(
                "mt-12 flex flex-col items-center justify-center gap-4",
                "sm:flex-row sm:gap-10",
              )}
            >
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-body-sm inline-flex items-center gap-2.5 text-fg-muted transition-colors hover:text-accent"
                >
                  <Mail aria-hidden="true" className="size-4 text-accent" />
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.contact.phones[0].replace(/\s/g, "")}`}
                  className="text-body-sm inline-flex items-center gap-2.5 text-fg-muted transition-colors hover:text-accent"
                >
                  <Phone aria-hidden="true" className="size-4 text-accent" />
                  {SITE.contact.phones[0]}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
