import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { pandits } from "@/data/pandits";
import { getServices } from "@/lib/catalog";
import { getAllProducts, getCategories } from "@/lib/catalog-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${site.url}${path}`;
  const staticPaths = [
    "/",
    "/shop",
    "/puja-services",
    "/decorations-events",
    "/about",
    "/reviews",
    "/faq",
    "/contact",
    "/shipping-returns",
    "/privacy",
    "/terms",
    "/pandits",
    "/pandits/register",
  ];
  return [
    ...staticPaths.map((p) => ({ url: url(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...(await getCategories()).map((c) => ({ url: url(`/collections/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...(await getAllProducts()).map((p) => ({ url: url(`/products/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getServices().map((s) => ({ url: url(`/puja-services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...pandits.map((p) => ({ url: url(`/pandits/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
