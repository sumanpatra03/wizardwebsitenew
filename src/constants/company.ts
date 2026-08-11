import { Layers, LineChart, PenTool, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Company section content.
 *
 * Transcribed verbatim from wizardcomm.net's About Us, Why Wizard and Work
 * With Us pages — the wording is theirs, including the em-dashes and the
 * occasional inconsistency. Only the grouping is new, to fit this site's
 * section rhythm.
 */

/* ------------------------------------------------------------------ */
/* About Us                                                            */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  eyebrow: "About Us",
  titleLines: [
    "Helping businesses grow by turning",
    "complex technology into simple,",
    "powerful solutions",
  ],
  lead: "Growth takes effort. But with the right partner by your side, it doesn't have to feel that hard. We're here to make it easier.",
  closing:
    "Wizard is a Software Development Company based in Kolkata, India and operating since 2004.",
} as const;

/** "Our Story" — the two paragraphs beneath the belief line. */
export const STORY = {
  eyebrow: "Our Story",
  title: "In 2004, we started with a simple belief:",
  paragraphs: [
    "What began as a small team of passionate thinkers, creators, and technologists has grown into a trusted digital transformation partner serving businesses, enterprises, government organizations, educational institutions, healthcare providers, startups, and global brands.",
    "Over the last 22+ years, we have delivered more than 200 successful projects and earned the trust of 100+ clients across industries and geographies. But numbers only tell part of the story. The real measure of our success lies in the relationships we've built, the challenges we've solved, and the growth we've helped create.",
  ],
} as const;

export const VELOCITY = {
  title: "Where Vision Meets Velocity",
  lead: "From strategy to screen, from concept to customer — we create digital products, experiences, and ecosystems that move businesses forward.",
  emphasis: "Because growth isn't accidental. It's Engineered.",
  body: "A small room. A big vision. An unwavering belief that technology should create opportunity, not complexity. From Kolkata to clients across continents, we've spent years helping businesses navigate change, embrace innovation, and create lasting value. Today, we help businesses across the world innovate faster, grow smarter, and achieve more.",
} as const;

/** Mission, Values and Vision, in the order the live page presents them. */
export const PILLARS = [
  {
    label: "Mission",
    body: "Our mission is to make technology simple, powerful, and accessible for every business. We listen, we understand, and we deliver solutions that actually work — helping you save time, reduce stress, and focus on what matters most: growing your business.",
  },
  {
    label: "Our Values",
    lead: "Everything we do at Wizard is guided by one simple principle — do the right thing, every time.",
    body: "At Wizard, we lead with honesty and deliver with excellence. We keep things simple and transparent — because we believe you deserve to know exactly what you're getting and why. Our commitment goes beyond just solving technical problems; it's about building relationships rooted in trust, respect, and a genuine desire to see your business succeed.",
  },
  {
    label: "Vision",
    body: "We started Wizard with a simple but powerful vision — to be the technology partner that businesses actually love working with. Not just a vendor. Not just a service provider. But a true partner who understands your goals, shares your ambitions, and works tirelessly to help you grow, scale, and lead. That vision drives everything we do — every strategy we build, every solution we deliver, and every relationship we nurture.",
  },
] as const;

export type TimelineEntry = {
  period: string;
  title: string;
  body: readonly string[];
  /** Named clients or products from that era. */
  highlights?: readonly string[];
};

export const MILESTONES = {
  eyebrow: "Milestone",
  title: "Small Beginnings. Global Impact.",
} as const;

