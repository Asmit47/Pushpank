import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
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
          <li key={p.id} className="contents">
            {i > 0 && i % 8 === 0 && (
              <div className="col-span-full relative overflow-hidden rounded-[20px] border border-gold/25 bg-maroon-900">
                <div className="motif-dots absolute inset-0 opacity-30" aria-hidden />
                <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="max-w-xl">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-gold">Festival edit</p>
                    <Link
                      href="/collections/festival-collections"
                      className="mt-2 block font-serif text-2xl leading-tight text-gold-soft transition-colors hover:text-gold sm:text-3xl"
                    >
                      Build your Diwali thali
                    </Link>
                    <p className="mt-1.5 text-sm text-muted">
                      Thalis, diyas and fresh garlands — pick a ready set or compose your own.
                    </p>
                  </div>
                  <Link
                    href="/collections/festival-collections"
                    tabIndex={-1}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gold/45 px-5 py-2.5 text-sm font-medium text-gold-soft transition-colors hover:border-gold hover:bg-gold/10 sm:self-auto"
                  >
                    Explore
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            )}
            <StaggerItem className="h-full">
              <ProductCard product={p} priority={i < 4} />
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  );
}
