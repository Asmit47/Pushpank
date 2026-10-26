import type { Metadata } from "next";
import { ListingView } from "@/components/shop/listing-view";

export const metadata: Metadata = {
  title: "Shop flowers, puja samagri and kits",
  description: "Browse fresh flowers and garlands, puja samagri, complete puja kits, gifts and festival collections.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <ListingView
      title="All products"
      description="Fresh flowers, puja essentials, kits and gifts for everyday worship and festivals."
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      basePath="/shop"
      searchParams={await searchParams}
    />
  );
}
