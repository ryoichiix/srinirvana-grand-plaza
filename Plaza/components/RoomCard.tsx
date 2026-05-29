"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface RoomCardProps {
  name: string;
  price: string;
  imageUrl: string;
  delay?: number;
  href?: string;
}

export default function RoomCard({
  name,
  price,
  imageUrl,
  delay = 0,
  href = "/rooms",
}: RoomCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href}>
        {/* Image Container */}
        <div className="relative h-[400px] lg:h-[480px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="eyebrow mb-2 opacity-70">Accommodation</p>
            <h3 className="font-display text-2xl text-ivory font-light mb-1">
              {name}
            </h3>
            <p className="text-gold text-sm font-sans">
              from{" "}
              <span className="font-medium text-base">{price}</span>
              <span className="text-muted text-xs ml-1">/night</span>
            </p>

            {/* View Details - reveals on hover via CSS group */}
            <div className="mt-4 flex items-center gap-2 text-gold text-sm font-sans tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Details
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Hover reveal bar */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
