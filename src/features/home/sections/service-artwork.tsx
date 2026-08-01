import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Generated card artwork.
 *
 * Website A fills the lower half of each card with a commissioned
 * illustration. With none to license, each service instead gets a composed
 * SVG in Wizard's own house style — the circuit-trace-with-nodes motif from
 * their capabilities banner — with the service icon set large behind it.
 *
 * Deterministic: the composition is chosen by index, so a given service always
 * draws the same artwork, and it renders identically on server and client.
 *
 * Pure SVG and CSS. No image requests, no layout cost, and it recolours with
 * the theme.
 */

type Composition = {
  /** Circuit trace across a 320x240 viewBox. */
  trace: string;
  /** Junction points drawn as rings. */
  nodes: readonly (readonly [number, number])[];
  /** Scattered solid squares, as [x, y, size]. */
  squares: readonly (readonly [number, number, number])[];
};

const COMPOSITIONS: readonly Composition[] = [
  {
    trace: "M12 196 L78 196 L112 132 L176 132 L208 66 L308 66",
    nodes: [
      [78, 196],
      [176, 132],
      [208, 66],
    ],
    squares: [
      [136, 176, 9],
      [154, 194, 6],
      [116, 200, 5],
    ],
  },
  {
    trace: "M12 64 L72 64 L104 128 L168 128 L198 192 L308 192",
    nodes: [
      [72, 64],
      [168, 128],
      [198, 192],
    ],
    squares: [
      [128, 84, 8],
      [146, 66, 5],
      [110, 96, 6],
    ],
  },
  {
    trace: "M12 128 L58 128 L92 76 L142 76 L172 162 L232 162 L262 108 L308 108",
    nodes: [
      [58, 128],
      [142, 76],
      [232, 162],
    ],
    squares: [
      [190, 128, 9],
      [206, 110, 5],
      [172, 112, 6],
    ],
  },
  {
    trace: "M12 204 L72 204 L104 150 L154 150 L184 88 L244 88 L274 44 L308 44",
    nodes: [
      [104, 150],
      [184, 88],
      [244, 88],
    ],
    squares: [
      [138, 188, 8],
      [156, 206, 5],
      [120, 196, 6],
    ],
  },
  {
    trace: "M12 100 L80 100 L112 164 L184 164 L214 100 L308 100",
    nodes: [
      [80, 100],
      [184, 164],
      [214, 100],
    ],
    squares: [
      [142, 118, 9],
      [162, 100, 5],
      [124, 132, 6],
    ],
  },
  {
    trace: "M12 162 L58 162 L90 110 L134 110 L164 58 L214 58 L244 122 L308 122",
    nodes: [
      [90, 110],
      [164, 58],
      [244, 122],
    ],
    squares: [
      [186, 150, 8],
      [204, 168, 5],
      [168, 160, 6],
    ],
  },
  {
    trace: "M12 58 L92 58 L124 122 L192 122 L222 184 L308 184",
    nodes: [
      [92, 58],
      [192, 122],
      [222, 184],
    ],
    squares: [
      [150, 96, 9],
      [168, 78, 5],
      [132, 108, 6],
    ],
  },
];

type ServiceArtworkProps = {
  icon: LucideIcon;
  /** Position in the grid; selects the composition and the colourway. */
  index: number;
  className?: string;
};

export function ServiceArtwork({
  icon: Icon,
  index,
  className,
}: ServiceArtworkProps) {
  // Non-null: index is taken modulo the array length.
  const composition = COMPOSITIONS[index % COMPOSITIONS.length]!;
  // Alternate colourways so the grid has the rhythm Website A gets from
  // alternating light and dark cards.
  const accented = index % 2 === 1;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 320 240"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <path
          d={composition.trace}
          stroke={accented ? "var(--accent)" : "var(--fg-subtle)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={accented ? 0.55 : 0.4}
        />

        {composition.nodes.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="7"
            stroke={accented ? "var(--accent)" : "var(--fg-subtle)"}
            strokeWidth="2.5"
            fill="var(--surface)"
            opacity={accented ? 0.8 : 0.55}
          />
        ))}

        {composition.squares.map(([x, y, size]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={size}
            height={size}
            fill={accented ? "var(--accent)" : "var(--fg-subtle)"}
            opacity={accented ? 0.5 : 0.35}
          />
        ))}
      </svg>

      <Icon
        aria-hidden="true"
        strokeWidth={1.1}
        className={cn(
          "absolute right-5 bottom-4 size-24 sm:size-28",
          "transition-transform duration-(--duration-base) ease-(--ease-out-expo)",
          "group-hover/card:scale-105 motion-reduce:group-hover/card:scale-100",
          accented ? "text-accent/50" : "text-fg-subtle/40",
        )}
      />
    </div>
  );
}
