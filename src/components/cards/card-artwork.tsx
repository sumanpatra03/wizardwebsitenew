import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { CARD_ICONS, type CardIconName } from "./card-icons";

/**
 * Generated card artwork — the stand-in until real photography exists.
 *
 * Composes a cinematic-feeling frame from CSS alone: a graded base, two soft
 * colour blooms, a light streak, a fine grid, a large icon silhouette and a
 * vignette. Each card gets a different bloom placement and hue offset from its
 * index, so the set varies while staying visibly one system.
 *
 * Costs no network request and no layout, and it recolours with the theme.
 * A card that supplies `image` bypasses this entirely — see `HoverCard`.
 */

/** Per-card variation: bloom positions and a hue offset from brand cyan. */
const VARIANTS = [
  { ax: "18%", ay: "22%", bx: "82%", by: "78%", hue: 0 },
  { ax: "78%", ay: "18%", bx: "22%", by: "82%", hue: -14 },
  { ax: "26%", ay: "78%", bx: "74%", by: "26%", hue: 12 },
  { ax: "70%", ay: "72%", bx: "24%", by: "20%", hue: -26 },
  { ax: "50%", ay: "16%", bx: "50%", by: "88%", hue: 22 },
] as const;

type CardArtworkProps = {
  icon: CardIconName;
  index: number;
  className?: string;
};

export function CardArtwork({ icon, index, className }: CardArtworkProps) {
  const Icon = CARD_ICONS[icon];
  // Non-null: index is taken modulo the array length.
  const v = VARIANTS[index % VARIANTS.length]!;

  const style = {
    "--bloom-a-x": v.ax,
    "--bloom-a-y": v.ay,
    "--bloom-b-x": v.bx,
    "--bloom-b-y": v.by,
    "--art-hue": `${v.hue}deg`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn("absolute inset-0 overflow-hidden bg-ink-950", className)}
    >
      {/* Colour blooms. Hue-rotating the whole layer keeps every card on the
          same cyan family while giving each its own temperature. */}
      <div
        className="absolute inset-0 [filter:hue-rotate(var(--art-hue))]"
        style={{
          backgroundImage: `
            radial-gradient(58% 62% at var(--bloom-a-x) var(--bloom-a-y), rgb(56 190 231 / 0.85) 0%, transparent 70%),
            radial-gradient(52% 58% at var(--bloom-b-x) var(--bloom-b-y), rgb(28 122 152 / 0.8) 0%, transparent 72%),
            linear-gradient(150deg, rgb(13 24 31) 0%, rgb(28 62 78) 55%, rgb(12 18 23) 100%)
          `,
        }}
      />

      {/* Fine grid, tying the artwork to the site's blueprint motif. */}
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* Anamorphic light streak. */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />

      <Icon
        strokeWidth={0.9}
        className="absolute -right-6 -bottom-8 size-44 text-white/12 sm:size-56"
      />

      {/* Vignette, so the frame reads as a photograph rather than a swatch.
          Kept light — the panel already carries a scrim and a bottom gradient
          on top of this, and stacking three darkening layers turned the
          artwork to mud. */}
      <div className="absolute inset-0 [background:radial-gradient(78%_78%_at_50%_42%,transparent_40%,rgb(0_0_0/0.38)_100%)]" />
    </div>
  );
}
