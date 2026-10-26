import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, site, whatsappLink } from "@/data/site";
import { Logo } from "./logo";

const forPandits = [
  { label: "Our Pandits", href: "/pandits" },
  { label: "Join as a Pandit", href: "/pandits/register" },
  { label: "Application status", href: "/account" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold text-gold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-parchment/75 hover:text-gold-soft hover:underline">
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
    <footer className="mt-24 border-t border-line bg-maroon-900 pb-24 text-parchment lg:pb-0">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="max-w-xs lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-parchment/70">{site.tagline}.</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-parchment/80">
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
          </div>
          <Column title="Shop" links={mainNav.shop} />
          <Column title="Puja" links={mainNav.puja} />
          <Column title="More" links={[...mainNav.more, ...mainNav.decorations]} />
          <Column title="For Pandits" links={forPandits} />
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-gold/15 pt-6 text-sm text-parchment/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pushpank. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/shipping-returns" className="hover:text-gold-soft">Delivery and refunds</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-soft">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-gold-soft">Terms</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
