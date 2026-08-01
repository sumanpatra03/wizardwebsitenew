/**
 * Careers section copy.
 *
 * NOTE: the headline and body below are the wording supplied for this
 * section. They read as generic employer-brand copy rather than anything
 * specific to Wizard — and the brief for this project was to take layout and
 * interaction from Website A but content from Website B. Swapping in a
 * Wizard-native line (something built around "we work as partners, not
 * vendors", or the 20 years and 200+ projects) would sit better with the rest
 * of the page. Everything lives here, so that is a one-line change.
 */
export const CAREERS = {
  eyebrow: "Careers",
  headline: "Build a career that's as exciting as the world we're shaping",
  body: "Grow personally and professionally in a global company that helps you unlock your full potential.",
  cta: { label: "Work with us", href: "/work-with-us" },

  /** Brief for `public/careers/team.*` — see that folder's README. */
  imagePrompt:
    "Cinematic wide shot of a modern open-plan technology office at blue hour, a diverse team collaborating around a lit table, floor-to-ceiling windows with a city skyline behind, cyan and warm amber light against deep charcoal, volumetric haze, shallow depth of field, photorealistic, 16:9, no text, no logos",
} as const;
