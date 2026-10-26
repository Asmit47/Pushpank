import { SearchX } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products, clearHref }: { products: Product[]; clearHref: string }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className="size-10" aria-hidden />}
        title="No products match these filters"
        description="Try removing a filter or clearing them all to see everything in this collection."
        action={
          <Button href={clearHref} variant="secondary">
            Clear filters
          </Button>
        }
      />
    );
  }
  return (
    // Keyed by the product set so the stagger replays when filters change.
    <Stagger key={products.map((p) => p.id).join(",")} gap={0.04}>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <li key={p.id}>
            <StaggerItem className="h-full">
              <ProductCard product={p} priority={i < 4} />
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  );
}
