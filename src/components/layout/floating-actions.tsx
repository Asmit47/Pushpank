"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarHeart, MessageCircle, ShoppingBasket } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";

/** Routes where fixed UI must stay out of the way of forms and totals. */
const HIDDEN_ON = ["/cart", "/checkout", "/order-confirmation"];

export function FloatingActions() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const onShop = ["/shop", "/collections", "/products"].some((p) => pathname.startsWith(p));
  const onBook = ["/puja-services", "/bookings"].some((p) => pathname.startsWith(p));

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pushpank on WhatsApp"
        className="fixed bottom-20 right-4 z-30 grid size-12 place-items-center rounded-full bg-forest text-ivory shadow-lift transition-transform hover:scale-105 lg:bottom-6 lg:right-6 lg:size-14"
      >
        <MessageCircle className="size-6" aria-hidden />
      </a>

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2 p-2">
          <Link
            href="/shop"
            aria-current={onShop ? "page" : undefined}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium",
              onShop ? "bg-maroon text-ivory" : "bg-maroon/10 text-maroon",
            )}
          >
            <ShoppingBasket className="size-4" aria-hidden />
            Shop
          </Link>
          <Link
            href="/puja-services"
            aria-current={onBook ? "page" : undefined}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium",
              onBook ? "bg-maroon text-ivory" : "bg-maroon/10 text-maroon",
            )}
          >
            <CalendarHeart className="size-4" aria-hidden />
            Book a Puja
          </Link>
        </div>
      </nav>
    </>
  );
}
