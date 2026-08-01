import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/common/logo";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import { HERO } from "@/constants/home";
import { STATS } from "@/constants/stats";
import { cn } from "@/lib/utils";

import { HeroBackdrop } from "./hero-backdrop";

/**
 * Hero.
 *
 * Website A's opening move: an oversized editorial headline on an almost bare
 * canvas, with the artwork kept behind and below the type. Our stand-in for
 * their photography is a CSS gradient mesh over a blueprint grid — no image
 * request, and it recolours with the theme for free.
 *
 * Server Component; only the motion wrappers and the parallax backdrop are
 * client-side.
 */
export function Hero() {
  return (
    <section
      data-themed=""
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-header pb-16 sm:pb-20 lg:min-h-svh"
    >
      <HeroBackdrop />

      <Container size="wide" className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal direction="none">
              <p
                className={cn(
                  "text-label inline-flex items-center gap-2.5 rounded-pill",
                  "border border-border bg-surface/60 px-4 py-2 uppercase",
                  "text-fg-muted backdrop-blur-sm",
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-pill bg-accent"
                />
                {HERO.eyebrow}
              </p>
            </Reveal>

            {/* The headline is split into two masked lines that slide up in
                sequence, matching Website A's hero reveal. */}
            <MaskReveal
              as="h1"
              lines={["Digital", "& Beyond"]}
              delay={0.12}
              className="mt-7 text-display-2xl text-fg"
              lineClassName="[&>span]:inline-block"
            />

            <Reveal delay={0.45} className="mt-7 max-w-2xl">
              <p className="text-body-lg text-fg-muted">{HERO.subheadline}</p>
            </Reveal>

            <Reveal delay={0.58}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button asChild size="lg">
                    <Link href={HERO.primaryCta.href}>
                      {HERO.primaryCta.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:transform-none"
                      />
                    </Link>
                  </Button>
                </Magnetic>

                <Button asChild size="lg" variant="outline">
                  <Link href={HERO.secondaryCta.href}>
                    {HERO.secondaryCta.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Stat rail — proof points, right-aligned on desktop the way
              Website A anchors supporting figures beside its headline. */}
          <Stagger delay={0.7} stagger={0.1} className="lg:col-span-4">
            <ul className="flex flex-row flex-wrap gap-x-10 gap-y-6 lg:flex-col lg:items-end lg:gap-6">
              {STATS.map((stat) => (
                <StaggerItem key={stat.label} as="li" className="lg:text-right">
                  <p className="font-display text-display-md leading-none text-fg">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="text-body-sm mt-1.5 text-fg-muted">{stat.label}</p>
                </StaggerItem>
              ))}
            </ul>
          </Stagger>
        </div>
      </Container>

      {/* Watermark mark, bleeding off the bottom-right corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-16 hidden opacity-[0.06] lg:block"
      >
        <Logo markOnly className="[&>svg]:size-64" />
      </div>
    </section>
  );
}
