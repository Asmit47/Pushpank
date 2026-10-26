"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById, getVariantPrice } from "@/lib/catalog";
import { computeTotals } from "@/lib/pricing";
import type { Product, Variant } from "@/types";

export type CartItem = { productId: string; variantId: string; quantity: number };

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const MAX_QTY = 20;
const same = (a: CartItem, productId: string, variantId: string) =>
  a.productId === productId && a.variantId === variantId;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      add: (productId, variantId, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => same(i, productId, variantId));
          if (existing) {
            return {
              items: s.items.map((i) =>
                same(i, productId, variantId)
                  ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) }
                  : i,
              ),
            };
          }
          return { items: [...s.items, { productId, variantId, quantity: Math.min(MAX_QTY, quantity) }] };
        }),
      setQuantity: (productId, variantId, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            same(i, productId, variantId)
              ? { ...i, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) }
              : i,
          ),
        })),
      remove: (productId, variantId) =>
        set((s) => ({ items: s.items.filter((i) => !same(i, productId, variantId)) })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: "pushpank-cart-v1",
      partialize: (s) => ({ items: s.items }),
      skipHydration: true,
    },
  ),
);

const subscribeHydration = (cb: () => void) => useCart.persist.onFinishHydration(cb);

/** True once the persisted cart has been read from localStorage (always false during SSR). */
export function useCartHydrated() {
  return useSyncExternalStore(
    subscribeHydration,
    () => useCart.persist.hasHydrated(),
    () => false,
  );
}

export type ResolvedLine = {
  product: Product;
  variant: Variant;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  available: boolean;
};

export function resolveLines(items: CartItem[]): ResolvedLine[] {
  const lines: ResolvedLine[] = [];
  for (const item of items) {
    const product = getProductById(item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    if (!product || !variant) continue;
    const unitPrice = getVariantPrice(variant);
    lines.push({
      product,
      variant,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
      available: variant.inStock,
    });
  }
  return lines;
}

export function summarize(lines: ResolvedLine[]) {
  const payable = lines.filter((l) => l.available);
  return {
    ...computeTotals(payable.map((l) => ({ unitPrice: l.unitPrice, quantity: l.quantity }))),
    count: payable.reduce((n, l) => n + l.quantity, 0),
  };
}
