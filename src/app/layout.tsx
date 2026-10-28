import type { Metadata, Viewport } from "next";
import { EB_Garamond, Raleway, Tiro_Devanagari_Sanskrit } from "next/font/google";
import { ShopFrame } from "@/components/layout/shop-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/data/site";
import { orgGraph } from "@/lib/seo";
import { loadStorefrontContent } from "@/lib/storefront";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Sanskrit({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pushpank | Fresh flowers, puja samagri and pandit booking in Lucknow",
    template: "%s | Pushpank",
  },
  description: site.hero.copy,
  applicationName: site.name,
  keywords: [
    "puja samagri Lucknow",
    "fresh flowers delivery Lucknow",
    "pandit booking Lucknow",
    "puja kits online",
    "puja decorations",
    "Pushpank",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Pushpank | Fresh flowers, puja samagri and pandit booking in Lucknow",
    description: site.hero.copy,
    images: [
      {
        url: "/images/generated/hero-altar.jpg",
        width: 1536,
        height: 1024,
        alt: "A brass diya and incense before a gold Om mandala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pushpank | Fresh flowers, puja samagri and pandit booking in Lucknow",
    description: site.hero.copy,
    images: ["/images/generated/hero-altar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#120a0b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await loadStorefrontContent();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${raleway.variable} ${ebGaramond.variable} ${tiro.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-night text-parchment">
        <JsonLd data={orgGraph()} />
        <ShopFrame
          products={content.products}
          categories={content.categories}
          announcements={content.announcements}
        >
          {children}
        </ShopFrame>
      </body>
    </html>
  );
}
