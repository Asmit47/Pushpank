"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/** Main image with clickable thumbnails; the active image crossfades on switch. */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images;
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-sanctum">
        {current && (
          <motion.div
            key={current.src}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Media
              src={current.src}
              alt={current.alt}
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              wrapperClassName="absolute inset-0"
              className="size-full"
            />
          </motion.div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                className={cn(
                  "block aspect-square w-full overflow-hidden rounded-xl border transition-colors",
                  i === active ? "border-gold" : "border-line hover:border-gold/50",
                )}
              >
                <Media
                  src={img.src}
                  alt=""
                  width={240}
                  height={240}
                  sizes="12vw"
                  wrapperClassName="aspect-square"
                  className="size-full"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
