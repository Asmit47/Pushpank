import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { announcements, site } from "@/data/site";
import type { Category, Product } from "@/types";

export type Announcement = { message: string; href?: string };

export type HomepageCampaign = {
  active: boolean;
  title: string;
  description: string;
  collectionSlug: string;
  endsOn?: string;
  terms: string;
  image: { src: string; alt: string };
};

export type StorefrontContent = {
  products: Product[];
  categories: Category[];
  announcements: Announcement[];
  campaign: HomepageCampaign | null;
  source: "sanity" | "static";
};

export function isCampaignVisible(campaign: HomepageCampaign | null, now = new Date()) {
  if (!campaign?.active) return false;
  if (!campaign.endsOn) return true;
  return now <= new Date(`${campaign.endsOn}T23:59:59+05:30`);
}

/** Banners with no dates, or whose window includes `now`, in sort order. */
export function activeAnnouncements(banners: AnnouncementWindow[], now = new Date()): Announcement[] {
  return banners
    .filter((banner) => {
      if (!banner.active || !banner.message.trim()) return false;
      if (banner.startsAt && now < new Date(banner.startsAt)) return false;
      if (banner.endsAt && now > new Date(banner.endsAt)) return false;
      return true;
    })
    .map(({ message, href }) => ({ message, href }));
}

export type AnnouncementWindow = Announcement & {
  active: boolean;
  startsAt?: string;
  endsAt?: string;
};

export function staticCampaign(): HomepageCampaign {
  return {
    active: site.campaign.active,
    title: site.campaign.title,
    description: site.campaign.description,
    collectionSlug: site.campaign.collectionSlug,
    endsOn: site.campaign.endsOn,
    terms: site.campaign.terms,
    image: { src: site.campaign.image.src, alt: site.campaign.image.alt },
  };
}

export function staticAnnouncements(): Announcement[] {
  return announcements.map((message) => ({ message }));
}

export function staticStorefront(): StorefrontContent {
  return {
    products,
    categories,
    announcements: staticAnnouncements(),
    campaign: staticCampaign(),
    source: "static",
  };
}
