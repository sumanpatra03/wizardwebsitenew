"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ParallaxProps = {
  children: ReactNode;
  /** Total travel across the element's full scroll pass, in px. */
  distance?: number;
  className?: string;
};

/**
 * Scroll-linked vertical parallax.
 *
 * Drives `translateY` from the element's own progress through the viewport,
 * so it is frame-accurate and never fights the scroll position. Disabled
 * entirely for reduced-motion users.
 */
export function Parallax({
  children,
  distance = 80,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
