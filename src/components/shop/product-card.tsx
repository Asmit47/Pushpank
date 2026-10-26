import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { getFirstAvailableVariant, getPrimaryCategory, isProductAvailable } from "@/lib/catalog";
import { getVariantPrice } from "@/lib/catalog";
import type { Product } from "@/types";
import { Price } from "./price";
import { QuickAddButton } from "./quick-add-button";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const available = isProductAvailable(product);
  const firstAvailable = getFirstAvailableVariant(product);
  const inStockVariants = product.variants.filter((v) => v.inStock);
  const pool = inStockVariants.length ? inStockVariants : product.variants;
  const cheapest = pool.reduce((a, b) => (getVariantPrice(b) < getVariantPrice(a) ? b : a));
  const multiple = product.variants.length > 1;
  const category = getPrimaryCategory(product);
  const image = product.images[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-within:shadow-lift">
      <Media
        src={image.src}
        alt={image.alt}
        width={600}
        height={600}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        priority={priority}
        wrapperClassName="aspect-square bg-ivory-100"
        className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        {category && <p className="text-xs uppercase tracking-wide text-muted">{category.name}</p>}
        <h3 className="font-sans text-[0.98rem] font-medium leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto space-y-3 pt-1">
          <div className="flex items-end justify-between gap-2">
            <Price
              price={cheapest.price}
              salePrice={cheapest.salePrice}
              from={multiple}
              className="flex-col items-start! gap-0"
            />
            {available ? (
              product.perishable ? <Badge tone="green">Fresh</Badge> : null
            ) : (
              <Badge tone="danger">Out of stock</Badge>
            )}
          </div>
          {available && !multiple && firstAvailable ? (
            <QuickAddButton productId={product.id} variantId={firstAvailable.id} productName={product.name} />
          ) : (
            <Button
              href={`/products/${product.slug}`}
              size="sm"
              variant="secondary"
              className="relative z-10 w-full"
              aria-label={`${available ? "Choose options for" : "View"} ${product.name}`}
            >
              {available ? "Choose options" : "View product"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
