import { site } from "@/data/site";

const origin = site.url.replace(/\/$/, "");

/** Organization + Store + WebSite graph for the home page. Values are placeholder-safe. */
export function orgGraph() {
  return [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: site.name,
      url: origin,
      logo: `${origin}/images/brand/pushpank-logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.contact.phone.replace(/\s/g, ""),
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    },
    {
      "@type": "Store",
      "@id": `${origin}/#store`,
      name: site.name,
      description: site.tagline,
      url: origin,
      image: `${origin}/images/generated/hero-altar.jpg`,
      telephone: site.contact.phone.replace(/\s/g, ""),
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Card",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "City",
        name: site.delivery.city,
      },
      openingHours: site.contact.hours,
      parentOrganization: { "@id": `${origin}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: site.name,
      description: site.hero.copy,
      inLanguage: "en-IN",
      publisher: { "@id": `${origin}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${origin}/shop?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

/** A puja ritual offered by the store, for service detail pages. */
export function serviceSchema(s: {
  name: string;
  description: string;
  slug: string;
  image: string;
  duration?: string;
  fromPrice?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    image: `${origin}${s.image}`,
    url: `${origin}/puja-services/${s.slug}`,
    provider: { "@id": `${origin}/#store` },
    areaServed: { "@type": "City", name: site.delivery.city },
    ...(s.duration ? { serviceType: s.duration } : {}),
    ...(s.fromPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: s.fromPrice,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

/** A pandit profile, for pandit detail pages. */
export function personSchema(p: { name: string; bio: string; slug: string; image: string; years?: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    description: p.bio,
    image: `${origin}${p.image}`,
    url: `${origin}/pandits/${p.slug}`,
    jobTitle: "Pandit",
    worksFor: { "@id": `${origin}/#store` },
    ...(p.years ? { knowsAbout: `${p.years} years of ritual practice` } : {}),
  };
}
