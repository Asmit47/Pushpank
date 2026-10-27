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
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      basePath="/shop"
      searchParams={await searchParams}
    />
  );
}
