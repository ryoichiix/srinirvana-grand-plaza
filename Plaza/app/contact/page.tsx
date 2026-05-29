"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import SectionReveal from "@/components/SectionReveal";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  roomType: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setSubmitting(false);
    setFormData(initialFormData);
  };

  const inputClass =
    "w-full bg-surface border border-border text-ivory placeholder-muted/50 font-sans text-sm px-4 py-3 focus:border-gold/50 focus:outline-none transition-colors duration-200";
  const labelClass = "block text-xs tracking-widest uppercase text-muted font-sans mb-2";

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          alt="Contact Srinirvana Grand Plaza"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
          <SectionReveal>
            <p className="eyebrow mb-3">Get in Touch</p>
            <h1 className="font-display font-light text-ivory section-heading">
              Contact & Location
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Info + Map */}
            <div>
              <SectionReveal>
                <p className="eyebrow mb-4">Find Us</p>
                <h2 className="font-display font-light text-ivory text-4xl md:text-5xl mb-8">
                  We&apos;re Here for You
                </h2>
                <p className="text-ivory/60 font-sans text-sm leading-relaxed mb-10">
                  Whether you have a question about our rooms, need help planning your stay, or simply want to tell us about a special occasion, we are always happy to hear from you. Our reservations team is available 24/7.
                </p>

                {/* Contact Details */}
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">
                        Address
                      </p>
                      <p className="text-ivory/80 font-sans text-sm leading-relaxed">
                        Survey No. 42, NH-65,<br />
                        Bhongir, Telangana 508116
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+919876543210"
                        className="text-ivory/80 font-sans text-sm hover:text-gold transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:reservations@srinirvana.com"
                        className="text-ivory/80 font-sans text-sm hover:text-gold transition-colors"
                      >
                        reservations@srinirvana.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted font-sans mb-1">
                        Check-in / Check-out
                      </p>
                      <p className="text-ivory/80 font-sans text-sm">
                        Check-in: 12:00 PM &nbsp;·&nbsp; Check-out: 11:00 AM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="relative h-[300px] overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15216.47823743413!2d78.87697!3d17.50567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90cdf8c62a79%3A0x1fa13f17e4c6b0e5!2sBhongir%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(80%) invert(90%) contrast(85%)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Srinirvana Grand Plaza Location"
                  />
                </div>
              </SectionReveal>
            </div>

            {/* Right: Contact Form */}
            <div>
              <SectionReveal delay={0.15}>
                <p className="eyebrow mb-4">Reservation Enquiry</p>
                <h2 className="font-display font-light text-ivory text-4xl md:text-5xl mb-8">
                  Plan Your Stay
                </h2>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-surface border border-gold/30 p-10 text-center"
                    >
                      <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                      <h3 className="font-display text-3xl text-ivory font-light mb-3">
                        Thank You
                      </h3>
                      <p className="text-ivory/60 font-sans text-sm leading-relaxed">
                        Your enquiry has been received. Our reservations team will reach out to you within 2 hours. We look forward to welcoming you to Srinirvana.
                      </p>
                      <p className="text-gold text-xs tracking-wider font-sans mt-6">
                        Dhanyavaad 🙏
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-xs tracking-widest uppercase text-muted hover:text-gold font-sans transition-colors"
                      >
                        Send Another Enquiry →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClass}>
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass}>
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>

                      {/* Check-in & Check-out */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="checkIn" className={labelClass}>
                            Check-in Date
                          </label>
                          <input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className={`${inputClass} [color-scheme:dark]`}
                          />
                        </div>
                        <div>
                          <label htmlFor="checkOut" className={labelClass}>
                            Check-out Date
                          </label>
                          <input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className={`${inputClass} [color-scheme:dark]`}
                          />
                        </div>
                      </div>

                      {/* Room Type */}
                      <div>
                        <label htmlFor="roomType" className={labelClass}>
                          Room Preference
                        </label>
                        <select
                          id="roomType"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className={`${inputClass} [color-scheme:dark]`}
                        >
                          <option value="">Select a room type</option>
                          <option value="deluxe">Deluxe Room – ₹8,500/night</option>
                          <option value="deluxe-twin">Deluxe Twin Room – ₹9,000/night</option>
                          <option value="executive">Executive Room – ₹12,000/night</option>
                          <option value="junior-suite">Junior Suite – ₹15,000/night</option>
                          <option value="grand-suite">Grand Suite – ₹22,000/night</option>
                          <option value="presidential">Presidential Suite – ₹28,000/night</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className={labelClass}>
                          Special Requests or Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about any special occasions, dietary requirements, or requests..."
                          value={formData.message}
                          onChange={handleChange}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-gold text-obsidian text-sm tracking-widest uppercase font-sans font-medium hover:bg-goldLight transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending Enquiry..." : "Send Reservation Enquiry →"}
                      </button>

                      <p className="text-muted text-xs font-sans text-center">
                        By submitting, you agree to be contacted by our reservations team. No payment required at this stage.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Strip */}
      <section className="py-12 bg-charcoal border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Distance from Hyderabad", value: "55 km" },
              { label: "Airport Transfer", value: "₹1,200" },
              { label: "Direct Booking Discount", value: "10% Off" },
              { label: "Free Cancellation", value: "48hrs Prior" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-3xl text-gold font-light">{item.value}</p>
                <p className="text-muted text-xs tracking-wide uppercase font-sans mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
