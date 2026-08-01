"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

import {
  directionVariants,
  staggerContainer,
  viewportContainer,
  viewportOnce,
  type RevealDirection,
} from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the content travels from. */
  direction?: RevealDirection;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal.
 *
 * Fires once, slightly before the element fully enters the viewport, so the
 * motion reads as "already arriving" rather than "popping in late".
 *
 * `children` is a plain ReactNode, which means Server Components can be passed
 * straight through — only this wrapper ships to the client.
 *
 * Under `prefers-reduced-motion` the content renders in its final state with
 * no animation at all, never hidden.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={directionVariants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Gap between children, in seconds. */
  stagger?: number;
  delay?: number;
  as?: ElementType;
};

/**
 * Parent for a cascade of `<StaggerItem>` children.
 * Pair them; a `Reveal` inside a `Stagger` would animate independently.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: StaggerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      // Container config, not the per-element one — see the note on
      // `viewportContainer`.
      viewport={viewportContainer}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  as = "div",
}: Omit<RevealProps, "delay">) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={directionVariants[direction]}>
      {children}
    </MotionTag>
  );
}
