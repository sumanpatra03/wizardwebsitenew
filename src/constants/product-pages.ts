import type { ServiceFeature, ServiceItem } from "./service-pages";

/**
 * Product detail pages.
 *
 * Transcribed from the four product pages published on wizardcomm.net. The
 * wording is theirs; only the grouping is new.
 *
 * Kept separate from `products.ts` for the same reason `service-pages.ts` is
 * separate from `services.ts`: that file is the summary the home page and the
 * footer read, and it stays small enough to scan. This one is the long-form
 * page content, and nothing outside the product routes needs to load it.
 *
 * The sections reuse the service page components rather than duplicating them.
 * A module list and a service's offerings are the same shape — a heading and a
 * list of titled paragraphs — so a second set of near-identical components
 * would only be two places to fix the same bug.
 */

export type ProductPage = {
  slug: string;
  eyebrow: string;
  titleLines: readonly string[];
  /** The line the live page runs directly under its heading. */
  tagline: string;
  lead: string;
  /** Further hero paragraphs. */
  body?: readonly string[];
  /** Closing hero line, set in the accent colour. */
  emphasis?: string;
  metaDescription: string;

  modules: { heading: string; lead?: string; items: readonly ServiceItem[] };
  highlights?: {
    heading: string;
    lead?: string;
    items: readonly ServiceFeature[];
  };
  benefits: { heading: string; lead?: string; items: readonly ServiceItem[] };
  advanced?: { heading: string; lead?: string; items: readonly ServiceItem[] };
  why: { heading: string; lead?: string; items: readonly ServiceItem[] };
  cta: { title: string; body: string; label: string };
};

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

/**
 * The "Proven Industry Experience" block, which all four pages publish with
 * only small variations. Declared once and spread, so the four pages cannot
 * drift apart on a claim the company makes identically everywhere.
 */
const COMMON_WHY: readonly ServiceItem[] = [
  {
    title: "Proven Industry Experience",
    body: "Trusted by organizations across industries to deliver reliable, scalable, and business-focused technology solutions.",
  },
  {
    title: "Security-First Architecture",
    body: "Enterprise-grade security, compliance standards, and data protection practices built into every layer of the solution.",
  },
  {
    title: "Flexible Deployment Options",
    body: "Choose cloud, on-premise, or hybrid deployment models that align with your business objectives and infrastructure requirements.",
  },
  {
    title: "Built to Scale",
    body: "Whether you are running one site or many, the platform grows effortlessly alongside your business.",
  },
  {
    title: "Rapid Implementation",
    body: "Accelerate time-to-market with faster deployment and a streamlined onboarding process.",
  },
  {
    title: "Continuous Optimization",
    body: "Benefit from ongoing support, upgrades, performance enhancements, and strategic guidance.",
  },
  {
    title: "Comprehensive Training",
    body: "Ensure rapid adoption and operational excellence through structured onboarding and expert-led training programs.",
  },
];

/* ------------------------------------------------------------------ */
/* Smart Commerce Management Suite                                     */
/* ------------------------------------------------------------------ */

