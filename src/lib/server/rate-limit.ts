import "server-only";
import { headers } from "next/headers";

const hits = new Map<string, number[]>();

/**
 * Minimal in-memory sliding-window limiter for public forms.
 * Swap for a shared store (Redis/Upstash) when running more than one instance.
 */
export async function rateLimit(bucket: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
