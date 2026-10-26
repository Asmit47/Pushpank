import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuoteForm } from "@/components/services/quote-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { decorationCategories, decorationSteps } from "@/data/decorations";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Decorations and event arrangements",
  description:
    "Floral decoration, havan setup and festival arrangements in Lucknow. Request a custom quote based on your venue and requirements.",
  alternates: { canonical: "/decorations-events" },
};

export default function DecorationsPage() {
  return (
    <>
      <Container className="pt-8 lg:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Decorations & Events" }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-gold-soft sm:text-6xl">
            Decorations and arrangements for your puja or event
          </h1>
          <p className="mt-4 text-lg text-parchment/75">
            From a home puja corner to a festival setup. Every arrangement is quoted on your venue, materials and scope.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="#arrangements" size="lg" variant="secondary">
              Explore arrangements
            </Button>
            <Button href="#quote" size="lg">
              Request a quote
            </Button>
          </div>
        </header>
      </Container>

      <section id="arrangements" aria-labelledby="arrangements-title" className="scroll-mt-24 py-14 lg:py-20">
        <Container>
          <SectionHeading id="arrangements-title" title="What we arrange" />
          <div className="mt-8 space-y-10">
            {decorationCategories.map((d, i) => (
              <Reveal key={d.slug}>
                <article
                  id={d.slug}
                  className="grid scroll-mt-28 items-center gap-6 overflow-hidden rounded-3xl border border-line bg-sanctum md:grid-cols-2"
                >
                  <Media
                    src={d.image.src}
                    alt={d.image.alt}
                    width={1024}
                    height={768}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    wrapperClassName={cn("aspect-[4/3] md:h-full", i % 2 === 1 && "md:order-2")}
                    className="size-full"
                  />
                  <div className="p-6 sm:p-9">
                    <h3 className="text-3xl font-semibold text-gold-soft">{d.name}</h3>
                    <p className="mt-3 text-parchment/75">{d.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                      {d.examples.map((e) => (
                        <li key={e} className="rounded-full bg-night px-3 py-1">
                          {e}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted">Pricing depends on venue, materials and scope.</p>
                    <Button href="#quote" size="sm" variant="secondary" className="mt-5">
                      Request a quote
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-title" className="bg-sanctum/80 py-14 lg:py-16">
        <Container>
          <SectionHeading id="how-title" title="How it works" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decorationSteps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-sanctum p-5">
                <span className="font-serif text-4xl font-semibold text-gold">{i + 1}</span>
                <h3 className="mt-2 font-sans text-base font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-parchment/75">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            Service area: {site.delivery.city} and nearby areas. Tell us your venue and we will confirm.
          </p>
        </Container>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-24 py-14 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            id="quote-title"
            title="Request a custom quote"
            description="Tell us about your event. A quote request does not confirm the service."
            align="center"
          />
          <div className="mt-8 rounded-3xl border border-line bg-sanctum p-5 shadow-card sm:p-8">
            <QuoteForm />
          </div>
          <p className="mt-5 text-center text-sm text-muted">
            Prefer to talk?{" "}
            <a href={whatsappLink("Hello Pushpank, I would like a decoration quote.")} className="font-medium text-gold-soft underline">
              Message us on WhatsApp
            </a>
            .
          </p>
        </Container>
      </section>

      <section aria-labelledby="decor-faq" className="pb-6">
        <Container className="max-w-3xl">
          <SectionHeading id="decor-faq" title="Decoration FAQs" align="center" />
          <div className="mt-6">
            <FaqList
              faqs={[
                { question: "Is there a fixed price?", answer: "Not for custom work. We quote based on venue, materials and scope after reviewing your request." },
                { question: "Does a quote request confirm my booking?", answer: "No. The service is confirmed only after you accept our quote." },
                { question: "How far in advance should I ask?", answer: "As early as you can. Share your date in the request and we will tell you what is possible." },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
