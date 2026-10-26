"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { buildSearchIndex } from "@/lib/catalog";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} side="top" label="Search" hideClose>
      {/* Mounted only while open so the query resets each time. */}
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
      .sort((a, b) => Number(b.title.toLowerCase().startsWith(q)) - Number(a.title.toLowerCase().startsWith(q)))
      .slice(0, 8);
  }, [index, q]);

  return (
    <div className="flex max-h-[80vh] flex-col">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-5 shrink-0 text-muted" aria-hidden />
        <label htmlFor="site-search" className="sr-only">
          Search products, categories and puja services
        </label>
        <input
          id="site-search"
          data-autofocus
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search flowers, diyas, puja kits, rituals…"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted/70"
        />
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full px-3 py-1.5 text-sm text-muted hover:bg-charcoal/5"
        >
          Close
        </button>
      </div>
      <div className="overflow-y-auto p-2" aria-live="polite">
        {!q && <p className="px-3 py-6 text-center text-sm text-muted">Start typing to search.</p>}
        {q && results.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-muted">
            <p>No results for “{query}”.</p>
            <Link href="/shop" onClick={onClose} className="mt-2 inline-block text-maroon underline">
              Browse all products
            </Link>
          </div>
        )}
        {results.length > 0 && (
          <ul>
            {results.map((r) => (
              <li key={r.href + r.title}>
                <Link
                  href={r.href}
                  onClick={onClose}
                  className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-charcoal/5"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{r.title}</span>
                    <span className="line-clamp-1 block text-sm text-muted">{r.description}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-gold-100 px-2 py-0.5 text-xs text-[#6b5320]">
                    {r.type}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
