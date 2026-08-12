# Wizard Communications — Corporate Website

Work breakdown, as built on 12 August 2026.

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
| **Source files** | 141 (TS / TSX / CSS) |
| **Routes live** | 15, prerendering to 53 pages |
| **Pages pending** | None — every linked route is built |
| **Modules** | 19 — all built |

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

## M11 — Contact & enquiry pipeline

**Feature — Contact page and enquiry pipeline**
The site's conversion endpoint: an enquiry form that validates on the server,
reports field-level errors, and confirms in place without a page change; the
office address, phone and email as real links; and structured data describing
the office. The form posts through a Server Action, so it works with JavaScript
disabled and enhances to inline errors and a pending state when it loads.

**Task — Build the contact page and its submission path**
Build the page and the accessible form, write the Server Action with shared
validation rules, wire delivery to a configurable webhook, and add the office
block and organisation schema. Submission fails loudly when the webhook
environment variable is unset rather than reporting a success that never left
the building.

**Status** — Done.

---

## M12 — Products

**Feature — Products section**
An index and four detail pages for the Smart-suite products — Smart Commerce
Suite, Smart Asset Management, Smart Restaurant Management and Smart Restaurant
POS — each with positioning, capability breakdown, who it is for, and a route
back into the enquiry path.

**Task — Build the products index and detail template**
Extend the product data model past the name and feature list it held, build the
index grid and one data-driven detail template that renders whatever sections a
product actually defines, source product imagery, and prerender all five routes.

**Status** — Done. Four detail pages live.

---

## M13 — Projects & case studies

**Feature — Project portfolio**
The full portfolio: an index of 24 projects with category filtering that works
before JavaScript loads, a detail page for every one of them, and eight written
case studies carrying challenge, approach, delivered assets and business impact.
Projects without a written brief render a shorter honest version rather than a
padded template, so no card leaves the site and none invents a claim.

**Task — Build the portfolio index, filter and detail template**
Model the project and case-study data as separate shapes so a project can exist
without a write-up, build the filterable index and the conditional detail
template, recover the original artwork for all 24 entries, and add a build-time
guard that fails the build if a case study has no matching project.

**Status** — Done. 24 detail routes prerendered.

---

## M14 — Industries

**Feature — Industries page**
The sectors the company sells into, each with its own positioning, the problems
that sector brings, and the work already delivered there — with photography
rather than generic stock illustration.

**Task — Build the industries page and its content model**
Model the sector entries, build the page from the existing section components,
source and process the imagery, and link each sector to the services and
projects that serve it.

**Status** — Done.

---

## M15 — Careers & applications

**Feature — Careers and job applications**
A careers page carrying the employer-brand copy, eight current openings as
expandable panels with responsibilities and requirements, and an application
flow: an in-page dialog per role capturing name, email, phone, current location,
notice period and a CV upload, submitted without leaving the listing.

**Task — Build the careers page and application pipeline**
Model the openings, build the accordion listing and the application dialog,
write the Server Action that validates the upload by type and size and delivers
it to a configurable webhook, and raise the request body limit to accept a CV.

**Status** — Done. Eight roles live.

---

## M16 — Form validation & submission layer

**Feature — Shared validation and submission layer**
One set of validation rules used by both the server and the browser, so a field
cannot pass in one place and fail in the other. Fields validate on blur rather
than on every keystroke, re-check as you correct them once they have been
touched, and on submit the first invalid field takes focus. Native browser
validation is suppressed so the messages match the rest of the interface.

**Task — Build the validation module and wire both forms to it**
Write the shared rule set covering name, email, phone, message length and file
type and size; build the blur-validation hook around it; and wire the contact
and application forms to use it on both sides of the request.

**Status** — Done. Covers both forms.

---

## M17 — Team & social proof

**Feature — Leadership and client proof**
The people and the evidence: leadership cards with role, portrait and a full
biography in a dialog, laid out as a carousel that steps from one card to four
across the breakpoints; and a client wall that scrolls the logos of the
corporates and government bodies already served.

**Task — Build the leadership carousel and client wall**
Build the leader card, its biography dialog and the carousel around them; build
the client wall as a reusable scrolling variant; and normalise the logo
treatment so eleven marks drawn in different inks read consistently in both
themes.

**Status** — Done.

---

## M18 — E-Learning service line

**Feature — E-Learning Solutions service**
A seventh service line — content and platform work for education — following
the same page contract as the other six: positioning statement, offerings,
process, outcomes, technology, FAQ and call to action, with its own hero
artwork and metadata.

**Task — Add the E-Learning service and its supporting content**
Write the service entry against the existing page model, source the hero and
supporting imagery, and add it to the services index, the navigation menu, the
related-services rotation and the sitemap.

**Status** — Done. Seven service pages live.

---

## M19 — Legal & accessibility pages

**Feature — Policy and accessibility statements**
The two standing statements the footer links: a privacy policy covering what the
enquiry and application forms collect, why, and how long it is held; and an
accessibility statement declaring the standard targeted, the measures taken and
how to report a barrier — written against the contrast and keyboard behaviour
the design system actually enforces rather than as boilerplate.

**Task — Build the policy and accessibility routes**
Model the policy content as typed sections so it stays editable without touching
components, build both pages on a shared prose template, and reconcile the
footer links with what exists. Terms of Use is deliberately not included: it is a
binding contract that needs drafting by counsel, so the link was removed rather
than filled with invented terms.

**Status** — Done. Terms of Use is a business decision, not outstanding work.

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
