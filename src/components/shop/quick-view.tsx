"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { getFirstAvailableVariant, getStartingPrice, isProductAvailable } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { QuickAddButton } from "./quick-add-button";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const available = isProductAvailable(product);
  const variant = getFirstAvailableVariant(product);
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <button type="button" className="absolute inset-0" aria-label="Close quick view" onClick={onClose} />
      <motion.div layoutId={`qv-${product.id}`} className="relative z-10 grid w-full max-w-2xl gap-4 rounded-[20px] border border-gold/30 bg-sanctum p-4 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0].src} alt={product.images[0].alt} className="aspect-[4/5] w-full rounded-xl object-cover" />
        <div className="flex flex-col">
          <h2 className="font-serif text-3xl text-gold-soft">{product.name}</h2>
          <p className="mt-2 text-sm text-parchment/80">{product.shortDescription}</p>
          <p className="mt-4 text-lg tabular-nums text-gold">{formatPrice(getStartingPrice(product))}</p>
          <div className="mt-auto flex flex-col gap-2 pt-6">
            {available && variant && product.variants.length === 1 ? (
              <QuickAddButton productId={product.id} variantId={variant.id} productName={product.name} />
            ) : (
              <Button href={`/products/${product.slug}`}>View product</Button>
            )}
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
