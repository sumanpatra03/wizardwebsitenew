"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Accordion built on Radix, giving correct `aria-expanded` / `aria-controls`
 * wiring and full arrow-key navigation between triggers.
 *
 * Height animation uses the `--radix-accordion-content-height` custom
 * property Radix measures for us, so it works with unknown content heights.
 */
export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-4 text-left",
          "font-display text-heading-sm text-fg",
          "transition-colors duration-(--duration-fast) hover:text-accent",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden="true"
          className={cn(
            "size-5 shrink-0 text-fg-muted transition-transform",
            "duration-(--duration-fast) ease-(--ease-out-quart)",
            "group-hover:text-accent group-data-[state=open]:rotate-45",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-body-sm text-fg-muted",
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up",
      )}
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
