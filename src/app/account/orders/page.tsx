import type { Metadata } from "next";
import { GuestNotice } from "@/components/account/guest-notice";

export const metadata: Metadata = { title: "Order history", robots: { index: false } };

export default function AccountOrdersPage() {
  return <GuestNotice title="Order history" what="check an order" />;
}
