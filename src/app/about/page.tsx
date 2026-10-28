import type { Metadata } from "next";
import Image from "next/image";
import { ContentPage } from "@/components/ui/content-page";

export const metadata: Metadata = {
  title: "About Pushpank",
  description: "Pushpank is a Lucknow-based business for fresh flowers, puja samagri, pandit bookings and arrangements.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About Pushpank"
      intro="A Lucknow-based business for fresh flowers, puja essentials and ritual services."
      hindi="पुष्पांक"
    >
      <p className="rounded-xl border border-gold/50 bg-gold-900/60 p-4 text-sm">
        <strong>Placeholder.</strong> Replace this page with Pushpank&apos;s verified story, team and credentials. Avoid
        claims that cannot be supported, such as awards, years in business or superlatives.
      </p>
      <Image
        src="/images/generated/about-courtyard.jpg"
        alt="Marigold garlands and brass lamps in a courtyard at dusk"
        width={1536}
        height={1024}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="w-full rounded-card object-cover"
      />
      <section>
        <h2>What we do</h2>
        <ul>
          <li>Fresh flowers and garlands for daily worship and festivals</li>
          <li>Puja samagri, complete puja kits and gifts</li>
          <li>Pandit bookings for home rituals, handled by request and manual confirmation</li>
          <li>Decorations and arrangements, quoted per event</li>
        </ul>
      </section>
      <section>
        <h2>How we work</h2>
        <p>
          We list what is included in every kit and service, show delivery charges before you pay, and confirm
          availability with you rather than promising what we have not checked.
        </p>
      </section>
    </ContentPage>
  );
}
