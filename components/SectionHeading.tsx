"use client";

import { motion } from "framer-motion";
import RevealText from "./motion/RevealText";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-5">
        <motion.span
          className="sx-eyebrow text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {index}
        </motion.span>
        {/* Hairline draws out from the eyebrow */}
        <motion.span
          className="h-px w-12 bg-white/40 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>
      <h2 className="sx-display text-5xl sm:text-6xl lg:text-7xl text-white">
        <RevealText delay={0.1}>{title}</RevealText>
      </h2>
    </div>
  );
}
