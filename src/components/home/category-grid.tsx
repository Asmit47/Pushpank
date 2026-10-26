import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategories } from "@/lib/catalog";

export function CategoryGrid() {
  const categories = getCategories();
  return (
    <section aria-labelledby="shop-by-category" className="py-12 lg:py-16">
      <Container>
        <SectionHeading
          id="shop-by-category"
          eyebrow="Shop"
          title="Shop by category"
          description="Pick a collection and start adding to your cart."
        />
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-6">
          {categories.map((c, i) => (
            <StaggerItem
              key={c.slug}
              className={
                i < 2 ? "col-span-1 lg:col-span-3" : i === 4 ? "col-span-2 lg:col-span-2" : "col-span-1 lg:col-span-2"
              }
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              >
                <Media
                  src={c.image.src}
                  alt={c.image.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  wrapperClassName={i === 4 ? "aspect-[2/1] lg:aspect-[4/3]" : "aspect-[4/3]"}
                  className="size-full transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-3.5 pt-12 text-ivory sm:p-5 sm:pt-16">
                  <h3 className="flex items-center justify-between gap-2 font-serif text-xl font-semibold leading-tight sm:text-2xl">
                    {c.name}
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
