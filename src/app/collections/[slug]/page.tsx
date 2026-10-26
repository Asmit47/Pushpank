import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/shop/listing-view";
import { getCategories, getCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Collection not found" };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: { images: [category.image.src] },
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <ListingView
      title={category.name}
      description={category.description}
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
      collection={category.slug}
      basePath={`/collections/${category.slug}`}
      searchParams={await searchParams}
    />
  );
}
