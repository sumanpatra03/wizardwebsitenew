import {
  BrainCircuit,
  Code2,
  GraduationCap,
  LifeBuoy,
  Megaphone,
  PenTool,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Service detail pages.
 *
 * Transcribed from the six service pages published on wizardcomm.net — the
 * wording is theirs, including the occasional inconsistency. Only the grouping
 * is new, to fit this site's section rhythm.
 *
 * Every section below the hero is optional, because the live pages genuinely
 * differ: Custom Software carries a technology stack and an industries list
 * that Cyber Security does not, and Digital Marketing runs an illustrated
 * deep-dive that nothing else has. The page template renders whatever a
 * service happens to define rather than padding out a fixed skeleton with
 * invented copy.
 */

/** A named technology, with the logo the live site publishes for it. */
export type TechChip = { name: string; logo: string };

export type ServiceItem = { title: string; body: string };

export type ServiceStep = { title: string; body: string };

export type ServiceFaq = {
  question: string;
  answer?: string;
  /** Some published answers are a list rather than a sentence. */
  bullets?: readonly string[];
};

/** An illustrated sub-section, alternating sides down the page. */
export type ServiceFeature = {
  title: string;
  body: string;
  image: string;
};

export type ServicePage = {
  slug: string;
  /** Short label for cards, breadcrumbs and nav. */
  label: string;
  eyebrow: string;
  titleLines: readonly string[];
  /** The line the live page runs directly under its heading. */
  tagline: string;
  lead: string;
  /** Further hero paragraphs. */
  body?: readonly string[];
  /** Closing hero line, set in the accent colour. */
  emphasis?: string;
  /**
   * Hero artwork, set beside the heading from `lg` up.
   *
   * Held at 16:9 by the template rather than cropped further, so a
   * composition arranged inside the frame keeps its edges.
   */
  image: string;
  /**
   * How the hero artwork fills its 16:9 frame.
   *
   * `cover` (the default) suits the landscape photographs the other services
   * publish. `contain` is for artwork drawn at a squarer ratio — cropping a
   * 1:1 illustration to 16:9 removes 40% of its height, which on a composed
   * illustration means cutting through the subject rather than trimming
   * background.
   */
  imageFit?: "cover" | "contain";
  /**
   * Brief for the hero photograph, kept in the data — not in a design doc —
   * so the artwork can be regenerated consistently, and so a replacement can
   * be checked against what the page actually claims. Same convention the
   * service cards and industry cards already follow.
   *
   * All six share a grade: cyan and teal light on deep charcoal, volumetric
   * haze, shallow depth of field, 16:9, and no text or logos — rendered type
   * comes out garbled and dates the image the moment the copy changes.
   */
  imagePrompt: string;
  icon: LucideIcon;
  /** One-liner for the index grid and the mega-menu. */
  summary: string;
  metaDescription: string;

  /**
   * A positioning statement, set directly below the hero — what we make in
   * this line and who it is for, before the page starts listing services.
   *
   * Separate from `tagline` because that one line has to work on the services
   * index card as well, where a headline fragment reads as truncated copy.
   */
  statement?: { heading: string; body: string };
  offerings?: {
    heading: string;
    lead?: string;
    items: readonly ServiceItem[];
  };
  features?: {
    heading: string;
    lead?: string;
    items: readonly ServiceFeature[];
    /** `contain` for near-square flat artwork. See `ServiceFeatures`. */
    imageFit?: "cover" | "contain";
  };
  why?: {
    heading: string;
    lead?: string;
    items: readonly ServiceItem[];
    /** Photograph behind the whole section, in place of the blueprint grid. */
    backdrop?: string;
  };
  process?: {
    heading: string;
    lead?: string;
    steps: readonly ServiceStep[];
  };
  outcomes?: {
    heading: string;
    lead?: string;
    problems?: { heading: string; items: readonly string[] };
    benefits: { heading: string; items: readonly string[] };
    closing?: string;
    /** Photograph behind the whole section, in place of the blueprint grid. */
    backdrop?: string;
  };
  tech?: {
    heading: string;
    lead?: string;
    groups: readonly { label: string; chips: readonly TechChip[] }[];
    /** Photograph behind the whole section, in place of the blueprint grid. */
    backdrop?: string;
  };
  industries?: {
    heading: string;
    items: readonly string[];
    note: string;
  };
  /**
   * Work delivered in this line, cited by slug from `projects.ts` so the
   * copy and artwork live in exactly one place.
   */
  caseStudies?: {
    heading: string;
    lead?: string;
    slugs: readonly string[];
  };
  faqs?: {
    heading: string;
    items: readonly ServiceFaq[];
  };
  cta: {
    title: string;
    body: string;
    label: string;
  };
};

/* ------------------------------------------------------------------ */
/* Technology chips, shared across services                            */
/* ------------------------------------------------------------------ */

const TECH = {
  react: { name: "React", logo: "/tech/react.webp" },
  angular: { name: "Angular", logo: "/tech/angular.webp" },
  vue: { name: "Vue", logo: "/tech/vue.webp" },
  html5: { name: "HTML5", logo: "/tech/html5.webp" },
  dotnet: { name: ".NET", logo: "/tech/dotnet.webp" },
  node: { name: "Node.js", logo: "/tech/nodejs.webp" },
  php: { name: "PHP", logo: "/tech/php.webp" },
  python: { name: "Python", logo: "/tech/python.webp" },
  reactNative: { name: "React Native", logo: "/tech/react-native.webp" },
  xamarin: { name: "Xamarin", logo: "/tech/xamarin.webp" },
  flutter: { name: "Flutter", logo: "/tech/flutter.webp" },
  mysql: { name: "MySQL", logo: "/tech/mysql.webp" },
  postgres: { name: "PostgreSQL", logo: "/tech/postgresql.webp" },
  sqlServer: { name: "SQL Server", logo: "/tech/sql-server.webp" },
  oracle: { name: "Oracle", logo: "/tech/oracle.webp" },
  aws: { name: "AWS", logo: "/tech/aws.webp" },
  azure: { name: "Azure", logo: "/tech/azure.webp" },
  firebase: { name: "Firebase", logo: "/tech/firebase.webp" },
  restApi: { name: "REST API", logo: "/tech/rest-api.webp" },
  wordpress: { name: "WordPress", logo: "/tech/wordpress.webp" },
  mobile: { name: "Mobile", logo: "/tech/mobile.webp" },
  qa: { name: "QA & Testing", logo: "/tech/qa.webp" },
  uiux: { name: "UI/UX", logo: "/tech/ui-ux.webp" },
  // Rasterised from the published SVG: `next/image` refuses to optimise SVG
  // unless `dangerouslyAllowSVG` is set, and turning that on site-wide to
  // serve one icon trades a real XSS surface for nothing.
  marketing: { name: "Digital Marketing", logo: "/tech/marketing.png" },
} as const satisfies Record<string, TechChip>;

/* ------------------------------------------------------------------ */
/* Custom Software Development                                         */
/* ------------------------------------------------------------------ */

const CUSTOM_SOFTWARE: ServicePage = {
  slug: "custom-software-development",
  label: "Custom Software Development",
  eyebrow: "Custom Software Development",
  titleLines: [
    "Custom Software Development",
    "That Drives Business Growth",
  ],
  tagline: "Build Smarter. Scale Faster. Lead the Future.",
  lead: "Our business is unique. Your software should be too. At Wizard Communications, we design, engineer, and deploy custom software solutions that solve complex business challenges, automate operations, accelerate growth, and create competitive advantage.",
  emphasis: "From Idea to Impact — We Build What Your Business Needs.",
  image: "/services/hero/custom-software-development.webp",
  imagePrompt:
    "Cinematic wide shot of a modern software engineering workspace at blue hour, a large wall display behind a standing desk showing softly blurred system architecture diagrams with no legible text, an engineer mid-thought tracing a connection between two nodes, cyan and teal screen glow against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: Code2,
  summary: "Custom software solutions for growth.",
  metaDescription:
    "Custom software development that solves complex business challenges — enterprise applications, SaaS products, cloud solutions, workflow automation and system integration.",

  offerings: {
    heading: "What we build",
    lead: "Complete project execution under one roof, from the first workshop to the release after launch.",
    items: [
      {
        title: "Custom Software Development",
        body: "Software designed around how your business actually works, rather than the other way round.",
      },
      {
        title: "Enterprise Applications",
        body: "Line-of-business systems built for scale, governance and long service life.",
      },
      {
        title: "Web Application Development",
        body: "Modern web applications with robust architecture and seamless scalability.",
      },
      {
        title: "Mobile App Development",
        body: "Native and cross-platform applications that extend your systems to the field.",
      },
      {
        title: "Cloud-Based Solutions",
        body: "Cloud-native platforms on AWS and Azure, built to grow without re-engineering.",
      },
      {
        title: "SaaS Product Development",
        body: "Multi-tenant products taken from first concept through to a shipping platform.",
      },
      {
        title: "API & System Integration",
        body: "Connecting the systems you already run so data stops living in silos.",
      },
      {
        title: "Workflow Automation",
        body: "Automating the repetitive operations that quietly consume your team's week.",
      },
      {
        title: "CRM & ERP Solutions",
        body: "Core business platforms configured, extended or built to fit your processes.",
      },
      {
        title: "Maintenance & Support",
        body: "Continuous optimisation, enhancement and growth after the launch.",
      },
    ],
  },

  why: {
    heading: "Why Choose Wizard Communications",
    items: [
      {
        title: "Business-Focused Solutions",
        body: "Software designed to solve real business challenges and improve productivity, operations, and customer experience.",
      },
      {
        title: "End-to-End Development",
        body: "Complete project execution under one roof — planning, UI/UX, development, testing, deployment, and support.",
      },
      {
        title: "Scalable & Secure",
        body: "Future-ready applications with robust architecture, high security, and seamless scalability.",
      },
      {
        title: "Fast & Agile Delivery",
        body: "Modern development practices for faster deployment, flexibility, and quicker time-to-market.",
      },
      {
        title: "Experienced Technology Team",
        body: "Skilled developers, architects, and QA experts delivering reliable, enterprise-grade solutions.",
      },
    ],
  },

  outcomes: {
    heading: "Stop Adapting Your Business to Software. Build Software Around Your Business.",
    lead: "Off-the-shelf software forces you to compromise.",
    benefits: {
      heading: "With Wizard custom software you can",
      items: [
        "Automate repetitive operations",
        "Increase productivity and efficiency",
        "Reduce operational costs",
        "Eliminate disconnected systems",
        "Improve customer experiences",
        "Gain real-time business visibility",
        "Scale without technological limitations",
        "Create new revenue opportunities",
      ],
    },
    closing: "We don't simply build software. We engineer business transformation.",
    backdrop: "/services/hero/outcomes-backdrop.webp",
  },

  process: {
    heading: "Our Development Process",
    steps: [
      {
        title: "Discover",
        body: "Understanding your business goals, users, challenges and opportunities.",
      },
      {
        title: "Strategize",
        body: "Creating a roadmap that aligns technology with business outcomes.",
      },
      {
        title: "Design",
        body: "Crafting intuitive user experiences and scalable architectures.",
      },
      {
        title: "Develop",
        body: "Building secure, high-performance apps using modern technologies.",
      },
      {
        title: "Test",
        body: "Rigorous quality assurance to ensure reliability and performance.",
      },
      {
        title: "Deploy",
        body: "Seamless launch with minimal disruption.",
      },
      {
        title: "Support & Evolve",
        body: "Continuous optimization, enhancement and growth.",
      },
    ],
  },

  tech: {
    heading: "Technology Stack",
    groups: [
      {
        label: "Frontend",
        chips: [TECH.react, TECH.angular, TECH.vue, TECH.html5],
      },
      {
        label: "Backend",
        chips: [TECH.dotnet, TECH.node, TECH.php, TECH.python],
      },
      {
        label: "Mobile",
        chips: [TECH.reactNative, TECH.xamarin, TECH.flutter],
      },
      {
        label: "Database & Cloud",
        chips: [
          TECH.mysql,
          TECH.postgres,
          TECH.sqlServer,
          TECH.oracle,
          TECH.aws,
          TECH.azure,
        ],
      },
    ],
  },

  industries: {
    heading: "Industries Served",
    items: [
      "Manufacturing",
      "Healthcare",
      "FMCG",
      "Enterprises",
      "Hospitality",
      "Education & eLearning",
      "Retail & eCommerce",
      "Finance & Insurance",
      "Government & Public Sector",
      "Professional Services",
      "Startups & Technology Companies",
      "Logistics & Transportation",
      "Real Estate",
    ],
    note: "No matter your industry, we build software that creates measurable impact.",
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "How long does a custom software project take?",
        bullets: [
          "Small projects: 4–8 weeks",
          "Medium projects: 2–4 months",
          "Enterprise solutions: based on scope and complexity",
        ],
      },
      {
        question: "What makes Wizard different?",
        bullets: [
          "20+ years of technology excellence",
          "Agile and transparent delivery",
          "Business-first methodology",
          "End-to-end delivery capability",
          "Enterprise-grade security",
          "Global delivery capability",
        ],
      },
      {
        question: "Do you work with organisations across industries?",
        answer:
          "Trusted by organizations across industries to deliver reliable, scalable, and business-focused technology solutions.",
      },
    ],
  },

  cta: {
    title: "From Idea to Impact",
    body: "Tell us what your business needs to do, and we will tell you what it takes to build it.",
    label: "Book Free Consultation",
  },
};

