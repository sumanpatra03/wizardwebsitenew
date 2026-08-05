import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceFaq } from "@/constants/service-pages";

/**
 * Frequently asked questions.
 *
 * `type="single"` with `collapsible`: unlike the company timeline — where the
 * eras are one continuous narrative and several are meant to be open together
 * — these are independent questions, and leaving eight of them expanded turns
 * the section into a wall.
 *
 * Some published answers are a sentence and some are a list, so both shapes
 * are supported rather than forcing the lists into prose.
 */
export function ServiceFaqs({
  heading,
  items,
  tone = "subtle",
}: {
  heading: string;
  items: readonly ServiceFaq[];
  tone?: "default" | "subtle";
}) {
  return (
    <Section
      tone={tone}
      backdrop={tone === "subtle"}
      className={tone === "subtle" ? "border-y border-border" : undefined}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow="Questions"
            title={heading}
            className="lg:col-span-5"
          />

          <Reveal delay={0.1} className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {items.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="py-5">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6">
                    {faq.answer ? (
                      <p className="text-body-base text-fg-muted">{faq.answer}</p>
                    ) : null}

                    {faq.bullets ? (
                      <ul className="mt-3 flex flex-col gap-2.5 first:mt-0">
                        {faq.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-body-base flex items-start gap-3 text-fg-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1 shrink-0 rounded-pill bg-accent"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
