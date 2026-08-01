import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary.
 *
 * Every animation on the site composes these, so timing and easing stay
 * consistent and tunable from one place. Values mirror the `--duration-*` and
 * `--ease-*` tokens in `tokens.css`.
 *
 * Only `opacity` and `transform` are ever animated — both are compositor
 * properties, which is what keeps scroll reveals at 60 FPS.
 */

/** cubic-bezier(0.16, 1, 0.3, 1) — the site's default "arrival" curve. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeInOutSoft = [0.65, 0, 0.35, 1] as const;

export const transitions = {
  fast: { duration: 0.24, ease: easeOutQuart },
  base: { duration: 0.48, ease: easeOutExpo },
  slow: { duration: 0.8, ease: easeOutExpo },
} satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

/** A line of display type sliding up from behind its own overflow mask. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Single word in a `TextReveal`. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const directionVariants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  none: fadeIn,
  scale: scaleIn,
} satisfies Record<string, Variants>;

export type RevealDirection = keyof typeof directionVariants;

/**
 * Parent variant that cascades children.
 *
 * @param stagger Gap between each child, in seconds.
 * @param delay   Delay before the first child starts.
 */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/**
 * `whileInView` config for a single element: fire once, when a quarter of it
 * has entered, slightly before it is fully on screen.
 */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" };

/**
 * `whileInView` config for a stagger *container*.
 *
 * A proportional `amount` is wrong here. A seven-card grid is ~2800px tall on
 * a phone, so `amount: 0.25` would demand 700px of it be visible at once —
 * close to the whole viewport — and the cards would sit blank on screen until
 * the user had scrolled well past them. `"some"` fires as soon as the
 * container's leading edge crosses the margin, independent of its height.
 */
export const viewportContainer = {
  once: true,
  amount: "some",
  margin: "0px 0px -8% 0px",
} as const;
