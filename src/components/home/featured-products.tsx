import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { getFeaturedProducts } from "@/lib/catalog";

export function FeaturedProducts() {
  const products = getFeaturedProducts(4);
  return (
    <section aria-labelledby="featured-products" className="py-14 lg:py-20">
      <Container>
        <SectionHeading
          id="featured-products"
          eyebrow="Shop"
          title="Featured products"
          description="A short selection to get you started."
          action={
            <Button href="/shop" variant="secondary" size="sm" className="self-start sm:self-auto">
              View all <ArrowRight className="size-4" aria-hidden />
            </Button>
          }
        />
        <Stagger className="-mx-4 mt-8 sm:mx-0">
          <ul className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.id} className="w-[68%] shrink-0 snap-start sm:w-auto">
                <StaggerItem index={i} className="h-full">
                  <ProductCard product={p} />
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
