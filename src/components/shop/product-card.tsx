"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getFirstAvailableVariant, getVariantPrice, isProductAvailable } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/types";
import { QuickAddButton } from "./quick-add-button";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const available = isProductAvailable(product);
  const firstAvailable = getFirstAvailableVariant(product);
  const inStockVariants = product.variants.filter((v) => v.inStock);
  const pool = inStockVariants.length ? inStockVariants : product.variants;
  const cheapest = pool.reduce((a, b) => (getVariantPrice(b) < getVariantPrice(a) ? b : a));
  const multiple = product.variants.length > 1;
  const image = product.images[0];
  const second = product.secondaryImage ?? product.images[1];
  const [qty, setQty] = useState(1);
  const { saved, toggle } = useWishlist(product.id);

  const current = cheapest.salePrice ?? cheapest.price;
  const onSale = cheapest.salePrice !== undefined && cheapest.salePrice < cheapest.price;

  return (
    <SpotlightCard className="h-full transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
      <article className="group relative flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-night">
          <Media
            src={image.src}
            alt={image.alt}
            width={640}
            height={640}
            sizes="(min-width: 1024px) 25vw, 50vw"
            priority={priority}
            wrapperClassName="absolute inset-0"
            className="img-zoom size-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {second && (
            <Media
              src={second.src}
              alt=""
              width={640}
              height={640}
              sizes="(min-width: 1024px) 25vw, 50vw"
              wrapperClassName="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              className="img-zoom size-full object-cover"
            />
          )}
          {!available && (
            <div className="absolute inset-0 grid place-items-center bg-night/60">
              <span className="rounded-full border border-line bg-sanctum px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Out of stock
              </span>
            </div>
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-night/85 px-2.5 py-1 text-xs font-medium text-gold-soft backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-parchment text-night shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Heart className={cn("size-4 transition-colors", saved && "fill-sindoor text-sindoor")} strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-serif text-xl leading-snug text-parchment">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>

          <p className="mt-1.5 text-lg font-semibold tabular-nums text-gold-soft">
            {multiple && <span className="mr-1.5 align-middle text-xs font-normal text-muted">From</span>}
            {formatPrice(current)}
            {onSale && <s className="ml-2 text-sm font-normal text-muted">{formatPrice(cheapest.price)}</s>}
          </p>

          <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-4">
            {available && !multiple && firstAvailable && (
              <div className="hidden sm:flex">
                <QuantityStepper size="sm" value={qty} onChange={setQty} label={`Quantity for ${product.name}`} />
              </div>
            )}
            {available && !multiple && firstAvailable ? (
              <QuickAddButton
                productId={product.id}
                variantId={firstAvailable.id}
                productName={product.name}
                quantity={qty}
                className="w-full sm:h-11"
              />
            ) : (
              <Button href={`/products/${product.slug}`} size="md" variant="secondary" className="w-full">
                {available ? "Choose options" : "View details"}
              </Button>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
