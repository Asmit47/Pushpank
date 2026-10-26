import type { Metadata } from "next";
import { ContentPage } from "@/components/ui/content-page";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Delivery, cancellation and refunds",
  description: "How delivery, cancellations, rescheduling and refunds work at Pushpank.",
};

export default function ShippingReturnsPage() {
  return (
    <ContentPage title="Delivery, cancellation and refunds" draftNotice>
      <section>
        <h2>Delivery</h2>
        <ul>
          <li>We deliver in and around {site.delivery.city}. Coverage is checked against your pincode at checkout.</li>
          <li>
            Delivery is {formatPrice(site.delivery.fee)}, free on orders of {formatPrice(site.delivery.freeDeliveryAbove)} or more.
          </li>
          <li>Delivery timing is confirmed by our team after you place your order.</li>
        </ul>
      </section>
      <section>
        <h2>Fresh and perishable products</h2>
        <p>
          Flowers and garlands are perishable. [Cancellation window and refund terms for fresh products to be
          confirmed by Pushpank.]
        </p>
      </section>
      <section>
        <h2>Other products</h2>
        <p>[Return and refund terms for non-perishable products to be confirmed by Pushpank.]</p>
      </section>
      <section>
        <h2>Puja service bookings</h2>
        <ul>
          <li>A booking request is not confirmed until our team contacts you.</li>
          <li>You can request a reschedule or cancellation from your booking page or by contacting support.</li>
          <li>[Cancellation fees and refund timelines for services to be confirmed by Pushpank.]</li>
        </ul>
      </section>
      <section>
        <h2>Decorations and events</h2>
        <p>A quote request does not confirm the service. [Deposit, cancellation and refund terms to be confirmed.]</p>
      </section>
    </ContentPage>
  );
}
