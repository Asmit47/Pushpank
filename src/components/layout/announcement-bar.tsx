"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { useCatalog } from "@/lib/catalog-context";
import { PincodeCheck } from "./pincode-check";

const KEY = "pushpank-announce-dismissed-until";
const EVENT = "pushpank-announce";
const DISMISS_MS = 24 * 60 * 60 * 1000;

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function isDismissed() {
  const until = Number(window.localStorage.getItem(KEY));
  return Number.isFinite(until) && until > Date.now();
}

/**
 * Single slim strip: rotating announcements on the left, essential links on the
 * right. Stays mounted and collapses by height so the sticky header never
 * shifts the page; the rotation interval stops while collapsed.
 */
export function TopStrip({ hidden }: { hidden?: boolean }) {
  const dismissed = useSyncExternalStore(
    subscribe,
    isDismissed,
    () => false,
  );
  const { announcements } = useCatalog();
  const lines = announcements.length ? announcements : [{ message: "Same-day flower delivery across Lucknow" }];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const collapsed = dismissed || hidden;
  const line = lines[index % lines.length];

  useEffect(() => {
    if (collapsed || paused || lines.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % lines.length), 5000);
    return () => window.clearInterval(id);
  }, [collapsed, paused, lines.length]);

  return (
    <div className="hidden lg:block">
      <motion.div
        initial={false}
        animate={{ height: collapsed ? 0 : 36, opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-b border-gold/10 bg-maroon-900/60 text-[0.8rem]"
      >
        <div
          className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          <div aria-live="polite" className="relative min-h-9 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${line.message}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 py-2 text-gold-soft/90"
              >
                <span aria-hidden className="size-1 rounded-full bg-gold" />
                {line.href ? (
                  <Link href={line.href} className="hover:text-gold">
                    {line.message}
                  </Link>
                ) : (
                  line.message
                )}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-5 text-parchment/70">
            <PincodeCheck />
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-soft"
            >
              <Phone className="size-3" strokeWidth={1.5} aria-hidden />
              {site.contact.phone}
            </a>
            <Link href="/track" className="transition-colors hover:text-gold-soft">
              Track order
            </Link>
            <button
              type="button"
              aria-label="Dismiss announcements for today"
              className="grid size-6 place-items-center rounded-full transition-colors hover:bg-parchment/10"
              onClick={() => {
                window.localStorage.setItem(KEY, String(Date.now() + DISMISS_MS));
                window.dispatchEvent(new Event(EVENT));
              }}
            >
              <X className="size-3" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