/* ------------------------------------------------------------------ */
/* Mobile App Development                                              */
/* ------------------------------------------------------------------ */

const MOBILE_APP: ServicePage = {
  slug: "mobile-app-development",
  label: "Mobile App Development",
  eyebrow: "Mobile App Development",
  titleLines: ["Pocket-sized,", "feeling-first."],
  tagline:
    "Native and cross-platform apps that people keep on their home screen.",
  lead: "Field tools, commerce, wellness: designed around the thumb, engineered for the battery.",
  body: [
    "At Wizard Communications, we create high-performance mobile applications that help businesses engage customers, improve operations, and accelerate growth.",
    "From startups to enterprises, we develop secure, scalable, and user-friendly mobile apps tailored to your business goals. Whether you need an Android app, iOS app, or cross-platform solution, our team delivers modern applications with seamless performance and exceptional user experience.",
  ],
  image: "/services/hero/mobile-app-development.webp",
  imagePrompt:
    "Cinematic close-up of a hand holding a smartphone at blue hour, the screen casting cyan light up across the fingers, softly blurred interface panels floating above the device with no legible text, a tablet and a second handset out of focus behind, deep charcoal background, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: Smartphone,
  summary: "Native and cross-platform apps that ship.",
  metaDescription:
    "Mobile app development for Android, iOS and cross-platform — enterprise mobility, e-commerce and on-demand apps built secure, scalable and store-ready.",

  statement: {
    heading: "Pocket-sized, feeling-first.",
    body: "Native and cross-platform apps that people keep on their home screen. Field tools, commerce, wellness: designed around the thumb, engineered for the battery.",
  },

  offerings: {
    heading: "Our Mobile App Development Services",
    items: [
      {
        title: "Android App Development",
        body: "Custom Android applications built for performance, scalability, and seamless user experience across devices.",
      },
      {
        title: "iOS App Development",
        body: "Premium iPhone and iPad applications designed to deliver smooth performance and high customer engagement.",
      },
      {
        title: "Cross-Platform App Development",
        body: "Build one app for multiple platforms using modern technologies like React Native and Flutter to reduce cost and development time.",
      },
      {
        title: "UI/UX Design",
        body: "Modern, intuitive, and visually engaging app interfaces designed to improve usability and customer satisfaction.",
      },
      {
        title: "Enterprise Mobility Solutions",
        body: "Secure and scalable mobile applications for internal operations, employee productivity, workflow automation, and business management.",
      },
      {
        title: "E-Commerce & On-Demand Apps",
        body: "Feature-rich mobile applications for retail, delivery, booking, healthcare, logistics, and service-based businesses.",
      },
    ],
  },

  why: {
    heading: "Why Businesses Choose Wizard Communications",
    items: [
      {
        title: "Business-Focused Development",
        body: "We build apps that are not just visually impressive but also aligned with your business objectives, customer needs, and revenue goals.",
      },
      {
        title: "Experienced Development Team",
        body: "Our skilled developers, UI/UX designers, QA engineers, and project managers ensure smooth execution from concept to deployment.",
      },
      {
        title: "Scalable & Secure Solutions",
        body: "We develop future-ready applications with secure architecture, strong performance, and scalability for business growth.",
      },
      {
        title: "End-to-End Development",
        body: "From strategy and design to development, testing, deployment, and maintenance — we manage the complete app development lifecycle.",
      },
      {
        title: "Latest Technologies",
        body: "We use modern frameworks and technologies to ensure high performance, flexibility, and faster deployment.",
      },
    ],
  },

  outcomes: {
    heading: "Delivering Seamless Experiences Across Platforms",
    lead: "Mobile applications have become essential for modern businesses. Whether your goal is customer engagement, online sales, operational efficiency, or service delivery, a professionally developed app can transform the way your business operates.",
    problems: {
      heading: "What a well-built app delivers",
      items: [
        "Faster performance",
        "Secure transactions",
        "Better customer engagement",
        "Easy navigation",
        "Real-time accessibility",
        "Higher operational efficiency",
      ],
    },
    benefits: {
      heading: "Why invest in mobile app development",
      items: [
        "Increase sales and revenue",
        "Reach more customers",
        "Improve customer engagement",
        "Strengthen brand loyalty",
        "Automate business operations",
        "Gain competitive advantage",
      ],
    },
    closing:
      "Whether you are a startup, SME, or enterprise, a mobile application can significantly improve your digital presence and business growth.",
  },

  process: {
    heading: "Our Development Process",
    steps: [
      {
        title: "Requirement Analysis",
        body: "We understand your business goals, audience, and project requirements.",
      },
      {
        title: "UI/UX Design",
        body: "We create modern, user-friendly, and engaging designs for better customer experience.",
      },
      {
        title: "App Development",
        body: "Our developers build scalable and secure applications using modern technologies.",
      },
      {
        title: "Testing & Quality Assurance",
        body: "We perform rigorous testing to ensure performance, security, and reliability.",
      },
      {
        title: "Deployment",
        body: "We assist with publishing your app on Google Play Store and Apple App Store.",
      },
      {
        title: "Support & Maintenance",
        body: "We provide ongoing support, updates, and performance optimization.",
      },
    ],
  },

  tech: {
    heading: "Technologies We Use",
    groups: [
      {
        label: "Mobile",
        chips: [TECH.reactNative, TECH.flutter, TECH.xamarin],
      },
      {
        label: "Web & Backend",
        chips: [TECH.html5, TECH.node],
      },
      {
        label: "Data & Integration",
        chips: [TECH.mysql, TECH.firebase, TECH.restApi],
      },
    ],
  },
  /* Our own app, so it is the one piece of work here we can show end to end
     — spec, brand, engineering and audio all in one place. */
  caseStudies: {
    heading: "Drift.",
    lead: "A sleep and relaxation app we imagined and built ourselves: living gradient visuals, layered soundscapes and a timer that fades the audio as you go under.",
    slugs: ["drift"],
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What types of mobile apps do you develop?",
        bullets: [
          "Android applications",
          "iOS applications",
          "Cross-platform apps",
          "Enterprise applications",
          "eCommerce apps",
          "On-demand service apps",
          "Custom business applications",
        ],
      },
      {
        question: "Do you provide UI/UX design services?",
        answer:
          "Yes. Our UI/UX experts design intuitive and engaging interfaces focused on usability, customer experience, and brand consistency.",
      },
      {
        question: "Will my app be scalable?",
        answer:
          "Absolutely. We develop scalable mobile applications capable of handling growing users, data, and future enhancements.",
      },
      {
        question: "Do you provide backend development and API integration?",
        bullets: [
          "Payment gateways",
          "Social media login",
          "Maps and location services",
          "Push notifications",
          "CRM and ERP integrations",
        ],
      },
      {
        question: "Can you publish the app on app stores?",
        bullets: [
          "Google Play Store deployment",
          "Apple App Store deployment",
          "App Store Optimization (ASO)",
          "Store listing setup and submission",
        ],
      },
      {
        question: "How do you ensure app security?",
        bullets: [
          "Secure authentication",
          "Encrypted data transmission",
          "Role-based access control",
          "Secure API integration",
          "Regular security updates",
        ],
      },
      {
        question: "How long does mobile app development take?",
        bullets: [
          "Basic apps: 4–6 weeks",
          "Medium complexity apps: 8–12 weeks",
          "Advanced applications: 3–6 months",
        ],
      },
      {
        question: "Do you develop apps for both Android and iOS?",
        answer:
          "Yes. We develop native applications for Android and iOS, along with cross-platform apps that work efficiently across both platforms.",
      },
    ],
  },

  cta: {
    title: "Ready to Build Your Mobile App?",
    body: "Partner with Wizard Communications to develop secure, scalable, and high-performing mobile applications that drive business growth and customer engagement.",
    label: "Get Started Now",
  },
};

