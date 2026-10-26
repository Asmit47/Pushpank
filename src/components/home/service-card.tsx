import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { formatPrice } from "@/lib/format";
import type { Service } from "@/types";

export function ServiceCard({ service, eagerImage = false }: { service: Service; eagerImage?: boolean }) {
  const prices = service.packages.map((p) => p.indicativePrice).filter((p): p is number => p !== undefined);
  const from = prices.length ? Math.min(...prices) : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-sanctum shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <Media
        src={service.image.src}
        alt={service.image.alt}
        width={800}
        height={600}
        loading={eagerImage ? "eager" : undefined}
        sizes="(min-width: 1024px) 33vw, 100vw"
        wrapperClassName="aspect-[4/3]"
        className="size-full transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-semibold text-gold-soft">{service.name}</h3>
        <p className="mt-1.5 text-[0.95rem] text-parchment/75">{service.tagline}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-parchment/80">
          {service.inclusions.slice(0, 3).map((i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden />
            {service.duration.replace(/ \(to be confirmed\)/, "")}
          </span>
          {from !== undefined && <span>· From {formatPrice(from)} (indicative)</span>}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Button href={`/puja-services/${service.slug}`} variant="secondary" size="sm">
            View details
          </Button>
          <Button href={`/puja-services/${service.slug}#book`} size="sm">
            Request a booking
          </Button>
        </div>
      </div>
    </article>
  );
}
