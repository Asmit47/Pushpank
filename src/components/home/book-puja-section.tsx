import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServices } from "@/lib/catalog";
import { ServiceCard } from "./service-card";

export function BookPujaSection() {
  const services = getServices();
  return (
    <section aria-labelledby="book-a-puja" className="bg-sanctum/80 py-14 lg:py-20">
      <Container>
        <SectionHeading
          id="book-a-puja"
          title="A pandit, when you need one"
          description="Choose a ritual. We check availability and confirm by phone."
          action={
            <Button href="/puja-services" variant="secondary" size="sm" className="self-start sm:self-auto">
              All rituals <ArrowRight className="size-4" aria-hidden />
            </Button>
          }
        />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
