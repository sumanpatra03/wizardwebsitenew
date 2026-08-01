import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Card surface.
 *
 * The `interactive` variant adds the lift-and-glow hover taken from Website
 * A's case-study cards. Both the lift and the glow animate `transform` /
 * `box-shadow` only, and the lift is dropped under `prefers-reduced-motion`.
 */
const cardVariants = cva(
  [
    "relative isolate overflow-hidden rounded-xl border border-border bg-surface",
    "transition-[transform,box-shadow,border-color,background-color]",
    "duration-(--duration-fast) ease-(--ease-out-quart)",
  ],
  {
    variants: {
      variant: {
        default: "shadow-card",
        flat: "shadow-none",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      interactive: {
        true: [
          "group/card cursor-pointer",
          "hover:-translate-y-1 hover:border-accent/45 hover:shadow-card-hover",
          "focus-within:-translate-y-1 focus-within:border-accent/45",
          "motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0",
        ],
        false: "",
      },
    },
    defaultVariants: { variant: "default", interactive: false },
  },
);

export type CardProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardVariants>;

export function Card({ className, variant, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn("font-display text-heading-md text-fg", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-body-sm text-fg-muted", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />
  );
}

export { cardVariants };
