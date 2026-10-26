"use client";

import { useReducedMotion, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { GoogleReviewPayload } from "@/lib/google-reviews-types";

export function ReviewsRing({ data }: { data: GoogleReviewPayload }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const reviews = data.reviews;
  const visual = reviews.length < 8 ? [...reviews, ...reviews, ...reviews].slice(0, 8) : reviews;
  const step = 360 / visual.length;
  const rotation = useMotionValue(0);
  const smooth = useSpring(rotation, { stiffness: 80, damping: 18 });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || mobile || paused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      rotation.set(rotation.get() + dt * 8);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, mobile, paused, rotation]);

  const nudge = (dir: number) => rotation.set(rotation.get() + dir * step);

  if (reduce || mobile) {
    return (
      <div>
        <Summary data={data} />
        <ul className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2">
          {reviews.map((r) => (
            <li key={r.author + r.relativeTime} className="w-[280px] shrink-0 snap-start">
              <Card review={r} />
            </li>
          ))}
        </ul>
        <Attribution url={data.mapsUrl} />
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto h-[420px] max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") nudge(-1);
        if (e.key === "ArrowLeft") nudge(1);
      }}
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <Summary data={data} />
      </div>
      <motion.ul
        className="absolute inset-0"
        style={{ rotateY: smooth, transformStyle: "preserve-3d" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDrag={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.3)}
      >
        {visual.map((r, i) => (
          <li
            key={`${r.author}-${i}`}
            aria-hidden={i >= reviews.length}
            className="absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `rotateY(${i * step}deg) translateZ(280px)` }}
          >
            <Card review={r} />
          </li>
        ))}
      </motion.ul>
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3">
        <button type="button" className="rounded-full border border-gold/40 px-3 py-1 text-sm" onClick={() => nudge(1)}>Previous</button>
        <button type="button" className="rounded-full border border-gold/40 px-3 py-1 text-sm" onClick={() => nudge(-1)}>Next</button>
      </div>
      <div className="sr-only">
        <ul>
          {reviews.map((r) => (
            <li key={r.author}>{r.author}: {r.text}</li>
          ))}
        </ul>
      </div>
      <Attribution url={data.mapsUrl} />
    </div>
  );
}

function Summary({ data }: { data: GoogleReviewPayload }) {
  return (
    <div className="text-center">
      <p className="font-serif text-5xl text-gold">{data.rating?.toFixed(1) ?? ""}</p>
      <p className="text-sm text-muted">{data.count ?? data.reviews.length} on Google</p>
      {data.mapsUrl && (
        <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-gold-soft underline">
          Read on Google
        </a>
      )}
    </div>
  );
}

function Card({ review }: { review: GoogleReviewPayload["reviews"][number] }) {
  return (
    <article className="rounded-[20px] border border-gold/25 bg-sanctum p-4 text-left shadow-card">
      <p className="text-gold">{"★".repeat(Math.round(review.rating))}</p>
      <p className="mt-2 line-clamp-3 text-sm text-parchment/90">{review.text}</p>
      <p className="mt-3 text-sm">
        {review.authorUrl ? (
          <a href={review.authorUrl} className="text-gold-soft underline" target="_blank" rel="noopener noreferrer">{review.author}</a>
        ) : review.author}
        <span className="text-muted"> {review.relativeTime}</span>
      </p>
    </article>
  );
}

function Attribution({ url }: { url?: string }) {
  return (
    <p className="mt-4 text-center text-xs text-muted">
      Reviews from Google
      {url ? (
        <>
          {" "}
          <a className="underline" href={url}>
            Google Maps
          </a>
        </>
      ) : null}
    </p>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return mobile;
}
