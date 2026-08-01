"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Theme provider.
 *
 * Dark is the true default: `defaultTheme="dark"` with `enableSystem={false}`
 * means a first-time visitor always lands in dark mode regardless of their OS
 * setting, and an explicit choice is persisted under `wizard-theme`.
 *
 * To honour the OS preference on a first visit instead, flip `enableSystem`
 * to `true` — `defaultTheme="dark"` then only applies when the system
 * expresses no preference.
 *
 * There is no theme flash: next-themes injects a blocking inline script that
 * resolves and applies the class before first paint. The matching SSR default
 * is set on <html> in `app/layout.tsx`.
 *
 * `disableTransitionOnChange` is intentionally OFF — `globals.css` defines a
 * narrow colour-only transition so the switch animates smoothly instead of
 * snapping, without the whole-page repaint that transitioning `*` causes.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="wizard-theme"
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
