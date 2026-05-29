import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Srinirvana Grand Plaza",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
      {/* Gold decorative line */}
      <div className="w-px h-20 bg-gradient-to-b from-transparent to-gold/60 mb-10" />

      {/* 404 */}
      <p
        className="font-display font-light text-gold leading-none mb-4 select-none"
        style={{ fontSize: "clamp(6rem, 18vw, 14rem)", opacity: 0.12 }}
        aria-hidden
      >
        404
      </p>

      {/* Content — sits over the number */}
      <div className="-mt-16 relative z-10">
        <p className="eyebrow mb-4">Page Not Found</p>

        <h1 className="font-display font-light text-ivory text-4xl md:text-5xl mb-4 leading-tight">
          This room doesn&apos;t exist
        </h1>

        <p className="text-ivory/50 font-sans text-base max-w-md mx-auto leading-relaxed mb-10">
          The page you&apos;re looking for may have moved or never existed. Allow us
          to guide you back to the comfort of our lobby.
        </p>

        {/* Gold divider */}
        <div
          className="mx-auto mb-10"
          style={{ width: 60, height: 1, background: "rgba(201,169,110,0.5)" }}
        />

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-obsidian text-xs tracking-widest uppercase font-sans hover:bg-goldLight transition-all duration-300 font-medium"
          >
            Return Home →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-ivory/60 text-xs tracking-widest uppercase font-sans hover:border-gold hover:text-gold transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="mt-20">
        <span className="font-display text-xl text-gold/30 tracking-[0.5em] font-light select-none">
          SRINIRVANA
        </span>
      </div>
    </div>
  );
}
