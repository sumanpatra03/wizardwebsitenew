import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTACT_PAGE } from "@/constants/contact";
import { FORMATTED_ADDRESS, SITE } from "@/constants/site";
import { ContactForm } from "@/features/contact/contact-form";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Contact" },
] as const;

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to Wizard Communications about custom software, mobile apps, AI, security, marketing or hiring. Salt Lake, Kolkata — we reply within one working day.",
  path: "/contact",
});

/**
 * Where the office is, for search engines.
 *
 * Extends the site-wide Organization entry rather than restating it: the
 * `@id` points back at the same node, so the two describe one company rather
 * than two that happen to share a name.
 */
function localBusinessJsonLd() {
  const { address, email, phones } = SITE.contact;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: SITE.legalName,
    url: `${siteUrl}/contact`,
    email,
    telephone: phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  };
}

export default function ContactPage() {
  const { contact } = SITE;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd data={localBusinessJsonLd()} />

      <PageHero
        crumbs={CRUMBS}
        eyebrow={CONTACT_PAGE.eyebrow}
        titleLines={CONTACT_PAGE.titleLines}
        lead={CONTACT_PAGE.lead}
        aside={
          /*
           * No frame, no scrim, no crop — flat vector art on transparency,
           * so a card would box in something with no edges.
           *
           * Width is capped rather than filling the column: the source is
           * 401×375, and stretched across a 700px hero column it would be
           * visibly soft. `max-w-md` holds it near its native size, which
           * costs some presence and buys sharpness.
           */
          <Image
            src="/contact/contact-hero.webp"
            // Decorative: the <h1> beside it already says what the page is.
            alt=""
            width={401}
            height={375}
            priority
            sizes="(min-width: 1024px) 28rem, 24rem"
            className="mx-auto h-auto w-full max-w-sm lg:max-w-md"
          />
        }
      >
        <p className="text-body-sm inline-flex items-center gap-2 text-fg-subtle">
          <Clock aria-hidden="true" className="size-4 text-accent" />
          {CONTACT_PAGE.responseNote}
        </p>
      </PageHero>

      {/* Form and details, side by side.
          The direct routes sit beside the form rather than below it, so
          someone who would rather phone never has to scroll past a form to
          find the number. */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-display-md text-balance text-fg">
                  {CONTACT_PAGE.form.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-8 block">
                <ContactForm />
              </Reveal>
            </div>

            <Reveal delay={0.16} className="lg:col-span-5">
              <h2 className="font-display text-heading-md text-fg">
                {CONTACT_PAGE.details.heading}
              </h2>

              <ul className="mt-6 flex flex-col gap-4">
                {/* Both addresses were previously listed bare, one under the
                    other, which left a visitor to guess which one their
                    enquiry belonged in — and made the named address read as a
                    personal inbox pasted onto a business page. */}
                <DetailCard icon={Mail} label="Email">
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    <span className="text-fg-subtle">General enquiries — </span>
                    {contact.email}
                  </a>
                  <a href={`mailto:${contact.salesEmail}`} className={linkClass}>
                    <span className="text-fg-subtle">Sales — </span>
                    {contact.salesEmail}
                  </a>
                </DetailCard>

                <DetailCard icon={Phone} label="Phone">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className={linkClass}
                    >
                      {phone}
                    </a>
                  ))}
                </DetailCard>

                <DetailCard icon={MapPin} label="Office">
                  <span className="text-body-sm text-fg-muted">
                    {FORMATTED_ADDRESS}
                  </span>
                  <span className="text-body-sm text-fg-subtle">
                    {CONTACT_PAGE.details.hours}
                  </span>
                </DetailCard>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map. `output=embed` needs no API key, and it is lazy-loaded so the
          third-party frame costs nothing until it scrolls into view. */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="Find us"
            title="Salt Lake, Kolkata."
            description={FORMATTED_ADDRESS}
          />
          <div
            className={cn(
              "mt-12 aspect-[16/9] w-full overflow-hidden rounded-xl",
              "border border-border sm:aspect-[21/9]",
            )}
          >
            <iframe
              title={`Map showing ${SITE.name} at ${FORMATTED_ADDRESS}`}
              src={`https://www.google.com/maps?q=${CONTACT_PAGE.mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </Container>
      </Section>

      {/* The recruitment note the live contact page leads with. */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-display-md text-balance text-fg">
                {CONTACT_PAGE.careers.heading}
              </h2>
              <p className="text-body-lg mt-6 text-fg-muted">
                {CONTACT_PAGE.careers.body}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 flex justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link href={CONTACT_PAGE.careers.cta.href}>
                    {CONTACT_PAGE.careers.cta.label}
                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform duration-(--duration-fast)",
                        "group-hover:translate-x-1 motion-reduce:translate-none",
                      )}
                    />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

const linkClass = cn(
  "text-body-sm block text-fg-muted transition-colors",
  "duration-(--duration-fast) hover:text-accent",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

function DetailCard({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Card className="flex gap-4 p-5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-muted text-accent"
        >
          <Icon className="size-5" />
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-label uppercase text-fg-subtle">{label}</span>
          {children}
        </span>
      </Card>
    </li>
  );
}
