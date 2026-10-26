import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllProducts, getCategories, getServices } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
  return [
    ...staticPaths.map((p) => ({ url: url(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...getCategories().map((c) => ({ url: url(`/collections/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getAllProducts().map((p) => ({ url: url(`/products/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getServices().map((s) => ({ url: url(`/puja-services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
