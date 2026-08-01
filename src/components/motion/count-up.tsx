"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CountUpProps = {
  /** Final number to count to. */
  value: number;
  /** Rendered immediately after the number, e.g. "+". */
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Number that counts up once, when it first scrolls into view.
 *
 * The animated digits are `aria-hidden`; the finished value is exposed to
 * assistive tech up front so the figure is never announced mid-count.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion]);

  // Derived rather than pushed through state, so reduced-motion users get the
  // final figure on first paint with no extra render.
  const display = prefersReducedMotion ? value : animated;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {display}
        {suffix}
      </span>
    </span>
  );
}
