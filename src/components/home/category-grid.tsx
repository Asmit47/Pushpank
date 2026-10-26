import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories" className="py-14 lg:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 id="categories" className="text-3xl leading-[1.1] text-gold-soft sm:text-4xl">
                <span lang="hi" aria-hidden className="mantra mr-3 text-gold">
                  पुष्प
                </span>
                What we keep
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Everything for daily worship and the festive calendar, arranged shelf by shelf.
              </p>
            </div>
            <Button href="/shop" variant="secondary" size="sm" className="self-start sm:self-auto">
              Browse the shop <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        <Stagger className="mt-8 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[14rem]">
          {categories.map((c, i) => (
            <StaggerItem
              key={c.slug}
              className={i === 0 ? "col-span-2 row-span-2" : undefined}
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block h-full overflow-hidden rounded-[20px] border border-line transition-colors duration-300 hover:border-gold/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image.src}
                  alt=""
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-night/10"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="block font-serif text-xl leading-snug text-parchment lg:text-2xl">
                    {c.name}
                  </span>
                  {i === 0 && (
                    <span className="mt-1.5 hidden max-w-sm text-sm leading-relaxed text-parchment/75 md:block">
                      {c.description}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden
                  className="absolute right-4 top-4 grid size-9 translate-y-1.5 place-items-center rounded-full border border-gold/40 bg-night/55 opacity-0 backdrop-blur transition duration-300 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ArrowUpRight className="size-4 text-gold" strokeWidth={1.5} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
