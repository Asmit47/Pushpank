import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Languages, MapPin } from "lucide-react";
import { getPandit, pandits } from "@/data/pandits";
import { services } from "@/data/services";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { personSchema } from "@/lib/seo";

export function generateStaticParams() {
  return pandits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pandit = getPandit(slug);
  if (!pandit) return { title: "Pandit" };
  return {
    title: `${pandit.name} · ${pandit.title}`,
    description: pandit.bio,
    alternates: { canonical: `/pandits/${slug}` },
    openGraph: { images: [pandit.image.src] },
  };
}

export default async function PanditProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pandit = getPandit(slug);
  if (!pandit) notFound();
  const rituals = services.filter((s) => pandit.specialities.includes(s.slug));

  const facts = [
    { icon: Clock, label: "Experience", value: `${pandit.years} years` },
    { icon: Languages, label: "Languages", value: pandit.languages.join(", ") },
    { icon: MapPin, label: "Serves", value: pandit.areas.join(", ") },
  ];

  return (
    <Container className="py-10 lg:py-14">
      <JsonLd data={personSchema({ ...pandit, slug, image: pandit.image.src })} />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Pandits", href: "/pandits" }, { label: pandit.name }]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="relative mx-auto w-full max-w-[320px]">
          <span aria-hidden className="absolute -inset-3 rounded-[24px] border border-gold/25" />
          <Image
            src={pandit.image.src}
            alt={pandit.image.alt}
            width={640}
            height={640}
            priority
            sizes="(min-width: 1024px) 320px, 80vw"
            className="aspect-square w-full rounded-[20px] object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <p className="eyebrow">Pandit profile</p>
          <h1 className="display-section mt-3 text-gold-soft">{pandit.name}</h1>
          <p className="mt-2 text-muted">{pandit.title}</p>
          <p className="mt-5 leading-relaxed text-parchment/85">{pandit.bio}</p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-sanctum/70 p-4">
                <dt className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  <Icon className="size-3.5" strokeWidth={1.5} aria-hidden />
                  {label}
                </dt>
                <dd className="mt-1.5 text-sm text-parchment/85">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="display-section mt-12 text-gold-soft">Book a ritual</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {rituals.map((s) => (
              <li key={s.slug}>
                <Button href={`/puja-services/${s.slug}#book`} variant="secondary" size="sm">
                  {s.name}
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            <Link href="/pandits" className="text-gold-soft underline-offset-4 hover:underline">
              All pandits
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
