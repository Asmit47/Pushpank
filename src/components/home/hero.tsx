import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative z-10 isolate overflow-hidden bg-night">
      <Image
        src="/images/generated/hero-altar.jpg"
        alt="A brass diya and incense before a gold Om mandala"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-[center_70%] lg:object-[64%_center]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,42rem)] bg-gradient-to-r from-night via-night/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-night/50 to-night sm:h-44"
      />

      <Container className="relative flex min-h-[calc(100dvh-8.5rem)] items-start pb-28 pt-10 lg:items-center lg:pb-16 lg:pt-16">
        <div className="max-w-lg">
          <p lang="hi" className="mantra text-lg text-gold">
            पुष्पांक
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-4xl leading-[1.05] font-medium text-parchment sm:text-5xl lg:text-6xl"
          >
            Everything for your puja, at the door.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-parchment/80 sm:text-lg">
            Fresh flowers, samagri and a pandit for worship at home in Lucknow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/shop" size="lg" magnetic>
              Shop Samagri
            </Button>
            <Button href="/puja-services#rituals" size="lg" variant="secondary">
              Book a Pandit
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
