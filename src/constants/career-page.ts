import { SITE } from "./site";

/**
 * Careers page.
 *
 * The eight open roles published on wizardcomm.net/career, with their
 * requirements transcribed as written. Only the grouping is new: the source
 * runs each role as a wall of bullets, and the qualification, experience,
 * location and shift are pulled out here because those are the four things
 * someone checks before reading any of the rest.
 */

export type Role = {
  /** Anchor id, and the React key. */
  id: string;
  title: string;
  /** Short line for the closed state of the accordion. */
  summary: string;
  skills: readonly string[];
  qualification?: string;
  experience?: string;
  location?: string;
  shift?: string;
};

export const ROLES: readonly Role[] = [
  {
    id: "global-testing-consultant",
    title: "Global Testing Consultant (HRIS)",
    summary: "SAP SuccessFactors testing across complex IT and HR systems.",
    experience: "5–8 years",
    qualification: "BE/BTech, BSc, BCA, MCA",
    location: "Noida · Permanent hybrid, WFH",
    skills: [
      "Degree educated with 1–3 years as a testing consultant in complex IT Services and/or HRIS",
      "System integration testing and User Acceptance Testing in SAP SuccessFactors / SAP HR / HCM",
      "2–3 years of SAP SuccessFactors Employee Central experience",
      "Test documentation creation and testing procedure walkthroughs",
      "Knowledge of software QA methodologies",
      "Knowledge of Agile methodology",
      "5+ years of product testing experience",
      "Excellent verbal and written communication",
      "Knowledge of SuccessFactors, JIRA and Micro Focus ALM",
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    summary: "Angular and Spring Boot microservices, on a hybrid shift.",
    experience: "5–7 years",
    qualification: "BTech/BE/BCA",
    location: "Noida · Permanent hybrid, WFH",
    shift: "1:30 PM – 10:00 PM (shifts by an hour for daylight saving)",
    skills: [
      "Angular 4+ — two years, and must be strong",
      "Spring Boot and Microservices, at least to a working level",
      "Java 8",
      "Currently working with Angular",
      "Cloud technologies — AWS, GCP or Azure — a plus",
      "Database experience, SQL and NoSQL — a plus",
      "Container runtime stack maintenance with Kubernetes or Docker",
      "Able to work in an Agile methodology",
    ],
  },
  {
    id: "pricing-specialist",
    title: "Pricing Specialist",
    summary: "Pricing, financial modelling and analysis for technology products.",
    experience:
      "At least 3 years in pricing, business accounting or financial modelling, plus an understanding of computer technology products and services",
    qualification: "BS degree in Finance & Accounting",
    shift: "12:00 PM – 9:00 PM",
    skills: [
      "Outstanding communication skills",
      "Basic mathematical skills, with a professional, analytical and detail-oriented approach",
      "Proficient with computers, particularly MS Excel and MS Word",
      "Strong time management across multiple assignments",
      "An understanding of how critical deadlines are",
      "Responsible, proactive and willing to take the initiative",
      "A team player with high business integrity and ethics",
      "Experience building or deploying computer systems, or biometrics experience — desired",
    ],
  },
  {
    id: "scrum-master",
    title: "Scrum Master",
    summary: "Sprint planning and delivery across distributed teams.",
    experience: "7–8 years",
    qualification:
      "Bachelor's degree in Computer Science, Information Technology or a related field. CSM or Agile certifications preferred",
    skills: [
      "Expertise in sprint planning, user stories and the software development process",
      "Strong analytical and problem-solving skills, with attention to detail",
      "Excellent communication, leadership and collaboration",
      "Experience with distributed teams",
      "Able to work independently and manage multiple priorities",
      "Knowledge of Agile and Scrum methodologies, and the tools and techniques around them",
    ],
  },
  {
    id: "dotnet-developer",
    title: ".NET Developer",
    summary: "C#, ASP.NET and SQL Server, working to a tech lead.",
    experience: "2–4 years of relevant experience",
    qualification: "Diploma / Graduation / Post Graduation",
    skills: [
      ".NET framework 4.0+ with C#, ASP.NET, MVC, Ajax, JavaScript and jQuery",
      "Hands-on database experience with SQL Server 2014 or later",
      "Angular or React knowledge — good to have",
      "Able to work independently under a project manager or tech lead",
      "Strong communication and team collaboration",
    ],
  },
  {
    id: "manual-tester",
    title: "Manual Tester",
    summary: "System, integration and regression testing, manual and automated.",
    experience: "4–5 years",
    qualification: "Diploma / Graduation / Post Graduation",
    skills: [
      "4–5 years as a QA or software testing specialist",
      "Analysing user stories, use cases and requirements for validity and feasibility",
      "Executing every level of testing — system, integration and regression",
      "Test case and test script preparation",
      "Both manual and automation testing",
      "Defect reporting and tracking",
      "Basic SQL queries",
    ],
  },
  {
    id: "software-tester",
    title: "Software Tester",
    summary: "Insurance-sector test engineering on an early shift.",
    experience: "Minimum 4–5 years, insurance sector required",
    qualification: "Diploma / Graduation / Post Graduation",
    location: "Noida / NECI office / WFH / hybrid",
    shift: "5:00 AM – 2:00 PM IST",
    skills: [
      "Test script design and execution",
      "Customer specification review",
      "Regression test suite maintenance and execution",
      "Activity reporting",
      "Defect tracking through to closure",
      "Technical issue resolution through debugging, research and investigation",
      "Reporting on test engineering activity",
      "Requirements document review and analysis",
      "Defect identification, documentation and prioritisation",
    ],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    summary: "Azure, Databricks and machine learning on large datasets.",
    experience: "Minimum 5 years",
    qualification: "Diploma / Graduation / Post Graduation",
    location: "Noida / NECI office / WFH / hybrid",
    shift: "5:00 AM – 2:00 PM IST",
    skills: [
      "Design and development using Databricks, AI services on Azure, and Synapse",
      "Data engineering with large datasets, data wrangling and pipeline development",
      "Machine learning model development, implementation and optimisation",
      "Azure services — Machine Learning, Data Factory, Synapse Analytics, DevOps",
      "Code quality and thorough testing practices",
      "Identifying and optimising performance bottlenecks",
      "Cross-functional collaboration with data scientists and engineers",
      "Technical documentation",
      "Security best practices and compliance",
      "Continuous learning across AI, Azure and Databricks",
    ],
  },
] as const;

export const CAREER_PAGE = {
  eyebrow: "Join Us",
  titleLines: ["Build things that", "outlast the brief."],
  lead: "Join us in this aesthetic experience of building your business from scratch. You provide us with ideas while we improvise, innovate and adapt.",
  body: "Our clients are not only our business partners, they are very much a part of the creation process, brainstorming sessions and so on.",

  roles: {
    eyebrow: "Open positions",
    title: "Eight roles open right now.",
    description:
      "Expand a role for the full requirements, then apply by email — your message reaches a person, not an applicant tracking system.",
  },

  apply: {
    eyebrow: "How to apply",
    title: "Send us your CV.",
    body: "Email your CV with the role in the subject line and we will come back to you. Tell us what you have built and what you would like to build next — that is more useful to us than a covering letter.",
    /** Applications go to the general inbox; there is no ATS to post to. */
    email: SITE.contact.email,
  },
} as const;

/** Prefilled application email for a role. */
export function applyHref(roleTitle: string): string {
  const subject = encodeURIComponent(`Application: ${roleTitle}`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to apply for the ${roleTitle} role.\n\nPlease find my CV attached.\n\nName:\nPhone:\nCurrent location:\nNotice period:\n\nThank you,\n`,
  );
  return `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
}
