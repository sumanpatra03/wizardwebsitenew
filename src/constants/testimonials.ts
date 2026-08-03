import type { Testimonial } from "@/types/content";

/**
 * Client testimonials, verbatim from wizardcomm.net.
 *
 * The About Us page carries longer versions of two of these than the home
 * page does; the full text is used here, since truncating a client's own
 * words to fit a card is the wrong trade.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Wizard Communications has been an exemplary partner for the development and localization of one of our flagship programs. Their dedication, quality and commitment to timelines ensured a high level of our end customer satisfaction.",
    author: "Aniruddha Sur",
    role: "Sr. Project Manager",
    organization: "Adayana Learning Solutions",
    avatar: "/clients/av-aniruddha.png",
  },
  {
    quote:
      "Wizard Communications, Salt Lake City, Kolkata has provided a commendable support and assistance in setting up of the digital experience.",
    author: "Parliament Museum of India",
    organization: "Parliament Museum of India",
    location: "New Delhi",
    avatar: "/clients/av-parliament-museum.jpg",
  },
  {
    quote:
      "Wizard Communications of Salt Lake City, Kolkata has been an outstanding partner for the Education and Training Services. They have been assisting us in many of our significant courseware development projects related to digital learning experience and localization. Their dedication, quality and commitment is excellent with high level of customer satisfaction.",
    author: "Prof. Subir Ghosh",
    role: "Principal",
    organization:
      "Bhavan's Asutosh College of Communication and Management, Kolkata",
    avatar: "/clients/av-subir-ghosh.jpg",
  },
  {
    quote:
      "We have had the pleasure of working with Wizard Communications, Salt Lake, Kolkata, on several Education and Training Services projects. Their team has consistently supported us in the development of high-quality courseware, with a strong focus on digital learning solutions and content localization. Their professionalism, attention to detail, commitment to quality, and timely delivery have made them a reliable partner, resulting in a consistently high level of customer satisfaction.",
    author: "CMC Ltd",
    organization: "CMC Ltd",
    location: "Mumbai",
  },
] as const;

/** Heading used above the quotes on the About page. */
export const TESTIMONIALS_HEADING = "In Their Own Words" as const;
