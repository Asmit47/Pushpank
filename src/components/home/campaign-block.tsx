import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { isCampaignVisible, site } from "@/data/site";
import { formatDate } from "@/lib/format";

/** Hidden automatically when the campaign is switched off or its end date has passed. */
export function CampaignBlock() {
  if (!isCampaignVisible()) return null;
  const c = site.campaign;
  return (
    <section aria-labelledby="campaign-title" className="py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-card border border-gold/25 bg-maroon-900/80 shadow-lift text-parchment md:grid-cols-2">
            <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span lang="hi" aria-hidden className="mantra pointer-events-none absolute -top-2 right-6 select-none text-6xl text-gold/[0.08]">
                दीपावली
              </span>
              <p className="eyebrow">Seasonal collection</p>
              <h2 id="campaign-title" className="display-section mt-4 pr-10 text-gold-soft">
                {c.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-parchment/80">{c.description}</p>
              {c.endsOn && (
                <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-night/40 px-4 py-1.5 text-[0.8rem] text-gold-soft">
                  <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden />
                  Available until {formatDate(c.endsOn)}
                </p>
              )}
              <p className="mt-3 text-[0.8rem] text-parchment/55">{c.terms}</p>
              <div className="mt-8">
                <Button href={`/collections/${c.collectionSlug}`} variant="onDark" size="lg">
                  Shop the collection
                </Button>
              </div>
            </div>
            <Media
              src={c.image.src}
              alt={c.image.alt}
              width={1024}
              height={768}
              sizes="(min-width: 768px) 50vw, 100vw"
              wrapperClassName="aspect-[4/3] md:aspect-auto md:min-h-full"
              className="size-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
