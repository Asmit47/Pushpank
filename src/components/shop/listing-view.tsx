import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/components/ui/breadcrumbs";
import { Truck } from "lucide-react";
import { occasions } from "@/data/occasions";
import { parseSort, queryProducts } from "@/lib/catalog";
import Link from "next/link";
import { CategoryChips } from "./category-chips";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";

type RawParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function ListingView({
  title,
  description,
  crumbs,
  collection,
  basePath,
  searchParams,
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  collection?: string;
  basePath: string;
  searchParams: RawParams;
}) {
  const products = queryProducts({
    collection,
    sort: parseSort(first(searchParams.sort)),
    price: first(searchParams.price),
    inStock: first(searchParams.stock) === "1",
    occasion: first(searchParams.occasion),
  });

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={crumbs} />
      <header className="mt-4 max-w-2xl">
        <h1 className="text-4xl font-semibold leading-[1.1] text-gold-soft sm:text-5xl">{title}</h1>
        <p className="mt-3 text-muted">{description}</p>
      </header>

      <div className="mt-6">
        <CategoryChips activeSlug={collection} />
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {occasions.map((o) => {
          const on = first(searchParams.occasion) === o.slug;
          const href = on ? basePath : `${basePath}?occasion=${o.slug}`;
          return (
            <Link key={o.slug} href={href} className={on ? "shrink-0 rounded-full bg-gold px-3 py-1 text-sm text-night" : "shrink-0 rounded-full border border-line px-3 py-1 text-sm text-parchment"}>
              {o.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-28">
          <Suspense fallback={<div className="h-24 rounded-[20px] border border-line bg-sanctum" />}>
            <ProductFilters count={products.length} />
          </Suspense>
        </div>
        <ProductGrid products={products} clearHref={basePath} />
      </div>

      <p className="mt-10 flex items-start gap-2 rounded-xl bg-forest-100 p-4 text-sm text-forest">
        <Truck className="mt-0.5 size-4 shrink-0" aria-hidden />
        Fresh flowers are perishable. Delivery coverage and charges are confirmed at checkout, and fresh items follow
        the cancellation terms on our Delivery, cancellation and refunds page.
      </p>
    </Container>
  );
}
