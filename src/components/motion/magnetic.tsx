"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
  className?: string;
};

/**
 * Cursor-attracted wrapper for primary CTAs.
 *
 * Pointer-driven only, so it never runs on touch devices (which have no
 * hover). Movement is spring-damped and resets on leave.
 */
export function Magnetic({ children, strength = 10, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
