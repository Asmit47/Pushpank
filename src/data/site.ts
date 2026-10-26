/**
 * PLACEHOLDER CONTENT: every value below must be replaced with verified Pushpank
 * information before launch (see blueprint section 16).
 */
export const site = {
  name: "Pushpank",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Fresh flowers, puja essentials and ritual services in Lucknow",
  hero: {
    headline: "Everything for Your Puja, Delivered to Your Door.",
    copy: "Fresh flowers, puja essentials, and ritual services for everyday worship and special occasions.",
  },
  contact: {
    // Placeholders. Set real values through env vars or edit here.
    phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 00000 00000",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@example.com",
    address: "Lucknow, Uttar Pradesh (full address to be added)",
    hours: "Hours to be confirmed",
    isPlaceholder: true,
  },
  social: [] as { label: string; href: string }[],
  reviewsUrl: undefined as string | undefined,
  delivery: {
    city: "Lucknow",
    /** Lucknow PIN codes start with 226. Replace with the real coverage list. */
    serviceablePincodePrefixes: ["226"],
    fee: 60,
    freeDeliveryAbove: 999,
  },
  /** Seasonal block on the home page. Set `active` to false (or let the end date pass) to hide it. */
  campaign: {
    active: true,
    title: "Diwali Collection",
    description:
      "Brass diyas, festive hampers and puja essentials gathered in one place for the festival of lights.",
    collectionSlug: "festival-collections",
    endsOn: "2026-11-09",
    terms: "Offer terms and eligibility to be confirmed.",
    image: { src: "/images/placeholder/cat-festival.jpg", alt: "Lit diyas, marigold garlands and a rangoli" },
  },
} as const;

export function whatsappLink(message = "Hello Pushpank, I have a question.") {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function isCampaignVisible(now = new Date()) {
  if (!site.campaign.active) return false;
  if (!site.campaign.endsOn) return true;
  return now <= new Date(`${site.campaign.endsOn}T23:59:59+05:30`);
}

export const announcements = [
  "Same-day flower delivery across Lucknow",
  "Diwali collection is open",
  "Free delivery above ₹999",
] as const;

export const mainNav = {
  shop: [
    { label: "All Products", href: "/shop", image: "/images/placeholder/cat-samagri.jpg" },
    { label: "Fresh Flowers & Garlands", href: "/collections/fresh-flowers", image: "/images/placeholder/cat-flowers.jpg" },
    { label: "Puja Samagri", href: "/collections/puja-samagri", image: "/images/placeholder/cat-samagri.jpg" },
    { label: "Complete Puja Kits", href: "/collections/puja-kits", image: "/images/placeholder/cat-kits.jpg" },
    { label: "Gifts & Hampers", href: "/collections/gifts-hampers", image: "/images/placeholder/cat-gifts.jpg" },
    { label: "Festival Collections", href: "/collections/festival-collections", image: "/images/placeholder/cat-festival.jpg" },
  ],
  puja: [
    { label: "Browse Rituals", href: "/puja-services", image: "/images/placeholder/s-satyanarayan.jpg" },
    { label: "Book a Pandit", href: "/puja-services#rituals", image: "/images/placeholder/s-griha-pravesh.jpg" },
    { label: "Our Pandits", href: "/pandits", image: "/images/placeholder/s-havan.jpg" },
    { label: "Puja Packages", href: "/puja-services#packages", image: "/images/placeholder/cat-kits.jpg" },
    { label: "Join as a Pandit", href: "/pandits/register", image: "/images/placeholder/p-puja-thali.jpg" },
  ],
  book: [
    { label: "Browse Rituals", href: "/puja-services" },
    { label: "Book a Pandit", href: "/puja-services#rituals" },
    { label: "Our Pandits", href: "/pandits" },
    { label: "Puja Packages", href: "/puja-services#packages" },
    { label: "Join as a Pandit", href: "/pandits/register" },
  ],
  decorations: [
    { label: "Home Puja Decorations", href: "/decorations-events#home-puja-decorations" },
    { label: "Havan Arrangements", href: "/decorations-events#havan-arrangements" },
    { label: "Festival & Event Arrangements", href: "/decorations-events#festival-event-arrangements" },
    { label: "Request a Custom Quote", href: "/decorations-events#quote" },
  ],
  more: [
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Track order", href: "/track" },
  ],
};
