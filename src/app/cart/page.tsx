import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <Container className="py-8 lg:py-12">
      <h1 className="mb-8 text-4xl font-semibold text-gold-soft sm:text-5xl">Your cart</h1>
      <CartView />
    </Container>
  );
}
