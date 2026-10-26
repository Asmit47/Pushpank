const lines = ["ॐ नमः शिवाय", "श्री गणेशाय नमः", "सर्वे भवन्तु सुखिनः", "ॐ शान्तिः शान्तिः शान्तिः"];

export function MantraWatermark({ text = "ॐ नमः शिवाय" }: { text?: string }) {
  return (
    <p
      aria-hidden
      lang="hi"
      className="mantra pointer-events-none absolute -left-4 top-6 select-none text-6xl text-gold/[0.06] sm:text-8xl"
    >
      {text}
    </p>
  );
}

export function MantraMarquee() {
  const row = [...lines, ...lines];
  return (
    <div className="overflow-hidden border-y border-gold/20 bg-maroon-900 py-3" aria-hidden>
      <div className="animate-marquee flex w-max gap-10">
        {[0, 1].map((copy) => (
          <p key={copy} lang="hi" className="mantra flex gap-10 text-lg text-gold-soft/80">
            {row.map((line, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-10">
                {line}
                <span className="inline-block size-1.5 rounded-full bg-gold" />
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Mandala() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-16 top-0 size-64 rounded-full opacity-40"
      style={{
        background: "conic-gradient(from 20deg, transparent, rgb(214 168 79 / 0.35), transparent 40%, rgb(214 168 79 / 0.2), transparent 70%)",
        maskImage: "radial-gradient(circle, transparent 42%, black 44%, black 56%, transparent 58%)",
        WebkitMaskImage: "radial-gradient(circle, transparent 42%, black 44%, black 56%, transparent 58%)",
      }}
    />
  );
}
