import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewsRing } from "@/components/reviews/reviews-ring";
import { getGoogleReviews } from "@/lib/server/google-reviews";
import { whatsappLink } from "@/data/site";

export async function ReviewsSection() {
  const data = await getGoogleReviews();
  return (
    <section aria-labelledby="reviews" className="py-16 lg:py-20">
      <Container>
        <SectionHeading id="reviews" eyebrow="Reviews" title="What customers say" align="center" />
        {data ? (
          <div className="mt-10">
            <ReviewsRing data={data} />
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-card border border-dashed border-gold/40 bg-sanctum px-6 py-10 text-center">
            <p className="text-parchment/80">Verified Google reviews will appear here once the Places connection is set.</p>
            <a href={whatsappLink("Hello Pushpank, I would like to share feedback.")} className="mt-4 inline-block text-sm text-gold-soft underline">
              Share your feedback
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
