"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

const HIDDEN_ON = ["/cart", "/checkout", "/order-confirmation"];

export function FloatingActions() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pushpank on WhatsApp"
      className="fixed bottom-20 right-4 z-30 grid size-12 place-items-center rounded-full bg-tulsi text-night shadow-lift lg:bottom-6 lg:right-6 lg:size-14"
    >
      <MessageCircle className="size-6" strokeWidth={1.5} aria-hidden />
    </a>
  );
}
