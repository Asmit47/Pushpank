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
    <section aria-labelledby="campaign-title" className="py-6 lg:py-10">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-[20px] border border-gold/30 bg-maroon-900 text-parchment md:grid-cols-2">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <h2 id="campaign-title" className="font-serif text-4xl font-semibold leading-[1.1] text-gold-soft sm:text-5xl">
                {c.title}
              </h2>
              <p className="mt-4 max-w-md text-parchment/80">{c.description}</p>
              <p className="mt-3 text-sm text-parchment/60">
                {c.endsOn && <>Collection available until {formatDate(c.endsOn)}. </>}
                {c.terms}
              </p>
              <div className="mt-7">
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
