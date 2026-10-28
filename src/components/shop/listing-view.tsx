import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/components/ui/breadcrumbs";
import { Truck } from "lucide-react";
import { occasions } from "@/data/occasions";
import { getCategories, parseSort, queryProducts } from "@/lib/catalog";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ShopSearchInput } from "./shop-search-input";

type RawParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function ListingView({
  title,
  crumbs,
  collection,
  basePath,
  searchParams,
}: {
  title: string;
  crumbs: Crumb[];
  collection?: string;
  basePath: string;
  searchParams: RawParams;
}) {
  const occasion = first(searchParams.occasion);
  const q = first(searchParams.q) ?? "";
  const products = queryProducts({
    collection,
    sort: parseSort(first(searchParams.sort)),
    price: first(searchParams.price),
    inStock: first(searchParams.stock) === "1",
    q: q || undefined,
    occasion,
  });
  const total = queryProducts({ collection }).length;

  return (
    <div>
      <header className="border-b border-line/70 bg-sanctum/50">
        <Container className="py-4 lg:py-5">
          <Breadcrumbs items={crumbs} />
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl leading-tight text-gold-soft sm:text-3xl">{title}</h1>
              <p className="mt-1 text-sm text-muted" role="status" aria-live="polite">
                {products.length === total
                  ? `${total} ${total === 1 ? "product" : "products"}`
                  : `${products.length} of ${total} products`}
              </p>
            </div>
            {/* Search is offered on the full shop listing; collections stay browse-first. */}
            {!collection && <ShopSearchInput className="w-full sm:w-72" />}
          </div>
        </Container>
      </header>

      <Container className="py-4 lg:py-5">
        {/* One rail: collections and occasions, all filters-in-place links. */}
        <nav aria-label="Browse collections and occasions" className="hide-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 lg:px-0">
          {[{ slug: undefined, name: "All products", href: basePath }, ...getCategories().map((c) => ({ slug: c.slug, name: c.name, href: `/collections/${c.slug}` }))].map((c) => {
            const active = c.slug === collection;
            return (
              <Link
                key={`collection-${c.slug ?? "all"}`}
                href={c.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-gold bg-gold font-medium text-night"
                    : "border-line bg-sanctum/60 text-parchment hover:border-gold/50",
                )}
              >
                {c.name}
              </Link>
            );
          })}
          {occasions.map((o) => {
            const on = occasion === o.slug;
            const href = on ? basePath : `${basePath}?occasion=${o.slug}`;
            return (
              <Link
                key={`occasion-${o.slug}`}
                href={href}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  on
                    ? "border-gold bg-gold font-medium text-night"
                    : "border-line bg-sanctum/60 text-parchment hover:border-gold/50",
                )}
              >
                {o.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-y border-line/60">
          <Suspense fallback={<div className="min-h-[3.75rem]" />}>
            <ProductFilters />
          </Suspense>
        </div>

        <div className="mt-5">
          <ProductGrid products={products} clearHref={basePath} />
        </div>

        <p className="mt-8 flex items-start gap-3 rounded-card border border-tulsi/20 bg-tulsi-100/50 p-4 text-sm leading-relaxed text-muted">
          <Truck className="mt-0.5 size-4 shrink-0 text-tulsi" aria-hidden />
          <span>
            Fresh flowers are perishable. Delivery coverage and charges are confirmed at checkout, and fresh items
            follow the cancellation terms on our Delivery, cancellation and refunds page.
          </span>
        </p>
      </Container>
    </div>
  );
}
