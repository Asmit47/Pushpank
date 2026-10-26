import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";

/** Native disclosure elements: keyboard accessible and works without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.question} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
            {f.question}
            <ChevronDown
              className="size-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 pr-8 leading-relaxed text-charcoal/75">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
