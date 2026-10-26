"use client";

import { MapPin } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";

const KEY = "pushpank-pincode";
const EVENT = "pushpank-pincode";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function deliversTo(pin: string) {
  return site.delivery.serviceablePincodePrefixes.some((p) => pin.startsWith(p));
}

export function PincodeCheck({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const saved = useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) ?? "", () => "");
  const [pin, setPin] = useState("");

  const checked = saved.length === 6;
  const ok = checked && deliversTo(saved);

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-sm text-parchment/80 hover:text-gold-soft"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
        {checked ? (ok ? `Delivers to ${saved}` : `Outside ${saved}`) : compact ? "Pincode" : "Check delivery pincode"}
      </button>
      {open && (
        <form
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-[20px] border border-line bg-sanctum p-3 shadow-lift"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\d{6}$/.test(pin)) return;
            localStorage.setItem(KEY, pin);
            window.dispatchEvent(new Event(EVENT));
            setOpen(false);
          }}
        >
          <label htmlFor="pin-check" className="text-xs text-muted">
            Lucknow pincode
          </label>
          <input
            id="pin-check"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-1 h-10 w-full rounded-xl border border-line bg-night px-3 text-sm"
            placeholder="226001"
          />
          <button type="submit" className="mt-2 h-9 w-full rounded-full bg-gold text-sm font-medium text-night">
            Check
          </button>
          {pin.length === 6 && (
            <p className="mt-2 text-xs text-muted">
              {deliversTo(pin) ? "We deliver to this pincode." : "This pincode is outside our current area."}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
