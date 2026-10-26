"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-store";
import type { ResolvedLine } from "@/lib/cart-store";

export function CartLine({ line, compact }: { line: ResolvedLine; compact?: boolean }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const { product, variant } = line;
  const image = product.images[0];

  return (
    <li className="flex gap-3 py-4 sm:gap-4">
      <Link
        href={`/products/${product.slug}`}
        className="shrink-0"
        tabIndex={-1}
        aria-hidden
      >
        <Media
          src={image.src}
          alt=""
          width={compact ? 72 : 96}
          height={compact ? 72 : 96}
          wrapperClassName={`rounded-xl border border-line ${compact ? "size-[72px]" : "size-20 sm:size-24"}`}
          className="size-full"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-2 font-medium leading-snug hover:text-maroon"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-muted">{variant.label}</p>
            {!line.available && (
              <Badge tone="danger" className="mt-1">
                Out of stock: remove to continue
              </Badge>
            )}
          </div>
          <p className="shrink-0 font-medium tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <QuantityStepper
            size="sm"
            label={`Quantity of ${product.name}, ${variant.label}`}
            value={line.quantity}
            onChange={(q) => setQuantity(product.id, variant.id, q)}
          />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted sm:inline">{formatPrice(line.unitPrice)} each</span>
            <button
              type="button"
              onClick={() => remove(product.id, variant.id)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-muted hover:text-danger"
              aria-label={`Remove ${product.name}, ${variant.label} from cart`}
            >
              <Trash2 className="size-4" aria-hidden />
              <span className="sr-only sm:not-sr-only">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
