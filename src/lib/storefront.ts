import "server-only";

import imageUrlBuilder from "@sanity/image-url";
import { cache } from "react";
import { client, sanityConfigured } from "@/sanity/client";
import type { Category, Product } from "@/types";
import {
  activeAnnouncements,
  staticAnnouncements,
  staticStorefront,
  type AnnouncementWindow,
  type HomepageCampaign,
  type StorefrontContent,
} from "./storefront-static";

const QUERY = `{
  "products": *[_type == "product"]{
    _id,
    "slug": slug.current,
    name,
    shortDescription,
    description,
    "collections": collections[]->slug.current,
    images[]{ src, alt, "asset": image.asset },
    secondaryImage{ src, alt, "asset": image.asset },
    variants[]{ variantId, label, sku, price, salePrice, inStock },
    inclusions,
    details[]{ label, value },
    storage,
    perishable,
    featured,
    createdAt,
    occasions,
    badge,
    highlights
  },
  "categories": *[_type == "category"]|order(sortOrder asc){
    "slug": slug.current,
    name,
    hindi,
    description,
    image{ src, alt, "asset": image.asset }
  },
  "banners": *[_type == "festivalBanner"]|order(sortOrder asc){
    message, href, startsAt, endsAt, active
  },
  "campaign": *[_id == "homepageCampaign"][0]{
    active, title, description, terms, endsOn, collectionSlug,
    image{ src, alt, "asset": image.asset }
  }
}`;

const BADGES = ["Bestseller", "New", "Same-day", "Festive"] as const;

type RawImage = { src?: string; alt?: string; asset?: { _ref?: string } | null };

function imageSrc(image: RawImage | null | undefined, builder: ReturnType<typeof imageUrlBuilder> | null) {
  const alt = image?.alt?.trim() || "";
  if (image?.asset?._ref && builder) {
    return { src: builder.image(image).width(1600).auto("format").url(), alt };
  }
  if (image?.src) return { src: image.src, alt };
  return null;
}

function asBadge(value: unknown): Product["badge"] {
  return BADGES.find((badge) => badge === value);
}

function mapProduct(raw: RawProduct, builder: ReturnType<typeof imageUrlBuilder> | null): Product | null {
  if (!raw?.slug || !raw.name) return null;
  const images = (raw.images ?? []).map((image) => imageSrc(image, builder)).filter((image) => image !== null);
  if (!images.length) return null;
  const variants = (raw.variants ?? [])
    .filter((variant) => variant?.variantId && variant.label && variant.sku && typeof variant.price === "number")
    .map((variant) => ({
      id: variant.variantId,
      label: variant.label,
      sku: variant.sku,
      price: variant.price,
      salePrice: typeof variant.salePrice === "number" ? variant.salePrice : undefined,
      inStock: variant.inStock !== false,
    }));
  if (!variants.length) return null;
  const secondary = imageSrc(raw.secondaryImage, builder);
  return {
    id: raw._id,
    slug: raw.slug,
    name: raw.name,
    shortDescription: raw.shortDescription || "",
    description: raw.description || "",
    collections: (raw.collections ?? []).filter((slug): slug is string => Boolean(slug)),
    images,
    secondaryImage: secondary ?? undefined,
    variants,
    inclusions: raw.inclusions ?? [],
    details: (raw.details ?? []).filter((detail) => detail?.label && detail.value),
    storage: raw.storage || undefined,
    perishable: Boolean(raw.perishable),
    featured: Boolean(raw.featured),
    createdAt: raw.createdAt || "2026-01-01",
    occasions: raw.occasions ?? [],
    badge: asBadge(raw.badge),
    highlights: raw.highlights?.length ? raw.highlights : undefined,
  };
}

function mapCategory(raw: RawCategory, builder: ReturnType<typeof imageUrlBuilder> | null): Category | null {
  const image = imageSrc(raw?.image, builder);
  if (!raw?.slug || !raw.name || !image) return null;
  return {
    slug: raw.slug,
    name: raw.name,
    hindi: raw.hindi || undefined,
    description: raw.description || "",
    image,
  };
}

type RawProduct = {
  _id: string;
  slug?: string;
  name?: string;
  shortDescription?: string;
  description?: string;
  collections?: (string | null)[];
  images?: RawImage[];
  secondaryImage?: RawImage | null;
  variants?: { variantId: string; label: string; sku: string; price: number; salePrice?: number; inStock?: boolean }[];
  inclusions?: string[];
  details?: { label: string; value: string }[];
  storage?: string;
  perishable?: boolean;
  featured?: boolean;
  createdAt?: string;
  occasions?: string[];
  badge?: string;
  highlights?: string[];
};

type RawCategory = {
  slug?: string;
  name?: string;
  hindi?: string;
  description?: string;
  image?: RawImage | null;
};

type RawContent = {
  products?: RawProduct[];
  categories?: RawCategory[];
  banners?: AnnouncementWindow[];
  campaign?: (Omit<HomepageCampaign, "image" | "active" | "terms"> & {
    active?: boolean;
    terms?: string;
    image?: RawImage | null;
  }) | null;
};

async function readSanity(): Promise<StorefrontContent> {
  if (!client) return staticStorefront();
  const builder = imageUrlBuilder(client);
  const raw = await client.fetch<RawContent>(QUERY, {}, { next: { revalidate: 60 } });
  const products = (raw.products ?? []).map((product) => mapProduct(product, builder)).filter((product) => product !== null);
  const categories = (raw.categories ?? []).map((category) => mapCategory(category, builder)).filter((category) => category !== null);
  const announcements = activeAnnouncements(
    (raw.banners ?? []).map((banner) => ({
      message: banner.message || "",
      href: banner.href || undefined,
      active: banner.active !== false,
      startsAt: banner.startsAt,
      endsAt: banner.endsAt,
    })),
  );
  const campaignImage = imageSrc(raw.campaign?.image, builder);
  const campaign: HomepageCampaign | null =
    raw.campaign?.title && campaignImage
      ? {
          active: raw.campaign.active !== false,
          title: raw.campaign.title,
          description: raw.campaign.description || "",
          collectionSlug: raw.campaign.collectionSlug || "festival-collections",
          endsOn: raw.campaign.endsOn,
          terms: raw.campaign.terms || "",
          image: campaignImage,
        }
      : null;

  return {
    products,
    categories,
    announcements: announcements.length ? announcements : staticAnnouncements(),
    campaign,
    source: "sanity",
  };
}

/**
 * Catalogue, festival strip, and homepage campaign.
 * Uses the files in src/data when Sanity is not configured or cannot be reached,
 * so the storefront still renders before the project is seeded.
 */
export const loadStorefrontContent = cache(async (): Promise<StorefrontContent> => {
  if (!sanityConfigured || !client) return staticStorefront();
  try {
    return await readSanity();
  } catch (error) {
    console.error("Sanity catalogue could not be loaded. Using the built-in catalogue.", error);
    return staticStorefront();
  }
});
