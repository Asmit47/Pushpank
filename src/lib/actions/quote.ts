"use server";

import { normalizePhone } from "@/lib/phone";
import { quoteFormSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { newReference, saveQuote } from "@/lib/server/store";
import type { QuoteRequest } from "@/types";
import { fieldErrorsFrom, GENERIC_FAILURE, RATE_LIMITED } from "./shared";
import type { ActionResult } from "./shared";

/** Stores a quote request. Submitting does NOT confirm any service. */
export async function submitQuote(input: unknown): Promise<ActionResult> {
  try {
    if (!(await rateLimit("quote"))) return RATE_LIMITED;

    const parsed = quoteFormSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), message: "Please fix the highlighted fields." };
    }
    const d = parsed.data;
    if (d.website) return GENERIC_FAILURE;

    const notes = [d.notes, d.referenceLink ? `Reference: ${d.referenceLink}` : ""].filter(Boolean).join("\n");
    const quote: QuoteRequest = {
      reference: newReference(),
      customer: { name: d.name, phone: normalizePhone(d.phone) },
      eventType: d.eventType,
      eventDate: d.eventDate,
      venue: d.venue,
      guestCount: d.guestCount ? Number(d.guestCount) : undefined,
      services: d.services,
      budgetRange: d.budgetRange || undefined,
      notes: notes || undefined,
      status: "received",
      createdAt: new Date().toISOString(),
    };
    await saveQuote(quote);
    return { ok: true, data: { reference: quote.reference } };
  } catch (error) {
    console.error("submitQuote failed", error);
    return GENERIC_FAILURE;
  }
}
