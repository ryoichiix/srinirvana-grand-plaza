"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ── useCountUp ─────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, active = false): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return value;
}

/* ── StatItem ───────────────────────────────────────────────── */
function StatItem({
  target,
  label,
  suffix = "",
  duration = 1400,
}: {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(target, duration, inView);

  return (
    <div ref={ref}>
      <span className="font-display text-3xl text-gold font-light block">
        {count}
        {suffix}
      </span>
      <span className="text-muted text-xs tracking-wider uppercase font-sans">
        {label}
      </span>
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section className="py-28 lg:py-36 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-5">Our Story</p>

            <h2 className="font-display font-light text-ivory section-heading mb-6">
              A Legacy of Refined Hospitality
            </h2>

            <span className="gold-divider mb-8 block" />

            <div className="space-y-5 text-ivory/70 font-sans text-base leading-relaxed">
              <p>
                Born from a vision to create a sanctuary that honors Telangana&apos;s
                rich cultural heritage, Srinirvana Grand Plaza opened its doors in 2018
                as Bhongir&apos;s first true luxury boutique retreat. Nestled along NH-65
                with a commanding view of the ancient Bhongir Fort, we offer travellers
                an escape that feels both timeless and profoundly personal.
              </p>
              <p>
                Every corner of our property has been curated with intention — from the
                hand-picked artwork adorning our corridors to the locally sourced
                ingredients in our kitchen. We believe luxury is not about extravagance
                but about the effortless feeling that everything has been thoughtfully
                arranged just for you.
              </p>
              <p>
                Our team of 120 dedicated hospitality professionals shares a single
                purpose: to ensure that every guest departs with a story worth telling,
                a calm they didn&apos;t expect, and an earnest desire to return.
              </p>
            </div>

            {/* Stats Row — count-up on viewport entry */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-8">
                <StatItem target={48} label="Suites" duration={1200} />
                <StatItem target={3} label="Restaurants" duration={800} />
                <StatItem target={1} label="Spa" duration={600} />
                <StatItem target={2018} label="Est." duration={1600} />
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
                alt="Srinirvana Grand Plaza – Elegant Lobby"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-gold/50" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-gold/50" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-surface border border-border p-6 hidden lg:block">
              <p className="font-display text-4xl text-gold font-light">6+</p>
              <p className="text-xs tracking-[0.2em] text-muted uppercase font-sans mt-1">
                Years of Excellence
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
