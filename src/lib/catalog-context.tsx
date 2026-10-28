"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Announcement } from "@/lib/storefront-static";
import type { Category, Product } from "@/types";

export type CatalogSnapshot = {
  products: Product[];
  categories: Category[];
  announcements: Announcement[];
};

const EMPTY: CatalogSnapshot = { products: [], categories: [], announcements: [] };

const CatalogContext = createContext<CatalogSnapshot>(EMPTY);

export function CatalogProvider({
  products,
  categories,
  announcements,
  children,
}: CatalogSnapshot & { children: ReactNode }) {
  const value = useMemo(
    () => ({ products, categories, announcements }),
    [products, categories, announcements],
  );
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}
