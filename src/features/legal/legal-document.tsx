import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import type { LegalBlock, LegalSection } from "@/constants/legal";
import { cn } from "@/lib/utils";

/**
 * Body of a legal document: contents rail beside the sections.
 *
 * Shared by the privacy policy and the accessibility statement, which differ
 * only in their content and their hero. Each page keeps its own `<PageHero>`
 * — the artwork and lead are theirs — and hands the sections here.
 */
export function LegalDocument({
  sections,
  children,
}: {
  sections: readonly LegalSection[];
  /** Rendered at the foot of the last section, for contact details. */
  children?: React.ReactNode;
}) {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/*
           * A document is something people arrive at looking for one clause,
           * not something they read end to end — so the contents are a
           * first-class part of the page rather than an afterthought.
           */}
          <nav
            aria-label="On this page"
            className="lg:col-span-4 lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:self-start"
          >
            <h2 className="text-label uppercase text-fg-subtle">On this page</h2>
            <ol className="mt-5 flex flex-col gap-2.5">
              {sections.map((section, index) => (
                <li key={section.id} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="text-label tabular-nums text-fg-subtle/70"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "text-body-sm text-fg-muted transition-colors",
                      "duration-(--duration-fast) hover:text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-ring",
                    )}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/*
           * `max-w-2xl` rather than the page's usual 3xl: at body size this
           * lands near 70 characters, and these are the longest unbroken
           * reads on the site — the measure matters more here than the column
           * filling its track.
           */}
          <div className="flex flex-col gap-14 lg:col-span-8 lg:max-w-2xl">
            {sections.map((section, index) => (
              <Reveal key={section.id} delay={index === 0 ? 0 : 0.05}>
                <section
                  id={section.id}
                  className="scroll-mt-[calc(var(--spacing-header)+2rem)]"
                >
                  <h2 className="font-display text-heading-lg text-balance text-fg">
                    {section.heading}
                  </h2>

                  <div className="mt-5 flex flex-col gap-5">
                    {section.blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}

                    {index === sections.length - 1 ? children : null}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "text") {
    return <p className="text-body-base text-fg-muted">{block.body}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="text-body-base flex items-start gap-3 text-fg-muted"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rounded-pill bg-accent"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  /*
   * A real `<dl>`, not a styled list. These are term-and-definition pairs,
   * and the markup is what lets assistive tech announce them as such.
   */
  return (
    <dl className="flex flex-col gap-4 border-l border-border pl-5">
      {block.items.map((item) => (
        <div key={item.term}>
          <dt className="text-body-sm font-semibold text-fg">{item.term}</dt>
          <dd className="text-body-sm mt-1 text-fg-muted">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
