"use client";

import Link from "next/link";
import RoomCard from "./RoomCard";
import SectionReveal from "./SectionReveal";

const previewRooms = [
  {
    name: "Deluxe Room",
    price: "₹8,500",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    delay: 0,
  },
  {
    name: "Executive Suite",
    price: "₹15,000",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    delay: 0.15,
  },
  {
    name: "Presidential Suite",
    price: "₹28,000",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    delay: 0.3,
  },
];

const MARQUEE_TEXT =
  "DELUXE · EXECUTIVE · SUITES · PRESIDENTIAL · GRAND PLAZA · BHONGIR · ";

export default function RoomsPreview() {
  return (
    <section className="py-28 lg:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <SectionReveal className="text-center mb-8">
          <p className="eyebrow mb-4">Accommodations</p>
          <h2 className="font-display font-light text-ivory section-heading">
            Curated Spaces
          </h2>
          <p className="text-ivory/50 font-sans text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Each room is a private world — designed with restraint, furnished
            with intention, and curated to hold the world at a comfortable
            distance.
          </p>
        </SectionReveal>
      </div>

      {/* ── Marquee ─────────────────────────────────────────── */}
      <div className="overflow-hidden py-6 border-y border-gold/10 mb-16">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Two copies for seamless loop */}
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="font-display text-sm tracking-[0.25em] shrink-0 pr-0"
              style={{ color: "rgba(201,169,110,0.35)" }}
              aria-hidden={copy === 1}
            >
              {/* Repeat enough times to fill the screen */}
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{MARQUEE_TEXT}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewRooms.map((room) => (
            <RoomCard
              key={room.name}
              name={room.name}
              price={room.price}
              imageUrl={room.imageUrl}
              delay={room.delay}
              href="/rooms"
            />
          ))}
        </div>

        {/* CTA */}
        <SectionReveal className="text-center mt-14" delay={0.2}>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-3 px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase font-sans hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            View All Rooms
            <span>→</span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
