import "server-only";
import { randomBytes } from "node:crypto";
import type { Booking, Order, QuoteRequest } from "@/types";

/**
 * STUB PERSISTENCE. Records live in process memory and are lost on restart.
 * Replace the functions below with a database (for example Postgres via Prisma)
 * without changing callers. Everything here is server-only.
 */
type Db = {
  orders: Map<string, Order>;
  bookings: Map<string, Booking>;
  quotes: Map<string, QuoteRequest>;
};

const g = globalThis as unknown as { __pushpankDb?: Db };
const db: Db = (g.__pushpankDb ??= {
  orders: new Map(),
  bookings: new Map(),
  quotes: new Map(),
});

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // base32, no look-alikes

/** Non-guessable reference: 10 random base32 characters (50 bits). */
export function newReference() {
  const bytes = randomBytes(10);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % 32];
  return `PP-${out}`;
}

export async function saveOrder(order: Order) {
  db.orders.set(order.reference, order);
  return order;
}
export async function getOrder(reference: string) {
  return db.orders.get(reference);
}

export async function saveBooking(booking: Booking) {
  db.bookings.set(booking.reference, booking);
  return booking;
}
export async function getBooking(reference: string) {
  return db.bookings.get(reference);
}

export async function saveQuote(quote: QuoteRequest) {
  db.quotes.set(quote.reference, quote);
  return quote;
}
export async function getQuote(reference: string) {
  return db.quotes.get(reference);
}