const SMART_COMMERCE: ProductPage = {
  slug: "smart-commerce-suite",
  eyebrow: "Smart Commerce Management Suite",
  titleLines: ["Powering Smarter Commerce.", "Accelerating Business Growth."],
  tagline: "Sell Smarter. Deliver Faster. Grow Bigger.",
  lead: "Today's customers expect speed, convenience, and seamless experiences. Businesses need intelligent systems that can keep pace.",
  body: [
    "Wizard's Smart Commerce Management Suite is a comprehensive end-to-end commerce platform that unifies online sales, inventory management, order fulfillment, and delivery operations into a single intelligent ecosystem.",
    "Combining a powerful backend platform, delivery mobile application, and customer-facing eCommerce website, the solution enables businesses to manage the entire commerce lifecycle — from order placement to doorstep delivery — with efficiency, visibility, and control.",
  ],
  metaDescription:
    "An end-to-end commerce platform unifying online sales, inventory, order fulfilment and last-mile delivery — with a delivery mobile app and a customer-facing storefront.",

  modules: {
    heading: "One Platform. Complete Commerce Control.",
    lead: "Designed to simplify operations, improve customer experiences, and accelerate growth across every stage of your commerce journey.",
    items: [
      {
        title: "Order Management",
        body: "Centralize and manage orders from your eCommerce website and multiple sales channels through a single dashboard. Track every order in real time — from confirmation and processing to fulfillment and delivery.",
      },
      {
        title: "Inventory Management",
        body: "Maintain complete visibility over inventory across locations. Monitor stock levels in real time, automate replenishment alerts, prevent stockouts, and eliminate overselling with intelligent inventory control.",
      },
      {
        title: "Delivery Management",
        body: "Optimize last-mile delivery operations with automated allocation, route optimization, real-time tracking, and delivery status updates — ensuring faster, more reliable fulfillment.",
      },
      {
        title: "Order Fulfillment",
        body: "Bring order processing, inventory coordination, and delivery management together through a unified fulfillment engine that ensures every order is processed accurately and efficiently.",
      },
      {
        title: "Delivery Mobile App",
        body: "Empower delivery personnel with a dedicated mobile application featuring order details, route guidance, delivery tracking, QR-based proof of delivery, and real-time status updates.",
      },
      {
        title: "E-Commerce Website",
        body: "Deliver exceptional shopping experiences through a fully integrated customer-facing platform where customers browse products, place orders, and pay securely. Real-time synchronization keeps inventory accurate and order execution seamless.",
      },
    ],
  },

  highlights: {
    heading: "Where the platform does the work",
    items: [
      {
        title: "A storefront that stays in step",
        body: "The customer-facing site is not a separate system bolted on afterwards. Product data, pricing and stock levels synchronise in real time, so what a customer sees is what the warehouse actually holds.",
        image: "/products/commerce-ecommerce.webp",
      },
      {
        title: "Inventory that never oversells",
        body: "Stock is monitored across every location at once, with automated replenishment alerts before a line runs short. The same figures drive the storefront, the dashboard and the fulfilment engine.",
        image: "/products/commerce-inventory.webp",
      },
      {
        title: "Fulfilment as one motion",
        body: "Order processing, inventory coordination and delivery allocation run through a single engine rather than three disconnected steps, which is what removes the handoffs where orders usually stall.",
        image: "/products/commerce-fulfillment.webp",
      },
    ],
  },

  benefits: {
    heading: "Built to Drive Sales, Efficiency, and Customer Satisfaction.",
    items: [
      {
        title: "Wider Product Reach",
        body: "Offer customers a diverse and engaging product catalog that increases choice, enhances customer satisfaction, and drives higher sales conversions.",
      },
      {
        title: "Faster Deliveries",
        body: "Accelerate order processing and streamline logistics to ensure timely, accurate, and dependable deliveries.",
      },
      {
        title: "Secure Transactions",
        body: "Support multiple secure payment options, providing customers with a frictionless and trustworthy purchasing experience.",
      },
      {
        title: "Simplified Returns Management",
        body: "Deliver a transparent and hassle-free returns process that strengthens customer confidence and loyalty.",
      },
      {
        title: "Exceptional Customer Support",
        body: "Provide responsive support and proactive communication to create a superior customer experience at every touchpoint.",
      },
      {
        title: "Real-Time Order Tracking",
        body: "Keep customers informed throughout the delivery journey with live tracking updates that enhance transparency and trust.",
      },
    ],
  },

  advanced: {
    heading: "Intelligent Commerce. Built for Scale.",
    items: [
      {
        title: "Smart Search & Advanced Filtering",
        body: "Enable customers to discover products quickly and effortlessly through intelligent search capabilities and advanced filtering options.",
      },
      {
        title: "Automated Inventory Management",
        body: "Improve inventory accuracy, automate stock monitoring, and ensure uninterrupted order fulfillment through smart inventory automation.",
      },
      {
        title: "Multi-Vendor Marketplace Support",
        body: "Enable multiple vendors to manage products, inventory, and orders through a unified commerce ecosystem, creating new opportunities for growth.",
      },
      {
        title: "Analytics & Sales Intelligence",
        body: "Gain actionable insights into sales performance, customer behavior, revenue trends, inventory movement, and business growth through an intuitive dashboard.",
      },
      {
        title: "Secure Payment Gateway Integration",
        body: "Seamless checkout through integrated support for credit cards, debit cards, net banking, UPI, digital wallets, and other popular payment methods.",
      },
      {
        title: "Smart Alerts & Notifications",
        body: "Stay connected through automated WhatsApp, Email, SMS, and OTP notifications for orders, deliveries, account activities, and transactional updates.",
      },
    ],
  },

  why: {
    heading: "Technology That Delivers Measurable Business Value",
    items: COMMON_WHY,
  },

  cta: {
    title: "Transform Commerce Into Competitive Advantage",
    body: "From order capture and inventory control to fulfillment, delivery, and customer engagement, the Smart Commerce Management Suite helps businesses operate more efficiently, serve customers better, and grow faster.",
    label: "Request a Demo",
  },
};

