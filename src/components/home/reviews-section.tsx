import { ExternalLink, MessageSquareQuote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { site, whatsappLink } from "@/data/site";

/**
 * Intentionally contains no testimonials, ratings or review counts.
 * Add genuine reviews (with permission and attribution) once they exist.
 */
export function ReviewsSection() {
  const url = site.reviewsUrl;
  return (
    <section aria-labelledby="reviews" className="py-14 lg:py-20">
      <Container>
        <SectionHeading id="reviews" eyebrow="Reviews" title="What customers say" align="center" />
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-gold/60 bg-white/70 px-6 py-10 text-center">
          <MessageSquareQuote className="size-8 text-gold" aria-hidden />
          <p className="mt-4 text-charcoal/80">
            We only show real customer feedback. Verified reviews will appear here after launch.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-medium">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-maroon hover:underline"
              >
                Read reviews on Google <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : null}
            <a href={whatsappLink("Hello Pushpank, I would like to share feedback.")} className="text-maroon hover:underline">
              Share your feedback
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
