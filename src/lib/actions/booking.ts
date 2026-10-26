"use server";

import { getService } from "@/lib/catalog";
import { normalizePhone } from "@/lib/phone";
import { bookingFormSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { newReference, saveBooking } from "@/lib/server/store";
import type { Booking } from "@/types";
import { fieldErrorsFrom, GENERIC_FAILURE, RATE_LIMITED } from "./shared";
import type { ActionResult } from "./shared";

/**
 * Creates a booking REQUEST (manual confirmation, "Option A" in the blueprint).
 * The booking starts as `requested` and is only `confirmed` after staff verify
 * pandit availability. Payment status is separate and not applicable yet.
 */
export async function submitBooking(input: unknown): Promise<ActionResult> {
  try {
    if (!(await rateLimit("booking"))) return RATE_LIMITED;

    const parsed = bookingFormSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), message: "Please fix the highlighted fields." };
    }
    const data = parsed.data;
    if (data.website) return GENERIC_FAILURE;

    const service = getService(data.serviceSlug);
    if (!service) return { ok: false, message: "This service is not available. Please choose another." };

    const pkg = data.packageId ? service.packages.find((p) => p.id === data.packageId) : undefined;
    if (data.packageId && !pkg) return { ok: false, fieldErrors: { packageId: "Choose a valid package" } };

    const booking: Booking = {
      reference: newReference(),
      serviceSlug: service.slug,
      serviceName: service.name,
      packageSnapshot: pkg ? { id: pkg.id, name: pkg.name, indicativePrice: pkg.indicativePrice } : undefined,
      customer: { name: data.name, phone: normalizePhone(data.phone) },
      eventDate: data.eventDate,
      timeWindow: data.timeWindow,
      address: { line1: data.line1, locality: data.locality, pincode: data.pincode },
      samagri: data.samagri,
      notes: data.notes || undefined,
      bookingStatus: "requested",
      paymentStatus: "not_applicable",
      createdAt: new Date().toISOString(),
    };
    await saveBooking(booking);
    return { ok: true, data: { reference: booking.reference } };
  } catch (error) {
    console.error("submitBooking failed", error);
    return GENERIC_FAILURE;
  }
}