/* ------------------------------------------------------------------ */
/* Smart Asset Management                                              */
/* ------------------------------------------------------------------ */

const SMART_ASSET: ProductPage = {
  slug: "smart-asset-management",
  eyebrow: "Smart Asset Management System",
  titleLines: ["Transform Assets into", "Strategic Business Advantage"],
  tagline: "Know what you own. Know where it is. Know how it's performing.",
  lead: "Assets are investments. Managing them intelligently is what drives efficiency, profitability, and growth.",
  body: [
    "Wizard's Smart Asset Management System provides complete visibility and control over your organization's physical assets — from procurement and allocation to maintenance, depreciation, and disposal.",
    "Designed to eliminate manual tracking and improve operational efficiency, the platform empowers businesses to maximize asset utilization, reduce costs, and make smarter decisions throughout the asset lifecycle.",
  ],
  metaDescription:
    "Complete visibility and control over physical assets — procurement, allocation, maintenance, depreciation and disposal, with barcode, QR and RFID tracking.",

  modules: {
    heading: "Smarter Asset Management. Simplified.",
    lead: "A centralized platform that streamlines planning, procurement, tracking, maintenance, and lifecycle management — giving you complete control over every asset, every step of the way.",
    items: [
      {
        title: "Planning & Procurement",
        body: "Make informed purchasing decisions with structured asset planning aligned to operational and business objectives.",
      },
      {
        title: "Asset Acquisition",
        body: "Digitally register, classify, and tag assets for accurate tracking and complete visibility from day one.",
      },
      {
        title: "Allocation & Assignment",
        body: "Assign assets to departments, teams, locations, or individual users while maintaining complete accountability.",
      },
      {
        title: "Lifecycle Tracking",
        body: "Monitor every asset from acquisition to retirement with real-time visibility into utilization, maintenance, depreciation, and performance.",
      },
    ],
  },

  highlights: {
    heading: "From purchase order to retirement",
    items: [
      {
        title: "Plan before you buy",
        body: "Structured planning ties every purchase to an operational need, so procurement decisions are made against the assets you already hold rather than in isolation from them.",
        image: "/products/asset-planning.webp",
      },
      {
        title: "Tagged from day one",
        body: "Assets are registered, classified and tagged at acquisition with barcode, QR or RFID, which is what makes later audits a scan rather than a stocktake.",
        image: "/products/asset-acquisition.webp",
      },
      {
        title: "The whole life, on record",
        body: "Utilisation, maintenance history, depreciation and performance stay attached to the asset from acquisition through to disposal, across departments, branches and sites.",
        image: "/products/asset-lifecycle.webp",
      },
    ],
  },

  benefits: {
    heading: "Drive Efficiency. Reduce Costs. Maximize Value.",
    items: [
      {
        title: "Maximize Asset Utilization",
        body: "Track assets in real time, optimize allocation, and ensure every resource delivers maximum business value.",
      },
      {
        title: "Reduce Maintenance Costs",
        body: "Proactively manage maintenance schedules, track service history, and minimize unexpected downtime.",
      },
      {
        title: "Increase Productivity",
        body: "Enable faster asset tracking through Barcode, QR Code, and RFID technologies while seamlessly integrating with accounting systems like Tally.",
      },
      {
        title: "Improve Financial Control",
        body: "Automate depreciation calculations, monitor asset costs, and maintain accurate financial records.",
      },
      {
        title: "Strengthen Compliance",
        body: "Generate standardized reports, maintain audit readiness, and ensure governance across the asset lifecycle.",
      },
      {
        title: "Make Smarter Decisions",
        body: "Leverage real-time operational and financial insights to drive strategic planning and long-term asset optimization.",
      },
    ],
  },

  advanced: {
    heading: "Built for Visibility. Designed for Control.",
    items: [
      {
        title: "Intelligent Dashboards",
        body: "Role-based dashboards deliver actionable insights tailored to management, finance, operations, and maintenance teams.",
      },
      {
        title: "Barcode, QR & RFID Support",
        body: "Accelerate asset identification, tracking, audits, and inventory verification with smart scanning technologies.",
      },
      {
        title: "Digital Documentation",
        body: "Store asset photographs, warranties, invoices, contracts, and supporting documents in one centralized repository.",
      },
      {
        title: "End-to-End Lifecycle Management",
        body: "Track assets across departments, branches, facilities, and locations while maintaining complete operational visibility.",
      },
      {
        title: "Multi-Location Asset Tracking",
        body: "Manage and monitor distributed assets effortlessly across multiple sites and business units.",
      },
    ],
  },

  why: {
    heading: "Technology That Delivers Measurable Business Value",
    items: COMMON_WHY,
  },

  cta: {
    title: "Gain Complete Control Over Your Assets",
    body: "Stop relying on spreadsheets, manual records, and fragmented systems. Empower your teams with a centralized platform that improves visibility, enhances accountability, reduces costs, and unlocks operational efficiency.",
    label: "Request a Demo",
  },
};

