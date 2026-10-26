"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { buildSearchIndex } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

const popular = ["Marigold", "Diwali", "Havan", "Pandit", "Thali"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          const btn = document.querySelector<HTMLButtonElement>("[aria-label='Search']");
          btn?.click();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <Sheet open={open} onClose={onClose} side="top" label="Search" hideClose>
      <SearchPanel onClose={onClose} />
    </Sheet>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildSearchIndex(), []);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return index
      .filter((e) => `${e.title} ${e.description}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [index, q]);

  return (
    <div className="flex max-h-[80vh] flex-col text-parchment">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
        <label htmlFor="site-search" className="sr-only">
          Search products, rituals, pandits and pages
        </label>
        <input
          id="site-search"
          data-autofocus
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search flowers, diyas, pandits..."
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <button type="button" onClick={onClose} className="shrink-0 rounded-full px-3 py-1.5 text-sm text-muted hover:bg-parchment/8">
          Close
        </button>
      </div>
      <div className="overflow-y-auto p-2" aria-live="polite">
        {!q && (
          <div className="px-3 py-4">
            <p className="text-xs uppercase tracking-[0.14em] text-gold">Popular</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popular.map((term) => (
                <button key={term} type="button" onClick={() => setQuery(term)} className="rounded-full border border-line px-3 py-1 text-sm hover:border-gold">
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
        {q && results.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-muted">
            <p>No results for &quot;{query}&quot;.</p>
            <Link href="/shop" onClick={onClose} className="mt-2 inline-block text-gold-soft underline">
              Browse all products
            </Link>
          </div>
        )}
        {results.length > 0 && (
          <ul>
            {results.map((r) => (
              <li key={r.href + r.title}>
                <Link href={r.href} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-parchment/8">
                  {r.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.image} alt="" className="size-12 rounded-lg object-cover" />
                  ) : (
                    <span className="grid size-12 place-items-center rounded-lg bg-night text-xs text-gold">{r.type.slice(0, 1)}</span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{r.title}</span>
                    <span className="line-clamp-1 block text-sm text-muted">{r.description}</span>
                  </span>
                  {r.price !== undefined && <span className="text-sm tabular-nums text-gold">{formatPrice(r.price)}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
