import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  /** `content` caps at 1280px, `wide` at 1536px. */
  size?: "content" | "wide";
  as?: ElementType;
};

/**
 * Horizontal page frame. Owns the fluid gutter so no section sets its own
 * left/right padding — which is what keeps the vertical alignment of every
 * section edge identical across breakpoints.
 */
export function Container({
  className,
  size = "content",
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        size === "wide" ? "container-wide" : "container-content",
        className,
      )}
      {...props}
    />
  );
}
