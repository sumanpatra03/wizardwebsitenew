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

## Brand assets

| File | What it is |
|---|---|
| `public/wizard-logo.png` | The official lockup, as published on wizardcomm.net (182×57) |
| `public/wizard-logo-dark.png` | Reversed build for dark backgrounds — generated from the original |
| `public/hero-capabilities.png` | The capabilities illustration from wizardcomm.net (636×562) |
| `src/app/icon.png` | Favicon: the logo mark on a dark rounded tile |

The logo has exactly two inks: `#404041` neutral and `#1BB3DF` brand cyan. The
reversed build lifts only the neutral ink to the foreground colour and leaves
the cyan untouched, so the mark keeps its colour on a dark canvas. Alpha is
preserved, so anti-aliased edges stay smooth.

`components/common/logo.tsx` ships both and swaps them with a CSS rule on
`data-logo-theme` rather than `useTheme` — the theme class is on `<html>`
before first paint, so the right artwork is chosen with no client render and
no flash. Both are `unoptimized`: re-encoding a two-colour PNG to lossy WebP
smears the flat edges and saves nothing.

> **The source artwork is low resolution.** 182×57 is the largest the company
> publishes — the 512×512 file on their server is an upscaled crop, not a true
> original. Render sizes in `logo.tsx` are capped at ~102 px wide to stay near
> 2x on retina. **Drop in an SVG (or a ≥2x PNG pair) and those caps can go.**

The hero illustration is neutral line art drawn for a dark canvas. Rather than
ship a second file, the light theme inverts it with a CSS filter
(`[data-invert-on-light]` in `globals.css`): white maps to near-black and the
mid grey to light grey, preserving the drawing's depth, and `filter` leaves the
alpha channel alone so the transparency survives.

Two things to know about that asset:

- **Its labels are baked into the pixels** ("eLearning Solutions", "Digital
  Commerce", "Web/Mob Apps", "Strategy & Development", "Supply Chain
  Consulting"). They are unselectable and untranslatable, so the `alt` text in
  `hero.tsx` carries them. If those capabilities change, the `alt` has to change
  with the artwork.
- **The original contains a typo** — "Eleaming" rather than "Elearning" — and is
  clipped at its top, right and bottom edges. Both are in the published file, so
  both need fixing at source.

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

`animations/variants.ts` exports **two** viewport configs, and picking the wrong
one is a real bug:

- `viewportOnce` — for a single element. `amount: 0.25` fires when a quarter of
  it has entered.
- `viewportContainer` — for a `<Stagger>` wrapper. Uses `amount: "some"`,
  because a proportional threshold scales with the container. A seven-card grid
  is ~2800 px tall on a phone, so `amount: 0.25` would demand 700 px be visible
  at once and the cards would sit blank on screen until the user scrolled past
  them.

### Grid beams

`components/motion/grid-beams.tsx` runs light pulses along the blueprint grid.
Pure CSS — no JS, no timers — with each beam's line, duration and delay declared
as data at the top of the file. Two sets: `hero` (dense and quick) and `ambient`
(sparser, calmer, dimmed to 70%).

They appear in four places:

| Where | Source |
|---|---|
| Hero | its own parallax layer, `hero` variant |
| Any `<Section tone="default">` | the fixed `PageBackdrop`, `ambient` variant |
| WhyWizard, Footer | their own layer, `ambient` — these paint a background, so the fixed backdrop cannot reach them |

`components/layout/page-backdrop.tsx` is the page-wide layer: `fixed`, so the
grid holds still while content scrolls over it and the beams keep travelling the
whole way down. It shows through only the sections that declare no background of
their own, which is what gives the page its alternating lit/solid rhythm. The
hero sets `bg-bg` specifically to hide it, so you never see two grids stacked.

Two constraints worth knowing before editing:

- **Per-beam timing must be inline `animation-duration`/`animation-delay`
  longhands, not custom properties.** The `--animate-beam-*` tokens compute on
  `:root`, so a `var()` inside them resolves once there and every beam inherits
  identical timing.
- **Beams whose grid line falls off a narrow viewport are breakpoint-gated.** An
  off-screen element still burns animation frames. Counts scale 18 → 28 → 38 →
  42 from mobile to ultrawide.

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
