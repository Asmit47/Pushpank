import { HeartHandshake, MapPin, PackageCheck, ScrollText } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// PLACEHOLDER: keep these factual and only claim what Pushpank can operationally deliver.
const points = [
  { icon: MapPin, title: "Local to Lucknow", body: "Delivery coverage is checked against your pincode before you pay." },
  { icon: PackageCheck, title: "Careful packing", body: "Flowers are packed to travel; storage guidance is on every fresh product." },
  { icon: ScrollText, title: "Clear inclusions", body: "Every kit and service lists what is and is not included." },
  { icon: HeartHandshake, title: "Support that answers", body: "Reach us on WhatsApp or by phone for any order or booking." },
];

export function WhyPushpank() {
  return (
    <section aria-labelledby="why-pushpank" className="bg-forest py-14 text-ivory lg:py-16">
      <Container>
        <SectionHeading
          id="why-pushpank"
          title="Why order from Pushpank"
          eyebrow="Our approach"
          className="[&_h2]:text-ivory"
        />
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                <Icon className="size-6 text-gold" aria-hidden />
                <h3 className="mt-4 font-sans text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ivory/75">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
