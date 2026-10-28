"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { resolveLines, summarize, useCart, useCartHydrated } from "@/lib/cart-store";
import { useCatalog } from "@/lib/catalog-context";
import { CartLine } from "./cart-line";
import { CartSummary } from "./cart-summary";

export function CartDrawer() {
  const open = useCart((s) => s.drawerOpen);
  const close = useCart((s) => s.closeDrawer);
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const { products } = useCatalog();
  const lines = useMemo(() => resolveLines(items, products), [items, products]);
  const totals = summarize(lines);
  const hasUnavailable = lines.some((l) => !l.available);

  return (
    <Sheet open={open} onClose={close} side="right" label="Shopping cart">
      <div className="border-b border-line px-5 py-4">
        <h2 className="text-2xl font-semibold text-gold-soft">Your cart</h2>
      </div>
      {!hydrated || lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <ShoppingBag className="size-10 text-gold" aria-hidden />
          <p className="text-muted">{hydrated ? "Your cart is empty." : "Loading your cart…"}</p>
          {hydrated && (
            <Button href="/shop" onClick={close}>
              Shop puja essentials
            </Button>
          )}
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            <AnimatePresence initial={false} mode="popLayout">
              {lines.map((line, index) => (
                <CartLine key={`${line.product.id}:${line.variant.id}`} line={line} compact index={index} />
              ))}
            </AnimatePresence>
          </ul>
          <div className="space-y-4 border-t border-line bg-sanctum/80 px-5 py-4">
            <CartSummary {...totals} />
            <div className="grid grid-cols-2 gap-3">
              <Button href="/cart" variant="secondary" onClick={close}>
                View cart
              </Button>
              <Button
                href="/checkout"
                onClick={close}
                aria-disabled={hasUnavailable}
                className={hasUnavailable ? "pointer-events-none opacity-50" : undefined}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}
