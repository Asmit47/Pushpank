import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/data/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const origin = site.url.replace(/\/$/, "");
  const schema = breadcrumbSchema(
    items.map((c) => ({ label: c.label, href: c.href ?? "" })),
    origin,
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="text-[0.8rem] tracking-wide text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {item.href && !last ? (
                  <Link href={item.href} className="transition-colors hover:text-gold-soft">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-gold-soft/80" : undefined}>
                    {item.label}
                  </span>
                )}
                {!last && <ChevronRight className="size-3 text-gold/50" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
