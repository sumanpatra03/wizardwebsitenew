import { ArrowLink } from "@/components/common/arrow-link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

/**
 * Case-study card.
 *
 * Website A leads each case card with an image. With no photography to use,
 * the visual slot is a generated panel: a mesh wash, a blueprint grid and the
 * project's monogram set very large. It costs no network request and stays
 * theme-aware.
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
      {/* Generated artwork */}
      <div
        aria-hidden="true"
        className="bg-mesh relative aspect-16/10 overflow-hidden border-b border-border"
      >
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

        <div className="mt-6 border-t border-border pt-5">
          {/* `stretched` makes the whole card clickable while keeping exactly
              one labelled link in the tab order. */}
          <ArrowLink href={`/projects/${project.slug}`} stretched>
            View case study
          </ArrowLink>
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
