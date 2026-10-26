import type { Metadata } from "next";
import { GuestNotice } from "@/components/account/guest-notice";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return <GuestNotice title="Account" what="order, book and track" />;
}
