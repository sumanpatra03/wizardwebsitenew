import type { Project } from "@/types/content";

/**
 * The twenty projects published on wizardcomm.net/projects. Descriptions are
 * the client's own copy.
 *
 * ## Why most cards have no image
 *
 * The live portfolio grid renders client-side, so its card artwork is not in
 * the served markup and could not be transcribed with the copy. Five cards
 * carry the artwork the home page publishes for them, two carry the galleries
 * the live site opens in a modal, and one carries its product shot. The rest
 * fall back to the generated monogram panel, which is exactly the case that
 * fallback exists for — the grid is complete today and improves one file at a
 * time as artwork arrives.
 *
 * ## Why `externalUrl` and not a detail page
 *
 * Twelve of the twenty link straight out to the client's own site on the live
 * version. Seven have a case-study page on wizardcomm.net that this site has
 * not built yet, and two open a gallery rather than a page. `projectHref`
 * resolves all three cases, so no card links into a 404.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "service-works",
    title: "Service Works",
    category: "Software Application",
    description:
      "Real time tracking of technician's position. Completely integrated accounting solution. Free onboarding including data import from most existing software. Smart scheduling using Google Maps.",
    monogram: "SW",
    image: "/projects/service-works.jpg",
    tags: ["Cloud SaaS", "Field Service", "Scheduling"],
  },
  {
    slug: "itc-limited",
    title: "ITC",
    category: "Software Application",
    description:
      "A fragrance development and approval platform for one of India's largest FMCG groups, digitising a formulation workflow that previously ran on paper.",
    monogram: "IT",
    image: "/projects/itc-limited.jpg",
    tags: ["Enterprise", "Workflow", "FMCG"],
  },
   {
    slug: "k-middle-east",
    title: "K Middle East",
    category: "Web Project",
    description:
      "Seamless immigration platform simplifying visa applications, documentation, tracking, and global opportunities.",
    monogram: "KM",
    image: "/projects/k-middle-east.jpg",
    tags: ["Web Platform", "Case Tracking"],
  },
  {
    slug: "cosmetic-company",
    title: "Cosmetic Company",
    category: "Ecommerce Development",
    description:
      "Wizard built a user-friendly online store for Cosmetic Company, an emerging beauty and wellness brand gaining traction among Bangladeshi women, to increase visibility and sales.",
    monogram: "CC",
    image: "/projects/cosmetic-company.webp",
    tags: ["Ecommerce", "Brand"],
  },
   {
    slug: "wondr-years",
    title: "Wondr Years",
    category: "e-Learning",
    description:
      "An educational platform with a fully responsive website and a set of third-party integrations connecting content, assessment and reporting.",
    monogram: "WY",
    image: "/projects/wondr-years.jpg",
    tags: ["e-Learning", "Integrations"],
  },
  {
    slug: "parliament-museum",
    title: "Parliament Museum",
    category: "Digital Experience",
    description:
      "Indian Parliament Museum had set up a digital interactive kiosk on the Democratic Heritage of India, spanning 2500 years. We played a significant role in creating this digital experience, woven from virtual 3D walkthroughs, digital rich media interactions and audio-visual presentation.",
    monogram: "PM",
    image: "/projects/parliament-museum-1.jpg",
    gallery: [
      {
        src: "/projects/parliament-museum-1.jpg",
        caption:
          "Digital Rich Media Interaction — Legislative Reforms in India, 1833 to 1947",
        width: 600,
        height: 447,
      },
      {
        src: "/projects/parliament-museum-2.jpg",
        caption:
          "Digital Rich Media Interaction — the three organs of state: executive, legislature, judiciary",
        width: 600,
        height: 447,
      },
      {
        src: "/projects/parliament-museum-3.jpg",
        caption:
          "Digital Rich Media Interaction — the Indian Constitution, from preamble to directive principles",
        width: 600,
        height: 447,
      },
      {
        src: "/projects/parliament-museum-4.jpg",
        caption: "Digital 3D modelling and virtual walkthrough",
        width: 600,
        height: 447,
      },
    ],
    tags: ["3D Walkthrough", "Rich Media", "Government"],
  },
  {
    
    slug: "uvanij",
    title: "Uvanij",
    category: "Ecommerce Development",
    description:
      "Secure, scalable ecommerce platform delivering seamless shopping, payments, and business growth.",
    monogram: "UV",
    tags: ["Ecommerce", "Payments", "Platform"],
  },
  {
    slug: "restaurant-management-software",
    title: "Restaurant Management Software",
    category: "Software Application",
    description:
      "Streamlined restaurant management software improving orders, billing, inventory, efficiency, and profitability.",
    monogram: "RM",
    tags: ["Hospitality", "Inventory", "POS"],
  },
 
  {
    slug: "sunbridge",
    title: "Sunbridge",
    category: "Security",
    description:
      "Modernized cybersecurity infrastructure delivering secure, resilient, scalable, high-performance digital operations.",
    monogram: "SB",
    tags: ["Cyber Security", "Infrastructure"],
  },
  
 
  
  {
    slug: "mass-awareness-campaign",
    title: "Mass Awareness Campaign",
    category: "Digital Experience",
    description:
      "Web portal for fire disaster management, explaining the nature and types of fire, immediate action on a fire breaking out, and medical aid to the injured. Countless illustrations, graphics, images, 2D animations and voice-over materials are integral to it.",
    monogram: "MA",
    image: "/projects/mass-awareness-1.jpg",
    gallery: [
      { src: "/projects/mass-awareness-1.jpg", caption: "Fire disaster management portal", width: 600, height: 447 },
      { src: "/projects/mass-awareness-2.jpg", caption: "Illustrated safety guidance", width: 600, height: 447 },
      { src: "/projects/mass-awareness-3.jpg", caption: "2D animation and voice-over modules", width: 600, height: 447 },
    ],
    tags: ["Public Sector", "2D Animation", "e-Learning"],
  },
  {
    slug: "interactive-courseware",
    title: "Interactive Courseware Development",
    category: "e-Learning",
    description:
      "Multipurpose training modules created for the employees of Aadhaar Enrolment Centres throughout India. The technical methodologies and processes have been described by illustrations, graphics, animation and voice over.",
    monogram: "IC",
    externalUrl: "https://cmcltd.com/",
    tags: ["e-Learning", "Government", "Animation"],
  },
  {
    slug: "adayana",
    title: "Adayana Learning Solutions",
    category: "e-Learning",
    description:
      "Courseware translation and voice-over recording for the localization of a digital interactive training module for TATA Motors.",
    monogram: "AD",
    externalUrl:
      "https://www.thecompanycheck.com/company/adayana-learning-solutions-private-limited/U72200TG2001PTC037959",
    tags: ["Localization", "Courseware"],
  },
  {
    slug: "crimzon-glow",
    title: "Crimzon Glow",
    category: "Web Project",
    description:
      "Crimzon Glow is a trusted technology partner delivering web, mobile, and enterprise solutions. In collaboration with Wizard Communications, they successfully developed scalable, high-quality courseware and digital learning solutions.",
    monogram: "CG",
    externalUrl: "http://www.crimzonglow.com/",
    tags: ["Web", "Courseware"],
  },
  {
    slug: "shakers-daily",
    title: "Shakers Daily",
    category: "Ecommerce Development",
    description:
      "Shakers Daily is a popular online grocery, meat, and food store operating in Kolkata. We helped design the website and scale it to run complex workloads. The simplicity and user experience of the website are also a trademark of Wizard.",
    monogram: "SD",
    externalUrl: "https://shakersdaily.uvanij.com/",
    tags: ["Ecommerce", "Grocery", "Scale"],
  },
  {
    slug: "shiny-bins-cleaning",
    title: "Shiny Bins Cleaning",
    category: "Web Project",
    description:
      "Our dedicated team of professionals are focused on serving homes and commercial businesses in our community.",
    monogram: "SB",
    externalUrl: "https://shinybinscleaning.com/",
    tags: ["Web", "Local Services"],
  },
  {
    slug: "akm",
    title: "AKM",
    category: "Web Project",
    description:
      "AKM was incorporated in 2011 to provide end-to-end purchasing and supply chain solutions. We empower local and international clients to discover and source from the world's most efficient suppliers.",
    monogram: "AK",
    externalUrl: "https://akmcorporation.com/",
    tags: ["Supply Chain", "Web"],
  },
  {
    slug: "sunbridge-capital-partners",
    title: "Sunbridge Capital Partners",
    category: "Web Project",
    description:
      "Sunbridge Capital Partners is a specialized investment management company. Wizard built its website to increase visibility, delivering a simple site in record time with world-class best practices.",
    monogram: "SC",
    externalUrl: "https://sunbridgecapitalpartners.com/",
    tags: ["Finance", "Web"],
  },
  {
    slug: "bee-fresh-bins",
    title: "Bee Fresh Bins",
    category: "Web Project",
    description:
      "A state of the art, eco-friendly system that kills 99.9% of bacteria and cleans your garbage, recycle and yard waste bins.",
    monogram: "BF",
    externalUrl: "https://beefreshbins.com/",
    tags: ["Web", "Sustainability"],
  },
  {
    slug: "hotel-new-emerald",
    title: "Hotel New Emerald",
    category: "Web Project",
    description:
      "Hotel New Emerald is glad to welcome you. We are the most-voted accommodation in Kharagpur, with clean, hygienic, and comfortable AC rooms.",
    monogram: "HE",
    externalUrl: "https://hotelnewemerald.com/",
    tags: ["Hospitality", "Web"],
  },
  {
    slug: "kumaon-elements",
    title: "Kumaon Elements",
    category: "Web Project",
    description:
      "A group of nature lovers and avid travelers, building experiential homestays and promoting sustainable tourism.",
    monogram: "KE",
    externalUrl: "https://kumaonelements.com/",
    tags: ["Travel", "Web"],
  },
  {
    slug: "light-a-lamp",
    title: "Light a Lamp",
    category: "Web Project",
    description:
      "Light a Lamp creates a platform for its students where skills, expertise, resources and need-based guidance can be rendered by a team of successful professionals and intellectuals from diverse backgrounds.",
    monogram: "LL",
    externalUrl: "http://lightalamp-artofliving.org",
    tags: ["Education", "Non-profit"],
  },
] as const;

/** Copy for the `/projects` index, taken from the live page. */
export const PROJECTS_COPY = {
  eyebrow: "Latest Projects",
  titleLines: ["Clean and modern design", "is our best specialist"],
  lead: "Join us in this aesthetic experience of building your business from scratch. You provide us with ideas while we improvise, innovate and adapt.",
  body: "Our clients are not only our business partners, they are very much a part of the creation process, brainstorming sessions and so on. We have provided extensive support to all the following brands — developing software, mobile apps, websites, flyers, brochures, all kinds of publicity materials, and a gamut of digital marketing services.",
  stats: [
    { value: "200+", label: "Successful Consulting" },
    { value: "150+", label: "Live Websites" },
    { value: "10", label: "eLearning Solutions" },
  ],
} as const;

/**
 * Where a project card should link.
 *
 * The client's own site where there is one, otherwise nowhere — the seven
 * case studies wizardcomm.net publishes have no page on this site yet, and a
 * card that links into a 404 is worse than a card that does not link.
 */
export function projectHref(project: Project): string | undefined {
  return project.externalUrl;
}
