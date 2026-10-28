"use client";

import { Loader2, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

const DEBOUNCE_MS = 350;

/**
 * Search box synced to the ?q= URL param (source of truth): debounced replace
 * while typing, immediate commit on Enter or clear. Renders inside a
 * transition so the page never flashes a loading skeleton mid-typing.
 */
export function ShopSearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [pending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  function commit(next: string) {
    const p = new URLSearchParams(params.toString());
    if (next) p.set("q", next);
    else p.delete("q");
    const qs = p.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  function onChange(value: string) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => commit(value.trim()), DEBOUNCE_MS);
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (timer.current) clearTimeout(timer.current);
        commit(new FormData(e.currentTarget).get("q")?.toString().trim() ?? "");
      }}
      className={className}
    >
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          strokeWidth={1.5}
          aria-hidden
        />
        <input
          type="text"
          name="q"
          defaultValue={q}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          aria-busy={pending}
          className="h-10 w-full rounded-xl border border-line bg-night pl-9 pr-10 text-sm text-parchment placeholder:text-muted/70 transition-colors hover:border-gold/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {pending ? (
            <Loader2 className="size-4 animate-spin text-gold" aria-hidden />
          ) : (
            q && (
              <button
                type="button"
                onClick={() => {
                  if (timer.current) clearTimeout(timer.current);
                  commit("");
                }}
                aria-label="Clear search"
                className="grid size-6 place-items-center rounded-full text-muted transition-colors hover:text-parchment"
              >
                <X className="size-4" aria-hidden />
              </button>
            )
          )}
        </div>
      </div>
    </form>
  );
}
