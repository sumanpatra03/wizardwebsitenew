import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-body-sm font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-fg-muted",
        accent: "border-accent/35 bg-accent-muted text-accent",
        outline: "border-border-strong bg-transparent text-fg-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
