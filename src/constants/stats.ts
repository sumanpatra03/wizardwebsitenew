import type { Stat } from "@/types/content";

/** Headline figures, with the supporting line shown beneath each. */
export const STATS: readonly Stat[] = [
  {
    value: 22,
    suffix: "yrs",
    label: "Years In The Business",
    description: "Building since 2004, through every platform shift, still shipping.",
  },
  {
    value: 200,
    suffix: "+",
    label: "Successful Projects",
    description: "Projects delivered across corporate, government and startups.",
  },
  {
    value: 150,
    suffix: "+",
    label: "Happy Customers",
    description:
      "Web/Mobile apps and Live websites in production, from single-page brands to platforms.",
  },
] as const;

/** Supporting line beneath the stats band. */
export const STATS_CAPTION =
  "200+ satisfied clients from across the world and industries.";
