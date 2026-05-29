"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  // Background text parallaxes upward as footer scrolls into view
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <footer ref={footerRef} className="relative bg-charcoal border-t border-gold/30 overflow-hidden">

      {/* ── Oversized parallax background text ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgTextY }}
        aria-hidden
      >
        <span
          className="font-display font-light text-ivory whitespace-nowrap"
          style={{
            fontSize: "10vw",
            opacity: 0.04,
            letterSpacing: "0.3em",
          }}
        >
          SRINIRVANA
        </span>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="font-display text-3xl text-gold tracking-widest font-light block">
                SRINIRVANA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted uppercase font-sans">
                Grand Plaza · Bhongir
              </span>
            </Link>
            <p className="mt-5 text-muted text-sm leading-relaxed font-sans">
              Where every detail speaks of comfort, and every moment becomes a
              memory worth keeping.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="eyebrow mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/rooms", label: "Rooms & Suites" },
                { href: "/dining", label: "Dining & Amenities" },
                { href: "/contact", label: "Contact & Location" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-gold text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="eyebrow mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted font-sans">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>
                  Survey No. 42, NH-65,
                  <br />
                  Bhongir, Telangana 508116
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted font-sans">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-3 text-sm text-muted font-sans">
                <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                <a
                  href="mailto:reservations@srinirvana.com"
                  className="hover:text-gold transition-colors"
                >
                  reservations@srinirvana.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Info */}
          <div>
            <h4 className="eyebrow mb-6">Stay Info</h4>
            <ul className="space-y-3 text-sm font-sans text-muted">
              {[
                { label: "Check-in", value: "12:00 PM" },
                { label: "Check-out", value: "11:00 AM" },
                { label: "Reservations", value: "24/7 Available" },
              ].map(({ label, value }) => (
                <li key={label}>
                  <span className="text-ivory/50 block text-[10px] tracking-wider uppercase mb-1">
                    {label}
                  </span>
                  {value}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 border border-gold text-gold text-xs tracking-widest uppercase font-sans hover:bg-gold hover:text-obsidian transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs font-sans tracking-wide" suppressHydrationWarning>
            © {new Date().getFullYear()} Srinirvana Grand Plaza. All rights reserved.
          </p>
          <p className="text-muted text-xs font-sans">
            Bhongir · Telangana · India
          </p>
        </div>
      </div>
    </footer>
  );
}
