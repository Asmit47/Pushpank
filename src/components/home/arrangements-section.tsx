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
    <section aria-labelledby="arrangements" className="py-14 lg:py-20">
      <Container>
        <SectionHeading
          id="arrangements"
          eyebrow="Decorations & Events"
          title="Complete arrangements for larger occasions"
          description="Floral decoration, havan setup and festival arrangements. Each is quoted on venue, materials and scope, and a quote request does not confirm the service."
          action={
            <Button href="/decorations-events#quote" size="sm" className="self-start sm:self-auto">
              Request a quote
            </Button>
          }
        />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((d) => (
            <StaggerItem key={d.slug}>
              <Link
                href={`/decorations-events#${d.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
              >
                <Media
                  src={d.image.src}
                  alt={d.image.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  wrapperClassName="aspect-[4/3]"
                  className="size-full transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-maroon">{d.name}</h3>
                  <p className="mt-2 text-[0.95rem] text-charcoal/75">{d.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-maroon">
                    Learn more <ArrowRight className="size-4" aria-hidden />
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
