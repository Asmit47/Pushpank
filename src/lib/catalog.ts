import { decorationCategories } from "@/data/decorations";
import { occasions } from "@/data/occasions";
import { pandits } from "@/data/pandits";
import { services } from "@/data/services";
import type { Category, Product, Service, Variant } from "@/types";

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
] as const;
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const PRICE_RANGES = [
  { value: "under-250", label: "Under ₹250", min: 0, max: 249 },
  { value: "250-1000", label: "₹250 to ₹1,000", min: 250, max: 1000 },
  { value: "above-1000", label: "Above ₹1,000", min: 1001, max: Infinity },
] as const;

export function getVariantPrice(v: Variant) {
  return v.salePrice ?? v.price;
}

export function findProduct(products: Product[], slug: string) {
  return products.find((p) => p.slug === slug);
}

export function findProductById(products: Product[], id: string) {
  return products.find((p) => p.id === id);
}

export function findCategory(categories: Category[], slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getServices(): Service[] {
  return services;
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getPrimaryCategory(categories: Category[], product: Product) {
  return findCategory(categories, product.collections[0]);
}

export function getFeaturedProducts(products: Product[], limit = 4) {
  return products.filter((p) => p.featured && isProductAvailable(p)).slice(0, limit);
}

export function getRelatedProducts(products: Product[], product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, limit);
}

export function isProductAvailable(p: Product) {
  return p.variants.some((v) => v.inStock);
}

export function getFirstAvailableVariant(p: Product) {
  return p.variants.find((v) => v.inStock);
}

/** The lowest price among in-stock variants (or among all, when nothing is in stock). */
export function getStartingPrice(p: Product) {
  const pool = p.variants.filter((v) => v.inStock);
  const list = pool.length ? pool : p.variants;
  return Math.min(...list.map(getVariantPrice));
}

export type ProductQuery = {
  collection?: string;
  sort?: SortValue;
  price?: string;
  inStock?: boolean;
  q?: string;
  occasion?: string;
};

export function queryProducts(products: Product[], query: ProductQuery): Product[] {
  let list = products.slice();
  if (query.collection) list = list.filter((p) => p.collections.includes(query.collection!));
  if (query.occasion) list = list.filter((p) => p.occasions.includes(query.occasion!));
  if (query.inStock) list = list.filter(isProductAvailable);
  if (query.price) {
    const range = PRICE_RANGES.find((r) => r.value === query.price);
    if (range) {
      list = list.filter((p) => {
        const price = getStartingPrice(p);
        return price >= range.min && price <= range.max;
      });
    }
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }
  switch (query.sort) {
    case "price-asc":
      list.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
      break;
    case "price-desc":
      list.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
      break;
    case "newest":
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    default:
      // Recommended: featured and available first, then newest.
      list.sort((a, b) => {
        const score = (p: Product) => (isProductAvailable(p) ? 2 : 0) + (p.featured ? 1 : 0);
        return score(b) - score(a) || b.createdAt.localeCompare(a.createdAt);
      });
  }
  return list;
}

export function parseSort(value: string | undefined): SortValue {
  return SORT_OPTIONS.some((o) => o.value === value) ? (value as SortValue) : "recommended";
}

// --- Search index (client-side search dialog) ------------------------------

export type SearchEntry = {
  type: "Product" | "Category" | "Puja service" | "Decorations" | "Pandit" | "Occasion" | "Page";
  title: string;
  description: string;
  href: string;
  image?: string;
  price?: number;
  keywords?: string[];
};

export function buildSearchIndex(products: Product[], categories: Category[]): SearchEntry[] {
  return [
    ...products.map<SearchEntry>((p) => ({
      type: "Product",
      title: p.name,
      description: p.shortDescription,
      href: `/products/${p.slug}`,
      image: p.images[0]?.src,
      price: getStartingPrice(p),
    })),
    ...categories.map<SearchEntry>((c) => ({
      type: "Category",
      title: c.name,
      description: c.description,
      href: `/collections/${c.slug}`,
    })),
    ...occasions.map<SearchEntry>((o) => ({
      type: "Occasion",
      title: o.name,
      description: `Essentials and kits for ${o.name}`,
      href: `/shop?occasion=${o.slug}`,
      image: o.image.src,
      keywords: [o.hindi, o.slug],
    })),
    ...services.map<SearchEntry>((s) => ({
      type: "Puja service",
      title: s.name,
      description: s.tagline,
      href: `/puja-services/${s.slug}`,
    })),
    ...decorationCategories.map<SearchEntry>((d) => ({
      type: "Decorations",
      title: d.name,
      description: d.description,
      href: `/decorations-events#${d.slug}`,
      image: d.image.src,
    })),
    ...pandits.map<SearchEntry>((p) => ({
      type: "Pandit",
      title: p.name,
      description: p.title,
      href: `/pandits/${p.slug}`,
      image: p.image.src,
    })),
    ...[
      { title: "Wishlist", description: "Products you saved for later", href: "/wishlist" },
      { title: "About Pushpank", description: "The shop and the people behind it", href: "/about" },
      { title: "Reviews", description: "What customers say on Google", href: "/reviews" },
      { title: "FAQs", description: "Delivery, booking and samagri", href: "/faq" },
      { title: "Contact", description: "Call, WhatsApp or visit", href: "/contact" },
      { title: "Track an order", description: "Look up a reference", href: "/track" },
      { title: "Join as a Pandit", description: "Register to conduct pujas", href: "/pandits/register" },
    ].map<SearchEntry>((p) => ({ type: "Page", ...p })),
  ];
}
