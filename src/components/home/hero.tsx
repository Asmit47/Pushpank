import Image from "next/image";
import { ArrowRight, Flower2, Package, UserCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const features = [
  { icon: Flower2, title: "Fresh Flowers", caption: "Direct from local farms" },
  { icon: Package, title: "Authentic Samagri", caption: "Carefully sourced" },
  { icon: UserCheck, title: "Verified Pandits", caption: "For your home rituals" },
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-night">
      <Image
        src="/images/generated/hero-altar.jpg"
        alt="A lit brass diya with incense smoke rising before a golden Om mandala"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-[58%_72%] sm:object-[66%_55%] lg:object-[62%_42%]"
      />

      {/* Legibility: a soft top veil under the stacked text on small screens; on
          desktop a full-width horizontal scrim that shades the text zone while the
          right side of the photograph stays vivid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/92 via-night/45 to-night/75 lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-night from-0% via-night/72 via-38% to-transparent to-62% lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-night sm:h-44"
      />

      <Container className="relative flex min-h-[calc(100dvh-6.5rem)] flex-col pb-14 pt-10 sm:pb-16 lg:min-h-[calc(100dvh-9.5rem)] lg:pb-10 lg:pt-8">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-xl">
            <FadeIn>
              <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
                Pushpank · Lucknow
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1
                id="hero-title"
                className="mt-5 max-w-[14ch] text-[2.6rem] leading-[1.04] font-medium text-parchment sm:text-6xl sm:leading-[1.03] lg:text-[4.4rem]"
              >
                Everything for your puja, at the door.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-parchment/85 sm:text-lg">
                Fresh flowers, authentic samagri and trusted pandits for a more soulful
                worship experience.
              </p>
            </FadeIn>
            <FadeIn delay={0.24} className="mt-9 flex flex-wrap gap-3">
              <Button href="/shop" size="lg" magnetic>
                Shop Samagri <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/puja-services#rituals" size="lg" variant="secondary">
                Book a Pandit
              </Button>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.32} className="mt-auto">
          <ul className="grid gap-5 border-t border-gold/15 pt-6 pr-14 sm:grid-cols-3 sm:gap-6 lg:pr-0">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-3.5">
                <f.icon className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-parchment">{f.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{f.caption}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
