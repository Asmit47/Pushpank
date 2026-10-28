"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Search } from "lucide-react";
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Sheet } from "@/components/ui/sheet";
import { buildSearchIndex, type SearchEntry } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { formatPrice } from "@/lib/format";
import { queryTokens, rankSearch } from "@/lib/search";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/cn";

const RECENT_KEY = "pushpank-recent-searches";
const RECENT_MAX = 5;

const TYPE_ORDER: SearchEntry["type"][] = [
  "Product",
  "Puja service",
  "Pandit",
  "Occasion",
  "Category",
  "Decorations",
  "Page",
];

const popular = ["Marigold", "Diya", "Havan", "Pandit", "Thali"];

function readRecents(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? list.filter((v): v is string => typeof v === "string").slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

function rememberSearch(query: string) {
  const q = query.trim();
  if (!q) return;
  const next = [q, ...readRecents().filter((v) => v.toLowerCase() !== q.toLowerCase())].slice(0, RECENT_MAX);
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode): recents are a nice-to-have
  }
}

/** Case-insensitive substring highlight for every token, script-safe (no \b regex). */
function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0) return <>{text}</>;
  const lower = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const at = lower.indexOf(token, from);
      if (at === -1) break;
      ranges.push([at, at + token.length]);
      from = at + token.length;
    }
  }
  if (ranges.length === 0) return <>{text}</>;
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range] as [number, number]);
  }
  const parts: ReactNode[] = [];
  let cursor = 0;
  merged.forEach(([start, end], i) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={i} className="bg-transparent font-semibold text-gold-soft">
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export function SearchDialog() {
  const searchOpen = useUi((s) => s.searchOpen);
  const closeSearch = useUi((s) => s.closeSearch);
  const toggleSearch = useUi((s) => s.toggleSearch);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest?.("input, textarea, select, [contenteditable='true']") != null;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSearch();
        return;
      }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        useUi.getState().openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSearch]);

  return (
    <Sheet open={searchOpen} onClose={closeSearch} side="top" label="Search" hideClose>
      <SearchPanel onClose={closeSearch} />
    </Sheet>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // SearchPanel only mounts while the dialog is open, so localStorage is available;
  // the list refreshes on the next open (panel remounts).
  const [recents] = useState<string[]>(() => readRecents());
  const [announce, setAnnounce] = useState("");
  const { products, categories } = useCatalog();
  const index = useMemo(() => buildSearchIndex(products, categories), [products, categories]);

  const q = query.trim();
  const qLower = q.toLowerCase();
  const highlightTokens = useMemo(() => queryTokens(q).flat(), [q]);

  const ranked = useMemo(() => (q ? rankSearch(index, q) : []), [index, q]);

  const groups = useMemo(() => {
    return TYPE_ORDER.map((type) => ({
      type,
      items: ranked.filter((r) => r.entry.type === type),
    })).filter((g) => g.items.length > 0);
  }, [ranked]);

  const flat = useMemo(
    () => groups.flatMap((g) => g.items.map(({ entry }) => ({ entry, href: entry.href }))),
    [groups],
  );

  // Arrow selection on top; nothing selected yet falls back to the first result
  // (so plain Enter opens the best match) and resets whenever the query changes.
  const activeIdx =
    selectedIdx === null ? (flat.length > 0 ? 0 : -1) : flat.length === 0 ? -1 : Math.min(selectedIdx, flat.length - 1);

  // Settled-count live region: quiet while typing, announces on pause.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setAnnounce(q ? `${ranked.length} ${ranked.length === 1 ? "result" : "results"} for ${q}` : "");
    }, 350);
    return () => window.clearTimeout(id);
  }, [q, ranked.length]);

  const go = (href: string) => {
    rememberSearch(q);
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length === 0) return;
      setSelectedIdx((i) => {
        const current = i === null ? 0 : i;
        return (current + (e.key === "ArrowDown" ? 1 : flat.length - 1)) % flat.length;
      });
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (!q) return;
      const active = activeIdx >= 0 ? flat[activeIdx] : undefined;
      if (active) {
        go(active.href);
        return;
      }
      rememberSearch(q);
      onClose();
      router.push(`/shop?q=${encodeURIComponent(q)}`);
    }
  };

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
          role="combobox"
          type="search"
          autoComplete="off"
          aria-expanded
          aria-controls="search-results"
          aria-activedescendant={activeIdx >= 0 ? `search-opt-${activeIdx}` : undefined}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIdx(null);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search flowers, diyas, pandits..."
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <kbd className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 text-[0.7rem] text-muted sm:block">esc</kbd>
        <button type="button" onClick={onClose} className="shrink-0 rounded-full px-3 py-1.5 text-sm text-muted hover:bg-parchment/8">
          Close
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
      <div className="overflow-y-auto p-2">
        {!q && recents.length > 0 && (
          <div className="px-3 pb-3 pt-2">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Recent</p>
            <ul className="mt-2">
              {recents.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => setQuery(term)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-parchment/85 hover:bg-parchment/8"
                  >
                    <Clock className="size-3.5 text-muted" strokeWidth={1.5} aria-hidden />
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!q && (
          <div className="px-3 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Popular</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popular.map((term) => (
                <button key={term} type="button" onClick={() => setQuery(term)} className="rounded-full border border-line px-3 py-1 text-sm hover:border-gold">
                  {term}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-sans">⌘K</kbd> or{" "}
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-sans">/</kbd> to search anytime
            </p>
          </div>
        )}
        {q && ranked.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-muted">
            <p>No results for &quot;{query}&quot;.</p>
            <p className="mt-1 text-xs">Try diya, mala, havan or a pandit&rsquo;s name.</p>
          </div>
        )}
        {flat.length > 0 && (
          <ul id="search-results" role="listbox" aria-label="Search results">
            {groups.map((g) => {
              const base = flat.findIndex((f) => f.entry === g.items[0].entry);
              return (
                <Fragment key={g.type}>
                  <li role="presentation" className="px-3 pb-1 pt-3 text-xs uppercase tracking-[0.18em] text-gold">
                    {g.type}
                  </li>
                  {g.items.map(({ entry }, i) => {
                    const idx = base + i;
                    const active = idx === activeIdx;
                    return (
                      <li
                        key={entry.href + entry.title}
                        id={`search-opt-${idx}`}
                        role="option"
                        aria-selected={active}
                        onMouseMove={() => setSelectedIdx(idx)}
                        className="rounded-xl"
                      >
                        <Link
                          href={entry.href}
                          onClick={() => go(entry.href)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5",
                            active && "bg-parchment/8",
                          )}
                        >
                          {entry.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={entry.image} alt="" className="size-12 rounded-lg object-cover" />
                          ) : (
                            <span className="grid size-12 place-items-center rounded-lg bg-night text-xs text-gold">
                              {entry.type.slice(0, 1)}
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">
                              <Highlight text={entry.title} tokens={highlightTokens} />
                            </span>
                            <span className="line-clamp-1 block text-sm text-muted">
                              <Highlight text={entry.description} tokens={highlightTokens} />
                            </span>
                          </span>
                          {entry.price !== undefined && (
                            <span className="text-sm tabular-nums text-gold">{formatPrice(entry.price)}</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </Fragment>
              );
            })}
          </ul>
        )}
        {q && (
          <Link
            href={`/shop?q=${encodeURIComponent(qLower)}`}
            onClick={() => go(`/shop?q=${encodeURIComponent(qLower)}`)}
            className="mt-2 flex items-center justify-between rounded-xl border border-line px-3 py-3 text-sm text-gold-soft transition-colors hover:border-gold/50"
          >
            See all results for &ldquo;{q}&rdquo; in Shop
            <span aria-hidden className="text-muted">
              ↵
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
