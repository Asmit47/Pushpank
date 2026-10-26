import type { Metadata } from "next";
import { ContentPage } from "@/components/ui/content-page";

export const metadata: Metadata = {
  title: "About Pushpank",
  description: "Pushpank is a Lucknow-based business for fresh flowers, puja samagri, pandit bookings and arrangements.",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About Pushpank"
      intro="A Lucknow-based business for fresh flowers, puja essentials and ritual services."
    >
      <p className="rounded-xl border border-gold/50 bg-gold-100/60 p-4 text-sm">
        <strong>Placeholder.</strong> Replace this page with Pushpank&apos;s verified story, team and credentials. Avoid
        claims that cannot be supported, such as awards, years in business or superlatives.
      </p>
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
