import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Photograph behind a whole section.
 *
 * Sits at `-z-10` inside a `relative isolate` section, so it paints over the
 * section's own background but under its content. `isolate` on `<Section>` is
 * what keeps that negative index from escaping and sliding behind the page.
 *
 * It replaces the blueprint grid rather than joining it — the two patterns
 * compete — so a section carrying one should not also set `backdrop` on
 * `<Section>`.
 *
 * The scrim is flat rather than directional because the content above these
 * runs the full width: a left-to-right gradient would leave whatever sits on
 * the right sitting on the busiest part of the image. The vertical fade on top
 * of it keeps the photograph from butting hard against the section borders.
 */
export function SectionBackdrop({
  src,
  tone = "subtle",
}: {
  src: string;
  /** Must match the section's own tone, or the scrim will not blend into it. */
  tone?: "default" | "subtle";
}) {
  const subtle = tone === "subtle";

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className={cn(
          "absolute inset-0",
          subtle ? "bg-bg-subtle/88" : "bg-bg/88",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b via-transparent",
          subtle ? "from-bg-subtle to-bg-subtle" : "from-bg to-bg",
        )}
      />
    </div>
  );
}
