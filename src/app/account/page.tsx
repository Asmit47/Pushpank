import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ui/content-page";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

const links = [
  { href: "/account/orders", title: "Orders", body: "Guest checkout does not keep a history here yet. Track a reference instead." },
  { href: "/account/bookings", title: "Bookings", body: "Puja requests are confirmed by phone. Open one with its reference." },
  { href: "/track", title: "Track", body: "Look up an order, booking or pandit application." },
  { href: "/pandits/register", title: "Pandit application", body: "Register, then keep the reference to check status." },
];

export default function AccountPage() {
  return (
    <ContentPage title="Account" intro="Pushpank still works as a guest. These links take you to orders, bookings and a pandit application.">
      <ul className="grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-[20px] border border-line bg-sanctum p-5 hover:border-gold/50">
              <h2 className="text-2xl text-gold-soft">{l.title}</h2>
              <p className="mt-2 text-sm text-parchment/75">{l.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
