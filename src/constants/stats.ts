import type { Stat } from "@/types/content";

/** Headline figures published on wizardcomm.net's About page. */
export const STATS: readonly Stat[] = [
  { value: 200, suffix: "+", label: "Successful Projects" },
  { value: 16, suffix: "+", label: "Years In The Business" },
  { value: 100, suffix: "+", label: "Happy Customers" },
] as const;

/** Supporting line beneath the stats band. */
export const STATS_CAPTION =
  "200+ satisfied clients from across the world and industries.";
