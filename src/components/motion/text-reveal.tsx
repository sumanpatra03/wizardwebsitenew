"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

import {
  maskUp,
  staggerContainer,
  viewportOnce,
  wordReveal,
} from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** Plain text — it is split into words internally. */
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
};

/**
 * Word-by-word reveal for editorial statements.
 *
 * Each word animates opacity, a small vertical offset and a blur. The words
 * stay as real text nodes separated by spaces, so selection, search and
 * screen-reader output are unaffected.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "p",
  stagger = 0.028,
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {words.map((word, index) => (
        <motion.span
          // Words repeat within a sentence, so index is part of the key.
          key={`${word}-${index}`}
          variants={wordReveal}
          className="inline-block will-change-[transform,opacity,filter]"
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

type MaskRevealProps = {
  /** Each entry becomes one masked line. */
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: ElementType;
  delay?: number;
};

/**
 * Display-type reveal: every line slides up from behind its own overflow
 * mask, the way Website A introduces its hero headline.
 *
 * The accessible name comes from `aria-label` on the heading itself, not from
 * a visually hidden copy of the string. Both read identically to assistive
 * tech, but the sr-only copy also put the text into the DOM twice, so every
 * <h1> on the site reported its own headline twice to crawlers and SEO
 * audits — "Digital & Beyond" appearing twice in the home page heading, and
 * the same on every inner page. With `aria-label` the text is present once.
 */
export function MaskReveal({
  lines,
  className,
  lineClassName,
  as: Tag = "h2",
  delay = 0,
}: MaskRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const full = lines.join(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{full}</Tag>;
  }

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      aria-label={full}
      variants={staggerContainer(0.09, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          // pb/-mb gives descenders room so the mask does not clip them.
          className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            variants={maskUp}
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
            {/* Keeps the lines from concatenating into one run-on word when
                a crawler reads the element's text content. Collapsed by the
                block layout, so nothing shifts visually. */}
            {index < lines.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
