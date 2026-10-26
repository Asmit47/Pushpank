import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Snowflake, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";
import {
  getAllProducts,
  getPrimaryCategory,
  getProduct,
  getRelatedProducts,
  getVariantPrice,
  isProductAvailable,
} from "@/lib/catalog";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getPrimaryCategory(product);
  const related = getRelatedProducts(product);
  const prices = product.variants.map(getVariantPrice);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    sku: product.variants[0].sku,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.variants.length,
      availability: isProductAvailable(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <Container className="py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name, href: `/collections/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-3">
          <Media
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={1024}
            height={1024}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            wrapperClassName="aspect-square rounded-3xl border border-line bg-white"
            className="size-full"
          />
          {product.images.length > 1 && (
            <ul className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img) => (
                <li key={img.src}>
                  <Media
                    src={img.src}
                    alt={img.alt}
                    width={240}
                    height={240}
                    sizes="12vw"
                    wrapperClassName="aspect-square rounded-xl border border-line"
                    className="size-full"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {category && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{category.name}</p>}
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-maroon sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-charcoal/75">{product.shortDescription}</p>
          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm text-muted">
            <Truck className="mt-0.5 size-4 shrink-0" aria-hidden />
            Delivered by our team in {site.delivery.city}. Delivery timing is confirmed after you place the order.
          </p>
        </div>
      </div>

      <Reveal className="mt-14 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-maroon">About this product</h2>
          <p className="mt-3 leading-relaxed text-charcoal/80">{product.description}</p>

          <h3 className="mt-6 text-xl font-semibold text-maroon">What is included</h3>
          <ul className="mt-3 grid gap-2 text-[0.95rem] sm:grid-cols-2">
            {product.inclusions.map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                {i}
              </li>
            ))}
          </ul>

          {product.details.length > 0 && (
            <>
              <h3 className="mt-6 text-xl font-semibold text-maroon">Details</h3>
              <dl className="mt-3 divide-y divide-line text-[0.95rem]">
                {product.details.map((d) => (
                  <div key={d.label} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{d.label}</dt>
                    <dd className="text-right">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </section>

        <aside className="space-y-4">
          {product.storage && (
            <section className="rounded-2xl bg-forest-100 p-5 text-forest">
              <h2 className="flex items-center gap-2 font-sans text-base font-semibold">
                <Snowflake className="size-4" aria-hidden /> Storage and freshness
              </h2>
              <p className="mt-2 text-sm leading-relaxed">{product.storage}</p>
            </section>
          )}
          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-sans text-base font-semibold">Delivery and cancellation</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
              {product.perishable
                ? "Fresh flowers are perishable. Orders can be cancelled only before dispatch. See our policy for details."
                : "Delivery charges are shown before you pay. See our policy for cancellation and returns."}{" "}
              <Link href="/shipping-returns" className="font-medium text-maroon underline underline-offset-2">
                Read the policy
              </Link>
              .
            </p>
          </section>
        </aside>
      </Reveal>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-16">
          <SectionHeading id="related" title="You may also like" />
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
