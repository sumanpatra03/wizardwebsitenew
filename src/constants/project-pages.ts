/**
 * Case-study pages.
 *
 * Transcribed from the seven project write-ups published on
 * wizardcomm.net/projects. The wording is theirs; only the grouping is new.
 *
 * All seven share one shape — challenge, solution, four steps, assets
 * delivered, business impact — because the live pages do. That is unusual
 * enough to be worth relying on: unlike the service pages, where every section
 * had to be optional, here a single non-optional template renders all seven
 * without a gap.
 *
 * `slug` matches the entry in `projects.ts`, which is what lets a case study
 * pick up that project's artwork, category and tags without restating them.
 *
 * That pairing is load-bearing: a slug here with no matching project renders
 * as a 404 rather than as an error, because the page has no title, category
 * or image to show. `assertPaired` turns that silent failure into a build
 * failure instead.
 */

export type CaseStudy = {
  slug: string;
  /** The line the live page runs under its heading. */
  tagline: string;
  /** The published "solution" paragraph, used as the hero lead. */
  lead: string;
  metaDescription: string;

  /*
   * Everything below is optional.
   *
   * The seven client write-ups all share the same challenge / steps / assets /
   * impact shape, because the source pages do. Work we commissioned ourselves
   * does not — Drift has no client brief and no before-and-after to report, it
   * has a product and a list of what went into it. Forcing that into the
   * client template would mean inventing a challenge nobody set.
   */
  challenge?: readonly string[];
  /** The four-step delivery narrative. */
  steps?: readonly { title: string; body: string }[];
  /** What the client ended up with. */
  assets?: readonly string[];
  impact?: readonly string[];
  /** For work with no client brief: what the thing is made of. */
  built?: { heading: string; items: readonly string[] };
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "drift",
    tagline: "A soft landing into sleep.",
    lead: "Drift is a sleep and relaxation app imagined and built end to end by Wizard: product spec, brand, UX, engineering and audio design. Sessions like Coastal Night, Rainfall System and Northern Lights pair living gradient visuals with layered soundscapes that fade as you do.",
    metaDescription:
      "Drift — a sleep and relaxation app built end to end by Wizard: product spec, brand, UX, engineering and audio design, with GPU gradient visuals and a three-layer audio engine.",
    built: {
      heading: "What we built",
      items: [
        "Living, multi-point gradient visuals rendered on the GPU, with a dimming scheduler tuned for bedtime",
        "A three-layer synthesized audio engine with an exponential sleep fader, so sound never cuts, it dissolves",
        "A twenty-session catalog with breath guidance, sleep timers and a premium tier",
        "Architecture written to port one-to-one to native Android — Kotlin, Compose, AGSL",
      ],
    },
  },
  {
    slug: "service-works",
    tagline:
      "Empowering businesses with an intelligent, cloud-based operations platform.",
    lead: "Wizard developed a scalable cloud-based SaaS platform that centralizes operations, automates workflows, and delivers real-time visibility through integrated web and mobile applications.",
    challenge: [
      "Poor documentation and a lack of audit trails",
      "Limited business insights and delayed reporting",
      "Manual workflows and scalability challenges",
      "Disconnected standalone applications for orders, inventory, customers and field service",
    ],
    steps: [
      {
        title: "Centralize",
        body: "Unified management of customers, orders, inventory, payments, and scheduling.",
      },
      {
        title: "Automate",
        body: "Automated purchase orders, task scheduling, and workflow management.",
      },
      {
        title: "Analyze",
        body: "Custom dashboards, advanced reporting, and real-time insights.",
      },
      {
        title: "Connect",
        body: "Complete operational visibility across systems.",
      },
    ],
    assets: [
      "Unified Business Management Platform",
      "Mobile Workforce Application",
      "Reporting & Analytics Dashboard",
    ],
    impact: [
      "Process automation reducing manual work",
      "Real-time dashboards for faster decision-making",
      "Improved field team productivity",
      "Scalable architecture supporting enterprise growth",
      "Enhanced customer experience through automation",
    ],
    metaDescription:
      "A cloud-based SaaS platform centralising orders, inventory, customers, scheduling and field service, with a mobile workforce app and real-time analytics.",
  },
  {
    slug: "itc-limited",
    tagline:
      "Transforming manual fragrance processes into a high-performance digital workflow.",
    lead: "A web-based digital platform that manages the complete fragrance development lifecycle with centralized data, workflow automation, collaboration, reporting, and real-time monitoring.",
    challenge: [
      "Manual workflows and fragmented collaboration",
      "Offline approvals and email-based communication causing delays",
      "Poor visibility and inconsistent documentation",
      "Absence of real-time tracking and accountability",
    ],
    steps: [
      {
        title: "Centralize",
        body: "Unified repository for fragrance projects with complete lifecycle management.",
      },
      {
        title: "Automate",
        body: "Digital approval workflows with milestone tracking and notifications.",
      },
      {
        title: "Monitor",
        body: "Comprehensive dashboards, reporting, and audit trails.",
      },
      {
        title: "Collaborate",
        body: "Improved communication across teams, evaluators, and vendors.",
      },
    ],
    assets: [
      "Fragrance Development Portal",
      "Workflow Automation Engine",
      "Reporting & Analytics Dashboard",
    ],
    impact: [
      "Reduced fragrance development cycle time",
      "Improved team and vendor collaboration",
      "Enhanced project visibility and status tracking",
      "Accurate compliance documentation",
      "Better pricing and ingredient optimization decisions",
      "Increased operational efficiency and faster product launches",
    ],
    metaDescription:
      "A fragrance development portal for ITC, digitising a formulation and approval lifecycle that previously ran on email and paper.",
  },
  {
    slug: "aim",
    tagline:
      "Transforming asset management through intelligent digital automation.",
    lead: "A comprehensive system that digitized the complete asset lifecycle, providing real-time visibility, workflow automation, and centralized control across the institution's academic, administrative, and IT assets.",
    challenge: [
      "Manual asset registers",
      "Department silos",
      "Reactive maintenance",
      "Audit complexity",
      "Limited asset tracking",
      "Lifecycle management gaps",
    ],
    steps: [
      {
        title: "Track",
        body: "Real-time monitoring of assets across departments, laboratories, hostels, and administrative units.",
      },
      {
        title: "Manage",
        body: "Automated asset allocation, transfers, returns, depreciation calculations, and lifecycle management.",
      },
      {
        title: "Maintain",
        body: "Preventive maintenance scheduling with automated alerts to reduce equipment downtime.",
      },
      {
        title: "Control",
        body: "Role-based access, digital audit trails, and centralized reporting for secure asset governance.",
      },
    ],
    assets: [
      "Asset Lifecycle Management",
      "Maintenance & Depreciation Module",
      "Audit & Reporting Dashboard",
    ],
    impact: [
      "Improved asset visibility across all departments",
      "Reduced asset loss and manual effort",
      "Optimized maintenance planning",
      "Accurate depreciation management",
      "Faster audits through digital records",
      "Enhanced collaboration with secure workflows",
    ],
    metaDescription:
      "An asset management system digitising the full lifecycle across academic, administrative and IT assets, with preventive maintenance and audit trails.",
  },
  {
    slug: "uvanij",
    tagline:
      "Empowering entrepreneurs with a secure, high-performance digital commerce platform.",
    lead: "Wizard Communication developed Uvanij with a multi-layered security framework, scalable cloud architecture, and optimized platform performance to deliver a secure and reliable eCommerce ecosystem.",
    challenge: [
      "Cybersecurity threats and data protection risks",
      "Platform availability and infrastructure scalability concerns",
      "Change management and operational control gaps",
    ],
    steps: [
      {
        title: "Secure",
        body: "WAF, SSL/SSH, HSTS enforcement, and perimeter security.",
      },
      {
        title: "Protect",
        body: "Automated backups, access controls, and malware protection.",
      },
      {
        title: "Manage",
        body: "Change management workflows, SOPs, and governance.",
      },
      {
        title: "Scale",
        body: "Load balancers, multi-tenant hosting, and optimized infrastructure.",
      },
    ],
    assets: [
      "Secure eCommerce Platform",
      "Enterprise Cybersecurity Framework",
      "High Availability Cloud Infrastructure",
    ],
    impact: [
      "Advanced protection against cyber threats and unauthorized access",
      "Secure handling of customer and payment data",
      "Reliable platform performance with high availability",
      "Improved merchant confidence and reduced business risk",
      "Streamlined platform management with standardized governance",
      "Entrepreneurs empowered to focus on growth with security ensured",
    ],
    metaDescription:
      "A secure, scalable ecommerce platform built on a multi-layered security framework and high-availability cloud infrastructure.",
  },
  {
    slug: "restaurant-management-software",
    tagline:
      "Digitizing restaurant operations for greater efficiency and customer satisfaction.",
    lead: "Wizard Communication developed an integrated Restaurant Management Software that connects front-of-house, kitchen, inventory, finance, and workforce operations into a single intelligent platform.",
    challenge: [
      "Slow service and billing processes",
      "Limited business insights from operations",
      "Restricted stock visibility across locations",
      "Significant food wastage",
      "Manual processes causing operational inefficiencies",
      "No real-time visibility into inventory and sales",
    ],
    steps: [
      {
        title: "Manage",
        body: "Centralized order management for dine-in, takeaway, and online, with instant digital Kitchen Order Tickets.",
      },
      {
        title: "Automate",
        body: "Fast billing, tax calculation, discounts, multiple payments, inventory updates, and purchase management.",
      },
      {
        title: "Monitor",
        body: "Real-time inventory tracking, wastage control, sales analytics, and operational dashboards.",
      },
      {
        title: "Integrate",
        body: "HRMS for staff management and seamless Tally integration for accounting.",
      },
    ],
    assets: [
      "Restaurant Management System",
      "Inventory & HRMS Module",
      "Analytics Dashboard & Tally Integration",
    ],
    impact: [
      "Streamlined operations through workflow automation",
      "Faster order processing with reduced errors",
      "Improved inventory accuracy and minimized wastage",
      "Enhanced customer satisfaction",
      "Better workforce management",
      "Increased profitability through real-time analytics",
    ],
    metaDescription:
      "Restaurant management software connecting front-of-house, kitchen, inventory, finance and workforce operations, with Tally integration.",
  },
  {
    slug: "sunbridge",
    tagline: "Building a secure, resilient, and future-ready digital infrastructure.",
    lead: "Wizard Communication implemented a multi-layered cybersecurity architecture that enhanced infrastructure resilience, automated security operations, and ensured continuous protection against evolving cyber threats.",
    challenge: [
      "Legacy infrastructure and cloud security risks",
      "Limited threat monitoring and vulnerability exposure",
      "Lack of standard processes and manual change management",
    ],
    steps: [
      {
        title: "Secure",
        body: "Comprehensive security audit, WAF implementation, and SSL/SSH security.",
      },
      {
        title: "Automate",
        body: "Automated patching, real-time monitoring, alerts, and backup mechanisms.",
      },
      {
        title: "Govern",
        body: "Standardized SOPs for environments and change approval workflows.",
      },
      {
        title: "Optimize",
        body: "High-availability architecture using load balancers and optimized configurations.",
      },
    ],
    assets: [
      "Enterprise Cybersecurity Framework",
      "Cloud Security & Monitoring Platform",
      "High Availability Infrastructure",
    ],
    impact: [
      "Proactive security monitoring and threat protection",
      "Standardized security processes and governance",
      "High availability through load balancing",
      "Automated backup and recovery systems",
      "Enhanced customer trust and compliance",
    ],
    metaDescription:
      "A cybersecurity revamp — multi-layered architecture, automated patching and monitoring, standardised governance and high-availability infrastructure.",
  },
  {
    slug: "k-middle-east",
    tagline:
      "Delivering a modern digital experience for global immigration services.",
    lead: "Wizard Communication designed and developed a modern, WordPress-based website that delivers an intuitive user experience with optimized navigation and streamlined customer interactions.",
    challenge: [
      "Outdated website with limited serviceability",
      "Complex navigation and poor user engagement",
      "Low lead conversion and limited brand trust",
    ],
    steps: [
      {
        title: "Design",
        body: "Modern, minimalist UI/UX with responsive design.",
      },
      {
        title: "Develop",
        body: "Built on WordPress for flexible content management.",
      },
      {
        title: "Optimize",
        body: "User-friendly navigation and simplified inquiry forms.",
      },
      {
        title: "Deliver",
        body: "End-to-end implementation including testing and deployment.",
      },
    ],
    assets: [
      "Responsive Corporate Website",
      "WordPress CMS Platform",
      "Optimized Inquiry & Lead Generation System",
    ],
    impact: [
      "Enhanced user experience through intuitive website design",
      "Improved lead generation with optimized inquiry workflows",
      "Stronger brand credibility and professional digital presence",
      "Simplified content management via a scalable WordPress platform",
      "Higher website conversions through strategic call-to-action placement",
      "Seamless responsive design across all devices",
    ],
    metaDescription:
      "An immigration and visa services portal — a modern, responsive WordPress site built around navigation clarity and lead capture.",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** Whether a project has a case study on this site. */
export function hasCaseStudy(slug: string): boolean {
  return CASE_STUDIES.some((study) => study.slug === slug);
}
