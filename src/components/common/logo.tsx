import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

/**
 * Wizard mark — an original geometric "W" drawn as a single chevron
 * polyline, with a spark accent that nods to the company name.
 *
 * Authored from scratch: no asset is taken from either reference site. The
 * stroke uses a gradient between the two brand cyans and inherits sizing from
 * its container, so one component serves the header, footer and favicon.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <defs>
        <linearGradient id="wizard-mark" x1="0" y1="32" x2="32" y2="0">
          <stop offset="0%" stopColor="var(--accent-vivid-2)" />
          <stop offset="100%" stopColor="var(--accent-vivid)" />
        </linearGradient>
      </defs>

      {/* Rounded container tile */}
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="9"
        stroke="url(#wizard-mark)"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* The W, drawn as one continuous chevron path */}
      <path
        d="M7 10.5 L11.6 22 L16 14.4 L20.4 22 L25 10.5"
        stroke="url(#wizard-mark)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spark */}
      <circle cx="16" cy="8.4" r="1.7" fill="var(--accent-vivid)" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Hide the wordmark and show the mark alone. */
  markOnly?: boolean;
};

/** Full lockup: mark + wordmark. */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {markOnly ? (
        <span className="sr-only">{SITE.name}</span>
      ) : (
        <span className="font-display text-heading-sm leading-none font-bold tracking-tight text-fg">
          {SITE.shortName}
          <span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}