/* ------------------------------------------------------------------ */
/* Artificial Intelligence                                             */
/* ------------------------------------------------------------------ */

const ARTIFICIAL_INTELLIGENCE: ServicePage = {
  slug: "artificial-intelligence",
  label: "Artificial Intelligence",
  eyebrow: "Generative AI Solutions",
  titleLines: ["Intelligent AI.", "Tangible Business Results."],
  tagline: "Smarter Operations. Faster Decisions. Stronger Growth.",
  lead: "AI isn't the future anymore—it's today's competitive advantage. At Wizard Communications, we help organizations harness the power of Generative AI to automate operations, accelerate decision-making, unlock insights, and create exceptional customer experiences.",
  body: [
    "From AI copilots and intelligent assistants to enterprise-grade AI applications, we design and deploy practical AI solutions that solve real business challenges and deliver measurable outcomes.",
  ],
  image: "/services/hero/artificial-intelligence.webp",
  imagePrompt:
    "Cinematic macro shot of a translucent neural sculpture suspended in darkness, fine filaments carrying pulses of cyan light between glowing nodes, a faint particle field drifting around it, one strand resolving into an orderly line at the edge of frame, volumetric haze, shallow depth of field, photorealistic render, 16:9, no text, no logos",
  icon: BrainCircuit,
  summary: "AI solutions to optimize operations.",
  metaDescription:
    "Generative AI solutions — AI strategy and consulting, custom copilots and assistants, 4–8 week AI MVPs, and enterprise-grade LLM engineering.",

  features: {
    heading: "What We Offer",
    items: [
      {
        title: "AI Strategy & Consulting",
        body: "Turn AI opportunities into actionable business initiatives — identifying high-value opportunities, assessing AI readiness, selecting technology and models, designing secure architecture, planning data governance and compliance, and setting out an implementation roadmap.",
        image: "/services/hero/artificial-intelligence.webp",
      },
      {
        title: "Custom Generative AI Development",
        body: "Purpose-built AI solutions tailored to your business processes, workflows, and objectives: AI copilots for internal teams, customer support assistants, enterprise knowledge systems, intelligent document processing, automated summarization, content and report generation, and multimodal AI across text, image and audio.",
        image: "/services/hero/ai-custom-genai.webp",
      },
      {
        title: "AI MVP Development (4–8 Weeks)",
        body: "Validate fast. Scale smarter. Launch a working AI solution quickly, gather real-world feedback, and build with confidence — a functional prototype in weeks, user testing and validation, performance measurement, and a clear roadmap for enterprise-scale deployment.",
        image: "/services/hero/ai-mvp.webp",
      },
      {
        title: "LLM Engineering Capabilities",
        body: "Deploying an LLM is easy. Creating reliable, enterprise-grade AI systems is where expertise matters — advanced prompt engineering, retrieval-augmented generation, enterprise knowledge integration, AI workflow automation, agentic AI systems, model optimization and fine-tuning, and secure AI deployment.",
        image: "/services/hero/ai-llm.webp",
      },
    ],
  },

  why: {
    heading: "Why Businesses Choose Wizard",
    items: [
      {
        title: "Business-Focused AI Development",
        body: "Every AI solution is aligned with your business goals, operational challenges, and growth strategy.",
      },
      {
        title: "Experienced AI & Engineering Teams",
        body: "Our consultants, architects, engineers, designers, and project leaders work together to ensure successful execution from concept to deployment.",
      },
      {
        title: "Scalable & Secure Solutions",
        body: "Enterprise-grade architecture, governance, and security built into every implementation.",
      },
      {
        title: "End-to-End Delivery",
        body: "From strategy and design to deployment, optimization, and support—we manage the complete AI lifecycle.",
      },
      {
        title: "Future-Ready Technology Stack",
        body: "Leveraging the latest AI frameworks, cloud platforms, and LLM technologies to maximize performance and flexibility.",
      },
    ],
  },

  process: {
    heading: "Start Small. Scale With Confidence.",
    lead: "Successful AI adoption doesn't begin with complexity. It begins with solving the right problem.",
    steps: [
      {
        title: "Understand",
        body: "We identify your business challenges, goals, and opportunities.",
      },
      {
        title: "Discover",
        body: "We uncover practical, high-impact AI use cases.",
      },
      {
        title: "Build",
        body: "We rapidly develop and validate solutions with real users.",
      },
      {
        title: "Scale",
        body: "We expand successful initiatives across teams, departments, and business functions.",
      },
      {
        title: "Optimize",
        body: "We continuously improve performance and business outcomes.",
      },
    ],
  },

  outcomes: {
    heading: "Production-Ready AI. Real Business Value.",
    lead: "Reliable, production-ready AI systems that deliver value from day one.",
    problems: {
      heading: "Common business challenges",
      items: [
        "Difficulty scaling efficiently",
        "Increasing operational costs",
        "Too much manual work slowing productivity",
        "Rising customer expectations",
        "Valuable data trapped in silos",
      ],
    },
    benefits: {
      heading: "How Generative AI helps",
      items: [
        "Automate repetitive tasks across teams",
        "Accelerate decision-making with actionable insights",
        "Improve customer experiences through intelligent interactions",
        "Unlock the value of enterprise knowledge and data",
        "Build innovative products and digital capabilities",
        "Scale operations without proportionally increasing costs",
      ],
    },
    closing: "Move Beyond Basic AI. Build intelligent systems that continuously create business value.",
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Do I need prior AI experience to get started?",
        answer:
          "Not at all. We guide you through every stage—from strategy and planning to deployment and optimization.",
      },
      {
        question: "Is AI expensive to implement?",
        answer:
          "Not necessarily. We focus on practical, scalable solutions that deliver value quickly while keeping implementation costs aligned with business objectives.",
      },
      {
        question: "How quickly can we see results?",
        answer:
          "Many organizations begin seeing measurable improvements within weeks through focused AI pilots and MVP deployments.",
      },
      {
        question: "Will AI integrate with our existing systems?",
        answer:
          "Yes. Our solutions are designed to integrate seamlessly with your existing applications, databases, workflows, and enterprise platforms.",
      },
      {
        question: "Is our data secure?",
        answer:
          "Absolutely. Security, governance, compliance, and data privacy are foundational elements of every solution we deliver.",
      },
    ],
  },

  cta: {
    title: "Ready to Build with AI?",
    body: "Whether you're exploring AI opportunities or ready to deploy enterprise-grade solutions, Wizard Communications can help you move forward with clarity, confidence, and measurable results.",
    label: "Let's Talk",
  },
};

