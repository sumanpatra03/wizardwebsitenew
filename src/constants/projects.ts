import type { Project } from "@/types/content";

import { hasCaseStudy } from "./project-pages";

/**
 * The twenty projects published on wizardcomm.net/projects. Descriptions are
 * the client's own copy.
 *
 * ## Where the artwork came from
 *
 * The live portfolio grid renders client-side, so its card images never appear
 * in the served markup and could not be scraped alongside the copy. They were
 * pulled from the WordPress media library through the site's public REST
 * endpoint instead, matched to each project by filename.
 *
 * Nearly all of them are 360×400 poster cards with the client's mark set
 * across the top and a headline across the bottom, which is why the grid slot
 * is 9:10 — anything wider crops through type rather than trimming
 * background.
 *
 * The generated monogram panel is still the fallback for any project added
 * without artwork, so the grid can never be half-broken.
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
    slug: "drift",
    title: "Drift",
    category: "Mobile App",
    description:
      "A sleep and relaxation app imagined and built end to end by Wizard: product spec, brand, UX, engineering and audio design. Sessions like Coastal Night, Rainfall System and Northern Lights pair living gradient visuals with layered soundscapes that fade as you do.",
    monogram: "DR",
    // A square crop of the countdown screen, taken below the device chrome —
    // the card slot is square, so this needs no crop of its own.
    image: "/projects/drift/drift-card.webp",
    gallery: [
      {
        src: "/projects/drift/drift-home.webp",
        caption: "A calm home: one question, one tap to begin",
        width: 1080,
        height: 2196,
      },
      {
        src: "/projects/drift/drift-session.webp",
        caption: "Sessions with sleep timers and a premium tier",
        width: 1080,
        height: 2196,
      },
      {
        src: "/projects/drift/drift-timer.webp",
        caption: "The screen dims and the audio fades as sleep nears",
        width: 1080,
        height: 2196,
      },
      {
        src: "/projects/drift/drift-makers.webp",
        caption: "Designed in Kolkata. For the world.",
        width: 1080,
        height: 2196,
      },
    ],
    tags: ["Mobile App", "Audio Engine", "Product Design"],
  },
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
    slug: "aim",
    title: "AIM",
    category: "Software Application",
    description:
      "Smart asset management enabling innovation, efficiency, automation, scalability, and business growth.",
    monogram: "AI",
    image: "/projects/aim.webp",
    tags: ["Asset Management", "Automation"],
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
    image: "/projects/parliament-museum.jpg",
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
    image: "/projects/uvanij.jpg",
    tags: ["Ecommerce", "Payments", "Platform"],
  },
  {
    slug: "restaurant-management-software",
    title: "Restaurant Management Software",
    category: "Software Application",
    description:
      "Streamlined restaurant management software improving orders, billing, inventory, efficiency, and profitability.",
    monogram: "RM",
    image: "/projects/restaurant-management-software.webp",
    tags: ["Hospitality", "Inventory", "POS"],
  },
 
  {
    slug: "dastur-energy",
    title: "Dastur Energy",
    category: "Web Project",
    description:
      "A leading sustainable and clean energy company working with industry leaders globally. They needed a user-friendly platform to showcase clean energy solutions without complexity — a minimalistic site with ample white space, built on WordPress, which improved lead quality, traffic and conversion rates.",
    monogram: "DE",
    image: "/projects/dastur-energy.jpg",
    tags: ["Web Platform", "WordPress", "Clean Energy"],
  },
  {
    slug: "sunbridge",
    title: "Sunbridge",
    category: "Security",
    description:
      "Modernized cybersecurity infrastructure delivering secure, resilient, scalable, high-performance digital operations.",
    monogram: "SB",
    image: "/projects/sunbridge.webp",
    tags: ["Cyber Security", "Infrastructure"],
  },
  
 
  
  {
    slug: "mass-awareness-campaign",
    title: "Mass Awareness Campaign",
    category: "Digital Experience",
    description:
      "Web portal for fire disaster management, explaining the nature and types of fire, immediate action on a fire breaking out, and medical aid to the injured. Countless illustrations, graphics, images, 2D animations and voice-over materials are integral to it.",
    monogram: "MA",
    image: "/projects/mass-awareness-campaign.jpg",
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
    image: "/projects/interactive-courseware.jpg",
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
    image: "/projects/adayana.jpg",
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
    image: "/projects/crimzon-glow.jpg",
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
    image: "/projects/shakers-daily.jpg",
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
    image: "/projects/shiny-bins-cleaning.jpg",
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
    image: "/projects/akm.jpg",
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
    image: "/projects/sunbridge-capital-partners.jpg",
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
    image: "/projects/bee-fresh-bins.jpg",
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
    image: "/projects/hotel-new-emerald.jpg",
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
    image: "/projects/kumaon-elements.jpg",
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
    image: "/projects/light-a-lamp.jpg",
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
 * Where a project card should lead, and what its control should say.
 *
 * Every project now has a page of its own, so the destination is always
 * on-site: the seven with a write-up say so, and the rest lead to a shorter
 * page carrying the artwork, the description and a link out to the client.
 *
 * That is deliberately not the client's own site. Sending a reader off-site
 * from a portfolio card is the one click you cannot get back, and it skips
 * the only page where the work is framed as ours.
 */
export function projectLink(
  project: Project,
): { href: string; label: string; external: boolean } {
  return {
    href: `/projects/${project.slug}`,
    label: hasCaseStudy(project.slug) ? "Read the case study" : "View project",
    external: false,
  };
}

/** Every category present, in descending order of how many projects use it. */
export const PROJECT_CATEGORIES: readonly { name: string; count: number }[] =
  Object.entries(
    PROJECTS.reduce<Record<string, number>>((counts, project) => {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
      return counts;
    }, {}),
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
