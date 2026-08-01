import type { TechCategory } from "@/types/content";

/** Technology stack exactly as listed on wizardcomm.net. */
export const TECH_CATEGORIES: readonly TechCategory[] = [
  {
    label: "Languages & Frameworks",
    items: [
      ".NET",
      "NextJs",
      "NodeJs",
      "PHP",
      "Python",
      "ReactJS",
      "React Native",
      "Flutter",
    ],
  },
  { label: "Databases", items: ["MSSQL Server", "MySQL"] },
  { label: "Platforms", items: ["WordPress", "Azure", "AWS"] },
  {
    label: "Specializations",
    items: ["AI/ML", "Open AI", "BI", "UX/UI", "QA", "Full-stack", "CI/CD", "GIT"],
  },
] as const;

/** Flattened list driving the marquee ticker. */
export const TECH_MARQUEE_ITEMS: readonly string[] = TECH_CATEGORIES.flatMap(
  (category) => category.items,
);
