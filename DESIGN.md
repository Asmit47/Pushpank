# Pushpank design system

Reading this as: a premium devotional store and service site for Lucknow households, with a temple-at-night language, leaning toward Tailwind v4 tokens, a serif display face, and a single WebGL-ready hero.

Dials: layout variety 7, motion 7, density 4.

The serif is justified because the brand is heritage and editorial (temple, mantra, manuscript), not a generic luxury default. Cormorant Garamond is the display face. Raleway is the UI face. Tiro Devanagari Sanskrit is used only for Hindi.

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

Type is fluid (clamp based) through two utility classes:

- `.display-hero`: clamp 2.6rem to 4.6rem, leading 1.04. Hero h1 and page-level statements only.
- `.display-section`: clamp 1.85rem to 2.6rem, leading 1.1. Every section heading and page h1. Applied by `SectionHeading` and `ContentPage`.
- Body: Raleway 1rem, leading 1.7 globally set on `body` (lining numerals forced via `lnum`), max 65ch where prose.
- Hindi: Tiro Devanagari Sanskrit, via `.mantra`, for watermark, marquee, and one-word labels.
- `.eyebrow`: the one uppercase tracking label, with a gold hairline before it (`.eyebrow-center` adds one after). At most one eyebrow per section.

Italic display words that contain y, g, j, p or q use `leading-[1.1]` and a little bottom padding so descenders are not clipped. The hero uses an italic accent word (`puja`).

Hindi that is decoration is `aria-hidden` and `lang="hi"`. Hindi that is a real label (collection names) is readable text.

## Shape

- Buttons and chips: full pill.
- Cards and panels: 20px (`rounded-[20px]`).
- Inputs: 12px (`rounded-xl`).

Do not mix a second radius system.

## Layout rhythm

Home sections sit on one vertical rhythm: `py-16 lg:py-20` (breathing sections) or `py-16 lg:py-24` (major pivots such as the puja and arrangements sections). Section backgrounds alternate between `night`, `sanctum/60`, `maroon-900/40`, and `.sanctum-glow`. The header is two bars maximum: the slim TopStrip (announcement + phone + track) and the main nav row.

## Motion

Motion explains hierarchy, sequence, or feedback. It is not decoration for its own sake.

- Hero: staged entrance (eyebrow, headline, sub, CTAs, trust chips at increasing delays) plus a slow scroll parallax and warm glow. `useReducedMotion` disables the parallax.
- Scroll reveal: `Reveal`/`Stagger` arrive in reading order.
- Cards: uniform hover language of lift (`-translate-y-1`), gold border, `.img-zoom` slow image scale, and an ArrowUpRight chip appearing on image tiles.
- Rails: `Rail` adds arrow controls and masked edges; the mantra marquee pauses on hover.
- Header shrink: the TopStrip yields space to the page; the border warms to gold/25.
- One marquee on the home page only.

`prefers-reduced-motion` collapses loops, the reviews ring, and the marquee to a static state.

Scroll position uses Motion `useScroll`. No `window` scroll listeners.

## Mantra layer

Opacity 4 to 6 percent. Phrases: ॐ नमः शिवाय, श्री गणेशाय नमः, सर्वे भवन्तु सुखिनः, ॐ शान्तिः शान्तिः शान्तिः.

At most one eyebrow (small uppercase tracking label) per section. Hindi one-word labels count toward that budget.

## Components

- Spotlight card: a gold edge follows the pointer. Used for products, rituals, and pandits.
- Magnetic primary buttons use motion values, not React state.
- Product cards are 4:5, swap to a second image on hover, price row above a hairline-divided action row.
- Section heading: eyebrow + serif display title (optional Hindi accent word) + short description + optional trailing action.
- Rail: snap-scroll product rail with arrow buttons on large screens.
- Loading uses a diya-flicker skeleton, not a spinner.

## SEO

- Root metadata: title template, description, keywords, Open Graph (with image), Twitter card, robots directives with `max-image-preview: large`.
- JSON-LD graph on every page: Organization, Store, WebSite (with SearchAction) rendered in `layout.tsx`.
- Detail pages add their own: Product (existing), Service (`serviceSchema`), Person (`personSchema`), FAQPage.
- `Breadcrumbs` renders a visible trail plus a BreadcrumbList schema.
- All canonical routes: `alternates.canonical` per page; sitemap and robots configured in `src/app`.

## Imagery

Photography sits on a dark set: brass on maroon silk, warm side light. Placeholder catalogue copy stays marked as placeholder. Reviews are never invented. Google is the only review source.

## Pre-flight

- No em dashes or en dashes in visible copy.
- One accent (gold) across the page.
- One radius system.
- Buttons readable, labels on one line.
- Form labels above fields, errors below, contrast on night.
- Hero: headline with one italic accent word, subtext at most 20 words, two CTAs, three trust chips, no scroll cue.
- At most one marquee.
- Reduced motion and a non-WebGL poster.
- Google attribution on any review that is shown.
