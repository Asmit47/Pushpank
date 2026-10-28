import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Your wishlist",
  description: "Products you saved for later at Pushpank.",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <Container className="py-8 lg:py-12">
      <h1 className="mb-8 text-4xl font-semibold text-gold-soft sm:text-5xl">Your wishlist</h1>
      <WishlistView />
    </Container>
  );
}
