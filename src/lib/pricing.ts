import { site } from "@/data/site";
import type { Money } from "@/types";

export type PricedLine = { unitPrice: Money; quantity: number };

export function computeTotals(lines: PricedLine[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const deliveryFee =
    subtotal === 0 || subtotal >= site.delivery.freeDeliveryAbove ? 0 : site.delivery.fee;
  const discount = 0;
  return { subtotal, deliveryFee, discount, total: subtotal + deliveryFee - discount };
}

export function isServiceablePincode(pincode: string) {
  return /^\d{6}$/.test(pincode) && site.delivery.serviceablePincodePrefixes.some((p) => pincode.startsWith(p));
}
