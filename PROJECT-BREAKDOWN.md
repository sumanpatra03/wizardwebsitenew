# Wizard Communications — Corporate Website

Work breakdown, as built on 7 August 2026.

A rebuild of wizardcomm.net as a statically prerendered Next.js application.
All copy is transcribed from the live site and held as typed data, so the whole
site is content-swappable without touching a component.

One row per module: each carries a single feature and the single task that
delivers it.

| | |
|---|---|
| **Package** | `wizard` v0.1.0 (private) |
| **Framework** | Next.js 16.2.12 — App Router, React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, token-driven |
| **Source files** | 110 (TS / TSX / CSS) |
| **Pages live** | 11, all statically prerendered |
| **Pages pending** | 17 routes linked but not built |
| **Modules** | 14 — 10 built, 4 not started |

---

## M01 — Design system & theming

**Feature — Token-driven design system**
A single source of truth for colour, type, spacing and motion, split into
theme-independent tokens and a semantic theme layer. Because every value that
flips between light and dark lives in that second layer, no component in the
codebase carries a `dark:` utility.

**Task — Build the design token and theming foundation**
Sample the brand cyan and build the colour ramps, author the nine-step fluid
type scale, split theme-dependent values into a semantic layer, wire theme
switching with a no-flash artwork swap, and verify every body-size pair against
WCAG AA.

**Status** — Done

---

## M02 — Layout & navigation

**Feature — Site frame and navigation**
The shared page frame — container, section rhythm, page hero and fixed backdrop
— plus the header, desktop mega menu, mobile drawer and footer. One component
owns the horizontal gutter and one owns the vertical rhythm, which is what keeps
section edges aligned across the whole site.

**Task — Build the layout primitives and navigation shell**
Build the container and section primitives, the scroll-aware header, the mega
menu and mobile drawer with its body-scroll lock, the footer generated from the
navigation constants, and the shared inner-page hero including its optional
artwork column.

**Status** — Done

---

## M03 — Content layer

**Feature — Typed content layer**
Every string on the site as typed data in one folder, never inline JSX —
fourteen modules covering company facts, navigation, home, services, company
pages, testimonials, products, projects, industries, careers and the technology
list. Swapping in a CMS later means replacing the loaders here and nothing else.

**Task — Model and transcribe all site content**
Define the content model, then transcribe every page of wizardcomm.net into it
verbatim, including the timeline, leadership profiles, gallery captions, client
marks and the six full service pages.

**Status** — Done, except two copy reconciliations: the founding year published
in structured data contradicts the "22+ years" claim, and two strings still say
20 years.

---

## M04 — UI primitives

**Feature — Shared component library**
The small shared vocabulary — button, card, accordion, sheet, badge, separator
and skeleton. Variant-driven, server-safe unless a component genuinely needs
state, and built on Radix wherever accessible behaviour would otherwise have to
be hand-rolled.

**Task — Build the UI primitive set**
Build the seven primitives with their variant matrices, wrap Radix accordion and
dialog with the site's styling, and height-match the skeletons to the components
they stand in for.

**Status** — Done

---

## M05 — Motion system

**Feature — Shared motion system**
Animation as shared infrastructure rather than something each section reinvents:
scroll-triggered reveals, masked title entrances, count-up figures, ambient grid
beams, a pure-CSS marquee, magnetic and parallax effects, and smooth scrolling.
Every piece honours `prefers-reduced-motion` by rendering its final state
directly rather than hiding content.

**Task — Build the animation infrastructure**
Define one shared set of directions, easings and viewport configs, then build the
seven motion components on top of it and expose the smooth-scroll instance
globally so overlays can pause it.

**Status** — Done

---

## M06 — Home page

**Feature — Home page**
Eleven sections in a deliberate order — statement, capability, proof, work,
differentiators, products, voices, call to action — including a seven-card flip
grid, a GSAP-pinned project rail, an autoplaying testimonial carousel with a
persistent pause control, and a scroll-driven careers canvas.

**Task — Build the eleven home sections**
Build each section against the content constants, and code-split the two that
pull extra libraries behind height-matched skeletons so neither sits on the
critical path.

**Status** — Done, except one open decision: the Industries section is built and
populated but its call is commented out.

---

## M07 — Company pages

**Feature — Company section**
Three pages — About Us, Why Wizard and Work With Us — sharing four substantial
components: a scroll-tracked milestone timeline, a masonry photo gallery that
becomes a swipe rail on mobile, a client wall with monochrome and full-colour
variants, and the testimonials carousel.

