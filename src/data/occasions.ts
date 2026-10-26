export const occasions = [
  {
    slug: "diwali",
    name: "Diwali",
    hindi: "दीपावली",
    image: { src: "/images/placeholder/cat-festival.jpg", alt: "Rows of lit diyas" },
  },
  {
    slug: "navratri",
    name: "Navratri",
    hindi: "नवरात्रि",
    image: { src: "/images/placeholder/cat-flowers.jpg", alt: "Marigold garlands for Navratri" },
  },
  {
    slug: "griha-pravesh",
    name: "Griha Pravesh",
    hindi: "गृह प्रवेश",
    image: { src: "/images/placeholder/s-griha-pravesh.jpg", alt: "Marigold toran at a doorway" },
  },
  {
    slug: "daily-puja",
    name: "Daily Puja",
    hindi: "नित्य पूजा",
    image: { src: "/images/placeholder/cat-samagri.jpg", alt: "Daily puja samagri" },
  },
  {
    slug: "weddings",
    name: "Weddings",
    hindi: "विवाह",
    image: { src: "/images/placeholder/p-rose-petals.jpg", alt: "Rose petals for a wedding ritual" },
  },
  {
    slug: "karwa-chauth",
    name: "Karwa Chauth",
    hindi: "करवा चौथ",
    image: { src: "/images/placeholder/cat-gifts.jpg", alt: "A festive thali arrangement" },
  },
  {
    slug: "chhath",
    name: "Chhath",
    hindi: "छठ",
    image: { src: "/images/placeholder/p-marigold-garland.jpg", alt: "Marigolds offered at Chhath" },
  },
] as const;

export type OccasionSlug = (typeof occasions)[number]["slug"];