/* ------------------------------------------------------------------ */
/* Security                                                            */
/* ------------------------------------------------------------------ */

const SECURITY: ServicePage = {
  slug: "security",
  label: "Security",
  eyebrow: "Cyber Security Solutions",
  titleLines: ["Protect What Matters.", "Power Your Business", "with Confidence"],
  tagline: "Security is no longer optional — it's mission-critical.",
  lead: "In a world where cyber threats evolve every day, your business needs more than protection—it needs resilience. Wizard secures your systems, safeguards your data, and enables uninterrupted growth.",
  image: "/services/hero/security.webp",
  imagePrompt:
    "Cinematic shot of a translucent geometric shield form suspended in a dark server aisle, refracting cyan light, rack status lights receding into haze behind it, a reflective floor doubling the glow, cool desaturated grade, volumetric haze, shallow depth of field, photorealistic render, 16:9, no text, no logos",
  icon: ShieldCheck,
  summary: "Protecting data with robust cybersecurity.",
  metaDescription:
    "Cyber security services — security consultation, audits and risk assessment, 24/7 threat monitoring, penetration testing, cloud security, data protection and incident response.",

  offerings: {
    heading: "Our Cyber Security Services",
    items: [
      {
        title: "Security Consultation",
        body: "Strategic guidance to assess risks, identify gaps, and design a tailored security roadmap.",
      },
      {
        title: "Security Audit & Risk Assessment",
        body: "Comprehensive evaluation of systems, networks, and processes with clear, actionable insights.",
      },
      {
        title: "Threat Monitoring",
        body: "24/7 vigilance to detect and respond to suspicious activity before it escalates.",
      },
      {
        title: "Penetration Testing",
        body: "Simulated real-world attacks to uncover vulnerabilities before attackers do.",
      },
      {
        title: "Cloud Security",
        body: "End-to-end protection for cloud infrastructure, applications, and data.",
      },
      {
        title: "Data Protection",
        body: "Advanced encryption and controls to keep critical business data secure.",
      },
      {
        title: "Incident Response",
        body: "Rapid containment, recovery, and continuity when security incidents occur.",
      },
    ],
  },

  outcomes: {
    heading: "Secure Your Business with Wizard",
    lead: "With the right security foundation, your business doesn't just stay protected—it moves faster and smarter.",
    benefits: {
      heading: "What that gives you",
      items: [
        "Minimize risks and disruptions",
        "Ensure compliance and data integrity",
        "Build customer and brand credibility",
        "Focus on growth while we handle security",
      ],
    },
  },

  features: {
    heading: "Trusted. Proven. Reliable.",
    items: [
      {
        title: "Trusted. Proven. Reliable.",
        body: "Organizations trust Wizard for proactive, dependable cybersecurity solutions. From in-depth audits to ongoing protection, we deliver measurable security outcomes. See how we help businesses stay ahead of evolving threats.",
        image: "/services/hero/security-trust.webp",
      },
      {
        title: "Why Choose Wizard for Cyber Security?",
        body: "Security is no longer optional—it's mission-critical. Wizard delivers end-to-end cybersecurity solutions that are smart, scalable, and tailored to your business. We simplify complexity, eliminate vulnerabilities, and build a resilient security posture—so you can operate with confidence in a connected world.",
        image: "/services/hero/security.webp",
      },
    ],
  },

  cta: {
    title: "Stay Secure. Stay Ahead.",
    body: "Don't wait for a breach to take action. Partner with Wizard and build a future-ready security framework today.",
    label: "Speak to Our Security Experts",
  },
};

/* ------------------------------------------------------------------ */
/* Digital Marketing                                                   */
/* ------------------------------------------------------------------ */

const DIGITAL_MARKETING: ServicePage = {
  slug: "digital-marketing",
  label: "Digital Marketing",
  eyebrow: "Digital Marketing",
  titleLines: ["Grow your brand with smart,", "result-driven digital marketing"],
  tagline: "SEO, social, paid campaigns and content that earns its keep.",
  lead: "Wizard Communications helps businesses build a strong online presence through SEO, social media marketing, paid campaigns, content strategy, and performance-focused digital solutions. We create customized marketing plans that improve visibility, attract the right audience, and generate quality leads for your business.",
  image: "/services/hero/digital-marketing.webp",
  imagePrompt:
    "Cinematic shot of an abstract ascending data landscape at dusk, glowing cyan ridges climbing through dark mist toward a distant horizon, faint concentric rings spreading outward across the surface like reach, soft rim light, volumetric haze, shallow depth of field, photorealistic render, 16:9, no text, no logos",
  icon: Megaphone,
  summary: "Boosting visibility and online engagement.",
  metaDescription:
    "Digital marketing services — technical, on-page, off-page and local SEO, Google Business Profile and Maps, plus Facebook and Instagram marketing.",

  offerings: {
    heading: "What we do",
    items: [
      {
        title: "Search Engine Optimization",
        body: "You cannot succeed without investing in SEO. It is the foundation for getting more organic traffic and quality leads. We have the best experience to help you succeed.",
      },
      {
        title: "Local SEO Optimization",
        body: "Do you want to target customers in your local markets? We can optimize your website to attract local audiences and grow your traffic. We have the right tricks to help you win!",
      },
      {
        title: "Social Media Marketing",
        body: "Whether it's Facebook or Instagram, you cannot miss out on social media. It is where your customers thrive and engage. Let's help you gain more exposure!",
      },
    ],
  },

  features: {
    heading: "Search Engine Optimization",
    lead: "Creates smart SEO strategies to help your business improve visibility, attract quality traffic, and rank better on search results.",
    items: [
      {
        title: "Technical SEO",
        body: "We improve the technical health of your website to ensure better crawling, indexing, speed, and security. Our technical SEO services include fixing broken links, optimizing website performance, improving mobile responsiveness, resolving indexing issues, and enhancing overall website functionality for better search engine rankings and user experience.",
        image: "/services/hero/digital-marketing.webp",
      },
      {
        title: "On-Page SEO",
        body: "We optimize your website structure, content, meta tags, headings, URLs, and images to improve search engine visibility. Our on-page SEO strategies help search engines understand your website better while enhancing user experience, page performance, and keyword relevance for higher rankings and increased organic traffic.",
        image: "/services/hero/seo-on-page.webp",
      },
      {
        title: "Off-Page SEO",
        body: "Our off-page SEO services focus on building your website authority through quality backlinks, brand mentions, guest posting, and external promotions. We use safe and effective strategies that improve trust, strengthen online reputation, and help your website rank better on competitive search engine result pages.",
        image: "/services/hero/seo-off-page.webp",
      },
      {
        title: "Local SEO",
        body: "Our local SEO services help your business appear in local searches, Google Maps, and nearby customer searches. We optimize your Google Business Profile, local keywords, business listings, and location visibility to increase calls, visits, and leads from customers searching for services in your target area.",
        image: "/services/hero/seo-local.webp",
      },
    ],
  },

  why: {
    heading: "Local presence and social reach",
    lead: "We help businesses build a strong presence in local search results and connect with the right audience in their target location.",
    items: [
      {
        title: "Google My Business",
        body: "Google Business Profile is one of the most powerful tools for local visibility. People use Google every day to find nearby shops, service providers, restaurants, clinics, offices, and local businesses. Wizard Communications helps you create, optimize, and manage a strong Google Business Profile so your business can appear in local search results and map listings.",
      },
      {
        title: "Google Map",
        body: "Google Maps helps customers find your business location quickly and easily. A strong map presence can improve local trust and make your business more accessible to nearby customers. Wizard Communications helps list and optimize your business on Google Maps with accurate information, proper categories, location details, images, business hours, and service areas.",
      },
      {
        title: "Facebook Marketing",
        body: "Facebook is a powerful platform for brand awareness, customer engagement, and lead generation. Wizard Communications helps you build a professional Facebook presence with attractive visuals, clear content, and strong calls to action. Facebook ads help your business reach the right audience faster.",
      },
      {
        title: "Instagram Marketing",
        body: "Instagram is ideal for building a strong visual identity and connecting with modern customers. Wizard Communications helps brands create attractive Instagram profiles, engaging posts, reels ideas, and growth-focused content. Instagram ads help your brand reach potential customers through eye-catching visuals and targeted campaigns.",
      },
    ],
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question:
          "What digital marketing services does Wizard Communications provide?",
        answer:
          "Wizard Communications offers SEO, social media marketing, Google Ads, content marketing, local SEO, technical SEO, Facebook and Instagram marketing, YouTube ads, and complete digital marketing solutions for businesses.",
      },
      {
        question: "How can SEO help my business grow?",
        answer:
          "SEO helps improve your website visibility on search engines like Google. It increases organic traffic, generates quality leads, improves brand credibility, and helps your business reach potential customers online.",
      },
      {
        question: "Does Wizard Communications manage social media accounts?",
        answer:
          "Yes, Wizard Communications manages social media platforms like Facebook and Instagram by creating engaging content, running paid campaigns, improving audience engagement, and growing your online presence.",
      },
      {
        question: "Why is Google Ads important for businesses?",
        answer:
          "Google Ads helps businesses reach customers instantly through targeted advertising. It can increase website traffic, phone calls, leads, sales, and local visibility with measurable results.",
      },
      {
        question: "What is the benefit of Local SEO?",
        answer:
          "Local SEO helps your business appear in local search results and Google Maps. It improves visibility for nearby customers, increases calls and store visits, and helps your business compete better in local markets.",
      },
    ],
  },

  cta: {
    title: "Ready to Grow Your Business Online?",
    body: "Boost your brand visibility, attract quality leads, and achieve real business growth with result-driven digital marketing solutions from Wizard Communications.",
    label: "Get Started Now",
  },
};

