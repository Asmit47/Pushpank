"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getFirstAvailableVariant, getVariantPrice, isProductAvailable } from "@/lib/catalog";
import type { Product } from "@/types";
import { Price } from "./price";
import { QuickAddButton } from "./quick-add-button";
import { QuickView } from "./quick-view";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const available = isProductAvailable(product);
  const firstAvailable = getFirstAvailableVariant(product);
  const inStockVariants = product.variants.filter((v) => v.inStock);
  const pool = inStockVariants.length ? inStockVariants : product.variants;
  const cheapest = pool.reduce((a, b) => (getVariantPrice(b) < getVariantPrice(a) ? b : a));
  const multiple = product.variants.length > 1;
  const image = product.images[0];
  const second = product.secondaryImage ?? product.images[1];
  const [open, setOpen] = useState(false);

  return (
    <SpotlightCard className="h-full">
      <article className="group relative flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-night">
          <Media
            src={image.src}
            alt={image.alt}
            width={640}
            height={800}
            sizes="(min-width: 1024px) 25vw, 50vw"
            priority={priority}
            wrapperClassName="absolute inset-0"
            className="size-full object-cover transition duration-500 group-hover:opacity-0"
          />
          {second && (
            <Media
              src={second.src}
              alt=""
              width={640}
              height={800}
              sizes="(min-width: 1024px) 25vw, 50vw"
              wrapperClassName="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              className="size-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
          {product.badge && (
            <span className="absolute left-3 top-3">
              <Badge tone="gold">{product.badge}</Badge>
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
          <h3 className="font-sans text-[0.98rem] font-medium leading-snug text-parchment">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
          <div className="mt-auto space-y-3 pt-1">
            <Price price={cheapest.price} salePrice={cheapest.salePrice} from={multiple} className="text-gold" />
            <div className="relative z-10 flex gap-2">
              {available && !multiple && firstAvailable ? (
                <QuickAddButton productId={product.id} variantId={firstAvailable.id} productName={product.name} />
              ) : (
                <Button href={`/products/${product.slug}`} size="sm" variant="secondary" className="flex-1">
                  {available ? "Choose options" : "View"}
                </Button>
              )}
              <Button size="sm" variant="ghost" className="relative" onClick={() => setOpen(true)}>
                Quick view
              </Button>
            </div>
          </div>
        </div>
        {open && <QuickView product={product} onClose={() => setOpen(false)} />}
      </article>
    </SpotlightCard>
  );
}
