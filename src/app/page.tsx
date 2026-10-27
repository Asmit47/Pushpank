import { ArrangementsSection } from "@/components/home/arrangements-section";
import { BookPujaSection } from "@/components/home/book-puja-section";
import { CampaignBlock } from "@/components/home/campaign-block";
import { CategoryGrid } from "@/components/home/category-grid";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { MantraMarquee } from "@/components/home/mantra";
import { ReviewsSection } from "@/components/home/reviews-section";
import { BestsellersRail, OccasionRail, PanditTeaser } from "@/components/home/shelves";
import { WhyPushpank } from "@/components/home/why-pushpank";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MantraMarquee />
      <CategoryGrid />
      <BestsellersRail />
      <BookPujaSection />
      <CampaignBlock />
      <OccasionRail />
      <ArrangementsSection />
      <PanditTeaser />
      <ReviewsSection />
      <WhyPushpank />
      <FaqSection />
    </>
  );
}
