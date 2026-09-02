import { FileText, Lightbulb, Rss, type LucideIcon } from "lucide-react";

/**
 * Resources.
 *
 * The section exists as a parent category in the global navigation; the three
 * streams below are its children. Nothing has been published to any of them
 * yet, and this file deliberately does not invent posts to fill the page —
 * fabricated articles under the company's name are worse than an honest empty
 * state.
 *
 * When content arrives, give each stream its own route under
 * `/resources/<slug>`, point `RESOURCE_STREAMS[].href` at it, and update
 * `RESOURCE_LINKS` in `navigation.ts` from the anchors to those routes.
 */

export type ResourceStream = {
  /** Anchor id — the navigation links to `/resources#<id>`. */
  id: string;
  title: string;
  summary: string;
  /** What a reader will find here once it is published. */
  covers: readonly string[];
  icon: LucideIcon;
};

export const RESOURCES_INDEX = {
  eyebrow: "Resources",
  titleLines: ["What we've learned,", "written down."],
  lead: "Notes, analysis and long-form pieces from the people doing the work — engineering, delivery, design and the decisions in between.",
  body: "Three streams, one place. Each covers a different distance: quick notes from live projects, patterns we keep seeing across client work, and the longer pieces worth sitting down with.",
} as const;

export const RESOURCE_STREAMS: readonly ResourceStream[] = [
  {
    id: "blog",
    title: "Blog",
    summary:
      "Short notes from the team as we build — the problem in front of us, what we tried, and what actually worked.",
    covers: [
      "Engineering notes from live projects",
      "Tooling and platform decisions",
      "Behind the scenes on product releases",
    ],
    icon: Rss,
  },
  {
    id: "insights",
    title: "Insights",
    summary:
      "Patterns we keep seeing across client work, and what they mean for the organisations on the other side of them.",
    covers: [
      "Industry and technology trends",
      "Lessons from delivery across sectors",
      "Where budgets and timelines really go",
    ],
    icon: Lightbulb,
  },
  {
    id: "articles",
    title: "Articles",
    summary:
      "Longer pieces on technology, architecture and delivery — written to be read end to end, not skimmed.",
    covers: [
      "Deep dives on architecture and scale",
      "Guides for teams evaluating a build",
      "Case notes written up in full",
    ],
    icon: FileText,
  },
];

/** Shown in place of a post list until each stream has something in it. */
export const RESOURCES_EMPTY_STATE = {
  label: "Nothing published yet",
  body: "This stream is being written now. Tell us what would be useful to read and we will start there.",
  cta: { label: "Suggest a topic", href: "/contact" },
} as const;