/* ------------------------------------------------------------------ */
/* On Demand Hiring                                                    */
/* ------------------------------------------------------------------ */

const ON_DEMAND_HIRING: ServicePage = {
  slug: "on-demand-hiring",
  label: "On Demand Hiring",
  eyebrow: "Resource Augmentation Services",
  titleLines: ["On Demand Hiring"],
  tagline: "Skilled professionals, ready to start.",
  lead: "Need extra hands for your project? We help you quickly add skilled professionals to your team—without the hassle of full-time hiring. Work with experienced talent who can start right away and fit smoothly into your workflow.",
  body: [
    "Sometimes your team needs extra support to meet deadlines or handle new projects. Hiring full-time employees is not always the best option. Staff augmentation lets you bring in skilled professionals when you need them, for as long as you need them.",
  ],
  image: "/services/hero/on-demand-hiring.webp",
  imagePrompt:
    "Cinematic wide shot of a modern collaborative studio at dusk, a small engineering team gathered around a lit table with two newcomers just joining them, laptops open and a whiteboard softly blurred behind, cyan accent light against warm charcoal, volumetric light shafts, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: UsersRound,
  summary: "Flexible talent for immediate needs.",
  metaDescription:
    "On demand hiring and resource augmentation — skilled developers, designers, QA and marketing specialists who join your team and start contributing from day one.",

  why: {
    heading: "What is Resource Augmentation?",
    lead: "Sometimes your team needs extra support to meet deadlines or handle new projects. Hiring full-time employees is not always the best option.",
    items: [
      {
        title: "Access to Skilled Experts",
        body: "Get the right talent without spending time searching through countless resumes.",
      },
      {
        title: "Flexible and Scalable",
        body: "Easily increase or reduce your team size based on your project needs.",
      },
      {
        title: "Lower Hiring Risk",
        body: "Work with professionals before making long-term decisions. No long-term commitment required.",
      },
      {
        title: "Faster Project Delivery",
        body: "Our experts are ready to contribute from day one, helping you move faster.",
      },
      {
        title: "Cost Effective",
        body: "Save on costs like training, benefits, and long-term salaries. Pay only for what you need.",
      },
    ],
    backdrop: "/services/hero/hero_trust.webp",
  },

  tech: {
    heading: "Skills We Offer",
    lead: "Bring in the specific discipline you are short of, for exactly as long as you need it.",
    groups: [
      {
        label: "Build",
        chips: [TECH.mobile, TECH.dotnet, TECH.python, TECH.wordpress],
      },
      {
        label: "Design & Quality",
        chips: [TECH.uiux, TECH.qa],
      },
      {
        label: "Growth",
        chips: [TECH.marketing],
      },
    ],
    backdrop: "/services/hero/hero_growth.webp",
  },

  offerings: {
    heading: "The roles we place",
    items: [
      {
        title: "App Development",
        body: "React Native and Flutter developers who can join an in-flight mobile project.",
      },
      {
        title: "QA & Testing",
        body: "Testing specialists to raise release confidence without slowing the team down.",
      },
      {
        title: "Digital Marketing",
        body: "SEO experts and content strategists to run the channels you have no bandwidth for.",
      },
      {
        title: "CMS & eCommerce",
        body: "WordPress and WooCommerce specialists for storefronts and content platforms.",
      },
      {
        title: "UX/UI Design",
        body: "UI/UX designers to take a product from rough flows to a shippable interface.",
      },
      {
        title: ".NET Development",
        body: "ASP.NET developers with enterprise application experience.",
      },
      {
        title: "Python Development",
        body: "Python developers for services, automation and data work.",
      },
    ],
  },

  outcomes: {
    heading: "Why Choose Wizard?",
    lead: "There are many options available—but choosing the right partner makes all the difference.",
    benefits: {
      heading: "What working with us looks like",
      items: [
        "Reliable talent, screened before they reach you",
        "Quick onboarding into your existing workflow",
        "Smooth collaboration with your in-house team",
        "Scale your team up or down without stress",
      ],
    },
    closing:
      "At Wizard, we focus on providing reliable talent, quick onboarding, and smooth collaboration. We make it easy for you to scale your team without stress.",
    backdrop: "/services/hero/hero_collab.webp",
  },

  cta: {
    title: "Need a specialist next week?",
    body: "Tell us the gap in your team and we will put forward people who can start straight away.",
    label: "Hire An Expert",
  },
};

/* ------------------------------------------------------------------ */
/* E-Learning Solutions                                                */
/* ------------------------------------------------------------------ */

const E_LEARNING: ServicePage = {
  slug: "e-learning-solutions",
  label: "E-Learning Solutions",
  eyebrow: "Custom eLearning Solutions",
  titleLines: ["Custom eLearning that", "people actually finish."],
  tagline: "Delivering engaging learning experiences.",
  lead: "e-Learning is the best way to improve retention and make learning fun. At Wizard, we develop innovative eLearning solutions to meet the unique needs of your learners.",
  body: [
    "Full-scale services including personalized LMS development, courseware creation, SME hiring, curriculum localization, and interactive mobile learning solutions.",
  ],
  image: "/services/hero/e-learning-solutions.png",
  // Near-square flat artwork, so it is fitted rather than cropped.
  imageFit: "contain",
  imagePrompt:
    "Cinematic shot of a modern learning studio at blue hour, a recording desk with a lit screen showing softly blurred course modules and no legible text, headphones and a tablet beside it, cyan and teal glow against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: GraduationCap,
  summary: "Courseware, LMS and localisation that lands.",
  metaDescription:
    "Custom eLearning — courseware development, mobile learning, open-source LMS configuration, translation and localisation, and L&D consultancy.",

  /*
   * The five services as illustrated rows, which is how the live page runs
   * them — each with the artwork it publishes alongside it.
   */
  features: {
    heading: "What we build for learning teams",
    lead: "From a single module to a localised curriculum running on your own LMS.",
    items: [
      {
        title: "Custom Courseware Development",
        body: "Meaningful, memorable, motivational learning. We use an agile development process, the SAM and CCAF instructional design models, and our own smart studios — building for real-world implementation rather than for the certificate alone.",
        image: "/services/hero/elearning-courseware.png",
      },
      {
        title: "Mobile Learning",
        body: "Let learners carry the course with them and continue coursework while travelling. Built for professionals who would rather spend a commute on knowledge acquisition and augmentation than on nothing at all.",
        image: "/services/hero/elearning-mobile.png",
      },
      {
        title: "Open Source LMS Configuration",
        body: "SCORM 1.2, SCORM 2004 and AICC-compliant courseware. We favour an open source LMS — Moodle and the likes — for the cost profile and for how far it can be customised to how your teams actually learn.",
        image: "/services/hero/elearning-lms.png",
      },
      {
        title: "Translation & Localization",
        body: "Multilingual content development, grounded in large-scale Indian eLearning programmes where the localisation was the hard part rather than an afterthought.",
        image: "/services/hero/elearning-localization.png",
      },
      {
        title: "L&D Consultancy",
        body: "Advice on curriculum design, content retention, how effectiveness gets evaluated, and whether learners can actually implement what they have been taught.",
        image: "/services/hero/elearning-consultancy.png",
      },
    ],
    // Four of the five are near-square flat illustrations that a 16:10 crop
    // would take a third of the height from.
    imageFit: "contain",
  },

  industries: {
    heading: "Authoring tools we work in",
    items: [
      "Captivate 2017",
      "Storyline 360",
      "Elucidate",
      "Lectora",
      "Animate CC",
      "Moodle",
      "SCORM 1.2",
      "SCORM 2004",
      "AICC",
    ],
    note: "Whatever your LMS already speaks, we can author to it.",
  },

  /* The single case study the live page features here. */
  caseStudies: {
    heading: "Dastur Energy.",
    lead: "A clean energy company that needed its solutions shown without the complexity — a minimal site with room to breathe, built on WordPress.",
    slugs: ["dastur-energy"],
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What are eLearning solutions?",
        answer:
          "eLearning solutions are digital platforms and tools designed to deliver online education, training, and skill development programs. These solutions allow organizations to provide structured learning experiences through web and mobile devices.",
      },
      {
        question: "What types of eLearning solutions do you offer?",
        bullets: [
          "Learning Management Systems (LMS)",
          "Corporate training platforms",
          "Online course portals",
          "Virtual classroom systems",
          "Certification and assessment systems",
          "Mobile learning applications",
        ],
      },
      {
        question: "Who can benefit from eLearning platforms?",
        bullets: [
          "Corporates, for employee training",
          "Schools, colleges, and universities",
          "Coaching and training institutes",
          "Healthcare and compliance training providers",
          "EdTech startups",
        ],
      },
      {
        question: "Can the platform support live classes and recorded sessions?",
        bullets: [
          "Live video classes",
          "Recorded video lectures",
          "Interactive webinars",
          "Screen sharing and chat features",
          "Session recording and playback",
        ],
      },
      {
        question: "Is the eLearning platform mobile-friendly?",
        answer:
          "Absolutely. All our eLearning solutions are fully responsive and optimized for desktop, tablet, and mobile devices to ensure seamless access anywhere, anytime.",
      },
      {
        question: "Can learners track their progress?",
        bullets: [
          "Course completion status",
          "Quiz scores",
          "Performance analytics",
          "Certification tracking",
          "User dashboards",
        ],
      },
      {
        question: "Do you provide assessment and certification features?",
        bullets: [
          "Online quizzes and exams",
          "Automated grading",
          "Custom certification generation",
          "Performance-based evaluations",
        ],
      },
      {
        question: "Can the system be integrated with other software?",
        bullets: [
          "HRMS systems",
          "CRM software",
          "Payment gateways",
          "Third-party APIs",
          "Single Sign-On (SSO)",
        ],
      },
    ],
  },

  cta: {
    title: "Ready to build a course people finish?",
    body: "Get in touch to talk through the curriculum, the platform it has to run on, and the languages it has to reach.",
    label: "Get in touch",
  },
};

