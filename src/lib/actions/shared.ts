import type { ZodError } from "zod";

export type ActionResult<T = { reference: string }> =
  | { ok: true; data: T }
  | { ok: false; message?: string; fieldErrors?: Record<string, string> };

export function fieldErrorsFrom(error: ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export const RATE_LIMITED = {
  ok: false,
  message: "Too many requests. Please wait a few minutes and try again, or contact us on WhatsApp.",
} as const;

export const GENERIC_FAILURE = {
  ok: false,
  message: "Something went wrong on our side. Please try again or contact us on WhatsApp.",
} as const;
