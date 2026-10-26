import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { Container } from "@/components/ui/container";
import { occasions } from "@/data/occasions";
import { getAllProducts } from "@/lib/catalog";
import { pandits } from "@/data/pandits";

export function BestsellersRail() {
  const items = getAllProducts().filter((p) => p.badge === "Bestseller").slice(0, 8);
  return (
    <section aria-labelledby="bestsellers" className="py-14">
      <Container>
        <h2 id="bestsellers" className="text-3xl text-gold-soft sm:text-4xl">
          Bestsellers
        </h2>
        <div className="mt-3 h-px w-full bg-gold/30" />
        <ul className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4">
          {items.map((p) => (
            <li key={p.id} className="w-[240px] shrink-0 snap-start sm:w-[260px]">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function OccasionRail() {
  return (
    <section aria-labelledby="occasions" className="pb-8">
      <Container>
        <h2 id="occasions" className="text-3xl text-gold-soft sm:text-4xl">
          Shop by occasion
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {occasions.slice(0, 4).map((o) => (
            <li key={o.slug}>
              <Link href={`/shop?occasion=${o.slug}`} className="group relative block h-40 overflow-hidden rounded-[20px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.image.src} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                <span className="absolute bottom-3 left-4">
                  <span className="block font-serif text-2xl text-parchment">{o.name}</span>
                  <span lang="hi" className="mantra text-sm text-gold-soft">{o.hindi}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function KitsFeature() {
  const kits = getAllProducts().filter((p) => p.collections.includes("puja-kits")).slice(0, 4);
  const [hero, ...rest] = kits;
  if (!hero) return null;
  return (
    <section aria-labelledby="kits" className="py-14">
      <Container>
        <h2 id="kits" className="text-3xl text-gold-soft sm:text-4xl">Complete kits</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Link href={`/products/${hero.slug}`} className="relative min-h-[320px] overflow-hidden rounded-[20px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.images[0].src} alt="" className="absolute inset-0 size-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-r from-night via-night/50 to-transparent" />
            <span className="relative flex h-full flex-col justify-end p-6">
              <span className="font-serif text-4xl text-gold-soft">{hero.name}</span>
              <span className="mt-2 max-w-sm text-sm text-parchment/80">{hero.shortDescription}</span>
            </span>
          </Link>
          <ul className="grid gap-3">
            {rest.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.slug}`} className="flex items-center gap-3 rounded-[20px] border border-line bg-sanctum p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0].src} alt="" className="size-16 rounded-xl object-cover" />
                  <span>{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function FestiveBento() {
  const items = getAllProducts().filter((p) => p.badge === "Festive").slice(0, 4);
  return (
    <section aria-labelledby="festive" className="py-8">
      <Container>
        <h2 id="festive" className="text-3xl text-gold-soft sm:text-4xl">Festive picks</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function PanditTeaser() {
  return (
    <section aria-labelledby="pandit-teaser" className="relative py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="pandit-teaser" className="text-3xl text-gold-soft sm:text-4xl">Meet our pandits</h2>
          <Link href="/pandits/register" className="text-sm text-gold-soft underline">Join as a pandit</Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pandits.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link href={`/pandits/${p.slug}`} className="flex gap-4 rounded-[20px] border border-gold/20 bg-sanctum p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image.src} alt="" className="size-20 rounded-full object-cover" />
                <span>
                  <span className="block font-serif text-2xl text-gold-soft">{p.name}</span>
                  <span className="text-sm text-muted">{p.areas[0]} · {p.years} years</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
