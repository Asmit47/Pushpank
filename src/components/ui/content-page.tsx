import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export function ContentPage({
  title,
  intro,
  hindi,
  draftNotice,
  children,
}: {
  title: string;
  intro?: string;
  /** Small Devanagari accent shown under the title. */
  hindi?: string;
  /** Shown for placeholder policy text that must be approved before launch. */
  draftNotice?: boolean;
  children: ReactNode;
}) {
  return (
    <Container className="max-w-3xl py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <header className="mt-6 border-b border-line/70 pb-8">
        <h1 className="display-section text-gold-soft">{title}</h1>
        {hindi && (
          <p lang="hi" className="mantra mt-3 text-lg text-gold/80">
            {hindi}
          </p>
        )}
        {intro && <p className="lead mt-4 max-w-2xl">{intro}</p>}
      </header>
      {draftNotice && (
        <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-parchment/85">
          <strong>Draft content.</strong> This text is a placeholder and must be reviewed and approved by Pushpank
          (and legal counsel where appropriate) before launch.
        </p>
      )}
      <div className="mt-8 space-y-8 leading-relaxed text-parchment/85 [&_h2]:mb-3 [&_h2]:text-[1.7rem] [&_h2]:font-medium [&_h2]:text-gold-soft [&_li::marker]:text-gold/70 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-gold-soft [&_a]:underline">
        {children}
      </div>
    </Container>
  );
}
