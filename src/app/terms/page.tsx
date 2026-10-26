import type { Metadata } from "next";
import { ContentPage } from "@/components/ui/content-page";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Terms for using the Pushpank website and placing orders or booking requests.",
};

export default function TermsPage() {
  return (
    <ContentPage title="Terms and conditions" draftNotice>
      <section>
        <h2>Orders</h2>
        <p>
          An order is accepted once our team confirms it. Prices and availability are shown on each product and may change.
        </p>
      </section>
      <section>
        <h2>Puja service bookings</h2>
        <p>
          A booking request is not a confirmed booking. A booking is confirmed only when our team verifies availability
          and tells you so.
        </p>
      </section>
      <section>
        <h2>Decoration quotes</h2>
        <p>A quote request does not confirm a service. Final scope and price are agreed in writing before confirmation.</p>
      </section>
      <section>
        <h2>Liability and governing law</h2>
        <p>[Limitation of liability, dispute resolution and governing law to be added by Pushpank.]</p>
      </section>
    </ContentPage>
  );
}