**Task — Build the three company pages and their shared components**
Build each page from the transcribed content, then build the timeline, gallery,
client wall and carousel so all three pages present the same material
identically.

**Status** — Done

---

## M08 — Services

**Feature — Services section**
An index plus six statically generated detail pages driven by one template.
Every section below the hero is optional, because the source pages genuinely
differ — the template renders what a service defines rather than padding a fixed
skeleton with invented copy.

**Task — Build the services index and six detail pages**
Extract the content and imagery from all six live pages, design a data model with
optional blocks, build the nine section components and the detail template, and
reconcile the service slugs so no navigation link, footer link or sitemap entry
points at a route that does not exist.

**Status** — Done

---

## M09 — SEO & metadata

**Feature — SEO and structured data**
Per-page metadata, canonical URLs, Open Graph and Twitter cards, three JSON-LD
schemas, a generated sitemap, an edge-rendered social image and crawl
directives. All derived from the same constants the visible page renders, so the
markup cannot drift from the content.

**Task — Implement metadata, schema and crawl surfaces**
Build the metadata helper, emit Organization, WebSite and BreadcrumbList schemas
from the shared constants, and generate the sitemap from routes that actually
exist.

**Status** — Done

---

## M10 — Media pipeline

**Feature — Media and asset pipeline**
Ninety-six assets, with conventions that let artwork be supplied one file at a
time: a build-time lookup that swaps in a photograph the moment one appears,
procedural fallbacks so no section is ever half-broken, generation briefs stored
beside the copy they must match, and four folder specs documenting ratios,
provenance and the image-cache trap.

**Task — Build the asset conventions and complete the artwork set**
Build the lookup, fallbacks and image configuration, write the folder
documentation, and finish the outstanding artwork — a re-cut client logo, a
replacement for one unlicensed illustration, compression of the hero sources,
and regeneration of four service heroes from the stored prompts.

**Status** — Conventions done; four artwork items outstanding.

---

## M11 — Contact  *(not started)*

**Feature — Contact**
An enquiry form with validation and a confirmation state, the office address and
direct contact details, a location map, and structured data for the office.

**Task — Build the contact page and enquiry pipeline**
Build the page, the accessible form and its submission handling with spam
protection, and add the office block, map and LocalBusiness schema.

**Status** — Not started. **Highest priority** — every call-to-action on every
page, the header action and two footer columns point at `/contact`, so the
site's entire conversion path currently dead-ends.

---

## M12 — Products  *(not started)*

**Feature — Products section**
An index and four detail pages for the Smart-suite products: Smart Commerce
Suite, Smart Asset Management, Smart Restaurant Management and Smart Restaurant
POS.

**Task — Build the products index and detail pages**
Extend the product data model beyond the name, tagline and feature list it holds
today, build the index and a data-driven detail template following the services
pattern, and source product imagery.

**Status** — Not started. Content already exists in the constants, so this needs
pages rather than a discovery phase.

---

## M13 — Projects & industries  *(not started)*

**Feature — Projects and industries**
A case-study index and detail pages for the five projects, plus the industries
page for the five verticals. Both routes are already linked from the primary
navigation, and the home page's project rail links into detail pages that do not
yet exist.

**Task — Build the case studies and industries page**
Extend the project data model with brief, approach and outcome, build the index
and case-study template, build the industries page from the existing section
component, and resolve whether the Industries section returns to the home page.

**Status** — Not started

---

## M14 — Secondary & legal pages  *(not started)*

**Feature — Secondary and legal pages**
The remaining routes linked from the navigation and footer: a company landing
page, a career page distinct from Work With Us, Who We Serve, and three legal
pages — privacy policy, terms of use and an accessibility statement.

**Task — Build the remaining linked routes**
Build the six pages. The two policy pages need legal copy before implementation;
the accessibility statement can draw on the measured contrast audit the design
system already carries.

**Status** — Not started

---

## Known gap, not a task

Three service slugs on the home page — UX/UI, Maintenance & Support, and the
aliased Software Development — have no detail page of their own, because
wizardcomm.net publishes none. They currently fall back to the services index
rather than linking into a 404. Writing those two pages would be new content,
not a port, so it is a scope decision rather than outstanding work.

---

*Derived by reading the codebase, not from a specification. Module boundaries
reflect how the code is organised today; sanity-check them before using this as
the basis of a plan or statement of work.*
