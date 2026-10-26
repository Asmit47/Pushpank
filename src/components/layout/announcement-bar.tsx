"use client";

import { X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { announcements, isCampaignVisible } from "@/data/site";

const KEY = "pushpank-announce-dismissed";
const EVENT = "pushpank-announce";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function AnnouncementBar({ hidden }: { hidden?: boolean }) {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(KEY) === "1",
    () => false,
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  if (dismissed || hidden) return null;

  return (
    <div className="relative bg-maroon-900 text-center text-sm text-gold-soft">
      <p className="px-10 py-2">
        {announcements[index]}
        {isCampaignVisible() && (
          <span lang="hi" className="mantra ml-3 text-gold">
            शुभ दीपावली
          </span>
        )}
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-parchment/10"
        onClick={() => {
          localStorage.setItem(KEY, "1");
          window.dispatchEvent(new Event(EVENT));
        }}
      >
        <X className="size-3.5" strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
}
