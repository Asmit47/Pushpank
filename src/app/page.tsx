import { ArrangementsSection } from "@/components/home/arrangements-section";
import { BookPujaSection } from "@/components/home/book-puja-section";
import { CampaignBlock } from "@/components/home/campaign-block";
import { CategoryGrid } from "@/components/home/category-grid";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { MantraMarquee } from "@/components/home/mantra";
import { ReviewsSection } from "@/components/home/reviews-section";
import { BestsellersRail, FestiveBento, KitsFeature, OccasionRail, PanditTeaser } from "@/components/home/shelves";
import { WhyPushpank } from "@/components/home/why-pushpank";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestsellersRail />
      <OccasionRail />
      <BookPujaSection />
      <MantraMarquee />
      <CampaignBlock />
      <FestiveBento />
      <KitsFeature />
      <ArrangementsSection />
      <PanditTeaser />
      <ReviewsSection />
      <WhyPushpank />
      <FaqSection />
    </>
  );
}
