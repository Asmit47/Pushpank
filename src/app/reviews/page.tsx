import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ContentPage } from "@/components/ui/content-page";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Customer reviews",
  description: "Genuine customer feedback for Pushpank.",
};

export default function ReviewsPage() {
  return (
    <ContentPage title="Customer reviews" intro="We only publish genuine feedback, with permission and attribution.">
      <div className="rounded-2xl border border-dashed border-gold/60 bg-white p-8 text-center">
        <p>Verified reviews will appear here once we have them. We do not publish invented reviews or ratings.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-medium">
          {site.reviewsUrl && (
            <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              Read reviews on Google <ExternalLink className="size-4" aria-hidden />
            </a>
          )}
          <a href={whatsappLink("Hello Pushpank, I would like to share feedback.")}>Share your feedback</a>
        </div>
      </div>
    </ContentPage>
  );
}
