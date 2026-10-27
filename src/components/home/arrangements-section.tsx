import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { decorationCategories } from "@/data/decorations";

export function ArrangementsSection() {
  const cards = decorationCategories.slice(0, 3);
  return (
    <section aria-labelledby="arrangements" className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          id="arrangements"
          eyebrow="Decorations & Events"
          title="Complete arrangements for larger occasions"
          description="Floral decoration, havan setup and festival arrangements. Each is quoted on venue, materials and scope."
          action={
            <Button href="/decorations-events#quote" size="sm" className="self-start sm:self-auto">
              Request a quote
            </Button>
          }
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((d, index) => (
            <StaggerItem key={d.slug} index={index}>
              <Link
                href={`/decorations-events#${d.slug}`}
                className="group block h-full overflow-hidden rounded-[20px] border border-line bg-sanctum shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-lift motion-reduce:transition-none"
              >
                <Media
                  src={d.image.src}
                  alt={d.image.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  wrapperClassName="aspect-[16/10]"
                  className="img-zoom size-full"
                />
                <div className="p-6">
                  <h3 className="font-serif text-[1.55rem] leading-tight text-gold-soft">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment/70">{d.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft underline-offset-4 group-hover:underline">
                    Learn more <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
