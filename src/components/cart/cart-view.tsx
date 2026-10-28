"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { resolveLines, summarize, useCart, useCartHydrated } from "@/lib/cart-store";
import { useCatalog } from "@/lib/catalog-context";
import { CartLine } from "./cart-line";
import { CartSummary } from "./cart-summary";

export function CartView() {
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const { products } = useCatalog();
  const lines = useMemo(() => resolveLines(items, products), [items, products]);
  const totals = summarize(lines);
  const hasUnavailable = lines.some((l) => !l.available);

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-panel bg-sanctum/80" aria-label="Loading your cart" role="status" />;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="size-10" aria-hidden />}
        title="Your cart is empty"
        description="Add flowers, samagri or a puja kit and they will show up here."
        action={<Button href="/shop">Continue shopping</Button>}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
      <ul className="divide-y divide-line rounded-panel border border-line bg-sanctum px-4 sm:px-6">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map((line) => (
            <CartLine key={`${line.product.id}:${line.variant.id}`} line={line} />
          ))}
        </AnimatePresence>
      </ul>
      <aside className="space-y-4 rounded-panel border border-line bg-sanctum p-5 lg:sticky lg:top-24">
        <h2 className="text-2xl font-semibold text-gold-soft">Order summary</h2>
        <CartSummary {...totals} />
        {hasUnavailable && (
          <p role="alert" className="rounded-lg bg-danger/10 p-3 text-sm text-danger">
            Some items are out of stock. Remove them to continue to checkout.
          </p>
        )}
        <div className="grid gap-3">
          {hasUnavailable ? (
            <Button disabled>Proceed to checkout</Button>
          ) : (
            <Button href="/checkout" size="lg">
              Proceed to checkout
            </Button>
          )}
          <Button href="/shop" variant="ghost">
            Continue shopping
          </Button>
        </div>
      </aside>
    </div>
  );
}
