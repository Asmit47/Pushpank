import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          id="categories"
          eyebrow="The store"
          title="What we keep"
          description="Fresh from the market each morning, and everything the ritual needs."
        />
        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-6 md:grid-rows-2">
            {categories.map((c, i) => (
              <li key={c.slug} className={i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3 lg:col-span-1"}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative block h-44 overflow-hidden rounded-card border border-line/80 md:h-full md:min-h-36"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image.src} alt="" className="img-zoom size-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/20 to-transparent" />
                  <span
                    aria-hidden
                    className="absolute right-3.5 top-3.5 grid size-8 place-items-center rounded-full border border-gold/40 bg-night/40 text-gold-soft opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="absolute bottom-4 left-4 right-4">
                    {i === 0 && (
                      <span lang="hi" className="mantra block text-sm text-gold-soft/90">
                        {c.hindi}
                      </span>
                    )}
                    <span className={i === 0 ? "block font-serif text-3xl text-parchment" : "block font-serif text-xl text-parchment"}>
                      {c.name}
                    </span>
                    {i === 0 && <span className="mt-1.5 block max-w-sm text-sm leading-relaxed text-parchment/70">{c.description}</span>}
                  </span>
                </Link>
              </li>
            ))}
            <li className="md:col-span-3 lg:col-span-1">
              <Link
                href="/shop"
                className="group flex h-44 flex-col justify-between overflow-hidden rounded-card border border-gold/30 bg-gold/[0.06] p-5 transition-colors duration-300 hover:bg-gold/[0.12] md:h-full md:min-h-36"
              >
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full border border-gold/50 text-gold transition-transform duration-300 group-hover:rotate-45"
                >
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span lang="hi" className="mantra block text-sm text-gold-soft/80">
                    सम्पूर्ण
                  </span>
                  <span className="block font-serif text-xl text-parchment">Shop everything</span>
                </span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
