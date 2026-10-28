import { Check } from "lucide-react";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

/** Progress toward free delivery (₹999): a thin gold bar plus one nudge line. */
export function FreeDeliveryNudge({ subtotal }: { subtotal: number }) {
  const threshold = site.delivery.freeDeliveryAbove;
  if (subtotal === 0) return null;
  const unlocked = subtotal >= threshold;
  const remaining = threshold - subtotal;
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div className="space-y-2">
      <div
        role="progressbar"
        aria-label={unlocked ? "Free delivery unlocked" : "Progress towards free delivery"}
        aria-valuemin={0}
        aria-valuemax={threshold}
        aria-valuenow={Math.min(subtotal, threshold)}
        className="h-1 overflow-hidden rounded-full bg-line"
      >
        <div
          className={unlocked ? "h-full rounded-full bg-tulsi" : "h-full rounded-full bg-gold"}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={unlocked ? "flex items-center gap-1.5 text-xs text-tulsi" : "text-xs text-muted"}>
        {unlocked ? (
          <>
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            Free delivery unlocked
          </>
        ) : (
          <>
            Add {formatPrice(remaining)} more for free delivery
          </>
        )}
      </p>
    </div>
  );
}
