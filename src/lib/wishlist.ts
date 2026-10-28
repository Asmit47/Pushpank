import { useSyncExternalStore } from "react";

const KEY = "pushpank:wishlist";

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

/** Saved-state flag plus toggle for one product id, kept in sync across every card on the page. */
export function useWishlist(productId: string) {
  const saved = useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => read().includes(productId),
    () => false,
  );

  return {
    saved,
    toggle: () => {
      const list = read();
      const next = list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId];
      write(next);
    },
  };
}

/** The full saved-id list (newest last), or an empty list until hydrated. */
export function useWishlistList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — the in-memory store still works.
  }
  for (const listener of listeners) listener();
}

const EMPTY: string[] = [];
