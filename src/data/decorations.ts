import type { DecorationCategory } from "@/types";

/** PLACEHOLDER: replace with real setups and photographs. Pricing is quoted per request. */
export const decorationCategories: DecorationCategory[] = [
  {
    slug: "home-puja-decorations",
    name: "Home Puja Decorations",
    description: "Floral backdrops, toran and lamp arrangements for a home puja corner or a festival at home.",
    image: { src: "/images/placeholder/d-home-decor.jpg", alt: "Floral wall decoration behind a home puja table" },
    examples: ["Puja corner flowers", "Door toran", "Rangoli with petals"],
  },
  {
    slug: "havan-arrangements",
    name: "Havan Arrangements",
    description: "Kund setup, seating and samagri arrangement so the havan runs smoothly.",
    image: { src: "/images/placeholder/s-havan.jpg", alt: "Havan kund with samidha and samagri" },
    examples: ["Kund and samidha setup", "Seating layout", "Samagri arrangement"],
  },
  {
    slug: "festival-event-arrangements",
    name: "Festival & Event Arrangements",
    description: "Larger floral and lighting setups for festivals, community pujas and family functions.",
    image: { src: "/images/placeholder/d-event-setup.jpg", alt: "Floral stage with marigold curtains and brass urlis" },
    examples: ["Floral mandap or backdrop", "Marigold curtains", "Urli and diya arrangements"],
  },
  {
    slug: "custom-arrangements",
    name: "Custom Arrangements",
    description: "Have something specific in mind? Share a reference and we will tell you what is possible.",
    image: { src: "/images/placeholder/cat-festival.jpg", alt: "Diyas and flower rangoli" },
    examples: ["Reference-based designs", "Theme or colour palettes"],
  },
];

export const decorationSteps = [
  { title: "Share your plan", body: "Tell us the occasion, date, venue and what you have in mind." },
  { title: "We review", body: "Our team checks feasibility and prepares a quote based on venue, materials and scope." },
  { title: "Confirm the quote", body: "Once you agree on the quote, the service is confirmed. A request alone does not confirm it." },
  { title: "Setup on the day", body: "Our team arrives, sets up and leaves the space ready for your event." },
];

export const eventTypes = [
  "Home puja",
  "Griha Pravesh",
  "Havan",
  "Festival at home",
  "Community or society event",
  "Wedding or family function",
  "Other",
];

export const decorationServiceOptions = [
  "Flower decoration",
  "Toran and garlands",
  "Rangoli",
  "Lighting and diyas",
  "Havan setup",
  "Stage or mandap",
];
