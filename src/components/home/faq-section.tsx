import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section aria-labelledby="faqs" className="pb-6 lg:pb-10">
      <Container className="max-w-3xl">
        <SectionHeading id="faqs" eyebrow="FAQs" title="Common questions" align="center" />
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
        <p className="mt-5 text-center text-sm text-muted">
          More questions?{" "}
          <Link href="/contact" className="font-medium text-maroon hover:underline">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
