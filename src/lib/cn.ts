import { twMerge } from "tailwind-merge";

/**
 * Join class lists and let tailwind-merge resolve conflicts — a caller passing
 * "absolute" must reliably override a base "relative", not depend on Tailwind's
 * stylesheet ordering.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  return twMerge(parts.filter(Boolean).join(" "));
}
