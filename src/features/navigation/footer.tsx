import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/common/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/common/social-icons";
import { Container } from "@/components/layout/container";
import {
  COPYRIGHT,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
} from "@/constants/navigation";
import { FORMATTED_ADDRESS, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: SITE.social.linkedin, icon: LinkedInIcon },
  { label: "Facebook", href: SITE.social.facebook, icon: FacebookIcon },
  { label: "Instagram", href: SITE.social.instagram, icon: InstagramIcon },
] as const;

const linkClass = cn(
  "text-body-sm text-fg-muted transition-colors duration-(--duration-fast)",
  "hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-ring rounded-sm",
);

/**
 * Site footer.
 *
 * Server Component — pure content, zero interactivity, so none of it reaches
 * the client bundle. Layout goes 1 → 2 → 4 columns across breakpoints, with
 * the brand block spanning the full width on small screens.
 */
export function Footer() {
  return (
    <footer
      data-themed=""
      className="relative border-t border-border bg-bg-subtle"
    >
      {/* Decorative grid wash, masked so it never reaches the legal bar. */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-60"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-block">
              <Logo />
            </Link>

            <p className="text-body-sm mt-5 max-w-sm text-fg-muted">
              {SITE.description}
            </p>

            <address className="mt-7 flex flex-col gap-3 not-italic">
              <span className="flex items-start gap-3 text-body-sm text-fg-muted">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-accent"
                />
                {FORMATTED_ADDRESS}
              </span>

              <a
                href={`mailto:${SITE.contact.email}`}
                className={cn(linkClass, "flex items-center gap-3")}
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {SITE.contact.email}
              </a>

              <span className="flex items-start gap-3 text-body-sm text-fg-muted">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-accent"
                />
                <span className="flex flex-col gap-1">
                  {SITE.contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className={linkClass}
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </span>
            </address>

            <ul className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.name} on ${label}`}
                    className={cn(
                      "grid size-10 place-items-center rounded-pill border border-border",
                      "text-fg-muted transition-colors duration-(--duration-fast)",
                      "hover:border-accent/50 hover:bg-accent-muted hover:text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-label mb-5 uppercase text-fg">
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Legal bar */}
        <div
          className={cn(
            "flex flex-col gap-4 border-t border-border py-7",
            "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="text-body-sm text-fg-subtle">{COPYRIGHT}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
