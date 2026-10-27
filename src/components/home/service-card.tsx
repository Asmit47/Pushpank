import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { formatPrice } from "@/lib/format";
import type { Service } from "@/types";

export function ServiceCard({ service, eagerImage = false }: { service: Service; eagerImage?: boolean }) {
  const prices = service.packages.map((p) => p.indicativePrice).filter((p): p is number => p !== undefined);
  const from = prices.length ? Math.min(...prices) : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-sanctum shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-lift motion-reduce:transition-none">
      <div className="relative">
        <Media
          src={service.image.src}
          alt={service.image.alt}
          width={800}
          height={600}
          loading={eagerImage ? "eager" : undefined}
          sizes="(min-width: 1024px) 33vw, 100vw"
          wrapperClassName="aspect-[16/10]"
          className="img-zoom size-full"
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sanctum via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[1.6rem] leading-tight text-gold-soft">{service.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-parchment/70">{service.tagline}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-parchment/80">
          {service.inclusions.slice(0, 3).map((i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
            {service.duration.replace(/ \(to be confirmed\)/, "")}
          </span>
          {from !== undefined && <span>From {formatPrice(from)} (indicative)</span>}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Button href={`/puja-services/${service.slug}`} variant="secondary" size="sm">
            View details
          </Button>
          <Button href={`/puja-services/${service.slug}#book`} size="sm">
            Request booking
          </Button>
        </div>
      </div>
    </article>
  );
}
