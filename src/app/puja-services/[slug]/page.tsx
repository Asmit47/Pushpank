import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BookingForm } from "@/components/services/booking-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappLink } from "@/data/site";
import { getService, getServices } from "@/lib/catalog";
import { serviceSchema } from "@/lib/seo";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/puja-services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} puja booking`,
    description: service.tagline,
    alternates: { canonical: `/puja-services/${slug}` },
    openGraph: { images: [service.image.src] },
  };
}

function List({ items, tone }: { items: string[]; tone: "yes" | "no" }) {
  const Icon = tone === "yes" ? Check : X;
  return (
    <ul className="mt-3 space-y-2 text-[0.95rem]">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <Icon className={`mt-0.5 size-4 shrink-0 ${tone === "yes" ? "text-tulsi" : "text-muted"}`} aria-hidden />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: PageProps<"/puja-services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const indicativePrices = service.packages.map((p) => p.indicativePrice).filter((p): p is number => p !== undefined);

  return (
    <Container className="py-8 lg:py-12">
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.tagline,
          slug,
          image: service.image.src,
          fromPrice: indicativePrices.length ? Math.min(...indicativePrices) : undefined,
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Book a Puja", href: "/puja-services" },
          { label: service.name },
        ]}
      />

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Puja service</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-gold-soft sm:text-5xl">{service.name}</h1>
          <p className="mt-4 text-lg text-parchment/75">{service.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-gold" aria-hidden />
              {service.duration}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden />
              {service.coverage}
            </li>
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="#book" size="lg">
              Request a booking
            </Button>
            <Button href={whatsappLink(`Hello Pushpank, I have a question about ${service.name}.`)} variant="secondary" size="lg">
              Ask on WhatsApp
            </Button>
          </div>
        </div>
        <Media
          src={service.image.src}
          alt={service.image.alt}
          width={1024}
          height={768}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          wrapperClassName="aspect-[4/3] rounded-card border border-line"
          className="size-full"
        />
      </div>

      <Reveal className="mt-14">
        <SectionHeading title="Package options" description="Prices are indicative. The final amount is confirmed by our team." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {service.packages.map((p) => (
            <div key={p.id} className="rounded-panel border border-line bg-sanctum p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold text-gold-soft">{p.name}</h3>
                {p.indicativePrice && (
                  <p className="text-right text-sm">
                    <span className="block text-xs text-muted">Indicative</span>
                    <strong className="text-base">{formatPrice(p.indicativePrice)}</strong>
                  </p>
                )}
              </div>
              <p className="mt-1 text-sm text-parchment/75">{p.description}</p>
              <List items={p.includes} tone="yes" />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14 grid gap-6 md:grid-cols-3">
        <section className="rounded-panel border border-line bg-sanctum p-6">
          <h2 className="text-2xl font-semibold text-gold-soft">Included</h2>
          <List items={service.inclusions} tone="yes" />
        </section>
        <section className="rounded-panel border border-line bg-sanctum p-6">
          <h2 className="text-2xl font-semibold text-gold-soft">Not included</h2>
          <List items={service.exclusions} tone="no" />
        </section>
        <section className="rounded-panel border border-line bg-sanctum p-6">
          <h2 className="text-2xl font-semibold text-gold-soft">What you need to provide</h2>
          <List items={service.customerProvides} tone="yes" />
        </section>
      </Reveal>

      <section id="book" aria-labelledby="book-title" className="mt-16 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading id="book-title" title={`Request a ${service.name} booking`} description="Share your details and our team will check availability and get back to you." />
            <ol className="mt-6 space-y-3 text-sm text-parchment/80">
              <li>1. Send the request. Nothing is charged.</li>
              <li>2. We check pandit availability for your date.</li>
              <li>3. We contact you to confirm or suggest another slot.</li>
            </ol>
            <section className="mt-8 rounded-panel bg-sanctum p-5 text-sm">
              <h3 className="font-sans text-base font-semibold">Cancellation and rescheduling</h3>
              <p className="mt-2 leading-relaxed text-parchment/75">{service.cancellationPolicy}</p>
            </section>
          </div>
          <div className="rounded-card border border-line bg-sanctum p-5 shadow-card sm:p-8">
            <BookingForm service={service} />
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section aria-labelledby="service-faq" className="mx-auto mt-16 max-w-3xl">
          <SectionHeading id="service-faq" title={`${service.name} FAQs`} align="center" />
          <div className="mt-6">
            <FaqList faqs={service.faqs} />
          </div>
        </section>
      )}
    </Container>
  );
}