export const TIMELINE: readonly TimelineEntry[] = [
  {
    period: "2004",
    title: "From Vision to Reality",
    body: [
      "In 1999, a group of creative enthusiasts with a passion for innovation and marketing excellence envisioned a company dedicated to delivering impactful creative solutions. Their vision became reality in 2004 with the establishment of Wizard Communications, a company committed to creativity, innovation, and customer-focused services.",
    ],
  },
  {
    period: "2004 – 2008",
    title: "Building a Creative Legacy",
    body: [
      "During its early years, Wizard Communications delivered creative solutions in E-learning, Website Development, and Web Portal Development for Government Organizations, Corporate Houses, Educational Institutions, and individual clients.",
    ],
    highlights: [
      "The Chartered Institute of Marketing (UK)",
      "Jadavpur University",
      "Parliament Museum of India",
      "National Science Museum of Yemen",
      "UNICEF",
      "UIDAI – Aadhaar",
      "Hindustan Unilever Ltd",
    ],
  },
  {
    period: "2008 – 2012",
    title: "Diversification Through Innovation",
    body: [
      "As the industry evolved, Wizard Communications transformed from a creative design organization into a technology-driven software development company to support long-term growth and sustainability.",
      "Leveraging its creative expertise and technical capabilities, the company expanded its services to include Custom Software Development, Database Solutions, and Enterprise Solutions. This transformation strengthened Wizard's position as a trusted technology partner.",
    ],
  },
  {
    period: "2012 – 2016",
    title: "The Transition into Software Excellence",
    body: [
      "As technology evolved rapidly, Wizard Communications adopted modern development technologies and frameworks to enhance the quality and scalability of its solutions. The company expanded into Mobile Application Development and Responsive Website Development.",
      "By the end of 2014, Wizard initiated the development of ServiceWorks, a comprehensive Field Service Management Software that later became widely used across the USA.",
    ],
    highlights: ["ServiceWorks"],
  },
  {
    period: "2016 – 2020",
    title: "Growth and Market Expansion",
    body: [
      "Wizard Communications continued its steady growth by serving clients across industries including Healthcare, Government, Retail, and Education. The company strengthened its project management capabilities and customer service standards while aligning with global technology standards.",
      "A major milestone during this phase was developing a portal for ITC Infotech, further reinforcing Wizard Communications' credibility as a trusted technology solutions provider.",
    ],
    highlights: ["ITC Infotech"],
  },
  {
    period: "2020 – 2024",
    title: "Digital Transformation Phase",
    body: [
      "During this phase, Wizard Communications focused on innovation, scalable software architecture, and next-generation technologies. During the pandemic and social distancing restrictions, the company introduced the Smart Commerce Management Suite to help businesses operate more efficiently in a changing environment.",
      "This phase also marked an important milestone as Wizard had the opportunity to work in Staff Augmentation Services for NEC Japan, further strengthening its international exposure and technical expertise.",
    ],
    highlights: ["Smart Commerce Management Suite", "NEC Japan"],
  },
  {
    period: "2024 – Present",
    title: "Leading the Future of Technology",
    body: [
      "With a strong commitment to quality, innovation, and customer satisfaction, Wizard Communications continues to evolve as a trusted technology partner for modern businesses. The company offers advanced solutions including the Smart Commerce Management Suite, Asset Management Systems, Restaurant Management Solutions, Restaurant POS, Project Management Tools, AI-powered Chatbots, and business solutions for Sales, Purchase, HRMS, and Delivery Management.",
      "Driven by innovation and technical excellence, Wizard Communications remains focused on delivering scalable and future-ready technology solutions while continuing to expand its capabilities for the evolving digital landscape.",
    ],
  },
] as const;

export type Leader = {
  name: string;
  role: string;
  bio: string;
  /** Portrait in `public/team/`. */
  photo: string;
};

export const TEAM = {
  eyebrow: "Team",
  title: "Turning possibilities into performance.",
} as const;

/**
 * Leadership, in the order the business ranks them.
 *
 * The bios run to five or six sentences each. That is deliberate — they are
 * written to be read — so the card shows an opening and the full text opens in
 * a dialog rather than being truncated with no way to reach the rest.
 */
