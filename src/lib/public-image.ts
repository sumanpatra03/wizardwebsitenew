import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";

/** Preference order — modern formats first. */
const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png"] as const;

/**
 * Resolve an optional image in `public/<dir>/<name>.<ext>`.
 *
 * This is what makes supplying card photography a drop-in: no import to add,
 * no field to edit. A card with no matching file gets `undefined` and keeps
 * its generated artwork fallback, so a section is never half-broken while
 * images are still being supplied one at a time.
 *
 * Server-only, and evaluated at build time — these pages are statically
 * prerendered, so a new file is picked up on the next build.
 */
export function findPublicImage(dir: string, name: string): string | undefined {
  for (const ext of EXTENSIONS) {
    if (existsSync(join(process.cwd(), "public", dir, `${name}${ext}`))) {
      return `/${dir}/${name}${ext}`;
    }
  }
  return undefined;
}
