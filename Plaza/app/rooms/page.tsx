"use client";

import { useState } from "react";
import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Bath, Sunset,
  UtensilsCrossed, Car, Dumbbell,
} from "lucide-react";
import FooterSection from "@/components/FooterSection";
import SectionReveal from "@/components/SectionReveal";

/* ── Types ──────────────────────────────────────────────────── */
type FilterKey = "All" | "Deluxe" | "Suite" | "Premium";

interface Amenity {
  icon: ElementType;
  label: string;
}

interface Room {
  id: number;
  name: string;
  category: Exclude<FilterKey, "All">;
  size: string;
  price: string;
  priceRaw: number;
  bedType: string;
  view: string;
  description: string;
  features: string[];
  amenities: Amenity[];
  imageUrl: string;
  badge?: string;
}

/* ── Data ───────────────────────────────────────────────────── */
const FILTERS: FilterKey[] = ["All", "Deluxe", "Suite", "Premium"];

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Room",
    category: "Deluxe",
    size: "320 sq ft",
    price: "₹8,500",
    priceRaw: 8500,
    bedType: "King Bed",
    view: "City View",
    description:
      "A refined urban sanctuary with warm tones and carefully curated furnishings. The Deluxe Room offers everything you need for a restful stay — a plush king bed, a rainfall shower, and a private city view that feels like the world is yours alone.",
    features: [
      "Plush king-size bed with premium linens",
      "Rainfall shower with premium toiletries",
      "City view from floor-to-ceiling windows",
      "40-inch Smart TV with streaming",
      "Minibar with curated beverages",
      "Work desk and ergonomic chair",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Minibar" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
  },
  {
    id: 2,
    name: "Deluxe Twin Room",
    category: "Deluxe",
    size: "320 sq ft",
    price: "₹9,000",
    priceRaw: 9000,
    bedType: "Twin Beds",
    view: "Garden View",
    description:
      "Ideal for friends or families travelling together, the Deluxe Twin Room pairs the same elegant sensibility with two individually comfortable beds and a serene garden view that brings nature right to your window.",
    features: [
      "Two comfortable single beds with premium linens",
      "Lush garden view",
      "Rainfall shower and luxury toiletries",
      "Smart TV with streaming",
      "Individual reading lights and bedside controls",
      "Generous wardrobe space",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Minibar" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80",
  },
  {
    id: 3,
    name: "Executive Room",
    category: "Premium",
    size: "450 sq ft",
    price: "₹12,000",
    priceRaw: 12000,
    bedType: "King Bed",
    view: "Pool View",
    description:
      "Designed for the discerning business traveller, the Executive Room combines a spacious layout with a dedicated work area and a tranquil pool view. Premium amenities and express services ensure productivity and relaxation go hand in hand.",
    features: [
      "Luxurious king-size bed",
      "Pool view balcony",
      "Dedicated work desk with high-speed WiFi",
      "Premium Nespresso machine",
      "Bathrobes and designer toiletries",
      "Same-day laundry service",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Nespresso" },
      { icon: Dumbbell, label: "Gym Access" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
  },
  {
    id: 4,
    name: "Junior Suite",
    category: "Suite",
    size: "600 sq ft",
    price: "₹15,000",
    priceRaw: 15000,
    bedType: "King Bed",
    view: "Panoramic",
    description:
      "The Junior Suite introduces a sense of generous space with a separate living area that makes it feel more like a private apartment than a hotel room. The freestanding soaking bathtub is a particular favourite among honeymooners.",
    features: [
      "Separate living area with sofa",
      "Freestanding soaking bathtub",
      "Complimentary breakfast for two",
      "Panoramic views",
      "In-room safe",
      "Evening turndown service",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Bath, label: "Soaking Tub" },
      { icon: Coffee, label: "Minibar" },
      { icon: Tv, label: "Smart TV" },
      { icon: Sunset, label: "Panoramic View" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
    badge: "Most Popular",
  },
  {
    id: 5,
    name: "Grand Suite",
    category: "Suite",
    size: "850 sq ft",
    price: "₹22,000",
    priceRaw: 22000,
    bedType: "King Bed",
    view: "Panoramic",
    description:
      "Our Grand Suite is a masterclass in understated luxury. With a kitchenette, generous living spaces, and panoramic views across Bhongir, it offers a sense of private residence. Your dedicated butler is available around the clock.",
    features: [
      "Butler service included",
      "Full kitchenette",
      "Panoramic views of Bhongir",
      "Jacuzzi bathtub",
      "Complimentary airport transfer",
      "Curated welcome amenity",
      "Priority reservations at all restaurants",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Bath, label: "Jacuzzi" },
      { icon: UtensilsCrossed, label: "Kitchenette" },
      { icon: Car, label: "Airport Transfer" },
      { icon: Tv, label: "Smart TV" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80",
  },
  {
    id: 6,
    name: "Presidential Suite",
    category: "Suite",
    size: "1400 sq ft",
    price: "₹28,000",
    priceRaw: 28000,
    bedType: "King Bed",
    view: "Private Terrace",
    description:
      "The pinnacle of the Srinirvana experience. The Presidential Suite commands an entire floor wing with a private terrace overlooking Bhongir Fort, a formal dining room, and a Jacuzzi that makes every evening feel like a celebration.",
    features: [
      "Private terrace with Fort views",
      "Formal dining room (seats 6)",
      "Outdoor Jacuzzi on terrace",
      "Dedicated butler on call",
      "Complimentary airport transfers",
      "Personalized in-room bar setup",
      "Daily fresh flowers and seasonal fruits",
      "Access to Executive Lounge",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Bath, label: "Jacuzzi" },
      { icon: UtensilsCrossed, label: "Dining Room" },
      { icon: Car, label: "Airport Transfer" },
      { icon: Sunset, label: "Private Terrace" },
      { icon: Tv, label: "Smart TV" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=900&q=80",
    badge: "Signature Experience",
  },
];

/* ── Room card (alternating layout) ────────────────────────── */
function RoomRow({ room, index }: { room: Room; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ── Image with hover reveal ── */}
        <div
          className={`relative h-[420px] overflow-hidden group ${
            reversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Image
            src={room.imageUrl}
            alt={room.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* "Most Popular" badge — top right */}
          {room.badge && (
            <div
              className="absolute top-4 right-4 z-10 text-obsidian text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans font-semibold"
              style={{
                background:
                  room.badge === "Most Popular"
                    ? "#C9A96E"
                    : "rgba(201,169,110,0.85)",
              }}
            >
              {room.badge}
            </div>
          )}

          {/* Hover reveal panel */}
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              background: "rgba(10,10,10,0.92)",
              backdropFilter: "blur(8px)",
              borderTop: "1px solid rgba(201,169,110,0.25)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              {/* 3 key amenity icons */}
              <div className="flex gap-5">
                {room.amenities.slice(0, 3).map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-1.5">
                    <a.icon size={17} className="text-gold" />
                    <span className="text-[10px] text-ivory/60 font-sans tracking-wide">
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-display text-gold text-2xl leading-none">
                  {room.price}
                </p>
                <p className="text-[10px] text-muted font-sans mt-0.5 tracking-wide">
                  per night
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className={reversed ? "lg:order-1" : "lg:order-2"}>
          <p className="eyebrow mb-3">
            {room.size} · {room.view}
          </p>
          <h2 className="font-display font-light text-ivory text-4xl md:text-5xl mb-3">
            {room.name}
          </h2>

          {/* Price label — Cormorant font, gold */}
          <p className="font-display text-gold text-2xl mb-6 leading-none">
            From {room.price}
            <span className="font-sans text-muted text-sm ml-2 font-normal">
              / night
            </span>
          </p>

          <span className="gold-divider mb-6 block" />

          <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-6">
            {room.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {room.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-ivory/60 font-sans text-sm"
              >
                <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Amenity icons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {room.amenities.map((amenity) => (
              <div
                key={amenity.label}
                className="flex items-center gap-2 text-muted text-xs font-sans"
              >
                <amenity.icon size={13} className="text-gold" />
                {amenity.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gold text-obsidian text-xs tracking-widest uppercase font-sans hover:bg-goldLight transition-all duration-300 font-medium"
            >
              Enquire Now
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-border text-ivory/60 text-xs tracking-widest uppercase font-sans hover:border-gold hover:text-gold transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered =
    activeFilter === "All"
      ? rooms
      : rooms.filter((r) => r.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80"
          alt="Rooms & Suites at Srinirvana Grand Plaza"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
          <SectionReveal>
            <p className="eyebrow mb-3">Accommodations</p>
            <h1 className="font-display font-light text-ivory section-heading">
              Rooms & Suites
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          background: "rgba(10,10,10,0.96)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(201,169,110,0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center gap-3 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`relative px-5 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-250 ${
                activeFilter === f
                  ? "text-obsidian"
                  : "border border-border text-muted hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {activeFilter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-gold"
                  style={{ zIndex: -1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {f}
            </button>
          ))}

          {/* Room count */}
          <span className="ml-auto text-muted text-xs font-sans">
            {filtered.length} {filtered.length === 1 ? "room" : "rooms"}
          </span>
        </div>
      </div>

      {/* ── Room Listing ── */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal className="mb-16 text-center">
            <p className="text-ivory/50 font-sans text-base max-w-2xl mx-auto leading-relaxed">
              Each of our 48 rooms and suites is a world unto itself — designed
              with restraint, furnished with precision, and prepared with the
              singular purpose of making you feel at home in the most refined
              sense of the word.
            </p>
          </SectionReveal>

          <motion.div layout className="space-y-28">
            <AnimatePresence mode="popLayout">
              {filtered.map((room, index) => (
                <RoomRow key={room.id} room={room} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                className="text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-ivory/40 text-2xl">
                  No rooms in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
