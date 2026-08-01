import type { Testimonial } from "@/types/content";

/** Client testimonials as published on wizardcomm.net. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Wizard Communications has been an exemplary partner for the development and localization of one of our flagship programs. Their dedication, quality and commitment to timelines ensured a high level of our end customer satisfaction.",
    author: "Aniruddha Sur",
    role: "Sr. Project Manager",
    organization: "Adayana Learning Solutions",
  },
  {
    quote:
      "Wizard Communications, Salt Lake City, Kolkata has provided a commendable support and assistance in setting up of the digital experience.",
    author: "Parliament Museum of India",
    organization: "Parliament Museum of India",
    location: "New Delhi",
  },
  {
    quote:
      "Their dedication, quality and commitment is excellent with high level of customer satisfaction.",
    author: "Prof. Subir Ghosh",
    role: "Principal",
    organization: "Bhavan's Asutosh College",
  },
  {
    quote:
      "Their professionalism, attention to detail, commitment to quality, and timely delivery have made them a reliable partner, resulting in a consistently high level of customer satisfaction.",
    author: "CMC Ltd",
    organization: "CMC Ltd",
    location: "Mumbai",
  },
] as const;
