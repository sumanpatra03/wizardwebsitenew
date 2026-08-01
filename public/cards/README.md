# Card photography

Drop the five images here and they appear automatically — **no code change**.

`features/home/sections/industries.tsx` checks this folder at build time and
switches a card from its generated CSS artwork to the real photograph the
moment a matching file exists. A card with no file keeps the fallback, so the
section is never half-broken while you are still supplying images.

## Filenames

The name must match the card `id` in `src/constants/industries.ts`:

| File | Card |
|---|---|
| `enterprise.jpg` | Enterprise — Manufacturing & FMCG |
| `government.jpg` | Public Sector — Government & Culture |
| `education.jpg` | Education — Learning Platforms |
| `healthcare.jpg` | Healthcare — Clinical Systems |
| `commerce.jpg` | Retail & Commerce — Commerce Platforms |

`.avif`, `.webp`, `.jpg`, `.jpeg` and `.png` all work; the first found wins in
that order. Then run `npm run build`.

## Specification

- **16:9**, landscape
- **1920×1080 or larger** — panels render up to ~950 px wide on an expanded
  ultra-wide card, and the image scales to 1.1 on hover
- No text, no logos, no watermarks
- Keep the **lower third visually calm**. The title, description and CTA sit
  there over a gradient scrim; a busy bottom edge fights the copy

Next.js optimises and lazy-loads these automatically, so ship the highest
quality you have rather than pre-compressing.

## Prompts

Written to be pasted straight into Midjourney, DALL·E or Firefly. They share a
deliberate house style — cinematic, cyan key light, deep charcoal, shallow
depth of field — so the five read as one set. Keep that trailing clause if you
reword anything.

These are the same strings stored as `imagePrompt` on each card in
`src/constants/industries.ts`; if you change a prompt, update it there too so
the artwork can be regenerated consistently later.

### `enterprise.jpg`

> Cinematic wide shot of a modern manufacturing control room at night,
> engineers silhouetted against large data screens, volumetric haze, cyan and
> teal key light against deep charcoal, shallow depth of field, anamorphic lens
> flare, photorealistic, 16:9, no text, no logos

### `government.jpg`

> Cinematic interior of a contemporary museum gallery at dusk, sweeping
> architectural curves, a lone visitor at an interactive display, cyan accent
> lighting against warm stone, volumetric light shafts, shallow depth of field,
> photorealistic, 16:9, no text, no logos

### `education.jpg`

> Cinematic shot of a modern university study space at blue hour, students
> working at illuminated desks, floating translucent interface panels, cyan and
> soft amber light, deep charcoal background, shallow depth of field,
> photorealistic, 16:9, no text, no logos

### `healthcare.jpg`

> Cinematic wide shot of a modern hospital corridor at night, clinician walking
> away from camera, soft cyan monitor glow, clean minimal architecture,
> volumetric haze, shallow depth of field, cool desaturated grade,
> photorealistic, 16:9, no text, no logos

### `commerce.jpg`

> Cinematic shot of a premium retail interior at night, minimal product plinths
> lit from above, glossy reflective floor, cyan rim light against deep
> charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no
> text, no logos
