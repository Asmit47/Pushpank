import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";

/** Native disclosure elements: keyboard accessible and works without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line/80 overflow-hidden rounded-card border border-line bg-sanctum/70">
      {faqs.map((f) => (
        <details key={f.question} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium transition-colors marker:hidden hover:text-gold-soft [&::-webkit-details-marker]:hidden">
            {f.question}
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/30 text-gold transition-transform duration-300 group-open:rotate-180 group-open:bg-gold/15"
            >
              <ChevronDown className="size-4" strokeWidth={1.5} />
            </span>
          </summary>
          <p className="pb-6 pr-12 leading-relaxed text-parchment/75">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
