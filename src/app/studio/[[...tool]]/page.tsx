import type { Metadata, Viewport } from "next";
import { sanityConfigured } from "@/sanity/env";
import StudioClient from "./studio-client";

export const metadata: Metadata = {
  referrer: "same-origin",
  robots: "noindex",
  title: "Pushpank Studio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16 text-parchment">
        <h1 className="font-serif text-3xl text-gold-soft">Sanity Studio</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET, then restart the dev server. The shop keeps
          using the built-in catalogue until then.
        </p>
      </main>
    );
  }
  return (
    <>
      <script src="https://core.sanity-cdn.com/bridge.js" async type="module" data-sanity-core="" />
      <StudioClient />
    </>
  );
}
