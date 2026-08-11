"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Leader } from "@/constants/company";
import { cn } from "@/lib/utils";

/**
 * One leadership card, with the full bio in a dialog.
 *
 * ## Why a dialog
 *
 * These bios run to five or six sentences. At four cards across there is room
 * for about three lines, so a clamp alone would hide two thirds of each with
 * no way to reach the rest — and expanding in place would make one card push
 * its whole row taller. The card shows the opening and the dialog holds the
 * whole thing.
 *
 * The trigger is the card itself, so the target is the size of the card rather
 * than a small link inside it. It is a real `<button>`, so it is reachable by
 * keyboard and announced as expandable; Radix returns focus to it on close.
 */
export function LeaderCard({ leader }: { leader: Leader }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card interactive className="h-full overflow-hidden">
        <DialogTrigger
          className={cn(
            "flex h-full w-full flex-col text-left",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-ring",
          )}
        >
          <span className="relative block aspect-4/3 w-full overflow-hidden border-b border-border">
            <Image
              src={leader.photo}
              // The name and role sit directly beneath, so a descriptive alt
              // would only repeat what is already read out.
              alt=""
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 78vw"
              className={cn(
                "object-cover object-top",
                "transition-transform duration-(--duration-base)",
                "ease-(--ease-out-expo) group-hover/card:scale-105",
                "motion-reduce:scale-none motion-reduce:transition-none",
              )}
            />
            {/* Ties the portrait into the card's palette. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent"
            />
          </span>

          <span className="flex flex-1 flex-col p-5">
            <span className="font-display text-heading-sm text-balance text-fg">
              {leader.name}
            </span>
            <span className="text-label mt-1.5 block uppercase text-accent">
              {leader.role}
            </span>

            {/* Three lines is the opening, not the bio. The control below says
                so plainly rather than trailing off into an ellipsis. */}
            <span className="text-body-sm mt-3 line-clamp-3 flex-1 text-fg-muted">
              {leader.bio}
            </span>

            <span
              className={cn(
                "text-body-sm mt-4 inline-flex items-center gap-2",
                "font-medium text-accent",
              )}
            >
              Read full profile
              <ArrowUpRight
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-(--duration-fast)",
                  "ease-(--ease-out-quart) group-hover/card:-translate-y-0.5",
                  "group-hover/card:translate-x-0.5",
                  "motion-reduce:translate-none",
                )}
              />
            </span>
          </span>
        </DialogTrigger>
      </Card>

      {/* Wider than the default panel: a portrait beside five sentences needs
          more than 34rem before the text column turns into a column of two
          or three words. */}
      <DialogContent
        aria-describedby={undefined}
        className="sm:w-[min(40rem,calc(100vw-2rem))]"
      >
        <DialogHeader>
          <DialogTitle>{leader.name}</DialogTitle>
          <p className="text-label uppercase text-accent">{leader.role}</p>
        </DialogHeader>

        <DialogBody>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            {/*
             * `self-start` is load-bearing.
             *
             * A flex row stretches its children to the row's height by
             * default, and a stretched height beats `aspect-square` — so the
             * portrait took its height from the paragraph beside it and came
             * out as a tall, distorted strip. `self-start` lets the ratio
             * decide the height again.
             */}
            <div
              className={cn(
                "relative aspect-square w-40 shrink-0 self-start",
                "overflow-hidden rounded-lg border border-border",
                "max-sm:aspect-4/3 max-sm:w-full",
              )}
            >
              <Image
                src={leader.photo}
                alt=""
                fill
                sizes="(min-width: 640px) 160px, 90vw"
                className="object-cover object-top"
              />
            </div>

            <p className="text-body-base text-fg-muted">{leader.bio}</p>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
