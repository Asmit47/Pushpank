"use client";

import { Check, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { getFirstAvailableVariant } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { isServiceablePincode } from "@/lib/pricing";
import type { Product } from "@/types";
import { Price } from "./price";

export function ProductPurchase({ product }: { product: Product }) {
  const initial = getFirstAvailableVariant(product) ?? product.variants[0];
  const [variantId, setVariantId] = useState(initial.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState<null | { ok: boolean; message: string }>(null);

  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);

  const variant = product.variants.find((v) => v.id === variantId) ?? initial;
  const anyInStock = product.variants.some((v) => v.inStock);
  const multiple = product.variants.length > 1;

  function onAdd() {
    if (!variant.inStock) return;
    add(product.id, variant.id, quantity);
    setAdded(true);
    openDrawer();
    window.setTimeout(() => setAdded(false), 2000);
  }

  function checkPincode(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPinResult({ ok: false, message: "Enter a valid 6-digit pincode." });
      return;
    }
    setPinResult(
      isServiceablePincode(pincode)
        ? { ok: true, message: "We deliver to this pincode. Delivery date and charges are confirmed at checkout." }
        : { ok: false, message: "We do not currently deliver to this pincode." },
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Price price={variant.price} salePrice={variant.salePrice} size="lg" />
        <p className="mt-1 text-xs text-muted">Delivery charges are shown in your cart before you pay.</p>
      </div>

      {multiple && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Option: <span className="font-normal text-muted">{variant.label}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const selected = v.id === variantId;
              return (
                <label
                  key={v.id}
                  className={cn(
                    "relative cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                    selected ? "border-gold bg-gold/10 text-gold-soft" : "border-line bg-sanctum hover:border-gold/50",
                    !v.inStock && "text-muted",
                  )}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={selected}
                    onChange={() => setVariantId(v.id)}
                    className="sr-only"
                  />
                  <span className={cn("block font-medium", !v.inStock && "line-through decoration-muted/60")}>
                    {v.label}
                  </span>
                  {!v.inStock && <span className="block text-xs">Out of stock</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div aria-live="polite" className="flex items-center gap-2 text-sm">
        {variant.inStock ? (
          <Badge tone="green">
            <Check className="size-3" aria-hidden /> In stock
          </Badge>
        ) : (
          <Badge tone="danger">{anyInStock ? "This option is out of stock" : "Out of stock"}</Badge>
        )}
        {!variant.inStock && anyInStock && <span className="text-muted">Choose another option to continue.</span>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label="Quantity" />
        <Button size="lg" className="min-w-52 flex-1 sm:flex-none" onClick={onAdd} disabled={!variant.inStock}>
          {added ? <Check className="size-5" aria-hidden /> : <ShoppingBag className="size-5" aria-hidden />}
          {added ? "Added to cart" : variant.inStock ? "Add to cart" : "Unavailable"}
        </Button>
      </div>

      {!anyInStock && (
        <p className="rounded-xl bg-parchment/8 p-4 text-sm text-parchment/80">
          This product is currently unavailable. Browse similar items below or contact us on WhatsApp to ask about restocking.
        </p>
      )}

      <form onSubmit={checkPincode} className="rounded-panel border border-line bg-sanctum p-4" noValidate>
        <label htmlFor="pdp-pincode" className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="size-4 text-gold" aria-hidden /> Check delivery
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="pdp-pincode"
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setPinResult(null);
            }}
            placeholder="Enter 6-digit pincode"
            aria-describedby="pdp-pincode-result"
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-sanctum px-3.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
          <Button type="submit" variant="secondary" size="md">
            Check
          </Button>
        </div>
        <p
          id="pdp-pincode-result"
          role="status"
          className={cn("mt-2 min-h-5 text-xs", pinResult ? (pinResult.ok ? "text-tulsi" : "text-danger") : "text-muted")}
        >
          {pinResult?.message ?? "Delivery availability depends on your pincode."}
        </p>
      </form>
    </div>
  );
}
