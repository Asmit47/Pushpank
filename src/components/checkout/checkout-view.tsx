"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Textarea } from "@/components/ui/fields";
import { FormError, FormSection, HoneypotField } from "@/components/ui/form-bits";
import { Media } from "@/components/ui/media";
import { placeOrder } from "@/lib/actions/order";
import { resolveLines, summarize, useCart, useCartHydrated } from "@/lib/cart-store";
import { useCatalog } from "@/lib/catalog-context";
import { formatPrice } from "@/lib/format";
import { checkoutFormSchema } from "@/lib/schemas";
import type { CheckoutFormValues } from "@/lib/schemas";
import { site } from "@/data/site";

export function CheckoutView() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const { products } = useCatalog();
  const lines = useMemo(() => resolveLines(items, products), [items, products]);
  const totals = summarize(lines);
  const hasUnavailable = lines.some((l) => !l.available);
  const [formError, setFormError] = useState<string>();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { name: "", phone: "", email: "", line1: "", locality: "", pincode: "", notes: "", website: "" },
  });

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-panel bg-sanctum/80" role="status" aria-label="Loading checkout" />;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="size-10" aria-hidden />}
        title="Your cart is empty"
        description="Add something to your cart before checking out."
        action={<Button href="/shop">Browse products</Button>}
      />
    );
  }

  async function onSubmit(values: CheckoutFormValues) {
    setFormError(undefined);
    const result = await placeOrder({
      ...values,
      items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
    });
    if (result.ok) {
      router.push(`/order-confirmation/${result.data.reference}`);
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof CheckoutFormValues, { message });
      }
      const firstKey = Object.keys(result.fieldErrors)[0] as keyof CheckoutFormValues;
      setFocus(firstKey);
    }
    setFormError(result.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
      <div className="space-y-6">
        <FormSection step={1} title="Contact details" description="We will use this to confirm and update you about your order.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              autoComplete="name"
              error={errors.name?.message}
              wrapperClassName="sm:col-span-2"
              {...register("name")}
            />
            <Input
              label="Mobile number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98765 43210"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              optional
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </FormSection>

        <FormSection step={2} title="Delivery address" description={`We deliver in ${site.delivery.city}. Coverage is checked against your pincode.`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="House / flat, street"
              autoComplete="address-line1"
              error={errors.line1?.message}
              wrapperClassName="sm:col-span-2"
              {...register("line1")}
            />
            <Input
              label="Area / locality"
              autoComplete="address-line2"
              error={errors.locality?.message}
              {...register("locality")}
            />
            <Input
              label="Pincode"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              placeholder="226001"
              error={errors.pincode?.message}
              {...register("pincode")}
            />
            <Textarea
              label="Delivery notes or preferred date"
              optional
              rows={3}
              hint="For example a landmark or the date you need flowers by. Our team confirms what can be met."
              error={errors.notes?.message}
              wrapperClassName="sm:col-span-2"
              {...register("notes")}
            />
          </div>
        </FormSection>

        <FormSection step={3} title="Payment">
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gold bg-gold/10 p-4">
              <input type="radio" name="payment" defaultChecked readOnly className="mt-1 accent-gold-soft" />
              <span>
                <span className="block font-medium">Pay on confirmation</span>
                <span className="block text-sm text-muted">
                  Place your order now. Our team will confirm it and share payment instructions. Your order is not
                  marked paid until payment is received and verified.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-line p-4 opacity-60">
              <input type="radio" name="payment" disabled className="mt-1" />
              <span>
                <span className="block font-medium">Pay online (UPI, cards, netbanking)</span>
                <span className="block text-sm text-muted">Coming soon</span>
              </span>
            </label>
          </div>
        </FormSection>
      </div>

      <aside className="space-y-4 rounded-panel border border-line bg-sanctum p-5 lg:sticky lg:top-24">
        <h2 className="text-2xl font-semibold text-gold-soft">Order summary</h2>
        <ul className="divide-y divide-line">
          {lines.map((l) => (
            <li key={`${l.product.id}:${l.variant.id}`} className="flex items-center gap-3 py-3 text-sm">
              <Media
                src={l.product.images[0].src}
                alt=""
                width={48}
                height={48}
                wrapperClassName="size-12 shrink-0 rounded-lg border border-line"
                className="size-full"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium">{l.product.name}</p>
                <p className="text-muted">
                  {l.variant.label} · Qty {l.quantity}
                </p>
              </div>
              <p className="tabular-nums">{formatPrice(l.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <CartSummary {...totals} estimate={false} />
        {hasUnavailable && (
          <div role="alert" className="rounded-lg bg-danger/10 p-3 text-sm text-danger">
            Some items are out of stock.{" "}
            <button type="button" className="underline" onClick={() => router.push("/cart")}>
              Review your cart
            </button>
            .
          </div>
        )}
        <HoneypotField {...register("website")} />
        <FormError message={formError} />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || hasUnavailable}>
          {isSubmitting ? "Placing order…" : "Place order"}
        </Button>
        <p className="text-xs text-muted">
          By placing this order you agree to our{" "}
          <Link className="underline" href="/terms">
            terms
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/shipping-returns">
            delivery and cancellation policy
          </Link>
          .
        </p>
      </aside>
    </form>
  );
}
