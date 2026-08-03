/**
 * Company-level facts, sourced from wizardcomm.net.
 * Used by metadata, JSON-LD, the header, the footer and the contact CTA.
 */
export const SITE = {
  name: "Wizard Communications",
  legalName: "Wizard Communications Pvt Ltd",
  shortName: "Wizard",
  tagline: "Digital & Beyond",
  secondaryTagline: "Future Ready Technology, Built for You",
  /** On-page positioning copy — read by humans, on the site itself. */
  description:
    "Your catalyst for digital transformation. Start your journey with us today.",
  /**
   * Search-result copy — read by crawlers, in the SERP.
   *
   * Deliberately a separate string from `description`: this one has to lead
   * with what the company does and where, inside ~155 characters, which is a
   * different job from the brand line above. Consumed by `lib/seo.ts`,
   * `app/layout.tsx` and the JSON-LD.
   */
  metaDescription:
    "Wizard Communications is a Kolkata-based technology and strategic consulting partner delivering custom software, AI, cloud, security and digital transformation services.",

  /**
   * Feeds `foundingDate` in the Organization JSON-LD.
   *
   * 2004 is the year wizardcomm.net's About timeline gives for the company
   * being established. Note the stats now say "22+ years", which implies 2003
   * or earlier — worth reconciling, since this value is the one search engines
   * read.
   */
  foundedYear: 2004,

  url: "https://www.wizardcomm.net",
  locale: "en_IN",

  contact: {
    email: "info@wizardcomm.net",
    salesEmail: "satadru.h@wizardcomm.net",
    phones: ["+91 8282099904", "+91 3340605949"],
    address: {
      street: "BJ – 214, Sector II, Bidhannagar",
      locality: "Kolkata",
      region: "West Bengal",
      postalCode: "700091",
      country: "IN",
      countryName: "India",
    },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/wizard-communications-pvt.-ltd.",
    facebook: "https://www.facebook.com/wizardcommunications/",
    instagram: "https://www.instagram.com/wizard_communication/",
  },
} as const;

/** Single formatted address line for the footer and structured data. */
export const FORMATTED_ADDRESS = `${SITE.contact.address.street}, ${SITE.contact.address.locality}, ${SITE.contact.address.region} ${SITE.contact.address.postalCode}`;
