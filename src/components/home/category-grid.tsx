import Link from "next/link";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories" className="py-10">
      <Container>
        <h2 id="categories" className="text-3xl text-gold-soft sm:text-4xl">
          <span lang="hi" className="mantra mr-3 text-gold">पुष्प</span>
          What we keep
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-2">
          {categories.map((c, i) => (
            <li key={c.slug} className={i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3 lg:col-span-1"}>
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block h-40 overflow-hidden rounded-[20px] border border-line md:h-full md:min-h-36"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image.src} alt="" className="size-full object-cover transition duration-500 group-hover:-rotate-1 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-night/85 to-transparent" />
                <span className="absolute bottom-3 left-4 font-serif text-xl text-parchment">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
