import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Price({
  price,
  salePrice,
  from,
  className,
  size = "md",
}: {
  price: number;
  salePrice?: number;
  from?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  const current = salePrice ?? price;
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      {from && <span className="text-xs text-muted">From</span>}
      <span className={cn("font-semibold tabular-nums", size === "lg" ? "text-2xl" : "text-base")}>
        {formatPrice(current)}
      </span>
      {salePrice !== undefined && salePrice < price && (
        <>
          <s className="text-sm text-muted tabular-nums">
            <span className="sr-only">Original price </span>
            {formatPrice(price)}
          </s>
          <span className="rounded bg-forest-100 px-1.5 py-0.5 text-xs font-medium text-forest">
            Save {formatPrice(price - salePrice)}
          </span>
        </>
      )}
    </p>
  );
}
