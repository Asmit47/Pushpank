import type { Category } from "@/types";

// PLACEHOLDER: only list categories Pushpank actually sells.
export const categories: Category[] = [
  {
    slug: "fresh-flowers",
    name: "Fresh Flowers & Garlands",
    hindi: "पुष्प",
    description: "Garlands, loose petals and flowers for daily worship and special pujas.",
    image: { src: "/images/placeholder/cat-flowers.jpg", alt: "Fresh marigold garland" },
  },
  {
    slug: "puja-samagri",
    name: "Puja Samagri",
    hindi: "सामग्री",
    description: "Brassware, incense and everyday ritual essentials.",
    image: { src: "/images/placeholder/cat-samagri.jpg", alt: "Turmeric, kumkum, sacred thread and cotton wicks" },
  },
  {
    slug: "puja-kits",
    name: "Complete Puja Kits",
    hindi: "पूजा किट",
    description: "Everything for a specific puja, packed together with a clear contents list.",
    image: { src: "/images/placeholder/cat-kits.jpg", alt: "Puja kit in an open box with a maroon ribbon" },
  },
  {
    slug: "gifts-hampers",
    name: "Gifts & Hampers",
    hindi: "उपहार",
    description: "Thoughtfully assembled hampers for festivals and housewarmings.",
    image: { src: "/images/placeholder/cat-gifts.jpg", alt: "Festive gift hamper with brass diyas and sweets" },
  },
  {
    slug: "festival-collections",
    name: "Festival Collections",
    hindi: "उत्सव",
    description: "Seasonal selections for Diwali and other festivals.",
    image: { src: "/images/placeholder/cat-festival.jpg", alt: "Rows of lit diyas around a flower rangoli" },
  },
];
