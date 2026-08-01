import { cn } from "@/lib/utils";

/**
 * Loading placeholder with a sweeping shimmer.
 * The shimmer is a background-position animation, paused automatically by the
 * global `prefers-reduced-motion` rule in `globals.css`.
 */
export function Skeleton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-shimmer rounded-md bg-surface",
        "bg-[linear-gradient(90deg,var(--surface)_0%,var(--surface-hover)_50%,var(--surface)_100%)]",
        "bg-[length:200%_100%]",
        className,
      )}
      {...props}
    />
  );
}
