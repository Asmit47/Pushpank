"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartHydrator } from "@/components/cart/cart-hydrator";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { CatalogProvider, type CatalogSnapshot } from "@/lib/catalog-context";

/** Shop chrome stays off the embedded Studio so the editor can use the full window. */
export function ShopFrame({
  children,
  products,
  categories,
  announcements,
}: CatalogSnapshot & { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return children;
  return (
    <MotionProvider>
      <CatalogProvider products={products} categories={categories} announcements={announcements}>
        <div className="grain" aria-hidden />
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
      </CatalogProvider>
    </MotionProvider>
  );
}
