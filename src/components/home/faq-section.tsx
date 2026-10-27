import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section aria-labelledby="faqs" className="py-16 lg:py-20">
      <Container className="max-w-3xl">
        <SectionHeading id="faqs" eyebrow="FAQs" title="Common questions" align="center" />
        <div className="mt-10">
          <FaqList faqs={faqs} />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          More questions?{" "}
          <Link href="/contact" className="font-medium text-gold-soft underline-offset-4 hover:underline">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
