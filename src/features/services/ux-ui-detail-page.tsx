"use client";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Cpu,
  Eye,
  HelpCircle,
  Layers,
  MousePointerClick,
  Network,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ClientWall } from "@/components/common/client-wall";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS_HEADING } from "@/constants/testimonials";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "Why are customers abandoning your platform?",
  "Why does adoption remain low?",
  "Why do employees avoid internal systems?",
  "Why are support tickets increasing?",
  "Why are customers choosing competitors despite similar products?",
] as const;

const DISCOVERY_POINTS = [
  "Every interview.",
  "Every observation.",
  "Every workshop.",
  "Every customer journey.",
  "Every interaction.",
  "Every data point contributes to one objective— creating experiences people naturally understand.",
] as const;

const BEHAVIOURAL_LENSES = [
  { title: "Emotion", icon: Sparkles },
  { title: "Trust", icon: CheckCircle2 },
  { title: "Accessibility", icon: Eye },
  { title: "Context", icon: Compass },
  { title: "Human Behaviour", icon: Users },
  { title: "Cognitive Load", icon: Brain },
  { title: "Mental Models", icon: Layers },
  { title: "Decision Architecture", icon: Workflow },
  { title: "Motivation", icon: Zap },
  { title: "Habit Formation", icon: Target },
] as const;

const DESIGN_THINKING_STAGES = [
  {
    stage: "01",
    name: "Understand",
    items: [
      "Customer expectations.",
      "Technology constraints.",
      "Market realities.",
      "Stakeholder ambitions.",
      "Business goals.",
    ],
  },
  {
    stage: "02",
    name: "Discover",
    items: [
      "Ethnographic Research",
      "Contextual Inquiry",
      "Observation Studies",
      "Behavioural Analytics",
      "Customer Interviews",
      "Voice of Customer Research",
      "Digital Analytics",
      "Competitive Intelligence",
    ],
  },
  {
    stage: "03",
    name: "Define",
    items: [
      "Problem Framing",
      "Experience Strategy",
      "Jobs-to-be-Done",
      "Business Opportunity Mapping",
      "Experience Vision",
      "Success Metrics",
    ],
  },
  {
    stage: "04",
    name: "Imagine",
    items: [
      "Collaborative Ideation",
      "Design Studios",
      "AI-assisted Brainstorming",
      "Future Scenario Planning",
      "Rapid Concept Generation",
      "Service Innovation",
    ],
  },
  {
    stage: "05",
    name: "Prototype",
    items: [
      "Conversational Interfaces",
      "Motion Prototypes",
      "Low and High Fidelity Design",
      "AI-generated Concepts",
      "Experience Simulations",
      "Clickable Prototypes",
      "Interactive Wireframes",
    ],
  },
  {
    stage: "06",
    name: "Validate",
    items: [
      "Usability Testing",
      "Accessibility Reviews",
      "Customer Feedback",
      "Heatmaps",
      "Behaviour Analytics",
      "A/B Testing",
      "Continuous Learning",
    ],
  },
] as const;

const RESEARCH_CAPABILITIES = [
  "Benchmark Studies",
  "Competitive Experience Reviews",
  "User Interviews",
  "Stakeholder Discovery",
  "Ethnographic Research",
  "Field Observation",
  "Contextual Inquiry",
  "Diary Studies",
  "Journey Mapping",
  "Experience Mapping",
  "Digital Maturity Assessment",
  "Customer Personas",
  "Customer Satisfaction Analysis",
  "Behaviour Analytics",
  "Accessibility Evaluation",
  "Usability Testing",
  "Information Architecture Validation",
  "Tree Testing",
  "Card Sorting",
  "Voice of Customer",
  "Session Replay",
  "Heatmaps",
] as const;

const BEHAVIOURAL_DECISIONS = [
  "Should I trust this?",
  "Should I continue?",
  "Should I purchase?",
  "Should I return later?",
  "Should I abandon this process?",
] as const;

const BEHAVIOURAL_PRINCIPLES = [
  "Choice Architecture",
  "Visual Hierarchy",
  "Decision Simplicity",
  "Cognitive Fluency",
  "Persuasive Design",
  "Trust Signals",
  "Recognition over Recall",
  "Progressive Disclosure",
  "Emotional Design",
  "Behavioural Nudges",
  "Confidence Building",
] as const;

