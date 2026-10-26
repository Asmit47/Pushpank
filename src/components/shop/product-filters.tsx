"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useTransition } from "react";
import { Select } from "@/components/ui/fields";
import { PRICE_RANGES, SORT_OPTIONS } from "@/lib/catalog";

export function ProductFilters({ count }: { count: number }) {
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
    <div className="rounded-2xl border border-line bg-white p-4 sm:p-5" aria-busy={pending}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="flex items-center gap-2 text-sm text-muted" role="status" aria-live="polite">
          <SlidersHorizontal className="size-4" aria-hidden />
          <span>
            <strong className="font-semibold text-charcoal">{count}</strong> {count === 1 ? "product" : "products"}
          </span>
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:gap-6">
          <fieldset>
            <legend className="mb-1.5 text-sm font-medium">Price</legend>
            <div className="flex flex-wrap gap-2">
              {[{ value: "", label: "Any" }, ...PRICE_RANGES].map((r) => {
                const active = price === r.value;
                return (
                  <label
                    key={r.value || "any"}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-maroon ${
                      active
                        ? "border-maroon bg-maroon text-ivory"
                        : "border-line bg-white hover:border-maroon/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="price"
                      value={r.value}
                      checked={active}
                      onChange={() => update("price", r.value)}
                      className="sr-only"
                    />
                    {r.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="flex h-11 cursor-pointer items-center gap-2.5 self-end text-sm">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => update("stock", e.target.checked ? "1" : null)}
              className="size-4 accent-maroon"
            />
            In stock only
          </label>

          <Select
            label="Sort by"
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
            wrapperClassName="lg:w-52"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
          className="mt-3 text-sm font-medium text-maroon underline-offset-2 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
