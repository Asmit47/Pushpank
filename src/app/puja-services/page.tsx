import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/home/service-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServices } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Book a puja or pandit",
  description:
    "Browse rituals such as Griha Pravesh, Satyanarayan Katha and Havan, see what is included, and request a booking.",
  alternates: { canonical: "/puja-services" },
};

const steps = [
  { title: "Choose a ritual", body: "See what is included, expected duration and what you need to arrange." },
  { title: "Send a request", body: "Share your date, time window and address. No payment at this step." },
  { title: "We confirm availability", body: "Our team checks pandit availability and contacts you." },
  { title: "Puja day", body: "The pandit arrives at the agreed time. Track status on your booking page." },
];

export default function PujaServicesPage() {
  const services = getServices();
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book a Puja" }]} />
      <header className="mt-4 max-w-2xl">
        <h1 className="text-4xl font-semibold text-gold-soft sm:text-5xl">Book a puja or pandit</h1>
        <p className="mt-3 text-muted">
          Choose a ritual and send a booking request. A request is confirmed only after our team verifies pandit
          availability.
        </p>
      </header>

      <div id="rituals" className="scroll-mt-28">
      <Stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, index) => (
          <StaggerItem key={s.slug} index={index}>
            <ServiceCard service={s} eagerImage={index === 0} />
          </StaggerItem>
        ))}
      </Stagger>
      </div>

      <section id="packages" aria-labelledby="packages-title" className="mt-16 scroll-mt-24">
        <SectionHeading id="packages-title" title="Puja packages" description="Prices are indicative. The final amount is confirmed by our team when your booking is confirmed." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.flatMap((s) =>
            s.packages.map((p) => (
              <div key={p.id} className="flex flex-col rounded-2xl border border-line bg-sanctum p-5">
                <p className="text-xs uppercase tracking-wide text-muted">{s.name}</p>
                <h3 className="mt-1 text-2xl font-semibold text-gold-soft">{p.name}</h3>
                <p className="mt-1 text-sm text-parchment/75">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  {p.includes.map((i) => (
                    <li key={i} className="rounded-full bg-night px-2.5 py-1">
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <p className="text-sm">
                    {p.indicativePrice ? (
                      <>
                        <span className="text-muted">Indicative </span>
                        <strong>{formatPrice(p.indicativePrice)}</strong>
                      </>
                    ) : (
                      <span className="text-muted">Quoted on request</span>
                    )}
                  </p>
                  <Button href={`/puja-services/${s.slug}#book`} size="sm">
                    Request booking
                  </Button>
                </div>
              </div>
            )),
          )}
        </div>
      </section>

      <section aria-labelledby="how-it-works" className="mt-16">
        <SectionHeading id="how-it-works" title="How booking works" />
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-sanctum p-5">
              <span className="font-serif text-4xl font-semibold text-gold">{i + 1}</span>
              <h3 className="mt-2 font-sans text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-parchment/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="booking-faq" className="mx-auto mt-16 max-w-3xl">
        <SectionHeading id="booking-faq" title="Booking questions" align="center" />
        <div className="mt-6">
          <FaqList
            faqs={[
              {
                question: "Is a booking confirmed immediately?",
                answer: "No. You send a request and our team confirms after checking pandit availability.",
              },
              {
                question: "Do I pay when I submit the request?",
                answer: "No. Payment is not collected on the request form. We share payment details when your booking is confirmed.",
              },
              {
                question: "Can I change or cancel a booking?",
                answer: "Yes. Contact us from your booking page or on WhatsApp and we will help with a reschedule or cancellation.",
              },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}
