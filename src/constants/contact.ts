import { SITE } from "./site";

/**
 * Contact page copy.
 *
 * The heading and intro are Wizard's own, from wizardcomm.net/contact. The
 * live page runs recruitment copy under a "Connect With Us" heading, which
 * reads oddly on the page every sales CTA on the site points at — so the lead
 * here addresses the enquiry, and the recruitment line is kept as a closing
 * note rather than the opening pitch.
 */
export const CONTACT_PAGE = {
  eyebrow: "Connect With Us",
  titleLines: ["Tell us what you", "need to build."],
  lead: "Every enquiry reaches a person, not a queue. Describe the problem and we will come back with what it takes to solve it.",
  responseNote: "We reply to every enquiry within one working day.",

  form: {
    heading: "Send us a message",
    /**
     * What the enquiry is about. Drawn from the six service pages, so the
     * options match what the site actually offers rather than a generic list.
     */
    subjects: [
      "Custom software development",
      "Mobile app development",
      "Artificial intelligence",
      "Cyber security",
      "Digital marketing",
      "On demand hiring",
      "Products and licensing",
      "Something else",
    ],
  },

  details: {
    heading: "Or reach us directly",
    hours: "Monday to Friday, 10:00 – 19:00 IST",
  },

  /**
   * Google Maps embed for the Salt Lake office. The `output=embed` form needs
   * no API key; the address is the one in `SITE.contact`, so the pin cannot
   * drift from the address printed beside it.
   */
  mapQuery: encodeURIComponent(
    `${SITE.contact.address.street}, ${SITE.contact.address.locality}, ${SITE.contact.address.region} ${SITE.contact.address.postalCode}`,
  ),

  /** The recruitment note the live page leads with. */
  careers: {
    heading: "Looking to join us instead?",
    body: "Are you seeking to work with an organization that values your dedication to your work? Are you in search of a company that recognizes your efforts like a small firm, but also offers the exposure and impact of a larger corporation? If so, we invite you to consider joining Wizard Communications.",
    cta: { label: "See how we work", href: "/work-with-us" },
  },
} as const;
