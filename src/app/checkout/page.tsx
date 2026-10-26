import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mb-8 mt-4 text-4xl font-semibold text-maroon sm:text-5xl">Checkout</h1>
      <CheckoutView />
    </Container>
  );
}