const JOURNEY_STAGES = [
  { step: "01", name: "Awareness" },
  { step: "02", name: "Discovery" },
  { step: "03", name: "Evaluation" },
  { step: "04", name: "Purchase" },
  { step: "05", name: "Onboarding" },
  { step: "06", name: "Adoption" },
  { step: "07", name: "Support" },
  { step: "08", name: "Advocacy" },
] as const;

const IA_CAPABILITIES = [
  "Content Architecture",
  "Navigation Design",
  "Taxonomy Development",
  "Search Strategy",
  "Knowledge Architecture",
  "Cross-platform Navigation",
  "Enterprise Information Models",
  "Content Governance",
  "Semantic Structure",
  "AI-ready Information Architecture",
] as const;

const AI_RESEARCH_AREAS = [
  "Research Synthesis",
  "Sentiment Analysis",
  "Journey Analysis",
  "Behaviour Prediction",
  "Persona Generation",
  "Content Structuring",
  "Experience Pattern Recognition",
  "Accessibility Evaluation",
  "Opportunity Identification",
] as const;

const OUTCOME_QUESTIONS = [
  "Who are the users?",
  "Where do they struggle?",
  "What motivates them?",
  "What creates trust?",
  "What drives conversion?",
  "How can AI remove friction?",
  "How should success be measured?",
] as const;