/* ------------------------------------------------------------------ */
/* UX / UI Design & Development                                        */
/* ------------------------------------------------------------------ */

const UX_UI: ServicePage = {
  slug: "ux-ui-design",
  label: "UX/UI Design & Development",
  eyebrow: "Experience Intelligence™",
  titleLines: ["Every Great Experience", "Begins Long Before Design."],
  tagline: "Most organisations think design starts with wireframes.",
  lead: "Why are customers abandoning your platform? Why does adoption remain low? Why do employees avoid internal systems? Why are support tickets increasing? Why are customers choosing competitors despite similar products?",
  body: [
    "The answers rarely live inside analytics dashboards. They live inside human behaviour.",
    "At Wizard, every engagement begins by understanding the people behind the pixels. Only then do we begin designing.",
  ],
  emphasis: "Because assumptions create expensive products. Insights create extraordinary ones.",
  image: "/services/uiux.jpg",
  imagePrompt:
    "Cinematic close-up of a designer desk at blue hour, translucent wireframe panels floating above a drawing tablet, stylus in hand, cyan key light against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: PenTool,
  summary: "Experience Intelligence™ and human-centred UI/UX design.",
  metaDescription:
    "Experience Intelligence™ — Every great experience begins long before design. We replace assumptions with evidence through behavioural research, Design Thinking 2.0, and human-centred UI/UX development.",

  statement: {
    heading: "We Don't Guess. We Discover.",
    body: "Digital experiences fail for one simple reason: too many decisions are based on opinions. We replace assumptions with evidence. Our multidisciplinary research teams combine behavioural science, customer psychology, business analysis and data intelligence to uncover opportunities that traditional UX processes often overlook. Every interview. Every observation. Every workshop. Every customer journey. Every interaction. Every data point contributes to one objective — creating experiences people naturally understand.",
  },

  offerings: {
    heading: "Research That Creates Competitive Advantage",
    lead: "Because customers rarely say what they really need. Great research isn't about asking better questions — it's about observing better behaviour. Wizard's Experience Research practice combines qualitative insight with quantitative evidence to reveal unmet customer needs and hidden business opportunities.",
    items: [
      {
        title: "User Interviews & Stakeholder Discovery",
        body: "Benchmark studies, competitive experience reviews, in-depth user interviews, and stakeholder discovery to uncover core expectations and align business goals with user needs.",
      },
      {
        title: "Field Observation & Contextual Inquiry",
        body: "Observing users in their natural environment, ethnographic research, and diary studies to understand unarticulated workflows and real-world friction.",
      },
      {
        title: "Customer Journey & Experience Mapping",
        body: "Mapping every interaction across the full customer lifecycle to identify friction, drop-offs, emotional moments, and digital maturity opportunities.",
      },
      {
        title: "Customer Personas & Behaviour Analytics",
        body: "Data-backed persona creation, digital analytics, customer satisfaction analysis, heatmaps, and session replays that expose true user intent.",
      },
      {
        title: "Information Architecture & Navigation Validation",
        body: "Card sorting, tree testing, taxonomy development, and navigation structure validation to turn complex structures into intuitive paths.",
      },
      {
        title: "Usability Testing & Accessibility Evaluation",
        body: "Comprehensive usability testing, heuristic evaluation, and accessibility compliance assessments so products feel effortless for everyone.",
      },
    ],
  },

  features: {
    heading: "Experience Intelligence™ in Action",
    lead: "That's why our design process produces more than beautiful interfaces. It produces measurable business outcomes.",
    items: [
      {
        title: "Human-Centred Design: Understand People First, Technology Second",
        body: "Technology changes every year. Human behaviour evolves much more slowly. That's why our philosophy remains remarkably simple: understand people first, technology second. Wizard follows globally recognised Human-Centred Design principles to ensure every digital product feels intuitive, inclusive and emotionally engaging. Because products shouldn't force people to adapt. Products should adapt to people. Every interaction is evaluated through the lens of emotion, trust, accessibility, context, human behaviour, cognitive load, mental models, decision architecture, motivation, and habit formation. When experiences respect human behaviour... people stop noticing the technology.",
        image: "/services/uiux.jpg",
      },
      {
        title: "Behavioural Design: Understanding Why People Click",
        body: "Understanding why people click is more important than knowing where they click. Every digital interaction is a behavioural decision: Should I trust this? Should I continue? Should I purchase? Should I return later? Should I abandon this process? Behavioural science helps answer those questions long before customers consciously realise they're making them. Wizard incorporates behavioural psychology through choice architecture, visual hierarchy, decision simplicity, cognitive fluency, persuasive design, trust signals, recognition over recall, progressive disclosure, emotional design, and behavioural nudges. The objective isn't manipulation — it's removing unnecessary friction.",
        image: "/services/hero/hero_collab.webp",
      },
      {
        title: "Information Architecture: Clarity Is A Competitive Advantage",
        body: "When information is organised intelligently... people think less, customers convert faster, employees become more productive, support costs decrease, and digital adoption improves. Wizard structures complex information into intuitive navigation systems that make digital products feel remarkably simple. Our expertise includes content architecture, navigation design, taxonomy development, search strategy, knowledge architecture, cross-platform navigation, enterprise information models, content governance, semantic structure, and AI-ready information architecture. Good architecture disappears. Great architecture feels obvious.",
        image: "/services/hero/hero_growth.webp",
      },
      {
        title: "AI-Enhanced Research: Human Insight Meets Artificial Intelligence",
        body: "AI doesn't replace researchers. It allows researchers to uncover deeper patterns, analyse larger datasets and move from insight to innovation much faster. Wizard responsibly integrates AI into every stage of discovery — including research synthesis, sentiment analysis, journey analysis, behaviour prediction, persona generation, content structuring, experience pattern recognition, accessibility evaluation, and opportunity identification. But every recommendation is validated by experienced strategists and researchers: technology accelerates insight, while human expertise ensures relevance.",
        image: "/services/aihuman.jpg",
      },
      {
        title: "Customer Journey Mapping: Designed Around One Unified Journey",
        body: "Customers don't think in departments. They don't distinguish between marketing, sales, customer support or technology. To them... it's one journey. Wizard maps every interaction across the customer lifecycle — Advocacy, Support, Adoption, Onboarding, Purchase, Evaluation, Discovery, and Awareness — to identify opportunities for improvement, automation and delight.",
        image: "/services/hero/hero_trust.webp",
      },
    ],
  },

  why: {
    heading: "Why Choose Wizard Communications",
    lead: "Understand people first. Technology second. When experiences respect human behaviour... people stop noticing the technology.",
    items: [
      {
        title: "We Don't Guess. We Discover.",
        body: "Digital experiences fail when decisions are based on opinions. We replace assumptions with evidence. Our multidisciplinary research teams combine behavioural science, customer psychology, business analysis and data intelligence.",
      },
      {
        title: "Enterprise Design Thinking 2.0",
        body: "At Wizard, Design Thinking becomes an enterprise innovation framework — not simply a workshop methodology — connecting customer expectations, market realities, and business goals.",
      },
      {
        title: "Behavioural Science & Friction Removal",
        body: "We design for how humans actually make decisions — applying choice architecture, visual hierarchy, and cognitive fluency so experiences feel natural and frictionless.",
      },
      {
        title: "AI-Accelerated, Strategist-Validated",
        body: "We responsibly integrate AI into every stage of discovery to uncover deep patterns across large datasets, with every recommendation verified by expert strategists.",
      },
      {
        title: "Measurable Commercial Outcomes",
        body: "Our design process produces more than beautiful interfaces. It produces measurable business outcomes: higher adoption, increased conversion, lower drop-offs, and reduced support costs.",
      },
    ],
    backdrop: "/services/hero/hero_collab.webp",
  },

  process: {
    heading: "Design Thinking 2.0: Six Connected Stages",
    lead: "Creativity backed by commercial intelligence. Design Thinking has transformed how organisations innovate — we've evolved it further into an enterprise innovation framework where every iteration reduces uncertainty and every insight increases confidence.",
    steps: [
      {
        title: "Understand",
        body: "Customer expectations, technology constraints, market realities, stakeholder ambitions, and business goals.",
      },
      {
        title: "Discover",
        body: "Ethnographic research, contextual inquiry, observation studies, behavioural analytics, customer interviews, Voice of Customer research, digital analytics, and competitive intelligence.",
      },
      {
        title: "Define",
        body: "Problem framing, experience strategy, Jobs-to-be-Done (JTBD), business opportunity mapping, experience vision, and success metrics.",
      },
      {
        title: "Imagine",
        body: "Collaborative ideation, design studios, AI-assisted brainstorming, future scenario planning, rapid concept generation, and service innovation.",
      },
      {
        title: "Prototype",
        body: "Conversational interfaces, motion prototypes, low and high fidelity design, AI-generated concepts, experience simulations, clickable prototypes, and interactive wireframes.",
      },
      {
        title: "Validate",
        body: "Usability testing, accessibility reviews, customer feedback, heatmaps, behaviour analytics, A/B testing, and continuous learning.",
      },
    ],
  },

  outcomes: {
    heading: "The Outcome: Answering What Matters Before Designing",
    lead: "By the time we begin designing interfaces... we've already answered the most important questions.",
    problems: {
      heading: "Questions We Answer First",
      items: [
        "Who are the users?",
        "Where do they struggle?",
        "What motivates them?",
        "What creates trust?",
        "What drives conversion?",
        "How can AI remove friction?",
        "How should success be measured?",
      ],
    },
    benefits: {
      heading: "Measurable Commercial Results",
      items: [
        "Higher customer adoption and retention across platforms",
        "Reduced drop-offs and process abandonment",
        "Decreased support costs through self-evident architecture",
        "Higher employee productivity on internal systems",
        "Competitive advantage built on observable human behaviour",
        "Streamlined digital adoption and faster time-to-value",
      ],
    },
    closing:
      "Good architecture disappears. Great architecture feels obvious. When experiences respect human behaviour... people stop noticing the technology.",
    backdrop: "/services/hero/outcomes-backdrop.webp",
  },

  tech: {
    heading: "Evaluation Lenses & Experience Engineering",
    lead: "Every digital product interaction is evaluated through the lens of human behaviour and built with modern engineering standards.",
    groups: [
      {
        label: "Research & Design",
        chips: [TECH.uiux, TECH.qa],
      },
      {
        label: "Front-End Implementation",
        chips: [TECH.html5, TECH.react, TECH.vue, TECH.angular],
      },
      {
        label: "Data & Architecture",
        chips: [TECH.restApi, TECH.mobile, TECH.wordpress],
      },
    ],
  },

  industries: {
    heading: "Industries Where Experience Drives Advantage",
    items: [
      "Enterprises & Internal Systems",
      "Healthcare & Digital Health",
      "Finance, Banking & Insurance",
      "Retail & eCommerce",
      "Education & eLearning",
      "Government & Public Sector",
      "Manufacturing & Logistics",
      "Startups & SaaS Platforms",
      "Hospitality & Consumer Services",
    ],
    note: "Because products shouldn't force people to adapt. Products should adapt to people.",
  },

  caseStudies: {
    heading: "Drift.",
    lead: "A sleep and relaxation app we imagined and built ourselves: living gradient visuals, layered soundscapes and a timer that fades the audio as you go under.",
    slugs: ["drift"],
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What is Experience Intelligence™?",
        answer:
          "Experience Intelligence™ is Wizard's integrated consulting framework that combines customer insight, behavioural science, business strategy, AI-powered discovery and enterprise design into one continuous process. Rather than treating research, design and engineering as separate disciplines, Experience Intelligence™ connects them into a unified ecosystem where every decision is informed by evidence and measured against business outcomes. It transforms research into strategy, strategy into design, design into engineering, and engineering into meaningful customer experiences.",
      },
      {
        question:
          "Why does Wizard start with understanding people before creating wireframes?",
        answer:
          "Most organisations think design starts with wireframes. Why are customers abandoning your platform? Why does adoption remain low? Why do employees avoid internal systems? The answers rarely live inside analytics dashboards — they live inside human behaviour. At Wizard, every engagement begins by understanding the people behind the pixels. Assumptions create expensive products. Insights create extraordinary ones.",
      },
      {
        question: "What is Design Thinking 2.0?",
        bullets: [
          "Understand: customer expectations, technology constraints, market realities, and business goals",
          "Discover: ethnographic research, contextual inquiry, observation studies, and behavioural analytics",
          "Define: problem framing, experience strategy, Jobs-to-be-Done, and experience vision",
          "Imagine: collaborative ideation, design studios, AI-assisted brainstorming, and rapid concept generation",
          "Prototype: conversational interfaces, motion prototypes, clickable prototypes, and interactive wireframes",
          "Validate: usability testing, accessibility reviews, customer feedback, heatmaps, and continuous learning",
        ],
      },
      {
        question: "How does behavioural design improve conversion?",
        answer:
          "Understanding why people click is more important than knowing where they click. Every digital interaction is a behavioural decision: Should I trust this? Should I continue? Should I purchase? Should I abandon? We incorporate choice architecture, visual hierarchy, decision simplicity, cognitive fluency, trust signals, recognition over recall, progressive disclosure, and behavioural nudges to remove friction without manipulation.",
      },
      {
        question: "How do you combine AI with human insight in research?",
        answer:
          "AI doesn't replace researchers. It allows researchers to uncover deeper patterns, analyse larger datasets and move from insight to innovation much faster. Wizard responsibly integrates AI into every stage of discovery — for research synthesis, sentiment analysis, journey analysis, behaviour prediction, and persona generation — with every recommendation validated by experienced strategists and researchers.",
      },
      {
        question:
          "How does Information Architecture create a competitive advantage?",
        answer:
          "When information is organised intelligently, people think less, customers convert faster, employees become more productive, support costs decrease, and digital adoption improves. Wizard structures complex information into intuitive navigation systems that make digital products feel remarkably simple. Good architecture disappears. Great architecture feels obvious.",
      },
    ],
  },

  cta: {
    title: "Next Chapter: Designing The Future.",
    body: "Explore how Wizard combines Enterprise UX, Design Systems, AI-Native Product Design, Accessibility, Experience Engineering and Product Innovation to create digital platforms built for tomorrow.",
    label: "Book Free Consultation",
  },
};

