import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholders for the two dynamically imported sections.
 *
 * Each reserves roughly the height of the real section so its chunk arriving
 * does not shift the rest of the page — the layout-stability half of good
 * loading states, not just a spinner.
 */

function HeadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-10 w-full max-w-md" />
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <Section aria-busy="true" aria-label="Loading projects">
      <Container>
        <HeadingSkeleton />
        <div className="mt-14 flex gap-5 overflow-hidden">
          {[0, 1, 2].map((index) => (
            <div key={index} className="w-[82vw] max-w-sm shrink-0 sm:w-[26rem]">
              <Skeleton className="aspect-16/10 w-full rounded-t-xl" />
              <div className="flex flex-col gap-3 rounded-b-xl border border-t-0 border-border p-7">
                <Skeleton className="h-6 w-32 rounded-pill" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <Section
      tone="subtle"
      className="border-y border-border"
      aria-busy="true"
      aria-label="Loading testimonials"
    >
      <Container>
        <HeadingSkeleton />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-border p-7"
            >
              <Skeleton className="size-8" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
