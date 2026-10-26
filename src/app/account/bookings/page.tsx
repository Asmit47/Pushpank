import type { Metadata } from "next";
import { GuestNotice } from "@/components/account/guest-notice";

export const metadata: Metadata = { title: "Booking history", robots: { index: false } };

export default function AccountBookingsPage() {
  return <GuestNotice title="Booking history" what="check a booking" />;
}
