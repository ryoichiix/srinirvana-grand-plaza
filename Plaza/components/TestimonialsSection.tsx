import SectionReveal from "./SectionReveal";

const testimonials = [
  {
    quote:
      "Srinirvana Grand Plaza redefined what a boutique hotel experience means for me. The attention to detail was extraordinary — from the handwritten welcome note to the perfectly curated pillow menu. I felt like the only guest in the hotel.",
    name: "Priya Ramachandran",
    origin: "Chennai",
    delay: 0,
  },
  {
    quote:
      "We celebrated our anniversary here and it was beyond magical. The terrace restaurant at sunset, the spa treatments, the absolute silence of the suite — this is a place that restores you. We're already planning our return.",
    name: "Arjun & Meera Kapoor",
    origin: "Mumbai",
    delay: 0.15,
  },
  {
    quote:
      "As someone who travels frequently for work, I've stayed in five-star properties worldwide. Srinirvana is something different — it has the warmth that big chains simply cannot manufacture. The staff remembered my coffee preference without being asked.",
    name: "Vikram Nair",
    origin: "Bengaluru",
    delay: 0.30,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 lg:py-36 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16">
          <p className="eyebrow mb-4">Guest Experiences</p>
          <h2 className="font-display font-light text-ivory section-heading">
            Words from Our Guests
          </h2>
        </SectionReveal>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto pb-4 md:overflow-visible">
          {testimonials.map((testimonial) => (
            <SectionReveal
              key={testimonial.name}
              delay={testimonial.delay}
              className="bg-surface border border-border p-8 relative flex flex-col min-w-[280px] md:min-w-0"
            >
              {/* Gold quote mark */}
              <span className="font-display text-7xl text-gold/30 leading-none absolute top-4 left-6 select-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-6 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-ivory/70 font-sans text-sm leading-relaxed flex-1 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Guest Info */}
              <div>
                <p className="text-ivory font-sans font-medium text-sm">
                  {testimonial.name}
                </p>
                <p className="text-muted text-xs font-sans tracking-wide mt-1">
                  {testimonial.origin}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
