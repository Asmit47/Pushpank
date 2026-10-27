"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useTransition } from "react";
import { cn } from "@/lib/cn";
import { PRICE_RANGES, SORT_OPTIONS } from "@/lib/catalog";

/**
 * Filter bar between two hairlines: reset icon, price pills (dropdown on small
 * screens), in-stock checkbox, sort select. Scrolls sideways on narrow screens.
 */
export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const sort = params.get("sort") ?? "recommended";
  const price = params.get("price") ?? "";
  const inStock = params.get("stock") === "1";
  const hasFilters = Boolean(price || inStock || (params.get("sort") && sort !== "recommended"));

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "" || value === "recommended") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  return (
    <section
      aria-busy={pending}
      aria-label="Filter and sort products"
      className={cn("transition-opacity", pending && "opacity-60")}
    >
      <div className="hide-scrollbar flex items-center gap-2.5 overflow-x-auto py-2.5 sm:gap-3 lg:overflow-visible">
        <button
          type="button"
          onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
          disabled={!hasFilters}
          aria-label="Reset filters"
          title="Reset filters"
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl border transition-colors",
            hasFilters
              ? "border-gold/50 text-gold-soft hover:border-gold hover:bg-gold/10"
              : "border-line text-muted opacity-50",
          )}
        >
          <SlidersHorizontal className="size-4" aria-hidden />
        </button>

        <span aria-hidden className="hidden h-6 w-px shrink-0 bg-line sm:block" />

        <fieldset className="hidden min-w-0 flex-1 items-center gap-2.5 lg:flex">
          <legend className="sr-only">Price</legend>
          <span className="shrink-0 text-[13px] text-muted">Price:</span>
          <div className="hide-scrollbar flex min-w-0 items-center gap-1.5 overflow-x-auto">
            {[{ value: "", label: "Any" }, ...PRICE_RANGES].map((r) => {
              const active = price === r.value;
              return (
                <label
                  key={r.value || "any"}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                    active
                      ? "border-gold bg-gold font-medium text-night"
                      : "border-line bg-night text-muted hover:border-gold/50 hover:text-parchment",
                  )}
                >
                  <input
                    type="radio"
                    name="price"
                    value={r.value}
                    checked={active}
                    onChange={() => update("price", r.value)}
                    className="sr-only"
                  />
                  {active && <Check className="size-3.5" strokeWidth={2.5} aria-hidden />}
                  {r.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Compact price dropdown on small screens, matching the mobile design. */}
        <div className="relative shrink-0 lg:hidden">
          <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-muted">
            Price:
          </span>
          <select
            aria-label="Price"
            value={price}
            onChange={(e) => update("price", e.target.value || null)}
            className="h-10 cursor-pointer appearance-none rounded-xl border border-line bg-night pl-14 pr-9 text-[13px] text-parchment transition-colors hover:border-gold/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
          >
            <option value="">Any</option>
            {PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
        </div>

        <span aria-hidden className="h-6 w-px shrink-0 bg-line" />

        <label className="flex shrink-0 cursor-pointer select-none items-center gap-2.5 text-[13px] text-muted">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => update("stock", e.target.checked ? "1" : null)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="grid size-[18px] place-items-center rounded-[5px] border border-line bg-night text-night transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold peer-checked:border-gold peer-checked:bg-gold"
          >
            <Check className={cn("size-3 transition-opacity", inStock ? "opacity-100" : "opacity-0")} strokeWidth={3} />
          </span>
          <span className={cn(inStock && "text-parchment")}>In stock only</span>
        </label>

        <span aria-hidden className="hidden h-6 w-px shrink-0 bg-line sm:block" />

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <span className="hidden text-[13px] text-muted md:inline">Sort by:</span>
          <div className="relative">
            <select
              aria-label="Sort by"
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
              className="h-10 cursor-pointer appearance-none rounded-xl border border-line bg-night pl-3.5 pr-9 text-[13px] text-parchment transition-colors hover:border-gold/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 md:w-44"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
