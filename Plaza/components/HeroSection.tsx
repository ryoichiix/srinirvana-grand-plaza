"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const LINE_1 = "Where Silence";
const LINE_2 = "Becomes Luxury";

const HERO_IMAGE_PRIMARY =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80";
const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80";

function SplitHeading({
  text,
  baseDelay,
  goldFrom,
}: {
  text: string;
  baseDelay: number;
  goldFrom?: number; // index from which chars become gold+italic
}) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={
            goldFrom !== undefined && i >= goldFrom
              ? "text-gold italic"
              : undefined
          }
          style={{ display: char === " " ? "inline" : "inline-block" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE_PRIMARY);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // "Becomes " is 8 chars; gold starts at index 8 ("Luxury")
  const goldStartIndex = "Becomes ".length;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden flex items-center"
    >
      {/* z-0 — Parallax + Ken Burns Background */}
      <motion.div
        className="absolute inset-0 w-full h-[130%]"
        style={{ y: backgroundY, top: "-15%", zIndex: 0 }}
      >
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={heroSrc}
            alt="Srinirvana Grand Plaza – Luxury Hotel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={() => setHeroSrc(HERO_IMAGE_FALLBACK)}
          />
        </div>
      </motion.div>

      {/* z-10 — Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 10,
          background:
            "linear-gradient(to right, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.70) 40%, rgba(5,5,5,0.35) 75%, rgba(5,5,5,0.15) 100%)",
        }}
      />

      {/* z-10 — Noise Texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          zIndex: 10,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* z-20 — Hero Text Content */}
      <div
        className="absolute left-0 right-0 w-full max-w-7xl mx-auto px-6 lg:px-8"
        style={{ zIndex: 20, top: "50%", transform: "translateY(-45%)", opacity: 1 }}
      >
        <div className="max-w-3xl relative">
          {/* Eyebrow with gold vertical bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 16,
                background: "#C9A96E",
                marginRight: 12,
                verticalAlign: "middle",
              }}
              aria-hidden
            />
            <span className="eyebrow align-middle">
              Bhongir · Telangana · Since 2018
            </span>
          </motion.div>

          {/* Gold rule — between eyebrow and heading */}
          <motion.div
            className="mb-8"
            style={{ height: 1, background: "#C9A96E" }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Heading line 1 — character by character */}
          <div className="overflow-hidden mb-1">
            <h1 className="font-display font-light text-ivory leading-[0.9] hero-heading">
              <SplitHeading text={LINE_1} baseDelay={0.45} />
            </h1>
          </div>

          {/* Heading line 2 — "Luxury" in gold italic */}
          <div className="overflow-hidden mb-8">
            <h1 className="font-display font-light text-ivory leading-[0.9] hero-heading">
              <SplitHeading
                text={LINE_2}
                baseDelay={0.45 + LINE_1.length * 0.03 + 0.05}
                goldFrom={goldStartIndex}
              />
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-ivory/70 text-base md:text-lg font-sans leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            An intimate retreat where every detail speaks of comfort, and every
            moment becomes a memory worth keeping.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans uppercase transition-all duration-300 ease-in-out hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
              style={{
                background: "transparent",
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                padding: "16px 36px",
                letterSpacing: "0.2em",
                fontSize: 11,
              }}
            >
              Book Your Stay <span>→</span>
            </Link>
            <Link
              href="/rooms"
              className="group relative inline-block font-sans uppercase transition-colors duration-300 ease-in-out hover:text-[#F5F0E8]"
              style={{
                padding: "16px 36px",
                letterSpacing: "0.2em",
                fontSize: 11,
                color: "rgba(245,240,232,0.7)",
              }}
            >
              Explore Rooms
              <span
                className="absolute bottom-[18px] left-[36px] h-px bg-[#C9A96E] w-0 group-hover:w-[calc(100%-72px)] transition-all duration-300 ease-out"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* z-20 — Vertical "SCROLL ↓" label on far right */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-display"
        style={{
          zIndex: 20,
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
          fontSize: 11,
          letterSpacing: "0.4em",
          color: "rgba(245,240,232,0.4)",
          userSelect: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
