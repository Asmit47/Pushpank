import type { Metadata } from "next";
import { CalendarCheck, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { whatsappLink } from "@/data/site";
import { formatDate, formatPrice } from "@/lib/format";
import { SAMAGRI_OPTIONS } from "@/lib/schemas";
import { getBooking } from "@/lib/server/store";
import type { BookingStatus } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking status",
  robots: { index: false, follow: false },
};

const STATUS_COPY: Record<BookingStatus, { title: string; body: string }> = {
  requested: {
    title: "Request received",
    body: "We have your request. This is not a confirmed booking yet. Our team will check pandit availability and contact you.",
  },
  awaiting_confirmation: {
    title: "Checking availability",
    body: "Our team is checking pandit availability for your date. We will contact you shortly.",
  },
  confirmed: {
    title: "Booking confirmed",
    body: "Your booking is confirmed. Our team will share the final details with you.",
  },
  reschedule_requested: {
    title: "Reschedule requested",
    body: "A change of date or time has been requested. We will confirm the new slot with you.",
  },
  completed: { title: "Completed", body: "This service has been completed. Thank you." },
  cancelled: { title: "Cancelled", body: "This booking has been cancelled." },
};

export default async function BookingPage({ params }: PageProps<"/bookings/[id]">) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<SearchX className="size-10" aria-hidden />}
          title="We could not find this booking"
          description="Check the link, or look it up with your reference and phone number."
          action={<Button href="/track">Track a booking</Button>}
        />
      </Container>
    );
  }

  const copy = STATUS_COPY[booking.bookingStatus];
  const samagri = SAMAGRI_OPTIONS.find((o) => o.value === booking.samagri)?.label ?? booking.samagri;
  const rows: [string, string][] = [
    ["Service", booking.serviceName],
    ["Package", booking.packageSnapshot ? booking.packageSnapshot.name : "To be suggested by our team"],
    ["Date", formatDate(booking.eventDate)],
    ["Preferred time", booking.timeWindow],
    ["Address", `${booking.address.line1}, ${booking.address.locality} ${booking.address.pincode}`],
    ["Samagri", samagri],
    ["Contact", `${booking.customer.name}, ${booking.customer.phone}`],
  ];
  if (booking.packageSnapshot?.indicativePrice) {
    rows.splice(2, 0, ["Indicative price", `${formatPrice(booking.packageSnapshot.indicativePrice)} (final amount confirmed by our team)`]);
  }
  if (booking.notes) rows.push(["Notes", booking.notes]);

  return (
    <Container className="max-w-3xl py-10 lg:py-14">
      <div className="text-center">
        <CalendarCheck className="mx-auto size-12 text-gold" aria-hidden />
        <h1 className="mt-4 text-4xl font-semibold text-maroon sm:text-5xl">{copy.title}</h1>
        <p className="mt-3 text-muted">
          Booking reference{" "}
          <strong className="select-all rounded bg-gold-100 px-2 py-0.5 font-mono text-charcoal">{booking.reference}</strong>
        </p>
      </div>

      <div
        className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6"
        role="status"
        aria-label="Booking status"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-2">
            Booking status: <StatusBadge status={booking.bookingStatus} />
          </span>
          <span className="inline-flex items-center gap-2">
            Payment:{" "}
            <StatusBadge
              status={booking.paymentStatus}
              label={booking.paymentStatus === "not_applicable" ? "No payment taken yet" : undefined}
            />
          </span>
        </div>
        <p className="mt-3 text-charcoal/80">{copy.body}</p>
      </div>

      <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white px-5 sm:px-6">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3 text-sm sm:grid-cols-[10rem_1fr]">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 rounded-2xl bg-ivory-100 p-5 text-sm" aria-labelledby="change">
        <h2 id="change" className="font-sans text-base font-semibold">
          Need to reschedule or cancel?
        </h2>
        <p className="mt-1.5 text-charcoal/75">
          Message us with your reference and we will help. Changes are confirmed once our team has checked availability.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            href={whatsappLink(`Hello Pushpank, I would like to reschedule booking ${booking.reference}.`)}
            variant="secondary"
            size="sm"
          >
            Request a reschedule
          </Button>
          <Button
            href={whatsappLink(`Hello Pushpank, I would like to cancel booking ${booking.reference}.`)}
            variant="ghost"
            size="sm"
          >
            Request a cancellation
          </Button>
          <Button href="/contact" variant="ghost" size="sm">
            Contact support
          </Button>
        </div>
      </section>
    </Container>
  );
}
