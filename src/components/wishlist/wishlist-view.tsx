"use client";

import { Heart } from "lucide-react";
import { useMemo } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { findProductById } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { useWishlistList } from "@/lib/wishlist";

export function WishlistView() {
  const ids = useWishlistList();
  const { products: catalogue } = useCatalog();
  const products = useMemo(
    () =>
      ids.flatMap((id) => {
        const product = findProductById(catalogue, id);
        return product ? [product] : [];
      }),
    [ids, catalogue],
  );

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="size-10" aria-hidden />}
        title="Your wishlist is empty"
        description="Tap the heart on any product and it will be saved here for later."
        action={<Button href="/shop">Browse products</Button>}
      />
    );
  }

  return (
    <div>
      <p className="mb-5 text-sm text-muted" role="status" aria-live="polite">
        {products.length} {products.length === 1 ? "product" : "products"} saved
      </p>
      {/* Keyed by the id set so the stagger replays when items change. */}
      <Stagger key={ids.join(",")}>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <li key={p.id} className="contents">
              <StaggerItem index={i} className="h-full">
                <ProductCard product={p} priority={i < 4} />
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  );
}
