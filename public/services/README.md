# Service card artwork

Drop the seven images here and they appear automatically — **no code change**.

`features/home/sections/services-grid.tsx` checks this folder at build time and
replaces a card's generated `ServiceArtwork` with the real image the moment a
matching file exists. A card with no file keeps the fallback, so the grid is
never half-broken while you are still supplying images.

## Filenames

The name must match the service `slug` in `src/constants/services.ts`:

| File | Card |
|---|---|
| `software-development.jpg` | Engineering — Software Development |
| `ux-ui.jpg` | Experience Design — UX/UI |
| `artificial-intelligence.jpg` | Intelligence — Artificial Intelligence |
| `on-demand-hiring.jpg` | Talent — On Demand Hiring |
| `maintenance-support.jpg` | Managed Services — Maintenance & Support |
| `security.jpg` | Trust & Safety — Security |
| `digital-marketing.jpg` | Growth — Digital Marketing, SEO |

`.avif`, `.webp`, `.jpg`, `.jpeg` and `.png` all work; the first found wins in
that order. Then run `npm run build`.

> **Replacing an image that is already live?** Delete `.next/cache/images`
> first. Next's image optimizer caches its output keyed on the *URL*, not the
> file contents — so overwriting `security.png` in place leaves the old
> optimized copy being served, and the page keeps showing the previous artwork
> even after a rebuild. This bites on every regeneration:
>
> ```bash
> rm -rf .next/cache/images && npm run build
> ```

## Specification

- **4:3**, landscape. The slot renders around 230×178 px on a desktop card, so
  4:3 crops least — but `object-cover` handles any ratio gracefully, and 16:9
  works fine if that is what your generator gives you.
- **1600×1200 or larger.**
- No text, no logos, no watermarks.
- **Keep the subject centred.** The slot is narrow and the image is cropped to
  fill it, so anything important near an edge will be cut.
- A soft gradient is laid over the bottom of the image to tie it into the card,
  so a busy lower edge is fine here — unlike the `public/cards/` set.

These sit *inside* the card rather than behind it, and they fade out on hover
as the description takes their place. Next.js optimises and lazy-loads them, so
ship the highest quality you have rather than pre-compressing.

## Prompts

Written to be pasted straight into Midjourney, DALL·E or Firefly. They share
the same house style as `public/cards/README.md` — cinematic, cyan key light,
deep charcoal, volumetric haze, shallow depth of field — so both sections read
as one system. Keep that trailing clause if you reword anything.

These are the same strings stored as `imagePrompt` on each service in
`src/constants/services.ts`; if you change a prompt, update it there too so the
artwork can be regenerated consistently later.

### `software-development.jpg`

> Cinematic over-the-shoulder shot of a developer workspace at night, several
> monitors showing softly blurred abstract interface panels with no legible
> text, cyan and teal screen glow against deep charcoal, volumetric haze,
> shallow depth of field, photorealistic, 4:3, no text, no logos

### `ux-ui.jpg`

> Cinematic close-up of a designer desk at blue hour, translucent wireframe
> panels floating above a drawing tablet, stylus in hand, cyan key light
> against deep charcoal, volumetric haze, shallow depth of field,
> photorealistic, 4:3, no text, no logos

### `artificial-intelligence.jpg`

> Cinematic macro shot of a glowing neural network sculpture, translucent nodes
> and filaments suspended in darkness, cyan and teal internal illumination,
> volumetric haze, shallow depth of field, photorealistic render, 4:3, no text,
> no logos

### `on-demand-hiring.jpg`

> Cinematic wide shot of a modern collaborative studio at dusk, a small
> engineering team silhouetted around a lit table, cyan accent light against
> warm charcoal, volumetric light shafts, shallow depth of field,
> photorealistic, 4:3, no text, no logos

### `maintenance-support.jpg`

> Cinematic wide shot of a modern data centre aisle at night, server racks
> receding into darkness with cyan status lights, reflective floor, volumetric
> haze, shallow depth of field, cool desaturated grade, photorealistic, 4:3, no
> text, no logos

### `security.jpg`

> Cinematic shot of a translucent geometric shield form suspended in darkness,
> refracting cyan light, a fine particle field drifting around it, volumetric
> haze, shallow depth of field, photorealistic render, 4:3, no text, no logos

### `digital-marketing.jpg`

> Cinematic shot of an abstract ascending data landscape, glowing cyan ridges
> rising through dark mist toward the horizon, soft rim light, volumetric haze,
> shallow depth of field, photorealistic render, 4:3, no text, no logos
