import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught our design system.
 *
 * Out of the box tailwind-merge only knows Tailwind's *default* scales. Our
 * theme replaces them wholesale, and without this config it misclassifies our
 * tokens — most damagingly it reads `text-body-base` (a font size) and
 * `text-accent-fg` (a colour) as the same class group and silently drops the
 * earlier one, so primary buttons lost their foreground colour entirely.
 *
 * Every custom key registered in `styles/tokens.css` and `styles/themes.css`
 * is mirrored here. Adding a token there means adding it here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // Semantic colours (themes.css) + brand/neutral ramps (tokens.css).
      color: [
        "bg",
        "bg-subtle",
        "bg-elevated",
        "surface",
        "surface-hover",
        "border",
        "border-strong",
        "fg",
        "fg-muted",
        "fg-subtle",
        "accent",
        "accent-hover",
        "accent-fg",
        "accent-muted",
        "accent-vivid",
        "ring",
        "brand",
        "ink",
      ],
      // Fluid type scale.
      text: [
        "display-2xl",
        "display-xl",
        "display-lg",
        "display-md",
        "heading-md",
        "heading-sm",
        "body-lg",
        "body-base",
        "body-sm",
        "label",
      ],
      radius: ["pill"],
      shadow: ["card", "card-hover", "overlay"],
      spacing: ["gutter", "section", "section-sm", "header"],
      ease: ["out-expo", "out-quart", "in-out-soft", "spring"],
      animate: [
        "marquee",
        "shimmer",
        "float",
        "accordion-down",
        "accordion-up",
        "overlay-in",
        "overlay-out",
        "beam-x",
        "beam-y",
      ],
      font: ["display", "sans", "mono"],
    },
  },
});

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * conflicting earlier ones. The standard `cn` helper used by every component.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
