import type { Metadata } from "next";
import { ContentPage } from "@/components/ui/content-page";
import { FaqList } from "@/components/ui/faq-list";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about delivery, payments, pandit booking, cancellations and support.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <ContentPage title="Frequently asked questions" intro="Quick answers about ordering, delivery and bookings.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqList faqs={faqs} />
    </ContentPage>
  );
}
