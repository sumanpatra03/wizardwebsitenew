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
  description:
    "Wizard Communication is a trusted global partner in technology and strategic consulting, delivering end to end IT services and digital transformation solutions.",
  metaDescription:
    "Wizard Communications is a Kolkata-based technology and strategic consulting partner delivering custom software, AI, cloud, security and digital transformation services. 16+ years, 200+ projects.",
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
    linkedin:
      "https://www.linkedin.com/company/wizard-communications-pvt.-ltd.",
    facebook: "https://www.facebook.com/wizardcommunications/",
    instagram: "https://www.instagram.com/wizard_communication/",
  },
} as const;

/** Single formatted address line for the footer and structured data. */
export const FORMATTED_ADDRESS = `${SITE.contact.address.street}, ${SITE.contact.address.locality}, ${SITE.contact.address.region} ${SITE.contact.address.postalCode}`;
