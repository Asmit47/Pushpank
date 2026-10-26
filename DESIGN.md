# Pushpank design system

Reading this as: a premium devotional store and service site for Lucknow households, with a temple-at-night language, leaning toward Tailwind v4 tokens, a serif display face, and a single WebGL hero.

Dials: layout variety 7, motion 7, density 4.

The serif is justified because the brand is heritage and editorial (temple, mantra, manuscript), not a generic luxury default. Cormorant Garamond is the display face. Manrope is the UI face. Tiro Devanagari Sanskrit is used only for Hindi.

## Palette

One UI accent: gold. Everything interactive (links, focus, primary buttons, prices) uses gold. Supporting colours appear in photography, the 3D scene, and semantic states only.

| Token | Hex | Role |
| --- | --- | --- |
| night | `#120a0b` | Page background |
| sanctum | `#1c0e11` | Raised cards |
| maroon-900 | `#2a1117` | Panels, footer |
| gold | `#d6a84f` | Accent, CTAs, focus |
| gold-soft | `#e9cf94` | Accent text on night |
| parchment | `#f3e6cf` | Body text |
| muted | `#cbbba3` | Secondary text |
| line | `#3d2c2a` | Hairlines |
| sindoor | `#c4473a` | Errors, sacred red in imagery |
| marigold | `#f0a12a` | Flame and flowers in the scene |
| tulsi | `#7dae93` | Success and WhatsApp |
| lotus | `#d98a9a` | Flower highlight in imagery |

No pure black and no pure white as large fills. Contrast target is WCAG AA for body text on `night`.

The page is dark only. Sections do not flip to a light theme.

## Type

| Use | Face | Size |
| --- | --- | --- |
| Display | Cormorant Garamond 500/600/700, italic where needed | 2.5rem to 4.5rem, leading 1.05 |
| Body | Manrope | 1rem, leading relaxed, max 65ch |
| Hindi | Tiro Devanagari Sanskrit | watermark, marquee, one-word labels |

Italic display words that contain y, g, j, p or q use `leading-[1.1]` and a little bottom padding so descenders are not clipped.

Hindi that is decoration is `aria-hidden` and `lang="hi"`. Hindi that is a real label (collection names) is readable text.

## Shape

- Buttons and chips: full pill.
- Cards and panels: 20px (`rounded-[20px]`).
- Inputs: 12px (`rounded-xl`).

Do not mix a second radius system.

## Motion

Motion explains hierarchy, sequence, or feedback. It is not decoration for its own sake.

- Hero flame, smoke, and cursor sway: the sanctum feels alive.
- Scroll reveal: sections arrive in reading order.
- Add to cart: a short petal burst confirms the action.
- Reviews ring: the Google reviews are the content; rotation lets them be read one at a time.
- Header shrink: the announcement and utility bars yield space to the page.
- One marquee on the home page only.

`prefers-reduced-motion` collapses loops, the 3D scene, the reviews ring, and the marquee to a static poster or a snap row.

Scroll position uses Motion `useScroll` or CSS scroll-driven animation. No `window` scroll listeners.

## Mantra layer

Opacity 4 to 6 percent. Phrases: ॐ नमः शिवाय, श्री गणेशाय नमः, सर्वे भवन्तु सुखिनः, ॐ शान्तिः शान्तिः शान्तिः, and the Gayatri opening on the hero ring.

At most one eyebrow (small uppercase tracking label) per three sections. Hindi one-word labels count toward that budget.

## 3D hero

Built in code with Three.js (lathe profiles, no model files). A brass thali, a diya, a flickering flame with bloom, incense smoke, embers, petals, and a slow Devanagari ring.

The diya starts unlit. A tap lights it. A click elsewhere showers petals. The camera follows the pointer slightly. A temple bell is off until the visitor turns sound on.

A poster image paints first. The canvas fades in. Phones use a lower pixel ratio and fewer particles. No WebGL or reduced motion shows the poster only.

## Components

- Spotlight card: a gold edge follows the pointer. Used for products, rituals, and pandits.
- Magnetic primary buttons use motion values, not React state.
- Product cards are 4:5, swap to a second image on hover, and offer quick add plus quick view.
- Loading uses a diya-flicker skeleton, not a spinner.

## Imagery

Photography sits on a dark set: brass on maroon silk, warm side light. Placeholder catalogue copy stays marked as placeholder. Reviews are never invented. Google is the only review source.

## Pre-flight

- No em dashes or en dashes in visible copy.
- One accent (gold) across the page.
- One radius system.
- Buttons readable, labels on one line.
- Form labels above fields, errors below, contrast on night.
- Hero: two-line headline, subtext at most 20 words, two CTAs, no scroll cue.
- At most one marquee.
- Reduced motion and a non-WebGL poster.
- Google attribution on any review that is shown.
