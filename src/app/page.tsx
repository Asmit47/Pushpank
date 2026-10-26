import { ArrangementsSection } from "@/components/home/arrangements-section";
import { BookPujaSection } from "@/components/home/book-puja-section";
import { CampaignBlock } from "@/components/home/campaign-block";
import { CategoryGrid } from "@/components/home/category-grid";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews-section";
import { WhyPushpank } from "@/components/home/why-pushpank";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BookPujaSection />
      <FeaturedProducts />
      <CampaignBlock />
      <ArrangementsSection />
      <WhyPushpank />
      <ReviewsSection />
      <FaqSection />
    </>
  );
}