export const LEADERSHIP: readonly Leader[] = [
  {
    name: "Sumit Sarkar",
    role: "Founder & Chief Executive Officer",
    photo: "/team/sumit-sarkar.jpg",
    bio: "What began as a small, humble venture has grown into a company at the forefront of technology and design. Over more than two decades in the industry, Sumit has built a rare blend of design sensibility, strategic vision, and hands-on product leadership, shaping Wizard Communications at every stage of its growth. His career reflects a deep commitment to creating solutions that are as impactful as they are intuitive — a philosophy that continues to define Wizard's vision and its place in the industry today.",
  },
  {
    name: "Biswajit Banerjee",
    role: "Chief Technology Officer",
    photo: "/team/biswajit-banerjee.jpg",
    bio: "At Wizard Communications, Biswajit is the one who turns bold ideas into working technology. He brings a distinguished record of technical leadership, shaped by years of delivering scalable, high-impact solutions across some of the industry's most demanding environments. His strength lies in translating ambition into robust, real-world systems — a capability that now drives Wizard's engineering vision and continues to set the technical standard the company strives for.",
  },
  {
    name: "Vishwarup Bal",
    role: "Leader – Engineering & Technology Infrastructure",
    photo: "/team/vishwarup-bal.jpg",
    bio: "At Wizard Communications, Vishwarup is the one who builds the systems that let great ideas thrive. He brings extensive experience in delivering reliable, high-performing solutions across the full development lifecycle, from infrastructure to execution. His natural instinct for operational discipline, combined with a sharp focus on quality, reliability, and continuous improvement, makes him the steady hand behind Wizard's engineering delivery and technology infrastructure.",
  },
  {
    name: "Tirthankar Dey",
    role: "Solutions Architect",
    photo: "/team/tirthankar-dey.webp",
    bio: "Some engineers write code — Tirthankar builds systems that last. Fluent in the Microsoft technology stack, he brings extensive experience delivering solutions across a wide range of complex projects. His natural instinct for translating business requirements into clean, well-architected systems, combined with his collaborative approach and attention to detail, makes him one of the trusted problem-solvers on Wizard's engineering team.",
  },
  {
    name: "Anup Kumar Ghosh",
    role: "Client Solutions Leader",
    photo: "/team/anup-kumar-ghosh.webp",
    bio: "At Wizard Communications, Anup is the one who makes sure every client relationship translates into meaningful technical results. He brings extensive experience delivering end-to-end solutions across client and server environments, with a sharp instinct for solving complex problems efficiently. His focus on strong client collaboration, practical solutions, and optimized outcomes has made him a trusted force behind some of Wizard's most successful engagements.",
  },
  {
    name: "Joydeep Mukherjee",
    role: "Lead Database & Backend Engineer",
    photo: "/team/joydeep-mukherjee.webp",
    bio: "At Wizard Communications, Joydeep is the one who makes sure the systems underneath every application remain fast, stable, and secure. He brings extensive experience in building robust backend architectures and data infrastructure, with a sharp focus on precision, performance, and reliability. His commitment to clean engineering and continuous improvement makes him a key force behind the dependable technical foundations that power Wizard's solutions.",
  },
] as const;

