import Image from "next/image";

import { ArrowLink } from "@/components/common/arrow-link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

/**
 * Aspect of the image slot.
 *
 * 9:10 because that is the exact ratio wizardcomm.net publishes its case-card
 * artwork at (360×400). These are poster images with the client's logo set
 * across the top and a headline across the bottom, so any crop tighter than
 * their native ratio cuts through type rather than trimming background — a
 * 16:10 slot would have taken a third of the height and lost a line of it.
 *
 * The generated fallback uses the same slot, so a project with no image
 * occupies identical space and the rail stays level.
 */
const MEDIA = "relative aspect-[9/10] overflow-hidden border-b border-border";

/**
 * Case-study card.
 *
 * Leads with the published artwork where there is one. Projects without an
 * image keep the generated panel — a mesh wash, a blueprint grid and the
 * project's monogram set very large — so the rail is never half-broken while
 * images are still being supplied.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Card interactive className={cn("flex h-full flex-col", className)}>
      {project.image ? (
        <div aria-hidden="true" className={MEDIA}>
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 26rem, 82vw"
            className={cn(
              "object-cover transition-transform",
              "duration-(--duration-base) ease-(--ease-out-expo)",
              "group-hover/card:scale-105",
              "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
            )}
          />
          {/* Ties the artwork into the card surface. Kept shallow — these
              images carry a headline near the lower edge. */}
          <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-surface" />
        </div>
      ) : (
        /* Generated fallback */
        <div aria-hidden="true" className={cn("bg-mesh", MEDIA)}>
          <div className="bg-grid absolute inset-0 opacity-70" />
          <span
            className={cn(
              "absolute inset-0 grid place-items-center",
              "font-display text-[clamp(4rem,12vw,7rem)] leading-none font-extrabold",
              "text-fg opacity-[0.09] select-none",
              "transition-transform duration-(--duration-base) ease-(--ease-out-expo)",
              "group-hover/card:scale-110 motion-reduce:group-hover/card:scale-100",
            )}
          >
            {project.monogram}
          </span>
          <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-surface" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <Badge variant="accent" className="self-start">
          {project.category}
        </Badge>

        <h3 className="font-display text-heading-md mt-4 text-fg">
          {project.title}
        </h3>

        <p className="text-body-sm mt-3 flex-1 text-fg-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>

        {/* Points at the client's own site where there is one, and at the
            index otherwise: this site publishes no per-project page, so a
            `/projects/<slug>` link would land on a 404. `stretched` makes the
            whole card clickable while keeping exactly one labelled link in
            the tab order. */}
        <div className="mt-6 border-t border-border pt-5">
          {project.externalUrl ? (
            <ArrowLink href={project.externalUrl} stretched>
              Visit site
            </ArrowLink>
          ) : (
            <ArrowLink href="/projects" stretched>
              View in projects
            </ArrowLink>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Terminal card of the projects rail, inviting the user onward to the full
 * index rather than ending the horizontal scroll on empty space.
 */
export function ProjectsEndCard({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Card
      interactive
      variant="flat"
      className={cn(
        "bg-mesh flex h-full flex-col items-start justify-end border-dashed p-7",
        className,
      )}
    >
      <p className="font-display text-display-md max-w-[16ch] text-fg">
        More of our work.
      </p>
      <p className="text-body-sm mt-3 text-fg-muted">
        Explore the full project index.
      </p>
      <div className="mt-6">
        <ArrowLink href={href} stretched>
          {label}
        </ArrowLink>
      </div>
    </Card>
  );
}
