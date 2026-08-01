# Wizard Communications

Marketing site for Wizard Communications Pvt Ltd — content from wizardcomm.net,
presented in an editorial, dark-first design language.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Motion · GSAP · Embla · Lenis · Radix primitives · Lucide.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + typecheck
npm run start    # serve the production build
npm run lint     # ESLint (zero warnings enforced)
```

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment so canonical URLs,
Open Graph tags and the sitemap point at the right origin. It falls back to the
production URL in `src/constants/site.ts`.

## Architecture

```
src/
├─ app/            routes, metadata, sitemap, robots, OG image
├─ components/
│  ├─ ui/          Button, Card, Badge, Sheet, Accordion, Skeleton, Separator
│  ├─ layout/      Container, Section, SectionHeading
│  ├─ motion/      Reveal, Stagger, TextReveal, CountUp, Marquee, Parallax, Magnetic
│  └─ common/      Logo, ArrowLink, JsonLd, social icons
├─ features/
│  ├─ navigation/  Header, MegaMenu, MobileNav, ThemeToggle, Footer
│  └─ home/        one file per home-page section
├─ constants/      ALL site copy, as typed data
├─ animations/     shared variants, easings, viewport config
├─ hooks/  lib/  providers/  types/  styles/
```

Two rules keep this maintainable:

1. **No copy lives in JSX.** Every string comes from `src/constants`. Swapping
   in a CMS later means replacing that folder and nothing else.
2. **No colour lives in a component.** Components use semantic tokens
   (`bg-surface`, `text-fg-muted`, `border-border`) which resolve per theme.
   There is no `dark:` utility anywhere in the codebase.

## Design system

Tokens are CSS-first, split across three files:

| File | Holds |
|---|---|
| `styles/tokens.css` | Theme-independent scales: brand/neutral ramps, fluid type scale, radii, spacing, breakpoints, easings, keyframes |
| `styles/themes.css` | Semantic colour tokens — `:root`/`.dark` carry dark values, `.light` overrides |
| `styles/globals.css` | Base layer, focus/selection styles, reduced-motion rules, custom utilities |

The brand accent `#24B0DC` is Wizard's own cyan, sampled from the live site's
compiled stylesheet. Light mode uses a darkened `#0E6B87` so accent text and
button fills clear WCAG AA on white — the raw cyan only reaches 3.5:1 there.

> **Adding a token?** Register it in `tokens.css`/`themes.css` **and** in the
> `extendTailwindMerge` config in `src/lib/utils.ts`. tailwind-merge only knows
> Tailwind's default scales; an unregistered custom token gets misclassified and
> silently dropped when two utilities collide.

## Theming

`next-themes` with `attribute="class"`, `defaultTheme="dark"`,
`enableSystem={false}`, persisted under `wizard-theme`.

Dark is the true default — a first-time visitor always lands in dark mode. To
honour the OS preference instead, flip `enableSystem` in
`providers/theme-provider.tsx`.

No flash on load: next-themes injects a blocking script before first paint, and
`app/layout.tsx` server-renders `<html class="dark">` to match.

## Motion

Only `opacity` and `transform` are animated. Scroll reveals use Motion's
`whileInView` with `once: true`.

GSAP is used in exactly one place — the pinned horizontal project rail in
`features/home/sections/featured-projects.tsx` — and is dynamically imported, so
it never enters the initial bundle and is never fetched on mobile or under
reduced motion. Lenis publishes its instance on `window.__lenis` so ScrollTrigger
can share its clock.

`prefers-reduced-motion` is honoured at three levels: a global CSS rule
collapsing durations, the `usePrefersReducedMotion` hook that makes motion
components render their final state directly, and feature-level opt-outs
(Lenis off, ScrollTrigger pin off, carousel autoplay off).

## Verified

Measured in headless Chrome against the production build:

- **No horizontal overflow** at 390 / 768 / 1280 / 1440 / 1920 px
- **Theme** — defaults to dark, toggles to light, persists across reload
- **Reduced motion** — zero hidden text blocks; all content renders statically
- **Contrast** — every body-size pair clears AA. Dark: fg 17.8:1, fg-muted
  7.6:1, fg-subtle 5.4:1, button 7.5:1. Light: fg 18.2:1, fg-muted 6.6:1,
  fg-subtle 5.9:1, button 6.1:1
- **SSR** — all section copy is present in the served HTML

## Known gaps

- Only `/` is implemented. Header, footer and sitemap already link to
  `/about-us`, `/services/*`, `/products/*`, `/projects/*` and `/contact`;
  those routes still need to be built.
- `npm audit` reports three advisories in `postcss` and `sharp`, both
  transitive build-time dependencies of Next.js itself. No release of Next 16
  currently avoids them and `audit fix --force` downgrades to a preview build,
  so they are left in place.
