"use server";

import { getProductById, getVariantPrice } from "@/lib/catalog";
import { normalizePhone } from "@/lib/phone";
import { computeTotals, isServiceablePincode } from "@/lib/pricing";
import { placeOrderSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { newReference, saveOrder } from "@/lib/server/store";
import type { Order, OrderLineSnapshot } from "@/types";
import { fieldErrorsFrom, GENERIC_FAILURE, RATE_LIMITED } from "./shared";
import type { ActionResult } from "./shared";

/**
 * Creates an order. Prices are NEVER taken from the client: line items are
 * rebuilt from the catalogue and totals are recomputed here.
 *
 * Payment is not collected yet. The order is stored with payment_status "pending"
 * and must not be treated as paid until a payment provider verifies it server-side.
 */
export async function placeOrder(input: unknown): Promise<ActionResult> {
  try {
    if (!(await rateLimit("order"))) return RATE_LIMITED;

    const parsed = placeOrderSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), message: "Please fix the highlighted fields." };
    }
    const data = parsed.data;
    if (data.website) return GENERIC_FAILURE; // honeypot

    if (!isServiceablePincode(data.pincode)) {
      return {
        ok: false,
        fieldErrors: { pincode: "We do not currently deliver to this pincode." },
        message: "Please check your delivery pincode.",
      };
    }

    const items: OrderLineSnapshot[] = [];
    const merged = new Map<string, number>();
    for (const i of data.items) {
      const key = `${i.productId}:${i.variantId}`;
      merged.set(key, Math.min(20, (merged.get(key) ?? 0) + i.quantity));
    }
    for (const [key, quantity] of merged) {
      const [productId, variantId] = key.split(":");
      const product = getProductById(productId);
      const variant = product?.variants.find((v) => v.id === variantId);
      if (!product || !variant) {
        return { ok: false, message: "An item in your cart is no longer available. Please review your cart." };
      }
      if (!variant.inStock) {
        return { ok: false, message: `${product.name} (${variant.label}) is out of stock. Please remove it from your cart.` };
      }
      const unitPrice = getVariantPrice(variant);
      items.push({
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantLabel: variant.label,
        sku: variant.sku,
        unitPrice,
        quantity,
        lineTotal: unitPrice * quantity,
        image: product.images[0].src,
      });
    }

    const totals = computeTotals(items.map((i) => ({ unitPrice: i.unitPrice, quantity: i.quantity })));
    const order: Order = {
      reference: newReference(),
      customer: {
        name: data.name,
        phone: normalizePhone(data.phone),
        email: data.email || undefined,
      },
      items,
      ...totals,
      deliveryAddress: { line1: data.line1, locality: data.locality, city: "Lucknow", pincode: data.pincode },
      deliveryNotes: data.notes || undefined,
      orderStatus: "placed",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };
    await saveOrder(order);
    return { ok: true, data: { reference: order.reference } };
  } catch (error) {
    console.error("placeOrder failed", error);
    return GENERIC_FAILURE;
  }
}
