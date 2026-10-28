import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Booking, Order, PanditApplication, QuoteRequest } from "@/types";

/**
 * STUB PERSISTENCE (file-based). Records live in data/db.json, written
 * atomically (temp file + rename) through a serialized in-process queue, so
 * submissions survive a restart. Swap this module for a real database later
 * without changing callers. Everything here is server-only.
 */
type DbFile = {
  orders: Record<string, Order>;
  bookings: Record<string, Booking>;
  quotes: Record<string, QuoteRequest>;
  panditApplications: Record<string, PanditApplication>;
};

const DB_DIR = join(process.cwd(), "data");
const DB_PATH = join(DB_DIR, "db.json");

const EMPTY: DbFile = { orders: {}, bookings: {}, quotes: {}, panditApplications: {} };

/** Warm in-process copy of the last-read file; readers hit this, not the disk. */
let cache: DbFile | null = null;

// Every read-modify-write runs one at a time so a burst of submissions never
// drops records between reading the file and renaming the next version in.
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readDb(): Promise<DbFile> {
  if (cache) return cache;
  let raw: string;
  try {
    raw = await readFile(DB_PATH, "utf8");
  } catch {
    // No file yet (or unreadable directory) — start from the empty set.
    cache = { ...EMPTY };
    return cache;
  }
  // Throws on a corrupt file so writes never silently overwrite it.
  cache = { ...EMPTY, ...(JSON.parse(raw) as Partial<DbFile>) };
  return cache;
}

/** Atomic whole-file write: JSON to a unique temp file, then rename into place. */
async function writeDb(db: DbFile): Promise<void> {
  await mkdir(DB_DIR, { recursive: true });
  const tmp = `${DB_PATH}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await rename(tmp, DB_PATH);
  cache = db;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // base32, no look-alikes

/** Non-guessable reference: 10 random base32 characters (50 bits). */
export function newReference() {
  const bytes = randomBytes(10);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % 32];
  return `PP-${out}`;
}

export function saveOrder(order: Order) {
  return enqueue(async () => {
    const db = await readDb();
    db.orders[order.reference] = order;
    await writeDb(db);
    return order;
  });
}

export async function getOrder(reference: string) {
  return (await readDb()).orders[reference];
}

export function saveBooking(booking: Booking) {
  return enqueue(async () => {
    const db = await readDb();
    db.bookings[booking.reference] = booking;
    await writeDb(db);
    return booking;
  });
}

export async function getBooking(reference: string) {
  return (await readDb()).bookings[reference];
}

export function saveQuote(quote: QuoteRequest) {
  return enqueue(async () => {
    const db = await readDb();
    db.quotes[quote.reference] = quote;
    await writeDb(db);
    return quote;
  });
}

export async function getQuote(reference: string) {
  return (await readDb()).quotes[reference];
}

export function savePanditApplication(application: PanditApplication) {
  return enqueue(async () => {
    const db = await readDb();
    db.panditApplications[application.reference] = application;
    await writeDb(db);
    return application;
  });
}

export async function getPanditApplication(reference: string) {
  return (await readDb()).panditApplications[reference];
}
