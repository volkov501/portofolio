"use client";

import { motion } from "framer-motion";

// Text rises out of a clipped line when it scrolls into view (SpaceX-style headline reveal).
// The outer (unclipped) span is what gets observed: the inner one starts hidden below the clip,
// so an observer on it would never report it as visible.
export default function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          shown: { y: 0, opacity: 1, transition: { duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
