import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentPage } from "@/components/ui/content-page";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pushpank for orders, pandit bookings and decoration enquiries.",
};

export default function ContactPage() {
  const c = site.contact;
  const items = [
    { icon: Phone, label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: "Address", value: c.address },
    { icon: Clock, label: "Business hours", value: c.hours },
  ];
  return (
    <ContentPage title="Contact us" intro="Questions about an order, a booking or an arrangement? Reach us any of these ways.">
      {c.isPlaceholder && (
        <p className="rounded-xl border border-gold/50 bg-gold-900/60 p-4 text-sm">
          <strong>Placeholder details.</strong> Replace the phone, WhatsApp, email, address and hours with verified
          information before launch (see <code>src/data/site.ts</code>).
        </p>
      )}
      <div className="rounded-panel border border-line bg-sanctum p-6">
        <div className="flex items-start gap-4">
          <MessageCircle className="mt-1 size-6 shrink-0 text-tulsi" aria-hidden />
          <div>
            <h2>WhatsApp</h2>
            <p className="text-sm">The quickest way to ask about an order, a booking or an arrangement.</p>
            <Button href={whatsappLink()} variant="green" className="mt-4" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
      <ul className="grid gap-4 list-none! pl-0! sm:grid-cols-2">
        {items.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="rounded-panel border border-line bg-sanctum p-5">
            <Icon className="size-5 text-gold" aria-hidden />
            <p className="mt-3 text-sm text-muted">{label}</p>
            {href ? (
              <a href={href} className="font-medium no-underline! hover:underline!">
                {value}
              </a>
            ) : (
              <p className="font-medium">{value}</p>
            )}
          </li>
        ))}
      </ul>
      {site.social.length > 0 && (
        <section>
          <h2>Follow us</h2>
          <ul>
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ContentPage>
  );
}
