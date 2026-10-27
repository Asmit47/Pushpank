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
    <section aria-labelledby="why-pushpank" className="border-y border-line/70 bg-maroon-900/40 py-16 lg:py-20">
      <Container>
        <SectionHeading id="why-pushpank" eyebrow="Our promise" title="Why order from Pushpank" align="center" />
        <Stagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line/70">
          {points.map(({ icon: Icon, title, body }, index) => (
            <StaggerItem key={title} index={index} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <div className="text-center lg:text-left">
                <span className="inline-grid size-11 place-items-center rounded-full border border-gold/35 bg-gold/8 text-gold">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-4 font-sans text-[0.95rem] font-semibold tracking-wide text-parchment">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment/65">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
