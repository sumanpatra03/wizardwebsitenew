"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Centred modal dialog.
 *
 * The same Radix primitive `<Sheet>` wraps, positioned as a centred panel
 * rather than an edge drawer. Radix handles the parts that are tedious to get
 * right by hand: focus is trapped while open and restored to the trigger on
 * close, the rest of the page is hidden from assistive tech, and Escape and
 * an outside click both dismiss.
 *
 * A separate component rather than a variant of `<Sheet>` because the two
 * differ in every positioning and animation class; sharing them would mean a
 * prop threaded through every one.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm",
          "data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
          "motion-reduce:animate-none",
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col",
          "border-t border-border bg-bg-elevated shadow-overlay",
          "rounded-t-2xl",
          // From `sm` it becomes a centred panel rather than a bottom sheet.
          // On a phone, reaching a dialog anchored to the bottom is easier
          // than one floating in the middle of the screen.
          "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(34rem,calc(100vw-2rem))]",
          "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border",
          "data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
          "motion-reduce:animate-none",
          className,
        )}
        {...props}
      >
        {children}

        <DialogPrimitive.Close
          className={cn(
            "absolute top-4 right-4 grid size-9 place-items-center rounded-pill",
            "text-fg-muted transition-colors duration-(--duration-fast)",
            "hover:bg-surface-hover hover:text-fg",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-ring",
          )}
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-6 pr-14 sm:p-8 sm:pr-14", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-heading-md text-fg", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-body-sm text-fg-muted", className)}
      {...props}
    />
  );
}

/** Scrolls independently, so a long form never pushes the header off screen. */
export function DialogBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8", className)}
      {...props}
    />
  );
}
