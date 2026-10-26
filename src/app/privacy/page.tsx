import type { Metadata } from "next";
import { ContentPage } from "@/components/ui/content-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Pushpank collects and uses your personal information.",
};

export default function PrivacyPage() {
  return (
    <ContentPage title="Privacy policy" draftNotice>
      <section>
        <h2>What we collect</h2>
        <p>
          Only what we need to fulfil your order, booking or enquiry: your name, phone number, delivery or event
          address, and optionally your email.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To confirm, deliver and support your orders and bookings</li>
          <li>To contact you about your order, booking or quote request</li>
        </ul>
      </section>
      <section>
        <h2>Payments</h2>
        <p>
          We do not store card details. When online payment is introduced it will be handled by a payment provider&apos;s
          hosted checkout.
        </p>
      </section>
      <section>
        <h2>Analytics</h2>
        <p>We plan to measure a small set of events (for example product views and completed orders) without collecting unnecessary personal information.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>[Data access, correction and deletion process, retention periods and grievance contact to be added by Pushpank.]</p>
      </section>
    </ContentPage>
  );
}
