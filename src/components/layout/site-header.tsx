"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Container } from "@/components/ui/container";
import { Sheet } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { useCart, useCartHydrated } from "@/lib/cart-store";
import { TopStrip } from "./announcement-bar";
import { Logo } from "./logo";
import { MegaNav } from "./mega-menu";
import { MobileTabBar } from "./mobile-tab-bar";
import { PincodeCheck } from "./pincode-check";
import { SearchDialog } from "./search-dialog";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const openCart = useCart((s) => s.openDrawer);
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const count = hydrated ? items.reduce((n, i) => n + i.quantity, 0) : 0;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    setCompact((c) => (c === next ? c : next));
  });

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-night/90 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
          compact ? "border-gold/25 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.8)]" : "border-line"
        }`}
      >
        <TopStrip hidden={compact} />
        <Container className="flex h-16 items-center justify-between gap-3 lg:h-[72px]">
          <Logo />
          <MegaNav />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-parchment/8"
              aria-label="Search"
            >
              <Search className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <Link href="/account" className="hidden size-10 place-items-center rounded-full hover:bg-parchment/8 sm:grid" aria-label="Account">
              <User className="size-5" strokeWidth={1.5} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-full hover:bg-parchment/8"
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
      </header>

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
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          {[
            { title: "Shop", href: "/shop", items: mainNav.shop },
            { title: "Puja and Pandits", href: "/puja-services", items: mainNav.puja },
            { title: "Decorations", href: "/decorations-events", items: mainNav.decorations },
            { title: "More", href: "/about", items: mainNav.more },
          ].map((g) => (
            <details key={g.title} className="mb-2 border-b border-line/70 pb-2">
              <summary className="cursor-pointer list-none px-3 py-2 font-serif text-xl text-gold-soft">{g.title}</summary>
              <ul className="pb-2">
                <li>
                  <Link href={g.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-sm text-gold-soft">
                    Overview
                  </Link>
                </li>
                {g.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-sm text-parchment/80">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </Sheet>

      <MobileTabBar onMenu={() => setMenuOpen(true)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
