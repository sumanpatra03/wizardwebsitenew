import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Framed artwork for a `<PageHero>`'s `aside` column.
 *
 * The treatment the service, product and career heroes already use, in one
 * place: an accent bloom behind the frame so the image is not a flat rectangle
 * on the dark canvas, a border, and a light scrim that settles it into the
 * page.
 *
 * For a photograph. Transparent illustrations want the opposite — no frame, no
 * scrim, nothing to box in artwork that has no edges — so those pass a bare
 * `<Image>` to `aside` instead.
 */
export function HeroImage({
  src,
  alt = "",
  /** Matches the source's own ratio, so nothing is cropped. */
  aspect = "16/9",
  className,
}: {
  src: string;
  /** Empty by default: the `<h1>` beside it usually says the same thing. */
  alt?: string;
  aspect?: "16/9" | "3/2";
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
          "bg-accent/12 blur-3xl",
        )}
      />

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-border",
          "shadow-card",
          aspect === "3/2" ? "aspect-[3/2]" : "aspect-[16/9]",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          // The larger of the two hero columns from `lg`, near-full width
          // below it.
          sizes="(min-width: 1024px) 54vw, 92vw"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg/35 to-transparent"
        />
      </div>
    </div>
  );
}
