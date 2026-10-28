import { createClient } from "@sanity/client";
import { categories } from "../src/data/categories";
import { products } from "../src/data/products";
import { announcements, site } from "../src/data/site";
import { loadEnvFiles } from "./load-env";

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

function media(src: string, alt: string, key: string) {
  return { _key: key, _type: "media", src, alt };
}

const categoryDocs = categories.map((category, index) => ({
  _id: `category-${category.slug}`,
  _type: "category",
  name: category.name,
  slug: { _type: "slug", current: category.slug },
  hindi: category.hindi,
  description: category.description,
  image: media(category.image.src, category.image.alt, "image"),
  sortOrder: index,
}));

const productDocs = products.map((product) => ({
  _id: product.id,
  _type: "product",
  name: product.name,
  slug: { _type: "slug", current: product.slug },
  shortDescription: product.shortDescription,
  description: product.description,
  collections: product.collections.map((slug, index) => ({
    _key: `collection-${index}`,
    _type: "reference",
    _ref: `category-${slug}`,
  })),
  images: product.images.map((image, index) => media(image.src, image.alt, `image-${index}`)),
  secondaryImage: product.secondaryImage
    ? media(product.secondaryImage.src, product.secondaryImage.alt, "secondary")
    : undefined,
  variants: product.variants.map((variant) => ({
    _key: variant.id,
    variantId: variant.id,
    label: variant.label,
    sku: variant.sku,
    price: variant.price,
    salePrice: variant.salePrice,
    inStock: variant.inStock,
  })),
  inclusions: product.inclusions,
  details: product.details.map((detail, index) => ({ _key: `detail-${index}`, ...detail })),
  storage: product.storage,
  perishable: product.perishable,
  featured: product.featured,
  createdAt: product.createdAt,
  occasions: product.occasions,
  badge: product.badge,
  highlights: product.highlights,
}));

const bannerDocs = announcements.map((message, index) => ({
  _id: `festival-banner-${index + 1}`,
  _type: "festivalBanner",
  message,
  active: true,
  sortOrder: index,
}));

const campaignDoc = {
  _id: "homepageCampaign",
  _type: "homepageCampaign",
  active: site.campaign.active,
  title: site.campaign.title,
  description: site.campaign.description,
  collectionSlug: site.campaign.collectionSlug,
  endsOn: site.campaign.endsOn,
  terms: site.campaign.terms,
  image: media(site.campaign.image.src, site.campaign.image.alt, "image"),
};

async function main() {
  let transaction = client.transaction();
  for (const doc of [...categoryDocs, ...productDocs, ...bannerDocs, campaignDoc]) {
    transaction = transaction.createOrReplace(doc as { _id: string; _type: string });
  }
  await transaction.commit();
  console.log(
    `Seeded ${categoryDocs.length} categories, ${productDocs.length} products, ${bannerDocs.length} banners, and the homepage campaign.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
