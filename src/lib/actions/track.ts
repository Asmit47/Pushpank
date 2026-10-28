"use server";

import { normalizePhone } from "@/lib/phone";
import { trackSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { getSheetOrder, getSheetPanditApplication } from "@/lib/server/sheets";
import { getBooking } from "@/lib/server/store";
import { fieldErrorsFrom, GENERIC_FAILURE, RATE_LIMITED } from "./shared";
import type { ActionResult } from "./shared";

/**
 * Looks up an order or booking by reference AND phone number. The phone check
 * means a leaked or guessed reference alone does not expose customer details.
 * Returns the URL to the detail page on success.
 */
export async function trackReference(input: unknown): Promise<ActionResult<{ href: string }>> {
  try {
    if (!(await rateLimit("track", 10))) return RATE_LIMITED;

    const parsed = trackSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error) };
    }
    const { reference, phone } = parsed.data;
    const normalized = normalizePhone(phone);

    const order = await getSheetOrder(reference);
    if (order && order.customer.phone === normalized) {
      return { ok: true, data: { href: `/order-confirmation/${reference}` } };
    }
    const booking = await getBooking(reference);
    if (booking && booking.customer.phone === normalized) {
      return { ok: true, data: { href: `/bookings/${reference}` } };
    }
    const application = await getSheetPanditApplication(reference);
    if (application && application.phone === normalized) {
      return { ok: true, data: { href: `/pandits/register/${reference}` } };
    }
    return {
      ok: false,
      message: "We could not find an order, booking or pandit application matching that reference and phone number.",
    };
  } catch (error) {
    console.error("trackReference failed", error);
    return GENERIC_FAILURE;
  }
}
