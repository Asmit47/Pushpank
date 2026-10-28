import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ReviewsRing } from "@/components/reviews/reviews-ring";
import { getGoogleReviews } from "@/lib/server/google-reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Customer reviews of Pushpank, shown from Google.",
};

export default async function ReviewsPage() {
  const data = await getGoogleReviews();
  const write = data?.mapsUrl ? `${data.mapsUrl}` : undefined;
  return (
    <Container className="py-12">
      <h1 className="text-4xl text-gold-soft sm:text-5xl">Reviews</h1>
      <p className="mt-3 max-w-xl text-parchment/80">These are Google reviews. Pushpank does not write or edit them.</p>
      {data ? (
        <div className="mt-10">
          <ReviewsRing data={data} />
          {write && (
            <p className="mt-8 text-center">
              <a href={write} className="text-gold-soft underline" target="_blank" rel="noopener noreferrer">Write a review on Google</a>
            </p>
          )}
        </div>
      ) : (
        <p className="mt-8 rounded-card border border-dashed border-gold/40 bg-sanctum p-8 text-parchment/80">
          Connect a Google Place ID to show live reviews. Until then, nothing is invented here.
        </p>
      )}
    </Container>
  );
}
