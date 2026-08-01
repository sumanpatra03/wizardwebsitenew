"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Slide-over panel, built on Radix Dialog so focus trapping, `aria-modal`,
 * Escape-to-close, outside-click dismissal and scroll locking all come for
 * free and behave correctly with screen readers.
 */
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: "right" | "left";
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/65 backdrop-blur-sm",
          "data-[state=open]:animate-overlay-in",
          "data-[state=closed]:animate-overlay-out",
        )}
      />
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex w-full max-w-sm flex-col",
          "border-border bg-bg-elevated shadow-overlay",
          "transition-transform duration-(--duration-base) ease-(--ease-out-expo)",
          side === "right"
            ? "right-0 border-l data-[state=closed]:translate-x-full"
            : "left-0 border-r data-[state=closed]:-translate-x-full",
          "data-[state=open]:translate-x-0",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          aria-label="Close menu"
          className={cn(
            "absolute top-5 right-5 grid size-10 place-items-center rounded-pill",
            "text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