export const GROWTH_PARTNER = {
  eyebrow: "Growth Partner",
  title: "Better Together. Built for What's Next.",
  body: "We bring together strategy, creativity, technology, and marketing to help businesses innovate, scale, and stay ahead. Working as an extension of your team, we transform ambitious ideas into measurable business results.",
  emphasis: "Your vision. Our expertise. Shared success.",
  /** The partner mark this section carries on the live site. */
  partner: {
    name: "Webgiginfo",
    logo: "/about/webgig-info-logo.png",
    width: 300,
    height: 58,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const GALLERY_COPY = {
  eyebrow: "Gallery",
  title: "The moments between the milestones.",
  body: "Pujas, picnics, birthdays and the odd trip out of the city — twenty-two years of the people behind the work.",
} as const;

/**
 * Office gallery, in the order the live site publishes it.
 *
 * Intrinsic dimensions are recorded per photo because the grid is a masonry
 * layout: it lays each image out at its natural ratio rather than cropping
 * everything to a common box, so the ratios have to be known up front to
 * reserve the right space and avoid a layout shift on load.
 */
export const GALLERY = [
  {
    src: "/gallery/puja-lunch-2024-a.jpg",
    caption: "2024 Puja lunch with the team",
    width: 960,
    height: 1280,
  },
  {
    src: "/gallery/puja-lunch-2024-b.jpg",
    caption: "2024 Puja lunch with the team",
    width: 1280,
    height: 960,
  },
  {
    src: "/gallery/santiniketan-trip-2021.jpg",
    caption: "2021 Santiniketan trip with our office family",
    width: 1024,
    height: 768,
  },
  {
    src: "/gallery/santiniketan-picnic-2021.jpg",
    caption:
      "2021 Office employees with their families — Santiniketan picnic",
    width: 1024,
    height: 768,
  },
  {
    src: "/gallery/client-lunch-2021.jpg",
    caption: "2021 Team lunch with our valued client",
    width: 1032,
    height: 774,
  },
  {
    src: "/gallery/birthday-client-2021.jpg",
    caption:
      "2021 Celebrating our team member's birthday with a valued client",
    width: 1280,
    height: 720,
  },
  {
    src: "/gallery/team-client-group-2021.jpg",
    caption: "2021 Team group photo with our esteemed client",
    width: 1024,
    height: 768,
  },
  {
    src: "/gallery/office-picnic-2026.jpg",
    caption: "2026 Team outing — office picnic",
    width: 2560,
    height: 1920,
  },
] as const;

/**
 * Declared structurally rather than derived from `GALLERY` with
 * `(typeof GALLERY)[number]`. That inferred a union of literal types — `src`
 * was the eight exact filenames rather than `string` — so `<Gallery>` could
 * only ever be handed this one array, and no other set of photographs would
 * typecheck against it.
 */
export type GalleryPhoto = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

export const CLIENTS_COPY = {
  eyebrow: "Featured Clients",
  body: "We are proud to have 200+ satisfied clients from across the world and industries. From corporates to the government, we are the secret behind the success of countless agencies for 22 years.",
} as const;

/**
 * Client logos, as published.
 *
 * Eight of the eleven are dark ink on transparency — measured average ink
 * luminance below 90 — so they are effectively invisible on this site's
 * canvas. The wall renders them monochrome for that reason: white on dark,
 * black on light. It is a common convention for a logo wall and it is the
 * only treatment that works for all eleven without editing anyone's mark.
 */
export const CLIENT_LOGOS = [
  { name: "ITC", src: "/clients/itc.png" },
  { name: "SAIL", src: "/clients/sail.webp" },
  { name: "Sanofi Aventis", src: "/clients/sanofi.webp" },
  { name: "NEC", src: "/clients/nec.png" },
  { name: "CMC Limited", src: "/clients/cmc.webp" },
  { name: "Adayana Learning Solutions", src: "/clients/adayana.webp" },
  { name: "Amplo", src: "/clients/amplo.webp" },
  { name: "CDEC", src: "/clients/cdec.webp" },
  { name: "Crimzon Glow", src: "/clients/crimzon-glow.webp" },
  { name: "Service Works", src: "/clients/service-works.png" },
  { name: "Trased", src: "/clients/trased.webp" },
] as const;

/* ------------------------------------------------------------------ */
/* Why Wizard                                                          */
/* ------------------------------------------------------------------ */

export const WHY_WIZARD_PAGE = {
  eyebrow: "Why Wizard",
  titleLines: ["Because Growth Doesn't", "Happen by Accident."],
  lead: "It happens when strategy, creativity, technology, and ambition work together.",
  body: "For 22+ years, we've helped organizations transform ideas into experiences, experiences into engagement, and engagement into measurable business growth.",
  emphasis: "Built for today. Ready for what's next.",
  cta: { label: "Let's Talk", href: "/contact" },
} as const;

/** "Beyond Deliverables. Beyond Expectations." */
export const BEYOND = {
  title: "Beyond Deliverables. Beyond Expectations.",
  anyone: [
    "Anyone can build a website.",
    "Anyone can launch a campaign.",
    "Anyone can write code.",
  ],
  difference:
    "The difference lies in creating solutions that solve real business challenges, drive measurable outcomes, and continue creating value long after launch.",
  hook: "That's where we come in.",
  body: "By bringing together strategy, user experience, technology, cloud, enterprise solutions, digital marketing, and managed services, we create connected ecosystems that help organizations innovate, scale, and thrive.",
} as const;

/** "Why Clients Choose Wizard" */
export const CHOOSE_WIZARD = {
  title: "Why Clients Choose Wizard",
  reasons: [
    "Because we think beyond projects.",
    "Because we ask better questions.",
    "Because we care as much about outcomes as we do about ideas.",
    "Most importantly, because we work as partners — not vendors.",
  ],
  closing: [
    "Your goals become our goals.",
    "Your challenges become our challenges.",
    "Your growth becomes our mission.",
  ],
} as const;

/** "The Numbers Behind The Story" — the captions used on this page. */
export const NUMBERS_BEHIND = {
  title: "The Numbers Behind The Story",
  captions: {
    years: "Creating digital experiences that deliver business value.",
    projects: "Successfully delivered across industries and platforms.",
    clients: "Who trust us to help shape their digital future.",
  },
} as const;

export type Competency = {
  name: string;
  body: string;
  icon: LucideIcon;
};

/**
 * "End-to-End Expertise".
 *
 * The live page lists these five as names only, with no descriptions. The
 * one-liners below are new editorial, written from what the rest of the site
 * says each discipline covers — flagged so they are not mistaken for the
 * client's own copy.
 */
export const COMPETENCIES: readonly Competency[] = [
  {
    name: "Strategy",
    body: "Asking better questions before writing a line of code, so the build solves the actual problem.",
    icon: LineChart,
  },
  {
    name: "Experience Design",
    body: "Seamless, intuitive interfaces designed around the people who have to use them every day.",
    icon: PenTool,
  },
  {
    name: "Technology",
    body: "Full-stack engineering across cloud, data and AI — connected ecosystems rather than isolated tools.",
    icon: Layers,
  },
  {
    name: "Marketing",
    body: "Visibility and engagement that compound, from technical SEO through to campaign measurement.",
    icon: Users,
  },
  {
    name: "Managed Services",
    body: "Keeping it running after launch: monitoring, security, releases and support.",
    icon: ShieldCheck,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Work With Us                                                        */
/* ------------------------------------------------------------------ */

export const WORK_WITH_US = {
  eyebrow: "Work With Us",
  titleLines: ["Work with our Talented Minds", "to Achieve your Business Needs"],
  lead: "Whether you require experienced professionals for full time or partial engagement for maintaining your systems, Wizard is the answer to all your requirements. Just inform us about your requirement, and we will suggest the appropriate way out.",
  models: {
    title: "We Offer Different ways to Onboard Our Experts For Your Project",
    body: "Are you searching for experts in a certain domain who can manage your projects, or you may assign a complete team? If so, Wizard is fully equipped to meet all of your requirements. Take a look at how we can be contracted.",
    cta: { label: "Get in Touch", href: "/contact" },
  },
  culture: {
    eyebrow: "Connect With Us",
    title:
      "Are you seeking to work with an organization that values your dedication to your work?",
    paragraphs: [
      "Are you in search of a company that recognizes your efforts like a small firm, but also offers the exposure and impact of a larger corporation? If so, we invite you to consider joining Wizard Communications.",
      "Our team provides challenging and exciting opportunities, and we are dedicated to fostering a supportive and collaborative work environment.",
    ],
    closing: "We're here to help your business grow and succeed.",
  },
} as const;

export type EngagementModel = {
  name: string;
  summary: string;
  detail: readonly string[];
};

export const ENGAGEMENT_MODELS: readonly EngagementModel[] = [
  {
    name: "Dedicated Associates",
    summary:
      "Exclusive human resources or expert teams focusing solely on your company's requirements, functioning as an extension of your own team.",
    detail: [
      "Full-time, dedicated capacity",
      "Works to your process and tooling",
      "Long-term product ownership",
    ],
  },
  {
    name: "Flexi Hiring",
    summary:
      "Flexible resource scaling with a minimum 40-hour purchase, enabling access to experts for maintenance, bugfixes and small tasks, with renewable hours.",
    detail: [
      "Minimum 40-hour blocks",
      "Renewable as you need them",
      "Ideal for maintenance and fixes",
    ],
  },
  {
    name: "Staff Augmentation",
    summary:
      "Qualified professionals tailored to your project needs, whether short-term or specialized, integrating seamlessly with your existing team.",
    detail: [
      "Specialist skills on demand",
      "Short or long engagements",
      "Slots into your existing team",
    ],
  },
] as const;