/* ------------------------------------------------------------------ */
/* Smart Restaurant Management                                         */
/* ------------------------------------------------------------------ */

const SMART_RMS: ProductPage = {
  slug: "smart-restaurant-management",
  eyebrow: "Restaurant Management System",
  titleLines: ["Run Smarter Restaurants.", "Serve Faster. Grow Profitably."],
  tagline: "Every part of the restaurant, under one platform.",
  lead: "Transform your restaurant operations with an intelligent, all-in-one Restaurant Management System designed to streamline workflows, optimize inventory, accelerate service, and maximize profitability.",
  body: [
    "From order management and kitchen coordination to inventory tracking and business analytics, Wizard's Restaurant Management System brings every aspect of your restaurant under one powerful platform — giving you complete control, real-time visibility, and the agility to scale with confidence.",
    "Whether you operate a single outlet, a growing chain, or a multi-location enterprise, our solution helps you deliver exceptional dining experiences while driving operational excellence.",
  ],
  metaDescription:
    "An all-in-one restaurant management system covering inventory, purchasing, production, housekeeping, stewarding, analytics and an integrated POS.",

  modules: {
    heading: "Powerful Modules. One Unified Platform.",
    lead: "Everything your restaurant needs to operate efficiently, reduce wastage, and deliver outstanding customer experiences.",
    items: [
      {
        title: "User & Role Management",
        body: "Ensure secure and seamless operations with configurable user roles and permissions. Control access, assign responsibilities, and manage staff efficiently across departments.",
      },
      {
        title: "Executive Dashboard & Analytics",
        body: "Gain real-time visibility into restaurant performance through intuitive dashboards, business insights, sales analytics, operational reports, and performance metrics.",
      },
      {
        title: "Inventory Management",
        body: "Track ingredients with precision, minimize wastage, and maintain optimum stock levels to keep your kitchen running smoothly.",
      },
      {
        title: "Real-Time Stock Management",
        body: "Monitor stock movement instantly, receive low-stock alerts, and ensure uninterrupted operations through proactive inventory control.",
      },
      {
        title: "Purchase Management",
        body: "Simplify procurement with streamlined supplier management, purchase orders, approvals, and cost tracking — ensuring better inventory planning and expense control.",
      },
      {
        title: "Production Management",
        body: "Optimize food preparation by intelligently mapping ingredients to menu items, ensuring accurate consumption tracking and production efficiency.",
      },
      {
        title: "Housekeeping Management",
        body: "Maintain the highest standards of cleanliness and compliance through structured housekeeping schedules, maintenance tracking, and operational monitoring.",
      },
      {
        title: "Steward Management",
        body: "Improve service quality and staff productivity with efficient allocation, monitoring, and management of stewarding operations.",
      },
      {
        title: "Integrated POS System",
        body: "A fully integrated Point of Sale solution that connects ordering, billing, payment processing, kitchen operations, and inventory updates in real time.",
      },
    ],
  },

  highlights: {
    heading: "Where the kitchen meets the back office",
    items: [
      {
        title: "Roles that match the floor",
        body: "Configurable permissions mean a steward, a purchasing manager and a general manager each see the system their job needs, which is what keeps access control from becoming an obstacle to service.",
        image: "/products/rms-user-role.webp",
      },
      {
        title: "Procurement with a paper trail",
        body: "Supplier management, purchase orders, approvals and cost tracking sit in the same system as the stock they replenish, so inventory planning is driven by what was actually bought.",
        image: "/products/rms-purchase.webp",
      },
      {
        title: "Standards you can evidence",
        body: "Structured housekeeping schedules, maintenance tracking and operational monitoring turn compliance from an inspection scramble into a record that already exists.",
        image: "/products/rms-housekeeping.webp",
      },
    ],
  },

  benefits: {
    heading: "Simplify Operations. Maximize Performance.",
    items: [
      {
        title: "Streamlined Restaurant Operations",
        body: "Automate daily workflows and eliminate manual inefficiencies by connecting front-of-house, kitchen, inventory, procurement, and staff management in one ecosystem.",
      },
      {
        title: "Faster Order Fulfilment",
        body: "Accelerate order processing through seamless POS-to-kitchen communication, enabling quicker service and improved customer satisfaction.",
      },
      {
        title: "Data-Driven Decision Making",
        body: "Leverage powerful analytics, business intelligence, and performance reports to make informed strategic decisions.",
      },
      {
        title: "Intelligent Inventory Control",
        body: "Automatically update stock levels with every transaction, reducing shortages, minimizing wastage, and improving cost efficiency.",
      },
      {
        title: "Enhanced Workforce Management",
        body: "Coordinate housekeeping, stewarding, and operational activities more effectively to deliver consistent service excellence.",
      },
      {
        title: "Superior Customer Experience",
        body: "Deliver faster service, accurate billing, and a smoother dining experience that keeps customers coming back.",
      },
    ],
  },

  advanced: {
    heading: "Built for Modern Restaurants",
    items: [
      {
        title: "Smart Inventory Automation",
        body: "Track ingredient consumption in real time and maintain complete inventory accuracy while reducing food wastage and operational losses.",
      },
      {
        title: "Integrated POS & Kitchen Workflow",
        body: "Automate the entire order lifecycle — from order placement and kitchen execution to billing and payment processing.",
      },
      {
        title: "Advanced Analytics & Reporting",
        body: "Access actionable insights on sales performance, inventory trends, operational efficiency, customer behavior, and profitability.",
      },
      {
        title: "Multi-Device Accessibility",
        body: "Enable secure access across desktops, tablets, and mobile devices, allowing teams to stay connected and productive from anywhere.",
      },
      {
        title: "Role-Based Security Controls",
        body: "Protect critical business data through granular user permissions and enterprise-grade access management.",
      },
    ],
  },

  why: {
    heading: "Technology That Works. Partnerships That Last.",
    items: COMMON_WHY,
  },

  cta: {
    title: "Ready to Modernize Your Restaurant Operations?",
    body: "Unlock greater efficiency, improved profitability, and exceptional customer experiences. From inventory and procurement to POS and analytics, we provide everything you need to run a smarter, more profitable restaurant.",
    label: "Request a Demo",
  },
};

