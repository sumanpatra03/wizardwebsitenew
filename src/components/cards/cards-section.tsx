"use client";

import { useCallback, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { HoverCardItem } from "@/types/content";

import { HoverCard } from "./hover-card";

/**
 * A row of expanding panels.
 *
 * Owns the single "which panel is open" value, which is what guarantees the
 * brief's rule that only one can ever be expanded — on touch as much as on a
 * pointer. That value changes once per interaction, never per frame; the
 * animation itself is CSS driven off a data attribute.
 *
 * Orientation is handled by flexbox rather than by two code paths: the row is
 * a column below `lg` and a row above it, and `flex-grow` expands panels along
 * whichever axis is current. The container is given a fixed cross-size so the
 * panels have free space to distribute.
 *
 * Under `prefers-reduced-motion` the whole metaphor is dropped: panels become
 * a plain grid at natural height with every description and CTA already
 * visible, so nothing is reachable only through motion.
 */

type CardsSectionProps = {
  cards: readonly HoverCardItem[];
  /** Accessible name for the list region. */
  label: string;
  className?: string;
};

export function CardsSection({ cards, label, className }: CardsSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activate = useCallback((id: string) => setActiveId(id), []);
  const dismiss = useCallback(() => setActiveId(null), []);

  if (prefersReducedMotion) {
    return (
      <div
        aria-label={label}
        className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      >
        {cards.map((card, index) => (
          <div key={card.id} className="min-h-[22rem]">
            <HoverCard
              card={card}
              index={index}
              active={false}
              dimmed={false}
              onActivate={() => undefined}
              onDismiss={() => undefined}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-label={label}
      // Blur-out on leave covers the gap between two panels, so moving the
      // pointer across the row does not flicker through a collapsed state.
      onMouseLeave={dismiss}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) dismiss();
      }}
      className={cn(
        "flex h-[42rem] flex-col gap-3 lg:h-[32rem] lg:flex-row lg:gap-4",
        className,
      )}
    >
      {cards.map((card, index) => (
        <HoverCard
          key={card.id}
          card={card}
          index={index}
          active={activeId === card.id}
          dimmed={activeId !== null && activeId !== card.id}
          onActivate={() => activate(card.id)}
          // Leaving an individual panel does nothing; the row handles it, so
          // travelling between panels never collapses the row mid-move.
          onDismiss={() => undefined}
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      ))}
    </div>
  );
}
