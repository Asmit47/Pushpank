import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartHydrator } from "@/components/cart/cart-hydrator";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pushpank | Fresh flowers, puja samagri and pandit booking in Lucknow",
    template: "%s | Pushpank",
  },
  description: site.hero.copy,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Pushpank",
    description: site.hero.copy,
    images: [{ url: "/images/placeholder/hero.jpg", width: 768, height: 1024 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <CartHydrator />
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-maroon px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
