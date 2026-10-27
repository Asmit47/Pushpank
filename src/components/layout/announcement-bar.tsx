"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { announcements, site } from "@/data/site";

const KEY = "pushpank-announce-dismissed";
const EVENT = "pushpank-announce";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** Single slim strip: rotating announcements on the left, essential links on the right. */
export function TopStrip({ hidden }: { hidden?: boolean }) {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(KEY) === "1",
    () => false,
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  if (dismissed || hidden) return null;

  return (
    <div className="hidden border-b border-gold/10 bg-maroon-900/60 text-[0.8rem] lg:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-9 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 py-2 text-gold-soft/90"
            >
              <span aria-hidden className="size-1 rounded-full bg-gold" />
              {announcements[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-5 text-parchment/70">
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
            aria-label="Dismiss announcements"
            className="grid size-6 place-items-center rounded-full transition-colors hover:bg-parchment/10"
            onClick={() => {
              localStorage.setItem(KEY, "1");
              window.dispatchEvent(new Event(EVENT));
            }}
          >
            <X className="size-3" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
