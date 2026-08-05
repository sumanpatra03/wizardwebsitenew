import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Closing call to action for a service page.
 *
 * The same full-bleed accent moment the home page's `CtaBand` gives, but
 * carrying this service's own published closing line and button label — the
 * live pages each end on their own words, and replacing six of them with one
 * generic band would throw away the most persuasive copy on the page.
 */
export function ServiceCta({
  title,
  body,
  label,
  href = "/contact",
}: {
  title: string;
  body: string;
  label: string;
  href?: string;
}) {
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
            <h2 className="text-display-xl text-balance text-fg">{title}</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-body-lg mt-6 text-fg-muted">{body}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href={href}>
                    {label}
                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform duration-(--duration-fast)",
                        "group-hover:translate-x-1 motion-reduce:translate-none",
                      )}
                    />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
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
