import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPandit, pandits } from "@/data/pandits";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return pandits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pandit = getPandit(slug);
  if (!pandit) return { title: "Pandit" };
  return { title: pandit.name, description: pandit.bio };
}

export default async function PanditProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pandit = getPandit(slug);
  if (!pandit) notFound();
  const rituals = services.filter((s) => pandit.specialities.includes(s.slug));

  return (
    <Container className="py-10">
      <p className="text-sm text-gold">Placeholder profile</p>
      <div className="mt-4 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pandit.image.src} alt={pandit.image.alt} className="aspect-square w-full rounded-[20px] object-cover" />
        <div>
          <h1 className="text-4xl text-gold-soft sm:text-5xl">{pandit.name}</h1>
          <p className="mt-2 text-muted">{pandit.title} · {pandit.years} years · {pandit.languages.join(", ")}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-parchment/85">{pandit.bio}</p>
          <p className="mt-4 text-sm">Serves {pandit.areas.join(", ")}.</p>
          <h2 className="mt-8 text-2xl text-gold-soft">Book a ritual</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {rituals.map((s) => (
              <li key={s.slug}>
                <Button href={`/puja-services/${s.slug}#book`} variant="secondary" size="sm">{s.name}</Button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            <Link href="/pandits" className="text-gold-soft underline">All pandits</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
