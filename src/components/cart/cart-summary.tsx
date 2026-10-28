import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";
import { FreeDeliveryNudge } from "./free-delivery-nudge";

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  estimate = true,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** True until the delivery address has been validated. */
  estimate?: boolean;
}) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">Subtotal</dt>
        <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted">Delivery{estimate ? " (estimate)" : ""}</dt>
        <dd className="tabular-nums">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
        <dt>{estimate ? "Estimated total" : "Total"}</dt>
        <dd className="tabular-nums">{formatPrice(total)}</dd>
      </div>
      <FreeDeliveryNudge subtotal={subtotal} />
      {estimate && (
        <p className="pt-1 text-xs text-muted">
          Delivery is free on orders of {formatPrice(site.delivery.freeDeliveryAbove)} or more. The final amount is
          confirmed at checkout once your pincode is verified.
        </p>
      )}
    </dl>
  );
}
