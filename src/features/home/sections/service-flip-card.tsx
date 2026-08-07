"use client";

import { RotateCw } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ServiceFlipCardProps = {
  /** Names the card for assistive tech and for the control's label. */
  title: string;
  titleId: string;
  height: string;
  /** The two faces, rendered on the server and passed straight through. */
  children: ReactNode;
};

/**
 * The turning shell of a service card.
 *
 * A Client Component only because the turn now has to be triggerable, not just
 * hoverable. Both faces are still rendered on the server and passed through as
 * children, so the card's copy and its icon never cross the serialisation
 * boundary — the same arrangement `Reveal` uses.
 *
 * ## Why a control at all
 *
 * The desktop card turns on hover. A touch device has no hover, which left the
 * back face — where every capability list lives — reachable only by tabbing to
 * the Explore link. The control makes it a first-class action on the layout
 * that needs it, and hides itself from `sm` up where hover takes over.
 *
 * Touch browsers emulate `:hover` and leave it applied after a tap, which
 * would otherwise fight the control — tapping to close would clear the state
 * while a stale hover held the card turned. Tailwind v4 already emits every
 * `hover:` rule inside `@media (hover: hover)`, so a pointer that cannot
 * genuinely hover never matches and the two never collide.
 */
export function ServiceFlipCard({
  title,
  titleId,
  height,
  children,
}: ServiceFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      aria-labelledby={titleId}
      data-flipped={flipped}
      className={cn(
        "group/card relative perspective-[1600px]",
        height,
        "transition-transform duration-(--duration-fast)",
        "ease-(--ease-out-quart) hover:-translate-y-1",
        "has-[a:focus-visible]:-translate-y-1",
        "motion-reduce:translate-none motion-reduce:transition-none",
      )}
    >
      {/* Sits above the turning box rather than on a face, so it stays put
          and stays readable through the turn. */}
      <button
        type="button"
        onClick={() => setFlipped((open) => !open)}
        aria-expanded={flipped}
        aria-controls={titleId}
        aria-label={
          flipped
            ? `Hide details for ${title}`
            : `Show details for ${title}`
        }
        className={cn(
          "absolute top-3 right-3 z-10 flex items-center gap-1.5",
          "rounded-pill border border-border-strong bg-bg/85 px-3 py-1.5",
          "text-label uppercase text-fg-muted backdrop-blur-sm",
          "transition-colors duration-(--duration-fast)",
          "active:border-accent active:text-accent",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-ring",
          // Hover takes over from `sm` up, where the grid returns.
          "sm:hidden",
        )}
      >
        <RotateCw
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-(--duration-base)",
            "ease-(--ease-out-quart)",
            flipped && "rotate-180",
            "motion-reduce:transition-none",
          )}
        />
        Tap
      </button>

      <div
        className={cn(
          "relative size-full rounded-xl transform-3d",
          // Symmetric ease, not the site's usual out-expo. Expo is so
          // front-loaded that the card reached 176 degrees in the first
          // 400ms of 750 — the turn was over before the eye could follow it.
          "transition-transform duration-[700ms]",
          "ease-(--ease-in-out-soft)",
          "group-hover/card:rotate-y-180",
          // Keyboard access to the back face, scoped to a focused *link*
          // rather than to focus anywhere inside the card. Plain
          // `group-focus-within` also matched the tap control above, which
          // sits inside this group — so the first tap turned the card and
          // then held it turned, and tapping again cleared the state while
          // the card stayed at 180.
          "group-has-[a:focus-visible]/card:rotate-y-180",
          "group-data-[flipped=true]/card:rotate-y-180",
          "motion-reduce:transition-none",
        )}
      >
        {children}
      </div>
    </article>
  );
}
