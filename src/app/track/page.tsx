import type { Metadata } from "next";
import { TrackForm } from "@/components/account/track-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Track an order or booking",
  robots: { index: false },
};

export default function TrackPage() {
  return (
    <Container className="max-w-xl py-10 lg:py-16">
      <h1 className="text-4xl font-semibold text-gold-soft sm:text-5xl">Track an order or booking</h1>
      <p className="mt-3 text-muted">
        Enter the reference we gave you and the phone number you used. We ask for both to protect your details.
      </p>
      <div className="mt-8 rounded-card border border-line bg-sanctum p-5 shadow-card sm:p-8">
        <TrackForm />
      </div>
    </Container>
  );
}
