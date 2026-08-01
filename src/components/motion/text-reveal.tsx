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
 * The visual lines are `aria-hidden`; a visually hidden copy of the full
 * string carries the accessible name so assistive tech reads one sentence.
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
      variants={staggerContainer(0.09, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <span className="sr-only">{full}</span>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          aria-hidden="true"
          // pb/-mb gives descenders room so the mask does not clip them.
          className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            variants={maskUp}
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
