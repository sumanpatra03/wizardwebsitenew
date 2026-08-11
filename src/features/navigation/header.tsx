"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { HEADER_CTA, NAV_ITEMS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

/** Grace period so the panel survives the gap between trigger and panel. */
const CLOSE_DELAY_MS = 120;

/**
 * Site header.
 *
 * Behaviour borrowed from Website A: transparent over the hero, then a
 * blurred solid bar once scrolled; it also retracts on downward scroll and
 * returns on upward scroll to give long pages back their vertical space.
 *
 * Client Component — it owns scroll state, hover intent and menu state.
 */
export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrolled, direction } = useScrollDirection();
  const pathname = usePathname();
  const idPrefix = useId();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openNow = useCallback(
    (label: string) => {
      clearCloseTimer();
      setOpenMenu(label);
    },
    [clearCloseTimer],
  );

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Navigating anywhere dismisses an open panel. Adjusting state during
  // render (rather than in an effect) closes the panel in the same commit as
  // the route change, so the old menu never flashes on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
  }

  // Escape closes, and focus leaving the nav entirely closes too — which is
  // what makes the panel usable with a keyboard as well as a mouse.
  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openMenu]);

  const hidden = scrolled && direction === "down" && !openMenu;

  return (
    <header
      data-themed=""
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full",
        "transition-[transform,background-color,border-color,backdrop-filter]",
        "duration-(--duration-fast) ease-(--ease-out-quart)",
        "motion-reduce:translate-none motion-reduce:transition-none",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-wide flex h-header items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo priority />
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden lg:flex lg:items-center lg:gap-1"
          onMouseLeave={scheduleClose}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const triggerId = `${idPrefix}-${item.label}`;
            const isOpen = openMenu === item.label;

            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => setOpenMenu(null)}
                  className={cn(
                    "rounded-pill px-3.5 py-2 text-body-sm font-medium",
                    "transition-colors duration-(--duration-fast)",
                    "hover:bg-surface-hover hover:text-fg",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isActive ? "text-accent" : "text-fg-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => openNow(item.label)}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => (isOpen ? setOpenMenu(null) : openNow(item.label))}
                  className={cn(
                    "flex items-center gap-1 rounded-pill px-3.5 py-2",
                    "text-body-sm font-medium",
                    "transition-colors duration-(--duration-fast)",
                    "hover:bg-surface-hover hover:text-fg",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isActive || isOpen ? "text-accent" : "text-fg-muted",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 transition-transform duration-(--duration-fast)",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <MegaMenu
                  open={isOpen}
                  links={item.children}
                  labelledBy={triggerId}
                  onNavigate={() => setOpenMenu(null)}
                />
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* <ThemeToggle /> */}
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={HEADER_CTA.href}>{HEADER_CTA.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
