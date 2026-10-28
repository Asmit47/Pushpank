"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ChevronDown, Heart, Search, ShoppingBag, User } from "lucide-react";
import { useRef, useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Container } from "@/components/ui/container";
import { Sheet } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { useCart, useCartHydrated } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { useUi } from "@/lib/ui-store";
import { useWishlistList } from "@/lib/wishlist";
import { TopStrip } from "./announcement-bar";
import { Logo } from "./logo";
import { MegaNav } from "./mega-menu";
import { MobileTabBar } from "./mobile-tab-bar";
import { PincodeCheck } from "./pincode-check";
import { SearchDialog } from "./search-dialog";

const MENU_GROUPS = [
  { title: "Shop", href: "/shop", items: mainNav.shop },
  { title: "Puja and Pandits", href: "/puja-services", items: mainNav.puja },
  { title: "Decorations", href: "/decorations-events", items: mainNav.decorations },
  { title: "More", href: "/about", items: mainNav.more },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const openCart = useCart((s) => s.openDrawer);
  const openSearch = useUi((s) => s.openSearch);
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const count = hydrated ? items.reduce((n, i) => n + i.quantity, 0) : 0;
  const savedIds = useWishlistList();
  const savedCount = savedIds.length;
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Hysteresis: collapse past 64px, only restore back under 24px, so hovering
  // the threshold does not jitter the strip. Separately, once scrolled into the
  // page the whole header slides away on scroll-down and returns on scroll-up.
  useMotionValueEvent(scrollY, "change", (v) => {
    setCompact((c) => (c ? v > 24 : v > 64));
    if (reducedMotion) {
      setHidden(false);
      return;
    }
    const delta = v - lastY.current;
    lastY.current = v;
    if (v < 96) {
      setHidden(false);
      return;
    }
    if (delta > 4) setHidden(true);
    else if (delta < -4) setHidden(false);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-102%" : "0%" }}
        transition={{ type: "spring", stiffness: 380, damping: 42 }}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "sticky top-0 z-[var(--z-header)] border-b bg-night/90 backdrop-blur transition-[border-color,box-shadow] duration-300",
          compact ? "border-gold/25 shadow-header" : "border-line",
        )}
      >
        <TopStrip hidden={compact} />
        <Container className="flex h-16 items-center justify-between gap-3 lg:h-[72px]">
          <Logo />
          <MegaNav />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openSearch}
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-parchment/8"
              aria-label="Search"
            >
              <Search className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <Link
              href="/wishlist"
              className="relative hidden size-11 place-items-center rounded-full hover:bg-parchment/8 sm:grid"
              aria-label={`Wishlist, ${savedCount} ${savedCount === 1 ? "product" : "products"}`}
            >
              <Heart className={savedCount > 0 ? "size-5 text-sindoor" : "size-5"} strokeWidth={1.5} aria-hidden />
              {savedCount > 0 && (
                <motion.span
                  key={savedCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-sindoor px-1 text-[11px] font-semibold leading-5 text-parchment"
                >
                  {savedCount}
                </motion.span>
              )}
            </Link>
            <Link href="/account" className="hidden size-11 place-items-center rounded-full hover:bg-parchment/8 sm:grid" aria-label="Account">
              <User className="size-5" strokeWidth={1.5} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative grid size-11 place-items-center rounded-full hover:bg-parchment/8"
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <ShoppingBag className={count > 0 ? "size-5 text-gold" : "size-5"} strokeWidth={1.5} aria-hidden />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-semibold leading-5 text-night"
                >
                  {count}
                </motion.span>
              )}
            </button>
          </div>
        </Container>
      </motion.header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="left" label="Menu">
        <div className="relative border-b border-line px-5 py-4">
          <p aria-hidden lang="hi" className="mantra pointer-events-none absolute right-4 top-2 text-4xl text-gold/10">
            ॐ
          </p>
          <Logo />
          <div className="mt-3">
            <PincodeCheck compact />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-b border-line/70 px-5 py-3">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openSearch();
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-panel border border-line py-2.5 text-sm text-parchment transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            <Search className="size-4" strokeWidth={1.5} aria-hidden />
            Search
          </button>
          <Link
            href="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-panel border border-line py-2.5 text-sm text-parchment transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            <Heart className="size-4" strokeWidth={1.5} aria-hidden />
            Wishlist
          </Link>
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-panel border border-line py-2.5 text-sm text-parchment transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            <User className="size-4" strokeWidth={1.5} aria-hidden />
            Account
          </Link>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          {MENU_GROUPS.map((g, gi) => {
            const expanded = openGroup === g.title;
            return (
              <div key={g.title} className="border-b border-line/70 last:border-b-0">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + gi * 0.05, duration: 0.22 }}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`mobile-nav-${gi}`}
                    onClick={() => setOpenGroup(expanded ? null : g.title)}
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-3 font-serif text-xl text-gold-soft"
                  >
                    {g.title}
                    <ChevronDown
                      className={cn("size-4 shrink-0 text-gold transition-transform duration-200", expanded && "rotate-180")}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </button>
                </motion.div>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`mobile-nav-${gi}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-3">
                        {[
                          { label: "Overview", href: g.href },
                          ...g.items,
                        ].map((item, ii) => (
                          <motion.li
                            key={item.href + item.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 + ii * 0.03, duration: 0.18 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm",
                                ii === 0 ? "text-gold-soft" : "text-parchment/80",
                              )}
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </Sheet>

      <MobileTabBar onMenu={() => setMenuOpen(true)} />
      <SearchDialog />
      <CartDrawer />
    </>
  );
}
