import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is intentionally off: the MVP uses statically generated
  // pages over typed mock data and client-side cart state, so there is no
  // runtime data that needs component-level caching yet.
  cacheComponents: false,
  partialPrefetching: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
