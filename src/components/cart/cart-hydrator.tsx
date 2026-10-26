"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

/** Reads the persisted cart from localStorage once on the client (avoids SSR hydration mismatches). */
export function CartHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
