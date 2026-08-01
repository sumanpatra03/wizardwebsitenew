"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Until hydration completes we cannot know the resolved theme, so a neutral
 * same-size placeholder renders first — that keeps the header from shifting
 * and avoids a hydration mismatch on the icon.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const base = cn(
    "relative grid size-10 shrink-0 place-items-center rounded-pill",
    "border border-border text-fg-muted",
    "transition-colors duration-(--duration-fast)",
    "hover:border-accent/50 hover:bg-accent-muted hover:text-accent",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className,
  );

  if (!mounted) {
    return <div className={base} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={base}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {/* Both icons stay mounted and cross-fade, so the swap animates
          instead of popping. */}
      <Sun
        aria-hidden="true"
        className={cn(
          "absolute size-[1.15rem] transition-all duration-(--duration-fast) ease-(--ease-out-quart)",
          isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "absolute size-[1.15rem] transition-all duration-(--duration-fast) ease-(--ease-out-quart)",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
