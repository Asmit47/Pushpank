import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { mainNav, site, whatsappLink } from "@/data/site";

const secondary = [
  { label: "About Pushpank", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Track order or booking", href: "/track" },
];

const legal = [
  { label: "Delivery, cancellation & refunds", href: "/shipping-returns" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-ivory/80 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-charcoal pb-20 text-ivory lg:pb-0">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">{site.tagline}.</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-ivory/80">
              <p>{site.contact.address}</p>
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp support
                </a>
              </p>
              <p>{site.contact.hours}</p>
            </address>
            {site.social.length > 0 && (
              <ul className="mt-4 flex gap-4 text-sm">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Column title="Shop" links={mainNav.shop} />
          <Column title="Puja services" links={mainNav.book} />
          <Column title="Decorations & events" links={mainNav.decorations} />
          <Column title="Pushpank" links={secondary} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pushpank. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