export function UxUiDetailPage({
  crumbs,
}: {
  crumbs: readonly { label: string; href?: string }[];
}) {
  const heroImage = (
    <div className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem]",
          "bg-accent/15 blur-3xl",
        )}
      />
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-card">
        <Image
          src="/services/uiux.jpg"
          alt="UX/UI Design and Experience Intelligence"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 92vw"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* 1. HERO SECTION */}
      <PageHero
        crumbs={crumbs}
        eyebrow="Experience Intelligence™"
        titleLines={[
          "Every Great Experience",
          "Begins Long Before Design.",
        ]}
        aside={heroImage}
      >
        <p className="font-display text-heading-md max-w-3xl text-balance text-accent">
          Most organisations think design starts with wireframes.
        </p>

        <div className="mt-8 space-y-3">
          {QUESTIONS.map((q) => (
            <div key={q} className="flex items-start gap-3 text-fg-muted">
              <HelpCircle className="mt-1 size-5 shrink-0 text-accent/80" />
              <span className="text-body-base font-medium text-fg-muted">{q}</span>
            </div>
          ))}
        </div>

        {/* Hero Callout Box */}
        {/* <div className="mt-10 rounded-xl border border-accent/25 bg-bg-elevated/70 p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-heading-sm font-semibold text-fg">
            The answers rarely live inside analytics dashboards.
          </h2>
          <p className="font-display text-heading-md mt-2 text-accent">
            They live inside human behaviour.
          </p>
          <p className="text-body-base mt-4 text-fg-muted">
            At Wizard, every engagement begins by understanding the people behind the pixels.
          </p>
          <p className="text-body-base mt-3 font-medium text-fg">
            Only then do we begin designing. Because assumptions create expensive products. Insights create extraordinary ones.
          </p>
        </div> */}

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              Book Free Consultation
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">All services</Link>
          </Button>
        </div>
      </PageHero>

      {/* 2. WE DON'T GUESS. WE DISCOVER. */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left" className="relative">
              <div className="relative aspect-[3/4] max-h-[580px] w-full overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-card">
                <Image
                  src="/services/ux-ui-v.webp"
                  alt="Business Process Automation & Human Centred Discovery"
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <Reveal direction="right">
              <span className="text-label uppercase tracking-widest text-accent">
                Discovery Process
              </span>
              <h2 className="font-display text-display-md mt-3 text-fg">
                We Don&apos;t Guess. We Discover.
              </h2>
              <p className="text-heading-sm mt-4 font-medium text-fg">
                Digital experiences fail for one simple reason. Too many decisions are based on opinions.
              </p>
              <p className="font-display text-heading-md mt-3 text-accent">
                We replace assumptions with evidence.
              </p>
              <p className="text-body-base mt-5 text-fg-muted">
                Our multidisciplinary research teams combine behavioural science, customer psychology, business analysis and data intelligence to uncover opportunities that traditional UX processes often overlook.
              </p>

              <div className="mt-8 space-y-3">
                {DISCOVERY_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-accent" />
                    <span className="text-body-base font-medium text-fg">{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. HUMAN-CENTRED DESIGN */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="Human-Centred Design"
            title="Designed Around People."
            description="Not Around Technology. Technology changes every year. Human behaviour evolves much more slowly. That’s why our philosophy remains remarkably simple."
          />

          <div className="mt-10 rounded-2xl border border-accent/20 bg-bg-elevated p-8 text-center sm:p-10">
            <h3 className="font-display text-heading-lg text-accent">
              Understand people first. Technology second.
            </h3>
            <p className="text-body-lg mx-auto mt-4 max-w-3xl text-fg-muted">
              Wizard follows globally recognised Human-Centred Design principles to ensure every digital product feels intuitive, inclusive and emotionally engaging.
            </p>
            <p className="font-display text-heading-sm mx-auto mt-4 max-w-2xl text-fg">
              Because products shouldn&apos;t force people to adapt. Products should adapt to people.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-label uppercase tracking-wider text-fg-subtle">
              Every interaction is evaluated through the lens of:
            </p>
            <Stagger
              stagger={0.05}
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {BEHAVIOURAL_LENSES.map(({ title, icon: Icon }) => (
                <StaggerItem key={title}>
                  <Card interactive className="flex flex-col items-center p-6 text-center">
                    <span className="grid size-12 place-items-center rounded-xl bg-accent-muted text-accent">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-heading-sm mt-4 text-fg">{title}</span>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-12 text-center">
            <p className="font-display text-heading-md text-accent">
              When experiences respect human behaviour... People stop noticing the technology.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. DESIGN THINKING 2.0 */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="Design Thinking 2.0"
            title="Creativity Backed by Commercial Intelligence."
            description="Design Thinking has transformed how organisations innovate. We’ve evolved it further. At Wizard, Design Thinking becomes an enterprise innovation framework—not simply a workshop methodology. Every challenge moves through six connected stages."
          />

          <Stagger
            stagger={0.06}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DESIGN_THINKING_STAGES.map((st) => (
              <StaggerItem key={st.name}>
                <Card interactive className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-heading-md text-accent/50">
                      {st.stage}
                    </span>
                    <span className="text-label uppercase text-accent">Stage</span>
                  </div>
                  <h3 className="font-display text-heading-lg mt-4 text-fg">
                    {st.name}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {st.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-body-sm text-fg-muted">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 rounded-xl border border-border bg-bg-elevated p-8 text-center sm:p-10">
            <p className="font-display text-heading-md text-fg">
              Every iteration reduces uncertainty. Every insight increases confidence.
            </p>
            <p className="text-body-lg mx-auto mt-3 max-w-3xl text-fg-muted">
              Why settle for generic tools when you can have solutions engineered specifically for your processes, customers, workflows, and goals?
            </p>
          </div>
        </Container>
      </Section>

      {/* 5. EXPERIENCE RESEARCH PRACTICE */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="Experience Research"
            title="Research That Creates Competitive Advantage, Because Customers Rarely Say What They Really Need."
            description="It's about observing better behaviour. Great research isn’t about asking better questions. Wizard’s Experience Research practice combines qualitative insight with quantitative evidence to reveal unmet customer needs and hidden business opportunities."
          />

          <div className="mt-10">
            <h3 className="text-label uppercase tracking-wider text-accent">
              Our research capabilities include:
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">
              {RESEARCH_CAPABILITIES.map((cap) => (
                <span
                  key={cap}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border border-border/80",
                    "bg-bg-elevated px-4 py-2.5 text-body-sm font-medium text-fg",
                    "transition-colors hover:border-accent/50 hover:bg-accent-muted/30",
                  )}
                >
                  <Search className="size-3.5 text-accent" />
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-accent/20 bg-accent-muted/15 p-6 text-center sm:p-8">
            <p className="font-display text-heading-sm text-accent">
              Research becomes the foundation upon which every strategic decision is built.
            </p>
          </div>
        </Container>
      </Section>

      {/* 6. BEHAVIOURAL DESIGN */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <span className="text-label uppercase tracking-widest text-accent">
                Behavioural Design
              </span>
              <h2 className="font-display text-display-md mt-3 text-fg">
                Understanding Why People Click...
              </h2>
              <p className="font-display text-heading-md mt-2 text-accent">
                Is More Important Than Knowing Where They Click.
              </p>
              <p className="text-body-lg mt-5 text-fg">
                Every digital interaction is a behavioural decision.
              </p>

              <div className="mt-6 space-y-3">
                {BEHAVIOURAL_DECISIONS.map((dec) => (
                  <div
                    key={dec}
                    className="flex items-center gap-3 rounded-lg border border-border/80 bg-bg-elevated/70 px-4 py-3"
                  >
                    <MousePointerClick className="size-4 shrink-0 text-accent" />
                    <span className="text-body-base font-medium text-fg">{dec}</span>
                  </div>
                ))}
              </div>

              <p className="text-body-base mt-6 text-fg-muted">
                Behavioural science helps answer those questions long before customers consciously realise they’re making them.
              </p>
            </Reveal>

            <Reveal direction="right">
              <div className="rounded-2xl border border-border bg-bg-elevated p-8 shadow-card sm:p-10">
                <h3 className="text-label uppercase text-fg-subtle">
                  Wizard incorporates behavioural psychology into every engagement through principles such as:
                </h3>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {BEHAVIOURAL_PRINCIPLES.map((pr) => (
                    <span
                      key={pr}
                      className={cn(
                        "rounded-pill border border-accent/30 bg-accent-muted/40",
                        "px-4 py-1.5 text-body-sm font-medium text-fg",
                      )}
                    >
                      {pr}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <p className="font-display text-heading-sm text-accent">
                    The objective isn&apos;t manipulation. It&apos;s removing unnecessary friction.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. CUSTOMER JOURNEY MAPPING */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="Customer Journey Mapping"
            title="Designed Around People."
            description="Customers don’t think in departments. They don’t distinguish between marketing, sales, customer support or technology. To them… It’s one journey."
          />

          <p className="text-body-lg mx-auto -mt-6 max-w-3xl text-center text-fg-muted">
            Wizard maps every interaction across the customer lifecycle to identify opportunities for improvement, automation and delight.
          </p>

          <div className="mt-14">
            <p className="text-label text-center uppercase tracking-wider text-accent">
              Our journey mapping framework evaluates:
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {JOURNEY_STAGES.map((st) => (
                <Card
                  key={st.name}
                  interactive
                  className="flex flex-col items-center p-5 text-center"
                >
                  <span className="text-body-xs font-mono text-accent">{st.step}</span>
                  <span className="font-display text-heading-sm mt-2 text-fg">{st.name}</span>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-accent/40 bg-accent-muted px-5 py-2 text-label uppercase text-accent">
                <Network className="size-4" />
                Connected Through Human-Centred UI/UX Design
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. INFORMATION ARCHITECTURE */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <span className="text-label uppercase tracking-widest text-accent">
                Information Architecture
              </span>
              <h2 className="font-display text-display-md mt-3 text-fg">
                Clarity Is A Competitive Advantage.
              </h2>
              <div className="mt-6 space-y-3">
                <p className="text-heading-sm font-medium text-fg">
                  When information is organised intelligently…
                </p>
                <ul className="space-y-2 text-body-base text-fg-muted">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>People think less.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>Customers convert faster.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>Employees become more productive.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>Support costs decrease.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>Digital adoption improves.</span>
                  </li>
                </ul>
              </div>

              <p className="text-body-base mt-6 text-fg-muted">
                Wizard structures complex information into intuitive navigation systems that make digital products feel remarkably simple.
              </p>
            </Reveal>

            <Reveal direction="right">
              <Card className="p-8 sm:p-10">
                <h3 className="text-label uppercase text-fg-subtle">Our expertise includes:</h3>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {IA_CAPABILITIES.map((ia) => (
                    <div
                      key={ia}
                      className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-bg px-3.5 py-2.5 text-body-sm text-fg"
                    >
                      <Layers className="size-4 shrink-0 text-accent" />
                      <span>{ia}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-6 text-center">
                  <p className="font-display text-heading-md text-accent">
                    Good architecture disappears. Great architecture feels obvious.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 9. AI-ENHANCED RESEARCH */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="AI-Enhanced Research"
            title="Human Insight. Artificial Intelligence. One Powerful Combination."
            description="AI doesn’t replace researchers. It allows researchers to uncover deeper patterns, analyse larger datasets and move from insight to innovation much faster. Wizard responsibly integrates AI into every stage of discovery."
          />

          <Stagger
            stagger={0.05}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {AI_RESEARCH_AREAS.map((area) => (
              <StaggerItem key={area}>
                <Card interactive className="flex items-center gap-4 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-muted text-accent">
                    <Cpu className="size-5" />
                  </span>
                  <span className="font-display text-heading-sm text-fg">{area}</span>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 rounded-xl border border-border bg-bg-elevated p-6 text-center sm:p-8">
            <p className="font-display text-heading-sm text-fg">
              But every recommendation is validated by experienced strategists and researchers.
            </p>
          </div>
        </Container>
      </Section>

      {/* 10. INTRODUCING EXPERIENCE INTELLIGENCE™ */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="left" className="relative">
              <div className="relative aspect-[3/4] max-h-[580px] w-full overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-card">
                <Image
                  src="/services/ux-ui-v.webp"
                  alt="Experience Intelligence Platform"
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <Reveal direction="right">
              <span className="text-label uppercase tracking-widest text-accent">
                Technology accelerates insight. Human Expertise Ensures Relevance.
              </span>
              <h2 className="font-display text-display-md mt-3 text-fg">
                Introducing Experience Intelligence™
              </h2>

              <p className="text-body-lg mt-6 text-fg-muted">
                Experience Intelligence™ is Wizard’s integrated consulting framework that combines customer insight, behavioural science, business strategy, AI-powered discovery and enterprise design into one continuous process.
              </p>

              <p className="text-body-base mt-4 text-fg-muted">
                Rather than treating research, design and engineering as separate disciplines, Experience Intelligence™ connects them into a unified ecosystem where every decision is informed by evidence and measured against business outcomes.
              </p>

              <div className="mt-8 space-y-3 rounded-xl border border-accent/25 bg-bg-elevated p-6">
                <div className="flex items-center gap-3 text-fg">
                  <ArrowRight className="size-4 text-accent" />
                  <span className="font-medium">It transforms research into strategy.</span>
                </div>
                <div className="flex items-center gap-3 text-fg">
                  <ArrowRight className="size-4 text-accent" />
                  <span className="font-medium">Strategy into design.</span>
                </div>
                <div className="flex items-center gap-3 text-fg">
                  <ArrowRight className="size-4 text-accent" />
                  <span className="font-medium">Design into engineering.</span>
                </div>
                <div className="flex items-center gap-3 text-fg">
                  <ArrowRight className="size-4 text-accent" />
                  <span className="font-medium">Engineering into meaningful customer experiences.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 11. THE OUTCOME */}
      <Section tone="default">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="rounded-xl border border-accent/30 bg-accent-muted/20 p-6">
                <p className="font-display text-heading-md text-accent">
                  That&apos;s why our design process produces more than beautiful interfaces.
                </p>
                <p className="font-display text-heading-md mt-2 text-fg">
                  It produces measurable business outcomes.
                </p>
              </div>

              <div className="mt-8">
                <span className="text-label uppercase tracking-widest text-accent">
                  The Outcome
                </span>
                <h2 className="font-display text-heading-lg mt-2 text-fg">
                  By the time we begin designing interfaces... We&apos;ve already answered the most important questions.
                </h2>
              </div>

              <div className="mt-8 space-y-3">
                {OUTCOME_QUESTIONS.map((q) => (
                  <div
                    key={q}
                    className="flex items-center gap-3 rounded-lg border border-border/80 bg-bg-elevated px-4 py-3"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    <span className="text-body-base font-medium text-fg">{q}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-card">
                <Image
                  src="/services/ux-ui-content.webp"
                  alt="UI/UX Outcomes and Measurable Business Results"
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 12. NEXT CHAPTER: DESIGNING THE FUTURE */}
      <Section tone="subtle" backdrop className="border-y border-border">
        <Container>
          <div className="rounded-2xl border border-accent/25 bg-mesh p-8 text-center sm:p-14">
            <span className="text-label uppercase tracking-widest text-accent">
              Next Chapter
            </span>
            <h2 className="font-display text-display-lg mt-3 text-fg">
              Designing The Future.
            </h2>
            <p className="text-body-lg mx-auto mt-5 max-w-3xl text-fg-muted">
              Explore how Wizard combines Enterprise UX, Design Systems, AI-Native Product Design, Accessibility, Experience Engineering and Product Innovation to create digital platforms built for tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 13. FEATURED CLIENTS & REVIEWS */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="Global Clients"
            title="Featured Clients"
            description="We are proud to have 200+ satisfied clients across the globe, spanning diverse industries. From corporate enterprises to government organizations, we have been the trusted technology partner behind the success of countless businesses since 2004."
          />
          <ClientWall variant="carousel" className="mt-14" />
        </Container>
      </Section>

      <TestimonialsCarousel
        eyebrow="In Their Own Words"
        title={TESTIMONIALS_HEADING}
      />
    </>
  );
}

