import Image from "next/image";
import { Clock, Waves, Sparkles, Dumbbell, Car, Users } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import SectionReveal from "@/components/SectionReveal";

const restaurants = [
  {
    name: "Rangoli Restaurant",
    tagline: "Celebrate Every Flavour",
    description:
      "Rangoli is Srinirvana's signature all-day dining restaurant, a vibrant canvas of culinary traditions. Our chefs draw from the rich repertoire of Indian, Chinese, and Continental cuisines, presenting familiar classics alongside thoughtful seasonal creations. The breakfast buffet — celebrated by guests as a highlight of their stay — sets the tone for a perfect day.",
    details: [
      "Multi-cuisine: Indian, Chinese, Continental",
      "Breakfast buffet: ₹650/person",
      "À la carte lunch & dinner",
      "Private dining room available (up to 12 guests)",
    ],
    hours: "6:00 AM – 11:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  },
  {
    name: "The Terrace",
    tagline: "Sundowners Above Bhongir",
    description:
      "Perched on the rooftop with a commanding view of Bhongir Fort illuminated against the evening sky, The Terrace is a place where time slows gracefully. Our bar team crafts signature cocktails inspired by Telangana's flavours — think tamarind-infused Old Fashioneds and jasmine-scented gin spritzers. The ideal setting for celebrating, unwinding, or simply watching the world glow gold.",
    details: [
      "Rooftop bar & lounge",
      "Signature cocktails from ₹350",
      "Curated small plates menu",
      "Live acoustic music on weekends",
    ],
    hours: "4:00 PM – Midnight",
    imageUrl: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=900&q=80",
  },
  {
    name: "Room Service",
    tagline: "Wherever You Are, Excellence Follows",
    description:
      "Our in-room dining service extends the full Rangoli menu to your suite at any hour of the day or night. Whether you desire a warm cup of masala chai at 3 AM, a full breakfast in bed at dawn, or a quiet dinner with candles, our room service team delivers with the same attentiveness and presentation you would expect in our restaurant.",
    details: [
      "Full restaurant menu available",
      "Special dietary accommodations available",
      "Complimentary for suite guests after midnight",
    ],
    hours: "24 Hours · 7 Days",
    imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=900&q=80",
  },
];

const amenities = [
  {
    icon: Waves,
    name: "Swimming Pool",
    description:
      "Our outdoor pool is a 25-meter lap pool and leisure zone set amidst lush landscaping. Open from dawn to evening, it is the perfect way to start or end your day.",
    detail: "6:00 AM – 10:00 PM · Complimentary for guests",
  },
  {
    icon: Sparkles,
    name: "Spa & Wellness",
    description:
      "The Srinirvana Spa offers a curated menu of traditional Ayurvedic treatments, Swedish massages, and contemporary wellness therapies. Our therapists use locally sourced botanicals and cold-pressed oils.",
    detail: "10:00 AM – 8:00 PM · Treatments from ₹1,200",
  },
  {
    icon: Users,
    name: "Conference Hall",
    description:
      "Our fully equipped conference and banquet hall accommodates up to 200 guests. Whether you are hosting a corporate offsite, a product launch, or a wedding reception, our events team handles every detail.",
    detail: "Capacity: 200 · Corporate packages available",
  },
  {
    icon: Dumbbell,
    name: "Fitness Centre",
    description:
      "A state-of-the-art gymnasium with cardio and strength training equipment, free weights, and yoga mats. Complimentary for all hotel guests.",
    detail: "5:00 AM – 11:00 PM · Complimentary",
  },
  {
    icon: Car,
    name: "Valet Parking",
    description:
      "Complimentary valet parking is available for all guests. Our secure facility accommodates both cars and two-wheelers, and our team is available to assist 24/7.",
    detail: "Complimentary · 24/7 Service",
  },
  {
    icon: Clock,
    name: "Concierge Services",
    description:
      "Our concierge team is available around the clock to assist with travel planning, restaurant reservations, heritage tours to Bhongir Fort, shopping, and anything else that would make your stay seamless.",
    detail: "24/7 · AI & In-Person Assistance",
  },
];

export default function DiningPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Dining at Srinirvana Grand Plaza"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
          <SectionReveal>
            <p className="eyebrow mb-3">Culinary & Leisure</p>
            <h1 className="font-display font-light text-ivory section-heading">
              Dining & Amenities
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Dining Intro */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal className="max-w-3xl">
            <p className="eyebrow mb-5">Our Culinary Philosophy</p>
            <h2 className="font-display font-light text-ivory text-4xl md:text-5xl mb-6">
              Food as a Form of Hospitality
            </h2>
            <p className="text-ivory/60 font-sans leading-relaxed">
              At Srinirvana, we believe that dining is not merely sustenance — it is the art of making someone feel welcomed, cared for, and delighted. Every dish that leaves our kitchen carries with it the intention of creating a moment worth remembering.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Restaurants */}
      <section className="bg-obsidian pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-28">
            {restaurants.map((restaurant, index) => (
              <SectionReveal key={restaurant.name} delay={0.05}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-[420px] overflow-hidden ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-sm px-4 py-2 border-l-2 border-gold">
                      <p className="text-gold text-xs tracking-widest uppercase font-sans">
                        {restaurant.hours}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
                    <p className="eyebrow mb-3">{restaurant.tagline}</p>
                    <h2 className="font-display font-light text-ivory text-4xl md:text-5xl mb-2">
                      {restaurant.name}
                    </h2>
                    <span className="gold-divider mb-6 block" />
                    <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-8">
                      {restaurant.description}
                    </p>
                    <ul className="space-y-2">
                      {restaurant.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-center gap-3 text-ivory/60 font-sans text-sm"
                        >
                          <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <p className="eyebrow mb-4">Hotel Amenities</p>
            <h2 className="font-display font-light text-ivory text-4xl md:text-5xl">
              Beyond the Room
            </h2>
            <p className="text-ivory/50 font-sans text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Our amenities are designed to complement every aspect of your stay — whether you seek rejuvenation, recreation, or the efficiency of the modern workspace.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, i) => (
              <SectionReveal key={amenity.name} delay={i * 0.08}>
                <div className="bg-surface border border-border p-8 h-full group hover:border-gold/30 transition-colors duration-300">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors duration-300">
                    <amenity.icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-ivory font-light mb-2">
                    {amenity.name}
                  </h3>
                  <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-4">
                    {amenity.detail}
                  </p>
                  <p className="text-ivory/60 font-sans text-sm leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
