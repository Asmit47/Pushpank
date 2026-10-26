"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarHeart, House, Menu, ShoppingBag, Store } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart, useCartHydrated } from "@/lib/cart-store";

export function MobileTabBar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const hydrated = useCartHydrated();
  const count = hydrated ? items.reduce((n, i) => n + i.quantity, 0) : 0;
  const hidden = ["/checkout", "/cart"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  const tabs = [
    { href: "/", label: "Home", icon: House, on: pathname === "/" },
    { href: "/shop", label: "Shop", icon: Store, on: pathname.startsWith("/shop") || pathname.startsWith("/collections") || pathname.startsWith("/products") },
    { href: "/puja-services", label: "Book Puja", icon: CalendarHeart, on: pathname.startsWith("/puja-services") },
    { href: "/cart", label: "Cart", icon: ShoppingBag, on: pathname.startsWith("/cart"), count },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((t) => (
          <li key={t.href}>
            <Link href={t.href} aria-current={t.on ? "page" : undefined} className={cn("relative flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]", t.on ? "text-gold-soft" : "text-muted")}>
              <t.icon className="size-5" strokeWidth={1.5} aria-hidden />
              {t.label}
              {t.count ? <span className="absolute right-4 top-1 grid min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-night">{t.count}</span> : null}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" onClick={onMenu} className="flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[11px] text-muted">
            <Menu className="size-5" strokeWidth={1.5} aria-hidden />
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
