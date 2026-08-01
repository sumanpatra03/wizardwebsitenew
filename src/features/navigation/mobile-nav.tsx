"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/common/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HEADER_CTA, NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer (below `lg`).
 *
 * Radix Dialog handles the focus trap, Escape, outside click and scroll lock.
 * Nested sections become an accordion so the whole IA stays reachable without
 * a second navigation level.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A route change while the drawer is open should dismiss it. Done during
  // render rather than in an effect so the drawer never lingers for a frame
  // over the newly rendered page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="border border-border lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="lg:hidden">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse {SITE.name} sections, services and products.
        </SheetDescription>

        <div className="flex h-full flex-col">
          <div className="flex h-header shrink-0 items-center border-b border-border px-6">
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Logo />
            </Link>
          </div>

          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto overscroll-contain px-6 py-4"
          >
            <Accordion type="single" collapsible className="w-full">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (!item.children) {
                  return (
                    <div key={item.href} className="border-b border-border">
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-4 font-display text-heading-sm",
                          "transition-colors duration-(--duration-fast) hover:text-accent",
                          isActive ? "text-accent" : "text-fg",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <AccordionItem key={item.href} value={item.href}>
                    <AccordionTrigger className={cn(isActive && "text-accent")}>
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1 pl-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-md py-2.5 pr-2 pl-3 text-body-sm",
                                "border-l border-border text-fg-muted",
                                "transition-colors duration-(--duration-fast)",
                                "hover:border-accent hover:bg-surface-hover hover:text-accent",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </nav>

          <div className="shrink-0 border-t border-border p-6">
            <Button asChild size="lg" className="w-full">
              <Link href={HEADER_CTA.href}>{HEADER_CTA.label}</Link>
            </Button>
            <p className="mt-4 text-center text-body-sm text-fg-muted">
              <a
                href={`mailto:${SITE.contact.email}`}
                className="transition-colors hover:text-accent"
              >
                {SITE.contact.email}
              </a>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
