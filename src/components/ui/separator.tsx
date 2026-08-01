import { cn } from "@/lib/utils";

type SeparatorProps = React.ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical";
  /** Fade the rule out toward both ends. */
  soft?: boolean;
};

export function Separator({
  className,
  orientation = "horizontal",
  soft = false,
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        soft ? "rule-x" : "bg-border",
        className,
      )}
      {...props}
    />
  );
}
