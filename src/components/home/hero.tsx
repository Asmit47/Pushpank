"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const trust = [
  "Same-day delivery in Lucknow",
  "Free delivery above ₹999",
  "Samagri kits for every ritual",
];

function Stage({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative z-10 isolate overflow-hidden bg-night">
      <motion.div aria-hidden className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <Image
          src="/images/generated/hero-altar.jpg"
          alt="A brass diya and incense before a gold Om mandala"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_70%] lg:object-[64%_center]"
        />
      </motion.div>
      {/* Warm diya glow breathing behind the copy */}
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute -left-24 top-1/4 size-[34rem] rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,46rem)] bg-gradient-to-r from-night via-night/85 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-night/50 to-night sm:h-44"
      />

      <Container className="relative flex min-h-[calc(100dvh-8.5rem)] items-start pb-28 pt-10 lg:items-center lg:pb-16 lg:pt-16">
        <div className="max-w-xl">
          <Stage delay={0.05}>
            <p className="flex items-center gap-3" lang="hi">
              <span aria-hidden className="h-px w-10 bg-gold/70" />
              <span className="mantra text-lg tracking-wide text-gold">पुष्पांक</span>
            </p>
          </Stage>

          <Stage delay={0.15}>
            <h1 id="hero-title" className="display-hero mt-5 text-parchment">
              Everything for your <em className="text-gold-soft">puja</em>, at the door.
            </h1>
          </Stage>

          <Stage delay={0.28}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-parchment/80 sm:text-lg">
              Fresh flowers, samagri and a pandit for worship at home in Lucknow.
            </p>
          </Stage>

          <Stage delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/shop" size="lg" magnetic>
                Shop Samagri
              </Button>
              <Button href="/puja-services#rituals" size="lg" variant="secondary">
                Book a Pandit
              </Button>
            </div>
          </Stage>

          <Stage delay={0.55}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-parchment/65">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="size-1 rounded-full bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </Stage>
        </div>
      </Container>
    </section>
  );
}
