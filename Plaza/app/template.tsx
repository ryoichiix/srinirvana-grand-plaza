"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * app/template.tsx is re-mounted on every route change (unlike layout.tsx which
 * persists). This is the correct Next.js App Router hook for page transitions.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
