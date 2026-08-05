# Service page artwork

Images for the six service detail pages under `/services/<slug>`.

Unlike `public/services/`, nothing here is auto-discovered — each file is named
explicitly in `src/constants/service-pages.ts`. Overwrite a file in place and
the page picks it up on the next build with **no code change**; add a *new*
image and you must point a `image` or `features[].image` field at it.

> **Replacing an image that is already live?** Delete `.next/cache/images`
> first. Next's image optimizer caches its output keyed on the *URL*, not the
> file contents — so overwriting `security.webp` in place leaves the old
> optimized copy being served, and the page keeps showing the previous artwork
> even after a rebuild. This bites on every regeneration:
>
> ```bash
> rm -rf .next/cache/images && npm run build
> ```

## Hero images

One per service, set beside the heading from `lg` up. The filename matches the
service `slug`.

| File | Page |
|---|---|
| `custom-software-development.webp` | Custom Software Development |
| `mobile-app-development.webp` | Mobile App Development |
| `artificial-intelligence.webp` | Artificial Intelligence |
| `security.webp` | Security |
| `digital-marketing.webp` | Digital Marketing |
| `on-demand-hiring.webp` | On Demand Hiring |

### Specification

- **16:9**, landscape. The frame is fixed at 16:9 and never crops tighter, so
  a composition arranged inside the frame keeps its edges — but it *is*
  `object-cover`, so anything other than 16:9 will be trimmed.
- **1600×900 or larger.**
- No text, no logos, no watermarks. Generated type comes out garbled and dates
  the image the moment the copy changes.
- A light gradient is laid over the bottom to tie the image into the page, and
  an accent bloom sits behind the frame — so a slightly darker lower edge is
  fine, but avoid a subject that runs right to the bottom of frame.

`.avif`, `.webp`, `.jpg`, `.jpeg` and `.png` all work, but the path in
`service-pages.ts` must match the extension you ship.

## Supporting images

Also in this folder, referenced by name from the same file. These are not
heroes and have no shared aspect ratio — they render inside `ServiceFeatures`
rows at 16:10, or as a section backdrop.

| File | Used by |
|---|---|
| `ai-custom-genai.webp`, `ai-mvp.webp`, `ai-llm.webp` | Artificial Intelligence — the four illustrated "What We Offer" rows |
| `security-trust.webp` | Security — "Trusted. Proven. Reliable." |
| `seo-on-page.webp`, `seo-off-page.webp`, `seo-local.webp` | Digital Marketing — the SEO deep-dive rows |
| `outcomes-backdrop.webp` | Custom Software Development — backdrop behind the outcomes section |
| `services-index.webp` | Spare; not currently rendered |
| `mobile-app-process.webp`, `hiring-skills.webp` | Spare; not currently rendered |

## Prompts

Written to be pasted straight into Midjourney, DALL·E or Firefly. They share
the house style used by `public/services/README.md` and `public/cards/README.md`
— cinematic, cyan key light, deep charcoal, volumetric haze, shallow depth of
field — so every section of the site reads as one system. Keep that trailing
clause if you reword anything.

These are the same strings stored as `imagePrompt` on each service in
`src/constants/service-pages.ts`; if you change a prompt, update it there too so
the artwork can be regenerated consistently later.

### `custom-software-development.webp`

> Cinematic wide shot of a modern software engineering workspace at blue hour,
> a large wall display behind a standing desk showing softly blurred system
> architecture diagrams with no legible text, an engineer mid-thought tracing a
> connection between two nodes, cyan and teal screen glow against deep
> charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no
> text, no logos

### `mobile-app-development.webp`

> Cinematic close-up of a hand holding a smartphone at blue hour, the screen
> casting cyan light up across the fingers, softly blurred interface panels
> floating above the device with no legible text, a tablet and a second handset
> out of focus behind, deep charcoal background, volumetric haze, shallow depth
> of field, photorealistic, 16:9, no text, no logos

### `artificial-intelligence.webp`

> Cinematic macro shot of a translucent neural sculpture suspended in darkness,
> fine filaments carrying pulses of cyan light between glowing nodes, a faint
> particle field drifting around it, one strand resolving into an orderly line
> at the edge of frame, volumetric haze, shallow depth of field, photorealistic
> render, 16:9, no text, no logos

### `security.webp`

> Cinematic shot of a translucent geometric shield form suspended in a dark
> server aisle, refracting cyan light, rack status lights receding into haze
> behind it, a reflective floor doubling the glow, cool desaturated grade,
> volumetric haze, shallow depth of field, photorealistic render, 16:9, no
> text, no logos

### `digital-marketing.webp`

> Cinematic shot of an abstract ascending data landscape at dusk, glowing cyan
> ridges climbing through dark mist toward a distant horizon, faint concentric
> rings spreading outward across the surface like reach, soft rim light,
> volumetric haze, shallow depth of field, photorealistic render, 16:9, no
> text, no logos

### `on-demand-hiring.webp`

> Cinematic wide shot of a modern collaborative studio at dusk, a small
> engineering team gathered around a lit table with two newcomers just joining
> them, laptops open and a whiteboard softly blurred behind, cyan accent light
> against warm charcoal, volumetric light shafts, shallow depth of field,
> photorealistic, 16:9, no text, no logos

## Provenance

Everything currently in this folder was taken from the live wizardcomm.net
service pages, **except** `custom-software-development.webp`, which came from a
third-party blog (`flexsin.com`) and has no established licence. Replacing it
with a generated image from the prompt above is the cleanest way to close that
question.