/* ------------------------------------------------------------------ */
/* Maintenance & Support                                               */
/* ------------------------------------------------------------------ */

const MAINTENANCE_SUPPORT: ServicePage = {
  slug: "maintenance-support",
  label: "Maintenance & Support",
  eyebrow: "Managed Services",
  titleLines: ["Keep your systems running.", "We handle the rest."],
  tagline: "Proactive support that prevents problems before they become incidents.",
  lead: "Launching software is the beginning, not the end. At Wizard Communications, we provide comprehensive maintenance and support services that keep your applications secure, performant, and continuously improving — so your team can focus on the business, not the infrastructure.",
  body: [
    "From 24/7 monitoring and rapid incident response to planned enhancements and release management, our managed services team becomes an extension of yours — with the context to act fast and the discipline to act right.",
  ],
  image: "/services/hero/hero_trust.webp",
  imagePrompt:
    "Cinematic wide shot of a modern operations centre at night, a wall of softly glowing monitors showing abstract system dashboards with no legible text, two engineers in quiet conversation at a standing desk, cyan status lights against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
  icon: LifeBuoy,
  summary: "Ensuring seamless, secure system operations.",
  metaDescription:
    "Application maintenance and managed support services — 24/7 monitoring, incident response, performance optimisation, CI/CD, release management and proactive issue resolution.",

  statement: {
    heading: "Software that ships is software that needs care.",
    body: "Every production system drifts — dependencies age, traffic patterns shift, edge cases surface. A dedicated support partner catches those signals early and acts before users notice.",
  },

  offerings: {
    heading: "What we cover",
    lead: "A complete managed service from monitoring through to planned enhancement — one team, one contract, no gaps.",
    items: [
      {
        title: "24/7 Application Monitoring",
        body: "Continuous uptime and performance monitoring with alerting, so issues are caught before they reach your users.",
      },
      {
        title: "Incident Response & Bug Fixes",
        body: "Rapid triage, root-cause analysis and resolution — with clear SLAs and transparent communication throughout.",
      },
      {
        title: "Performance Optimisation",
        body: "Regular profiling, query tuning, caching strategy and infrastructure right-sizing to keep response times low as usage grows.",
      },
      {
        title: "Security Patching",
        body: "Scheduled dependency updates, vulnerability scanning and patch deployment — keeping your stack current without surprise downtime.",
      },
      {
        title: "CI/CD & Release Management",
        body: "Automated pipelines, environment management and controlled deployments that make releasing software a non-event.",
      },
      {
        title: "Database Administration",
        body: "Backup schedules, replication health, index maintenance and capacity planning for your production databases.",
      },
      {
        title: "Planned Enhancements",
        body: "Structured sprint cycles for feature additions and UX improvements — so the product keeps moving forward, not just staying alive.",
      },
      {
        title: "Documentation & Knowledge Transfer",
        body: "Living runbooks, architecture notes and handover packs that mean your team is never dependent on a single person.",
      },
    ],
  },

  why: {
    heading: "Why businesses choose Wizard for support",
    items: [
      {
        title: "Context from day one",
        body: "We prefer to support what we build — which means we already know the architecture, the edge cases and the decisions that shaped them.",
      },
      {
        title: "Proactive, not reactive",
        body: "Monitoring, alerting and regular health reviews mean we surface problems before they become incidents, not after.",
      },
      {
        title: "Transparent SLAs",
        body: "Clear response and resolution targets, reported monthly — so you always know what you are getting and whether we are delivering it.",
      },
      {
        title: "One team, full stack",
        body: "Frontend, backend, database, cloud and security under one roof. No finger-pointing between vendors when something crosses a boundary.",
      },
      {
        title: "Scales with you",
        body: "Support tiers that grow with your product — from a startup's first production deployment to an enterprise platform serving millions.",
      },
    ],
    backdrop: "/services/hero/hero_collab.webp",
  },

  process: {
    heading: "How we onboard and operate",
    lead: "A structured handover so nothing falls through the cracks, followed by a steady operating rhythm.",
    steps: [
      {
        title: "Audit",
        body: "We review your codebase, infrastructure, monitoring setup and deployment process to understand the current state.",
      },
      {
        title: "Stabilise",
        body: "Known issues are triaged and resolved, monitoring gaps are closed, and runbooks are written or updated.",
      },
      {
        title: "Instrument",
        body: "Alerting thresholds, dashboards and on-call rotations are configured to match your SLA requirements.",
      },
      {
        title: "Operate",
        body: "The steady state: monitoring, incident response, patching and planned releases running on a predictable cadence.",
      },
      {
        title: "Review",
        body: "Monthly health reports, retrospectives on any incidents, and a forward look at upcoming risks or enhancements.",
      },
    ],
  },

  outcomes: {
    heading: "What good support actually delivers",
    lead: "The value of a managed service is not just fewer incidents — it is the compounding effect of a system that keeps getting better.",
    problems: {
      heading: "Without a support partner",
      items: [
        "Incidents discovered by users, not your team",
        "Security patches delayed until they are critical",
        "Performance degradation that creeps up unnoticed",
        "Deployments that require a developer on standby",
        "Knowledge locked in one person's head",
      ],
    },
    benefits: {
      heading: "With Wizard managing your systems",
      items: [
        "Issues caught and resolved before users are affected",
        "Security posture maintained continuously",
        "Performance baselines tracked and improved over time",
        "Releases that go out on schedule without drama",
        "A documented, transferable system anyone can operate",
        "Your engineering team freed to build, not firefight",
      ],
    },
    closing: "Reliable software is not an accident. It is the result of consistent, disciplined care.",
    backdrop: "/services/hero/outcomes-backdrop.webp",
  },

  tech: {
    heading: "Technologies we support",
    lead: "We maintain systems built on the stacks we know best — which is most of them.",
    groups: [
      {
        label: "Frontend",
        chips: [TECH.react, TECH.angular, TECH.vue, TECH.html5],
      },
      {
        label: "Backend",
        chips: [TECH.dotnet, TECH.node, TECH.php, TECH.python],
      },
      {
        label: "Database",
        chips: [TECH.mysql, TECH.postgres, TECH.sqlServer, TECH.oracle],
      },
      {
        label: "Cloud & Integration",
        chips: [TECH.aws, TECH.azure, TECH.firebase, TECH.restApi],
      },
    ],
  },

  industries: {
    heading: "Industries we support",
    items: [
      "Healthcare",
      "Finance & Insurance",
      "Retail & eCommerce",
      "Manufacturing",
      "Hospitality",
      "Education & eLearning",
      "Government & Public Sector",
      "Logistics & Transportation",
      "Professional Services",
      "Startups & Technology Companies",
    ],
    note: "If your business depends on software, we can keep it running.",
  },

  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Do you only support software you built?",
        answer:
          "No. We take on third-party and legacy systems too. The onboarding audit takes longer, but the operating model is the same.",
      },
      {
        question: "What does a typical SLA look like?",
        bullets: [
          "Critical incidents: response within 1 hour, resolution target 4 hours",
          "High priority: response within 4 hours, resolution target 1 business day",
          "Standard issues: response within 1 business day, resolution target 3 business days",
          "Planned work: scheduled in fortnightly sprints",
        ],
      },
      {
        question: "How do you handle after-hours incidents?",
        answer:
          "Critical and high-priority alerts page the on-call engineer directly. We configure thresholds with you during onboarding so the on-call rotation is not woken up for noise.",
      },
      {
        question: "Can you take over support from our current team or vendor?",
        answer:
          "Yes. We run a structured handover process — codebase review, infrastructure audit, runbook creation — so nothing is lost in the transition.",
      },
      {
        question: "Do you provide monthly reporting?",
        answer:
          "Every month you receive an uptime summary, incident log, patch status, performance trends and a forward look at planned work and upcoming risks.",
      },
      {
        question: "Can the support scope grow over time?",
        answer:
          "Absolutely. Most clients start with reactive support and monitoring, then add planned enhancement sprints as the relationship matures.",
      },
    ],
  },

  cta: {
    title: "Your system deserves better than hope.",
    body: "Tell us what you are running and we will tell you how we would look after it.",
    label: "Talk to Our Support Team",
  },
};

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export const SERVICE_PAGES: readonly ServicePage[] = [
  CUSTOM_SOFTWARE,
  MOBILE_APP,
  ARTIFICIAL_INTELLIGENCE,
  E_LEARNING,
  SECURITY,
  DIGITAL_MARKETING,
  ON_DEMAND_HIRING,
  MAINTENANCE_SUPPORT,
  UX_UI,
] as const;

