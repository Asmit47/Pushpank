"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const KEY = "pushpank-pincode";
const EVENT = "pushpank-pincode";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function deliversTo(pin: string) {
  return site.delivery.serviceablePincodePrefixes.some((p) => pin.startsWith(p));
}

type Status = { tone: "ok" | "out" | "error"; text: string } | null;

export function PincodeCheck({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const saved = useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) ?? "", () => "");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const checked = saved.length === 6;
  const ok = checked && deliversTo(saved);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!popoverRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setStatus({ tone: "error", text: "Enter a 6-digit pincode." });
      return;
    }
    localStorage.setItem(KEY, pin);
    window.dispatchEvent(new Event(EVENT));
    setStatus(
      deliversTo(pin)
        ? { tone: "ok", text: `Yes — we deliver to ${pin}.` }
        : { tone: "out", text: `${pin} is outside our current delivery area.` },
    );
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex items-center gap-1.5 text-sm text-parchment/80 hover:text-gold-soft"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          setStatus(null);
          setOpen((v) => !v);
        }}
      >
        <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
        {checked ? (ok ? `Delivers to ${saved}` : `Outside ${saved}`) : compact ? "Pincode" : "Check delivery pincode"}
      </button>
      {open && (
        <div
          ref={popoverRef}
          className="absolute left-0 top-full z-[var(--z-overlay)] mt-2 w-64 rounded-card border border-line bg-sanctum p-3 shadow-lift"
        >
          <form onSubmit={submit}>
            <label htmlFor="pin-check" className="text-xs text-muted">
              Lucknow pincode
            </label>
            <input
              id="pin-check"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              aria-invalid={status?.tone === "error" || undefined}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                if (status?.tone === "error") setStatus(null);
              }}
              className={cn(
                "mt-1 h-10 w-full rounded-xl border bg-night px-3 text-sm outline-none transition-colors focus:border-gold/60",
                status?.tone === "error" ? "border-danger" : "border-line",
              )}
              placeholder="226001"
            />
            <button type="submit" className="mt-2 h-9 w-full rounded-full bg-gold text-sm font-medium text-night">
              Check
            </button>
          </form>
          {status === null && (
            <p className="mt-2 text-xs text-muted">
              We currently deliver across Lucknow (226xxx).
            </p>
          )}
          <p aria-live="polite" className={cn("mt-2 text-xs", status ? "min-h-4" : "sr-only")}>
            {status?.text}
          </p>
        </div>
      )}
    </div>
  );
}
