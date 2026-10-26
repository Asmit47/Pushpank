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
    <section aria-labelledby="book-a-puja" className="bg-white/60 py-14 lg:py-20">
      <Container>
        <SectionHeading
          id="book-a-puja"
          eyebrow="Book a Puja"
          title="A pandit for your puja, with the arrangements sorted"
          description="Request a ritual and we will check pandit availability and confirm with you. A request is not a confirmed booking until our team contacts you."
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