/** Slug lookup for the dynamic route. */
export function getServicePage(slug: string): ServicePage | undefined {
  const target = SLUG_ALIASES[slug] ?? slug;
  return SERVICE_PAGES.find((page) => page.slug === target);
}

/**
 * Home-page service slugs that name the same thing as a detail page under a
 * different heading.
 */
const SLUG_ALIASES: Record<string, string> = {
  "software-development": "custom-software-development",
  "ux-ui": "ux-ui-design",
  "ux-ui-design-development": "ux-ui-design",
};

/**
 * Where a service card should link.
 *
 * Services with no detail page — UX/UI — fall back to the index rather
 * than linking into a 404. Routing through one helper means a page added later
 * is picked up everywhere at once.
 */
export function serviceHref(slug: string): string {
  const target = SLUG_ALIASES[slug] ?? slug;
  return SERVICE_PAGES.some((page) => page.slug === target)
    ? `/services/${target}`
    : "/services";
}

/** Copy for the `/services` index. */
export const SERVICES_INDEX = {
  eyebrow: "Services We Offer",
  titleLines: [
    "Turn your ideas into reality",
    "with expert design and development",
  ],
  lead: "We help enterprises stand out with custom technologies in their digital evolution.",
  image: "/services/hero/services-index.webp",
  capability: {
    eyebrow: "End-to-End Expertise",
    title: "Five disciplines that usually live in five different agencies.",
    description:
      "Which is why the handoffs between them are where most projects lose momentum. Here they do not exist.",
  },
} as const;
