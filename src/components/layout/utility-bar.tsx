import Link from "next/link";
import { Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { PincodeCheck } from "./pincode-check";

export function UtilityBar({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;
  return (
    <div className="hidden border-b border-line/80 bg-night text-parchment lg:block">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-4 text-sm">
        <PincodeCheck />
        <div className="flex items-center gap-5 text-parchment/75">
          <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-gold-soft">
            <Phone className="size-3.5" strokeWidth={1.5} aria-hidden />
            {site.contact.phone}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
            WhatsApp
          </a>
          <Link href="/track" className="hover:text-gold-soft">
            Track Order
          </Link>
          <Link href="/pandits/register" className="text-gold-soft hover:underline">
            Join as Pandit
          </Link>
        </div>
      </div>
    </div>
  );
}
