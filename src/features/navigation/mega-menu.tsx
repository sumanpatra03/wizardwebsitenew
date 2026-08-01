"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useId } from "react";

import { easeOutExpo } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

type MegaMenuProps = {
  open: boolean;
  links: readonly NavLink[];
  labelledBy: string;
  onNavigate: () => void;
};

/**
 * Desktop dropdown panel.
 *
 * Rendered as a `menu`-less plain navigation region: these are ordinary
 * links, so a `<ul>` inside a labelled container is the correct semantic —
 * ARIA menu roles would promise keyboard behaviour (type-ahead, arrow
 * cycling) that is wrong for navigation.
 *
 * Open/close state, hover intent and Escape handling live in `Header`, which
 * owns the single "which panel is open" value.
 */
export function MegaMenu({ open, links, labelledBy, onNavigate }: MegaMenuProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const id = useId();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          aria-labelledby={labelledBy}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: easeOutExpo }}
          className={cn(
            "absolute top-full left-1/2 z-50 w-max max-w-[min(46rem,calc(100vw-3rem))]",
            "-translate-x-1/2 pt-3",
          )}
        >
          <div
            data-themed=""
            className={cn(
              "overflow-hidden rounded-xl border border-border",
              "bg-bg-elevated/95 p-2 shadow-overlay backdrop-blur-xl",
            )}
          >
            <ul
              className={cn(
                "grid gap-1",
                links.length > 3 ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-start gap-3 rounded-lg p-3",
                        "transition-colors duration-(--duration-fast)",
                        "hover:bg-surface-hover",
                        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                      )}
                    >
                      {Icon ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 grid size-9 shrink-0 place-items-center rounded-md",
                            "bg-accent-muted text-accent",
                            "transition-transform duration-(--duration-fast)",
                            "group-hover:scale-105 motion-reduce:group-hover:scale-100",
                          )}
                        >
                          <Icon className="size-[1.05rem]" />
                        </span>
                      ) : null}

                      <span className="min-w-0">
                        <span className="block text-body-sm font-semibold text-fg transition-colors group-hover:text-accent">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="mt-0.5 block text-body-sm text-fg-muted">
                            {link.description}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
