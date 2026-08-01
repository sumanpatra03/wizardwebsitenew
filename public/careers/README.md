# Careers image

Drop one image here and it appears automatically — **no code change**.

`features/home/sections/careers.tsx` checks this folder at build time. Without
a file the section falls back to a generated gradient panel, so it is never
broken.

## Filename

`team.jpg` — `.avif`, `.webp`, `.jpg`, `.jpeg` and `.png` all work; the first
found wins in that order. Then run `npm run build`.

> **Replacing an image that is already live?** Delete `.next/cache/images`
> first. Next's image optimizer caches its output keyed on the *URL*, not the
> file contents, so overwriting in place keeps serving the old copy:
>
> ```bash
> rm -rf .next/cache/images && npm run build
> ```

## Specification

This one is different from the other two sets — it starts **full-screen** and
scales down as you scroll, so it is the largest image on the site.

- **16:9**, landscape
- **2560×1440 or larger.** It renders edge-to-edge on an ultra-wide display
- No text, no logos, no watermarks
- **Keep the subject roughly centre-left.** As the panel shrinks it crops
  toward the left of the frame, so anything important on the right is lost
- Works under a dark scrim, so a naturally bright image is fine

## Prompt

Same house style as `public/cards/` and `public/services/` so all three sets
read as one system. Also stored as `imagePrompt` in `src/constants/careers.ts`.

> Cinematic wide shot of a modern open-plan technology office at blue hour, a
> diverse team collaborating around a lit table, floor-to-ceiling windows with
> a city skyline behind, cyan and warm amber light against deep charcoal,
> volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no
> logos
