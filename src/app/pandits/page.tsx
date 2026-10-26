import type { Metadata } from "next";
import Link from "next/link";
import { pandits } from "@/data/pandits";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our pandits",
  description: "Pandits who conduct home pujas in Lucknow. Profiles are placeholders until verified.",
};

export default async function PanditsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const ritual = typeof params.ritual === "string" ? params.ritual : "";
  const language = typeof params.language === "string" ? params.language : "";
  const list = pandits.filter((p) => {
    if (ritual && !p.specialities.includes(ritual)) return false;
    if (language && !p.languages.includes(language)) return false;
    return true;
  });
  const languages = [...new Set(pandits.flatMap((p) => p.languages))];

  return (
    <Container className="py-10">
      <p className="text-sm text-gold">Placeholder profiles</p>
      <h1 className="mt-2 text-4xl text-gold-soft sm:text-5xl">Our pandits</h1>
      <p className="mt-3 max-w-xl text-parchment/80">
        These cards show how verified pandits will appear. Booking still goes through a ritual request.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/pandits" className={!ritual ? "rounded-full bg-gold px-3 py-1 text-sm text-night" : "rounded-full border border-line px-3 py-1 text-sm"}>All rituals</Link>
        {services.map((s) => (
          <Link key={s.slug} href={`/pandits?ritual=${s.slug}`} className={ritual === s.slug ? "rounded-full bg-gold px-3 py-1 text-sm text-night" : "rounded-full border border-line px-3 py-1 text-sm"}>
            {s.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {languages.map((l) => (
          <Link key={l} href={language === l ? "/pandits" : `/pandits?language=${l}`} className={language === l ? "rounded-full bg-gold px-3 py-1 text-sm text-night" : "rounded-full border border-line px-3 py-1 text-sm"}>
            {l}
          </Link>
        ))}
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/pandits/${p.slug}`} className="block overflow-hidden rounded-[20px] border border-gold/20 bg-sanctum">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image.src} alt="" className="aspect-[4/3] w-full object-cover" />
              <span className="block p-4">
                <span className="font-serif text-2xl text-gold-soft">{p.name}</span>
                <span className="mt-1 block text-sm text-muted">{p.years} years · {p.areas.join(", ")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-8 text-muted">No pandit matches those filters.</p>}
      <div className="mt-12 rounded-[20px] border border-gold/30 bg-maroon-900 p-6">
        <h2 className="text-3xl text-gold-soft">Conduct pujas with Pushpank</h2>
        <p className="mt-2 max-w-lg text-parchment/80">Share your rituals, languages and the areas you cover. We review every application before anyone is listed.</p>
        <Button href="/pandits/register" className="mt-5">Join as a pandit</Button>
      </div>
    </Container>
  );
}
