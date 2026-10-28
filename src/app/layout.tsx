import type { Metadata, Viewport } from "next";
import { EB_Garamond, Raleway, Tiro_Devanagari_Sanskrit } from "next/font/google";
import { CartHydrator } from "@/components/cart/cart-hydrator";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/data/site";
import { orgGraph } from "@/lib/seo";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${raleway.variable} ${ebGaramond.variable} ${tiro.variable}`}>
      <body className="flex min-h-dvh flex-col bg-night text-parchment">
        <JsonLd data={orgGraph()} />
        <div className="grain" aria-hidden />
        <MotionProvider>
          <CartHydrator />
          <a
            href="#main"
            className="sr-only z-[var(--z-skip)] rounded-full bg-gold px-4 py-2 text-parchment focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions />
        </MotionProvider>
      </body>
    </html>
  );
}
