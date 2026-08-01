import { Archivo, Inter } from "next/font/google";

/**
 * Typefaces.
 *
 * Website A uses Graphik, a commercial licence we cannot ship. Archivo is the
 * closest open grotesque for display sizes; Inter handles UI and body copy.
 * Both are variable fonts, self-hosted by `next/font` (no runtime request to
 * Google), preloaded, and exposed as CSS variables consumed by `tokens.css`.
 */

// Loaded as a true variable font: no `weight` list, so the whole weight axis
// is available from one file rather than shipping several static cuts.
export const fontDisplay = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;
