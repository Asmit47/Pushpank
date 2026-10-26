"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, PackageSearch, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Container } from "@/components/ui/container";
import { Sheet } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { useCart, useCartHydrated } from "@/lib/cart-store";
import { Logo } from "./logo";
import { SearchDialog } from "./search-dialog";

type NavGroup = {
  label: string;
  href: string;
  match: string[];
  items: { label: string; href: string }[];
};

const groups: NavGroup[] = [
  { label: "Shop", href: "/shop", match: ["/shop", "/collections", "/products"], items: mainNav.shop },
  { label: "Book a Puja", href: "/puja-services", match: ["/puja-services", "/bookings"], items: mainNav.book },
  { label: "Decorations & Events", href: "/decorations-events", match: ["/decorations-events"], items: mainNav.decorations },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const openCart = useCart((s) => s.openDrawer);
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const count = hydrated ? items.reduce((n, i) => n + i.quantity, 0) : 0;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="-ml-2 grid size-10 place-items-center rounded-full hover:bg-charcoal/5 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
            >
              <Menu className="size-6" aria-hidden />
            </button>
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {groups.map((g) => {
              const active = g.match.some((m) => pathname.startsWith(m));
              return (
                <div key={g.label} className="group relative">
                  <Link
                    href={g.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors hover:bg-maroon/5 hover:text-maroon",
                      active && "text-maroon",
                    )}
                  >
                    {g.label}
                    <ChevronDown
                      className="size-4 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-10 w-64 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                      {g.items.map((item) => (
                        <li key={item.href + item.label}>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2 text-sm hover:bg-ivory hover:text-maroon"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full hover:bg-charcoal/5"
              aria-label="Search"
              aria-haspopup="dialog"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <Link
              href="/track"
              className="hidden size-10 place-items-center rounded-full hover:bg-charcoal/5 sm:grid"
              aria-label="Track order or booking"
            >
              <PackageSearch className="size-5" aria-hidden />
            </Link>
            <Link
              href="/account"
              className="hidden size-10 place-items-center rounded-full hover:bg-charcoal/5 sm:grid"
              aria-label="Account"
            >
              <User className="size-5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-full hover:bg-charcoal/5"
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              aria-haspopup="dialog"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {count > 0 && (
                <span
                  aria-hidden
                  className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-maroon px-1 text-[11px] font-semibold leading-5 text-ivory"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </Container>
      </header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="left" label="Menu">
        <div className="border-b border-line px-5 py-4">
          <Logo />
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          {groups.map((g) => (
            <div key={g.label} className="mb-3">
              <Link
                href={g.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2 font-serif text-xl font-semibold text-maroon hover:bg-maroon/5"
              >
                {g.label}
              </Link>
              <ul className="ml-3 border-l border-line pl-3">
                {g.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-[0.95rem] text-charcoal/80 hover:bg-charcoal/5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="mt-2 border-t border-line pt-3 text-[0.95rem]">
            {[
              { label: "Track order or booking", href: "/track" },
              { label: "Account", href: "/account" },
              { label: "FAQs", href: "/faq" },
              { label: "Contact", href: "/contact" },
              { label: "About Pushpank", href: "/about" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-charcoal/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Sheet>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
