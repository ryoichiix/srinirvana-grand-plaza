"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Letter-spacing tightens as user scrolls: 0.5em → 0.15em over first 200px
  const logoLetterSpacing = useTransform(scrollY, [0, 200], ["0.5em", "0.15em"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,169,110,0.2)"
            : "1px solid transparent",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <motion.span
                className="font-display text-2xl text-gold font-light block"
                style={{ letterSpacing: logoLetterSpacing }}
              >
                SRINIRVANA
              </motion.span>
              <span className="block text-[9px] tracking-[0.3em] text-muted uppercase font-sans">
                Grand Plaza
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-widest uppercase font-sans transition-colors duration-200 group ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Book Now */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-2.5 border border-gold text-gold text-xs tracking-widest uppercase font-sans hover:bg-gold hover:text-obsidian transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-ivory/80 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-md md:hidden flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="mb-4">
            <span className="font-display text-3xl text-gold tracking-widest font-light">
              SRINIRVANA
            </span>
          </div>
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className={`text-2xl font-display font-light tracking-widest ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-ivory/80 hover:text-gold"
                } transition-colors`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="mt-4 px-8 py-3 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
