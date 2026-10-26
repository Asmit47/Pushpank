"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { occasions } from "@/data/occasions";
import { pandits } from "@/data/pandits";
import { mainNav } from "@/data/site";
import { getFeaturedProducts } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string; image?: string };

const groups: { id: string; label: string; href: string; match: string[]; items: Item[] }[] = [
  { id: "shop", label: "Shop", href: "/shop", match: ["/shop", "/collections", "/products"], items: mainNav.shop },
  { id: "puja", label: "Puja and Pandits", href: "/puja-services", match: ["/puja-services", "/pandits", "/bookings"], items: mainNav.puja },
  { id: "decor", label: "Decorations", href: "/decorations-events", match: ["/decorations-events"], items: mainNav.decorations },
  { id: "more", label: "More", href: "/about", match: ["/about", "/reviews", "/faq", "/contact", "/track"], items: mainNav.more },
];

export function MegaNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const featured = getFeaturedProducts(1)[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
      {groups.map((g) => {
        const active = g.match.some((m) => pathname.startsWith(m));
        const expanded = open === g.id;
        return (
          <div key={g.id} className="relative" onMouseEnter={() => setOpen(g.id)}>
            <Link
              href={g.href}
              aria-expanded={expanded}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex h-10 items-center px-3 text-[0.95rem] font-medium text-parchment/85 hover:text-gold-soft",
                (active || expanded) && "text-gold-soft",
              )}
              onFocus={() => setOpen(g.id)}
              onClick={() => setOpen(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(g.id);
                  const first = document.querySelector<HTMLElement>(`#mega-${g.id} a`);
                  first?.focus();
                }
              }}
            >
              {g.label}
              {expanded && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-gold" />
              )}
            </Link>
            {expanded && (
              <div
                id={`mega-${g.id}`}
                className="absolute left-1/2 top-full z-50 w-[min(720px,70vw)] -translate-x-1/2 pt-3"
              >
                <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 rounded-[20px] border border-gold/20 bg-sanctum p-4 shadow-lift">
                  <ul className="grid grid-cols-2 gap-1">
                    {g.items.map((item) => (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(null)}
                          className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-parchment/8"
                        >
                          {item.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt="" className="size-10 rounded-lg object-cover" />
                          )}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {g.id === "shop" && (
                    <div>
                      <p className="px-2 text-xs uppercase tracking-[0.14em] text-gold">Shop by occasion</p>
                      <ul className="mt-2">
                        {occasions.slice(0, 5).map((o) => (
                          <li key={o.slug}>
                            <Link
                              href={`/shop?occasion=${o.slug}`}
                              onClick={() => setOpen(null)}
                              className="block rounded-lg px-2 py-1.5 text-sm hover:bg-parchment/8"
                            >
                              {o.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {featured && (
                        <Link href={`/products/${featured.slug}`} onClick={() => setOpen(null)} className="mt-3 block overflow-hidden rounded-xl border border-line">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={featured.images[0].src} alt="" className="h-24 w-full object-cover" />
                          <span className="block px-3 py-2 text-sm">{featured.name}</span>
                        </Link>
                      )}
                    </div>
                  )}
                  {g.id === "puja" && (
                    <div>
                      <p className="px-2 text-xs uppercase tracking-[0.14em] text-gold">Our Pandits</p>
                      <ul className="mt-2 space-y-2">
                        {pandits.slice(0, 3).map((p) => (
                          <li key={p.slug}>
                            <Link href={`/pandits/${p.slug}`} onClick={() => setOpen(null)} className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-parchment/8">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image.src} alt="" className="size-8 rounded-full object-cover" />
                              <span className="text-sm">{p.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/pandits/register" onClick={() => setOpen(null)} className="mt-3 inline-flex text-sm text-gold-soft underline">
                        Join as Pandit
                      </Link>
                    </div>
                  )}
                  {(g.id === "decor" || g.id === "more") && <div className="rounded-xl bg-night/60 p-4 text-sm text-muted">Flowers, pandits and samagri for a Lucknow home puja.</div>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
