import Link from "next/link";
import { getCategories } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function CategoryChips({ activeSlug }: { activeSlug?: string }) {
  const items = [{ slug: undefined, name: "All products", href: "/shop" }, ...getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    href: `/collections/${c.slug}`,
  }))];
  return (
    <nav aria-label="Collections">
      <ul className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {items.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <li key={c.href} className="shrink-0">
              <Link
                href={c.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-block rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-forest bg-forest text-ivory"
                    : "border-line bg-white hover:border-forest/50",
                )}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
