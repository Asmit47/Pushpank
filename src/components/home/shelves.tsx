import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MantraWatermark } from "@/components/home/mantra";
import { ProductCard } from "@/components/shop/product-card";
import { Container } from "@/components/ui/container";
import { Rail } from "@/components/ui/rail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { occasions } from "@/data/occasions";
import { pandits } from "@/data/pandits";
import { loadStorefrontContent } from "@/lib/storefront";

export async function BestsellersRail() {
  const { products } = await loadStorefrontContent();
  const items = products.filter((p) => p.badge === "Bestseller").slice(0, 8);
  return (
    <section aria-labelledby="bestsellers" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          id="bestsellers"
          eyebrow="Loved by Lucknow"
          title="Bestsellers"
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-gold-soft underline-offset-4 transition-colors hover:text-gold hover:underline sm:self-auto"
            >
              View all <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
            </Link>
          }
        />
        {/* Bleed the track past the container gutter so cards peek at the edges. */}
        <Rail label="Bestsellers" className="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {items.map((p) => (
            <li key={p.id} className="w-[248px] shrink-0 snap-start sm:w-[272px]">
              <ProductCard product={p} />
            </li>
          ))}
        </Rail>
      </Container>
    </section>
  );
}

export function OccasionRail() {
  return (
    <section aria-labelledby="occasions" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          id="occasions"
          eyebrow="For every occasion"
          title="Shop by occasion"
          description="From daily worship to the biggest festivals of the year."
        />
        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {occasions.slice(0, 4).map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/shop?occasion=${o.slug}`}
                  className="group relative block h-44 overflow-hidden rounded-card border border-line/80 md:h-52"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.image.src} alt="" className="img-zoom size-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/25 to-transparent" />
                  <span
                    aria-hidden
                    className="absolute right-3.5 top-3.5 grid size-8 place-items-center rounded-full border border-gold/40 bg-night/40 text-gold-soft opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="absolute bottom-4 left-4">
                    <span className="block font-serif text-2xl text-parchment">{o.name}</span>
                    <span lang="hi" className="mantra text-sm text-gold-soft/90">
                      {o.hindi}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export function PanditTeaser() {
  return (
    <section aria-labelledby="pandit-teaser" className="sanctum-glow relative py-16 lg:py-24">
      <MantraWatermark text="श्री गणेशाय नमः" />
      <Container>
        <SectionHeading
          id="pandit-teaser"
          eyebrow="Pandits"
          title="Meet our pandits"
          description="Experienced ritual priests for worship at home, verified for the rituals they lead."
          action={
            <Link
              href="/pandits/register"
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-gold-soft underline-offset-4 transition-colors hover:text-gold hover:underline sm:self-auto"
            >
              Join as a pandit <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
            </Link>
          }
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pandits.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/pandits/${p.slug}`}
                className="group flex h-full items-center gap-5 rounded-card border border-line bg-sanctum/80 p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift motion-reduce:transition-none"
              >
                <span className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image.src} alt="" className="size-20 rounded-full object-cover ring-1 ring-gold/30 transition-shadow duration-300 group-hover:ring-gold/60" />
                  <span aria-hidden className="absolute inset-0 rounded-full shadow-[inset_0_0_0_4px_rgb(18_10_11/0.6)]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[1.45rem] leading-tight text-gold-soft">{p.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {p.title} · {p.years} years
                  </span>
                  <span className="mt-1 block truncate text-sm text-parchment/60">Serves {p.areas.slice(0, 2).join(", ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
