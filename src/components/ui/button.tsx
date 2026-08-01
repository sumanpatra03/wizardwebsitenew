import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Button.
 *
 * Pill radius is the site's signature shape. The `group` class lets the arrow
 * icon in `<ButtonArrow>` react to hover without extra JS.
 *
 * Server-safe: no hooks, no event handlers of its own.
 */
const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium rounded-pill select-none",
    "transition-[background-color,color,border-color,transform,box-shadow]",
    "duration-(--duration-fast) ease-(--ease-out-quart)",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:scale-[0.985] motion-reduce:active:scale-100",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg hover:bg-accent-hover shadow-[0_0_0_0_var(--accent-ring)] hover:shadow-[0_0_0_6px_var(--accent-muted)]",
        secondary:
          "bg-fg text-bg hover:bg-fg/88",
        outline:
          "border border-border-strong bg-transparent text-fg hover:border-accent hover:text-accent hover:bg-accent-muted",
        ghost: "bg-transparent text-fg hover:bg-surface-hover",
        link: "h-auto rounded-sm p-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-body-sm",
        md: "h-11 px-6 text-body-sm",
        lg: "h-13 px-8 text-body-base",
        icon: "size-11 p-0",
      },
    },
    compoundVariants: [{ variant: "link", size: "md", class: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element instead of a `<button>`. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      // A bare <button> inside a form defaults to submit; be explicit.
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