/* ------------------------------------------------------------------ */
/* Smart Restaurant POS                                                */
/* ------------------------------------------------------------------ */

const SMART_POS: ProductPage = {
  slug: "smart-restaurant-pos",
  eyebrow: "Smart Restaurant POS",
  titleLines: ["Faster Service. Smarter", "Operations. Happier Customers."],
  tagline: "Turn Every Order into a Better Experience.",
  lead: "In the restaurant business, every second counts. Wizard's Smart Restaurant POS empowers restaurants to streamline operations, accelerate service, simplify billing, and enhance customer experiences through a powerful, integrated platform designed for modern dining environments.",
  body: [
    "From order management and table allocation to kitchen coordination, analytics, QR ordering, and multi-device synchronization, our intelligent POS solution helps restaurants operate more efficiently, serve faster, and grow profitably.",
  ],
  emphasis: "Serve Faster. Operate Smarter. Grow Stronger.",
  metaDescription:
    "A restaurant point-of-sale connecting orders, tables, kitchen tickets, billing, QR ordering and analytics across every device in the room.",

  modules: {
    heading: "Everything Your Restaurant Needs. In One Powerful Platform.",
    lead: "Our Smart Restaurant POS seamlessly connects front-of-house operations, kitchen workflows, billing, reporting, and customer interactions — creating a smooth, efficient, and profitable dining ecosystem.",
    items: [
      {
        title: "Order Management",
        body: "Manage dine-in, takeaway, and online orders from a single platform. Process orders faster, reduce delays, and improve service efficiency.",
      },
      {
        title: "Zone & Table Management",
        body: "Organize tables by zones, monitor occupancy in real time, and optimize seating to reduce wait times and maximize table turnover.",
      },
      {
        title: "Menu & Category Management",
        body: "Easily create, update, and manage menus, categories, pricing, and offerings — ensuring customers always have access to the latest information.",
      },
      {
        title: "User & Staff Management",
        body: "Control access through role-based permissions while improving accountability, security, and operational oversight.",
      },
      {
        title: "Kitchen Order Ticket (KOT)",
        body: "Automatically route orders to the kitchen in real time, reducing manual errors and accelerating food preparation.",
      },
      {
        title: "Quick & Secure Billing",
        body: "Generate accurate bills instantly and support multiple payment methods for a faster, hassle-free checkout experience.",
      },
      {
        title: "Sales Analytics & Reporting",
        body: "Gain valuable insights into sales trends, peak hours, best-selling items, customer preferences, and business performance.",
      },
      {
        title: "Import & Export",
        body: "Easily import menus and export operational data for accounting, reporting, audits, and business analysis.",
      },
      {
        title: "QR-Based Ordering",
        body: "Deliver a modern, contactless dining experience by enabling customers to browse menus and place orders directly from their smartphones.",
      },
      {
        title: "Multi-Device Synchronization",
        body: "Keep your entire restaurant connected with real-time synchronization across POS terminals, tablets, mobile devices, and service counters.",
      },
    ],
  },

  benefits: {
    heading: "Designed to Improve Efficiency. Built to Increase Revenue.",
    items: [
      {
        title: "Faster Order Processing",
        body: "Handle dine-in, takeaway, and online orders in real time, reducing service delays and enhancing customer satisfaction.",
      },
      {
        title: "Smarter Table Management",
        body: "Monitor table availability, optimize seating arrangements, and improve service efficiency — even during peak business hours.",
      },
      {
        title: "Better Business Visibility",
        body: "Access real-time dashboards, performance reports, and actionable insights that help drive smarter business decisions.",
      },
      {
        title: "Enhanced Kitchen Efficiency",
        body: "Ensure seamless communication between service staff and kitchen teams, minimizing errors and improving turnaround times.",
      },
      {
        title: "Contactless Dining Experience",
        body: "Empower customers with QR-based self-ordering for greater convenience, reduced wait times, and an enhanced dining journey.",
      },
      {
        title: "Mobile Business Monitoring",
        body: "Track sales performance, staff productivity, customer trends, and operational metrics from anywhere through intuitive management dashboards.",
      },
    ],
  },

  why: {
    heading: "More Than a POS. A Platform for Restaurant Growth.",
    items: COMMON_WHY,
  },

  cta: {
    title: "Transform Restaurant Operations with Smart Technology",
    body: "Deliver faster service, improve operational efficiency, simplify management, and create exceptional dining experiences — all from a single integrated platform.",
    label: "Schedule a Live Demo",
  },
};

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export const PRODUCT_PAGES: readonly ProductPage[] = [
  SMART_COMMERCE,
  SMART_ASSET,
  SMART_RMS,
  SMART_POS,
] as const;

export function getProductPage(slug: string): ProductPage | undefined {
  return PRODUCT_PAGES.find((page) => page.slug === slug);
}

/** Copy for the `/products` index. */
export const PRODUCTS_INDEX = {
  eyebrow: "Our Products",
  titleLines: [
    "Innovative Digital Products",
    "Built for Modern Enterprises",
  ],
  lead: "Smart Solutions for Modern Businesses.",
  body: "Smart, scalable digital solutions spanning e-commerce, asset tracking, restaurant operations and point of sale — built to raise productivity across the whole organisation.",
} as const;
