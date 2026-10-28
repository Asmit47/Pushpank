import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, site, whatsappLink } from "@/data/site";
import { FooterYear } from "./footer-year";
import { Logo } from "./logo";

const forPandits = [
  { label: "Our Pandits", href: "/pandits" },
  { label: "Join as a Pandit", href: "/pandits/register" },
  { label: "Application status", href: "/account" },
];

const help = [
  { label: "FAQs", href: "/faq" },
  { label: "Track order", href: "/track" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.9rem] lg:mt-3 lg:space-y-1.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-parchment/70 transition-colors hover:text-gold-soft">
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
    <footer className="relative mt-16 overflow-hidden border-t border-gold/20 bg-maroon-900/70 pb-24 text-parchment lg:pb-0">
      <p aria-hidden lang="hi" className="mantra pointer-events-none absolute -right-6 bottom-0 select-none text-[8rem] leading-none text-gold/[0.05] lg:text-[6rem]">
        पुष्पांक
      </p>
      <Container className="relative py-12 lg:py-10">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-y-8">
          <div className="max-w-xs lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-parchment/70 lg:mt-3">{site.tagline}.</p>
            <address className="mt-5 space-y-2 text-sm not-italic text-parchment/80 lg:mt-4 lg:space-y-1">
              <p>{site.contact.address}</p>
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="underline-offset-4 transition-colors hover:text-gold-soft hover:underline">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 transition-colors hover:text-gold-soft hover:underline">
                  WhatsApp support
                </a>
              </p>
              <p className="text-parchment/60">{site.contact.hours}</p>
            </address>
          </div>
          <Column title="Shop" links={mainNav.shop.slice(1)} />
          <Column title="Puja" links={mainNav.puja.slice(0, 3)} />
          <Column title="Celebrations" links={mainNav.decorations} />
          <div className="space-y-8 lg:space-y-6">
            <Column title="Help" links={help} />
            <Column title="For Pandits" links={forPandits} />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-gold/15 pt-6 text-[0.8rem] text-parchment/55 md:flex-row md:items-center md:justify-between lg:mt-8 lg:gap-3 lg:pt-5">
          <p>© <FooterYear initial={new Date().getFullYear()} /> Pushpank. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/shipping-returns" className="transition-colors hover:text-gold-soft">Delivery and refunds</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-gold-soft">Privacy</Link></li>
            <li><Link href="/terms" className="transition-colors hover:text-gold-soft">Terms</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
