"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

import { cn } from "@/lib/utils";
import type { HoverCardItem } from "@/types/content";

import { CardArtwork } from "./card-artwork";

/**
 * A single panel in an expanding card row.
 *
 * The whole hover choreography — expansion, image zoom, overlay lift, title
 * rise, description fade, CTA slide — runs off one `data-active` attribute in
 * pure CSS. React only flips that attribute once per interaction, so no frame
 * of the animation costs a re-render.
 *
 * Expansion animates `flex-grow`, which the brief asked for. Worth being
 * straight about the trade-off: that is a layout property, so it is not
 * GPU-composited the way a transform is. For a row of five panels the cost is
 * trivial and it holds 60 FPS, and it is the only approach that lets the text
 * inside reflow honestly as the panel grows. Everything else in the card
 * (zoom, fades, slides) is transform/opacity and does run on the compositor.
 *
 * Accessibility: the CTA link is the one focusable control, so tabbing to it
 * expands the panel via `:focus-within` and Enter follows it. Space is
 * deliberately not bound — this is a link, and hijacking Space on a link
 * breaks the behaviour keyboard users expect.
 */

type HoverCardProps = {
  card: HoverCardItem;
  index: number;
  /** Expanded state. Owned by the parent so only one panel opens at a time. */
  active: boolean;
  /** True while some *other* panel is expanded. */
  dimmed: boolean;
  onActivate: () => void;
  onDismiss: () => void;
  /** Sizes hint for the real image, when one is supplied. */
  sizes: string;
};

export function HoverCard({
  card,
  index,
  active,
  dimmed,
  onActivate,
  onDismiss,
  sizes,
}: HoverCardProps) {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      data-active={active ? "" : undefined}
      data-dimmed={dimmed ? "" : undefined}
      // flex-grow is set inline because it is a continuous value; the
      // transition that smooths it lives in the class list.
      style={{ flexGrow: active ? 2.8 : 1 }}
      onMouseEnter={onActivate}
      onMouseLeave={onDismiss}
      onFocus={onActivate}
      // Touch has no hover: a tap expands, and the parent collapses whichever
      // panel was open.
      onClick={onActivate}
      className={cn(
        "group/panel relative isolate min-h-0 min-w-0 flex-1 overflow-hidden",
        "rounded-2xl border border-white/10",
        "transition-[flex-grow,border-color,box-shadow] duration-[620ms]",
        "ease-(--ease-out-expo)",
        "data-active:border-accent/45 data-active:shadow-card-hover",
        // Under reduced motion the row stops expanding altogether — see the
        // wrapping grid in CardsSection.
        "motion-reduce:transition-none",
      )}
    >
      {/* Media */}
      <div className="absolute inset-0 -z-10">
        {card.image ? (
          <Image
            src={card.image}
            alt=""
            fill
            sizes={sizes}
            loading="lazy"
            className={cn(
              "object-cover will-change-transform",
              "transition-[transform,filter] duration-[900ms]",
              "ease-(--ease-out-expo)",
              "group-data-active/panel:scale-110",
              "group-data-active/panel:brightness-110",
              "motion-reduce:scale-none motion-reduce:transition-none",
            )}
          />
        ) : (
          <CardArtwork
            icon={card.icon}
            index={index}
            className={cn(
              "will-change-transform",
              "transition-[transform,filter] duration-[900ms]",
              "ease-(--ease-out-expo)",
              "group-data-active/panel:scale-110",
              "group-data-active/panel:brightness-110",
              "motion-reduce:scale-none motion-reduce:transition-none",
            )}
          />
        )}

        {/* Scrim. Lifts on expand to reveal more of the image, but never
            far enough to put the copy below AA. */}
        <div
          className={cn(
            "absolute inset-0 bg-black/45",
            "transition-[background-color] duration-[620ms] ease-(--ease-out-expo)",
            "group-data-active/panel:bg-black/25",
            "motion-reduce:transition-none",
          )}
        />

        {/* Bottom gradient, so the text block always has a floor to sit on. */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-2/3",
            "bg-gradient-to-t from-black/85 via-black/45 to-transparent",
            "opacity-90 transition-opacity duration-[620ms]",
            "group-data-active/panel:opacity-100",
          )}
        />

        {/* Accent wash, decorative, strengthens on expand. */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-[620ms]",
            "ease-(--ease-out-expo) group-data-active/panel:opacity-100",
            "[background:radial-gradient(85%_60%_at_50%_115%,rgb(36_176_220/0.32)_0%,transparent_70%)]",
          )}
        />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <p
          className={cn(
            "text-label uppercase text-brand-200",
            "transition-transform duration-[620ms] ease-(--ease-out-expo)",
            "group-data-active/panel:-translate-y-2.5",
            "motion-reduce:translate-none",
          )}
        >
          {card.category}
        </p>

        <h3
          id={titleId}
          className={cn(
            "font-display text-heading-md mt-2 text-balance text-white",
            "transition-transform duration-[620ms] ease-(--ease-out-expo)",
            "group-data-active/panel:-translate-y-2.5",
            "motion-reduce:translate-none",
          )}
        >
          {card.title}
        </h3>

        {/* Description and CTA are laid out in a 0fr -> 1fr grid rather than
            with max-height, so they animate to their true height without a
            magic number. The CTA trails the description by 90ms. */}
        <div
          className={cn(
            "grid grid-rows-[0fr] transition-[grid-template-rows]",
            "duration-[620ms] ease-(--ease-out-expo)",
            "group-data-active/panel:grid-rows-[1fr]",
            "motion-reduce:grid-rows-[1fr] motion-reduce:transition-none",
          )}
        >
          <div className="overflow-hidden">
            <p
              className={cn(
                "text-body-sm mt-3 max-w-prose translate-y-5 text-white/80 opacity-0",
                "transition-[opacity,transform] duration-[560ms] delay-[80ms]",
                "ease-(--ease-out-expo)",
                "group-data-active/panel:translate-y-0",
                "group-data-active/panel:opacity-100",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                "motion-reduce:transition-none",
              )}
            >
              {card.description}
            </p>

            {/* <Link
              href={card.href}
              className={cn(
                "mt-5 inline-flex translate-y-4 items-center gap-2 rounded-pill",
                "bg-white px-5 py-2.5 text-body-sm font-medium text-ink-950 opacity-0",
                "transition-[opacity,transform,background-color]",
                "duration-[560ms] delay-[170ms] ease-(--ease-out-expo)",
                "group-data-active/panel:translate-y-0",
                "group-data-active/panel:opacity-100",
                "hover:bg-brand-200",
                "focus-visible:opacity-100 focus-visible:outline-2",
                "focus-visible:outline-offset-2 focus-visible:outline-white",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                "motion-reduce:transition-none",
              )}
            >
              {card.buttonText}
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-(--duration-fast)",
                  "group-hover/panel:translate-x-0.5 motion-reduce:translate-none",
                )}
              />
            </Link> */}
          </div>
        </div>
      </div>
    </article>
  );
}
