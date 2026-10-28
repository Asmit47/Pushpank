import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getSheetPanditApplication } from "@/lib/server/sheets";

export const metadata: Metadata = { title: "Application received", robots: { index: false } };

const copy: Record<string, string> = {
  received: "We have your application. A coordinator will call you on the number you shared.",
  under_review: "Your application is being reviewed.",
  approved: "You are approved. The team will add your profile to the directory.",
  declined: "This application was not approved. You can write to us if something looks wrong.",
};

export default async function ApplicationStatus({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getSheetPanditApplication(id);
  if (!application) notFound();

  return (
    <Container className="max-w-2xl py-12">
      <p className="text-sm text-gold">Reference {application.reference}</p>
      <h1 className="mt-2 text-4xl text-gold-soft">Application {application.status.replace("_", " ")}</h1>
      <p className="mt-4 text-parchment/80">{copy[application.status]}</p>
      <dl className="mt-8 space-y-2 text-sm">
        <div className="flex justify-between border-b border-line py-2"><dt>Name</dt><dd>{application.name}</dd></div>
        <div className="flex justify-between border-b border-line py-2"><dt>Status</dt><dd className="capitalize">{application.status.replaceAll("_", " ")}</dd></div>
        <div className="flex justify-between border-b border-line py-2"><dt>Rituals</dt><dd>{application.rituals.join(", ")}</dd></div>
      </dl>
      <p className="mt-6 text-sm text-muted">Keep this reference. You can also look it up on the track page with your phone number.</p>
    </Container>
  );
}
