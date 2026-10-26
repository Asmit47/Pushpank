import Link from "next/link";
import { ArrowRight, CalendarHeart, ShoppingBasket } from "lucide-react";
import { FadeIn } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft light behind the photograph: CSS only, no particles or parallax. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] animate-glow rounded-full bg-[radial-gradient(circle,rgb(182_149_84/0.28),transparent_65%)] motion-reduce:animate-none"
      />
      <Container className="relative grid items-center gap-8 pb-12 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <FadeIn>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span aria-hidden className="h-px w-8 bg-gold" />
              Lucknow · Flowers · Puja · Pandit
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1
              id="hero-title"
              className="text-[2.6rem] font-semibold leading-[1.02] text-maroon sm:text-6xl lg:text-[4.4rem]"
            >
              {site.hero.headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">{site.hero.copy}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/shop" size="lg">
                <ShoppingBasket className="size-5" aria-hidden />
                Shop Puja Essentials
              </Button>
              <Button href="/puja-services" size="lg" variant="secondary">
                <CalendarHeart className="size-5" aria-hidden />
                Book a Puja
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-1.5 text-sm text-muted">
              Need flowers for a specific date?
              <Link href="/decorations-events#quote" className="inline-flex items-center gap-1 font-medium text-maroon hover:underline">
                Request a quote <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="absolute -inset-3 rounded-[2rem] border border-gold/40" />
            <Media
              src="/images/placeholder/hero.jpg"
              alt="A brass thali with marigolds, a lit diya, incense and rose petals"
              width={768}
              height={1024}
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              wrapperClassName="relative aspect-[5/4] rounded-[1.75rem] shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]"
              className="size-full"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
