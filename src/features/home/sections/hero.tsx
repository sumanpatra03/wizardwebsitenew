import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
 * Website A's opening move — an oversized editorial headline on an almost bare
 * canvas — paired with Wizard's own capabilities illustration on the right.
 * Behind both sits a CSS gradient mesh over a blueprint grid, which needs no
 * network request and recolours with the theme.
 *
 * Server Component; only the motion wrappers and the parallax backdrop are
 * client-side.
 */
export function Hero() {
  // `bg-bg` below is load-bearing: it hides the fixed PageBackdrop so the hero
  // shows only its own parallax grid, rather than two grids stacked.
  return (
    <section
      data-themed=""
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-bg pt-header pb-16 sm:pb-20 lg:min-h-svh"
    >
      <HeroBackdrop />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
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

            <Reveal delay={0.45} className="mt-7 max-w-xl">
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
                        className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1 motion-reduce:translate-none"
                      />
                    </Link>
                  </Button>
                </Magnetic>

                <Button asChild size="lg" variant="outline">
                  <Link href={HERO.secondaryCta.href}>
                    {HERO.secondaryCta.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:translate-none"
                    />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Capabilities illustration.
              The source is white line art drawn for a dark canvas, so in the
              light theme it is inverted rather than duplicated — see the
              `data-invert-on-light` rule in globals.css. One file, no second
              request, and the transparency survives (filters leave alpha
              alone).

              The labels are baked into the pixels, so `alt` carries them for
              anyone who cannot see the image. */}
          <Reveal direction="scale" delay={0.35} className="lg:col-span-5">
            <Image
              src="/hero-capabilities.png"
              alt="Wizard's capabilities: eLearning solutions, digital commerce, web and mobile apps, strategy and development, and supply chain consulting."
              width={636}
              height={562}
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
              data-invert-on-light=""
              className="animate-float mx-auto h-auto w-full max-w-md lg:max-w-none"
            />
          </Reveal>
        </div>

        {/* Proof points, on their own row beneath both columns. */}
        {/* <Stagger
          delay={0.7}
          stagger={0.1}
          className="mt-14 border-t border-border pt-8 lg:mt-16"
        >
          <ul className="flex flex-row flex-wrap gap-x-12 gap-y-6 sm:justify-between sm:gap-x-6">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} as="li">
                <p className="font-display text-display-md leading-none text-fg">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-body-sm mt-1.5 text-fg-muted">{stat.label}</p>
              </StaggerItem>
            ))}
          </ul>
        </Stagger> */}
      </Container>
    </section>
  );
}
