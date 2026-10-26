import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export function ContentPage({
  title,
  intro,
  draftNotice,
  children,
}: {
  title: string;
  intro?: string;
  /** Shown for placeholder policy text that must be approved before launch. */
  draftNotice?: boolean;
  children: ReactNode;
}) {
  return (
    <Container className="max-w-3xl py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-gold-soft sm:text-5xl">{title}</h1>
      {intro && <p className="mt-3 text-lg text-parchment/80">{intro}</p>}
      {draftNotice && (
        <p className="mt-5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-parchment/85">
          <strong>Draft content.</strong> This text is a placeholder and must be reviewed and approved by Pushpank
          (and legal counsel where appropriate) before launch.
        </p>
      )}
      <div className="mt-8 space-y-8 leading-relaxed text-parchment/85 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gold-soft [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-gold-soft [&_a]:underline">
        {children}
      </div>
    </Container>
  );
}
