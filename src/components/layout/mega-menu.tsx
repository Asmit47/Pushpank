"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { occasions } from "@/data/occasions";
import { pandits } from "@/data/pandits";
import { mainNav } from "@/data/site";
import { getFeaturedProducts } from "@/lib/catalog";
import { useCatalog } from "@/lib/catalog-context";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string; image?: string };

const groups: { id: string; label: string; href: string; match: string[]; items: Item[]; align: "start" | "center" | "end" }[] = [
  { id: "shop", label: "Shop", href: "/shop", match: ["/shop", "/collections", "/products"], items: mainNav.shop, align: "start" },
  { id: "puja", label: "Puja and Pandits", href: "/puja-services", match: ["/puja-services", "/pandits", "/bookings"], items: mainNav.puja, align: "center" },
  { id: "decor", label: "Decorations", href: "/decorations-events", match: ["/decorations-events"], items: mainNav.decorations, align: "center" },
  { id: "more", label: "More", href: "/about", match: ["/about", "/reviews", "/faq", "/contact", "/track"], items: mainNav.more, align: "end" },
];

const HOVER_OPEN_MS = 110;
const HOVER_CLOSE_MS = 180;

// The day index is 0 during SSR/hydration (so server and client agree) and
// picks a different featured product on the client after mount.
const subscribeDay = () => () => {};

export function MegaNav() {
  const pathname = usePathname();
  const { products } = useCatalog();
  const featuredList = getFeaturedProducts(products, 8);
  const [open, setOpen] = useState<string | null>(null);
  const day = useSyncExternalStore(subscribeDay, () => Math.floor(Date.now() / 86_400_000), () => 0);
  const featured = featuredList.length > 0 ? featuredList[day % featuredList.length] : undefined;
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const scheduleOpen = (id: string) => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(id), HOVER_OPEN_MS);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(null), HOVER_CLOSE_MS);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimers();
    };
  }, []);

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-1 lg:flex"
      onMouseEnter={() => clearTimers()}
      onMouseLeave={scheduleClose}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
      }}
    >
      {groups.map((g) => {
        const active = g.match.some((m) => pathname.startsWith(m));
        const expanded = open === g.id;
        const underlined = active || expanded;
        return (
          <div key={g.id} className="relative" onMouseEnter={() => scheduleOpen(g.id)}>
            <Link
              href={g.href}
              aria-expanded={expanded}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative inline-flex h-10 items-center px-3 text-[0.95rem] font-medium text-parchment/85 hover:text-gold-soft",
                underlined && "text-gold-soft",
              )}
              onFocus={() => {
                clearTimers();
                setOpen(g.id);
              }}
              onClick={() => setOpen(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  clearTimers();
                  setOpen(g.id);
                  const first = document.querySelector<HTMLElement>(`#mega-${g.id} a`);
                  first?.focus();
                }
              }}
            >
              {g.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 bottom-0 h-px origin-left bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100",
                  underlined ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
            <AnimatePresence>
              {expanded && (
                <div
                  id={`mega-${g.id}`}
                  className={cn(
                    "absolute top-full z-[var(--z-overlay)] w-[min(720px,70vw)] pt-3",
                    g.align === "start" && "left-0",
                    g.align === "center" && "left-1/2 -translate-x-1/2",
                    g.align === "end" && "right-0",
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-[1.2fr_0.8fr] gap-4 rounded-card border border-gold/20 bg-sanctum p-4 shadow-lift"
                  >
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
                        <p className="px-2 text-xs uppercase tracking-[0.18em] text-gold">Shop by occasion</p>
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
                        <p className="px-2 text-xs uppercase tracking-[0.18em] text-gold">Our Pandits</p>
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
                    {g.id === "decor" && (
                      <div className="flex h-full flex-col justify-between rounded-xl bg-night/60 p-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-gold">Custom work</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            Mandap and stage flowers, entrance garlands, havan setups — quoted on your venue, date and
                            guest count.
                          </p>
                        </div>
                        <Link
                          href="/decorations-events#quote"
                          onClick={() => setOpen(null)}
                          className="mt-4 inline-flex w-fit rounded-full border border-gold/45 px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:border-gold hover:bg-gold/10"
                        >
                          Request a quote
                        </Link>
                      </div>
                    )}
                    {g.id === "more" && (
                      <div className="flex h-full flex-col justify-between rounded-xl bg-night/60 p-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-gold">Need a hand?</p>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>
                              <Link href="/track" onClick={() => setOpen(null)} className="rounded px-0 py-1 text-parchment/80 hover:text-gold-soft">
                                Track an order or booking
                              </Link>
                            </li>
                            <li>
                              <Link href="/faq" onClick={() => setOpen(null)} className="rounded px-0 py-1 text-parchment/80 hover:text-gold-soft">
                                Delivery and samagri FAQs
                              </Link>
                            </li>
                            <li>
                              <Link href="/account" onClick={() => setOpen(null)} className="rounded px-0 py-1 text-parchment/80 hover:text-gold-soft">
                                Your account
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <Link
                          href="/contact"
                          onClick={() => setOpen(null)}
                          className="mt-4 inline-flex w-fit rounded-full border border-gold/45 px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:border-gold hover:bg-gold/10"
                        >
                          Contact us
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
