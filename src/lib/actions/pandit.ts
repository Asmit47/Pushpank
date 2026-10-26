"use server";

import { normalizePhone } from "@/lib/phone";
import { panditApplicationSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { newReference, savePanditApplication } from "@/lib/server/store";
import type { PanditApplication } from "@/types";
import { fieldErrorsFrom, GENERIC_FAILURE, RATE_LIMITED } from "./shared";
import type { ActionResult } from "./shared";

export async function submitPanditApplication(input: unknown): Promise<ActionResult> {
  try {
    if (!(await rateLimit("pandit"))) return RATE_LIMITED;
    const parsed = panditApplicationSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), message: "Please fix the highlighted fields." };
    }
    const data = parsed.data;
    if (data.website) return GENERIC_FAILURE;

    const application: PanditApplication = {
      reference: newReference(),
      name: data.name,
      phone: normalizePhone(data.phone),
      email: data.email,
      locality: data.locality,
      pincode: data.pincode,
      years: Number(data.years),
      education: data.education || undefined,
      sampradaya: data.sampradaya || undefined,
      rituals: data.rituals,
      languages: data.languages,
      days: data.days,
      timeWindows: data.timeWindows,
      areas: data.areas,
      travels: data.travels,
      bringsSamagri: data.bringsSamagri,
      bio: data.bio,
      status: "received",
      createdAt: new Date().toISOString(),
    };
    await savePanditApplication(application);
    return { ok: true, data: { reference: application.reference } };
  } catch (error) {
    console.error("submitPanditApplication failed", error);
    return GENERIC_FAILURE;
  }
}
