"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/lib/defaultData";
import SectionHeading from "./SectionHeading";

export default function Skills({ data }: { data: SkillCategory[] }) {
  return (
    <section id="skills" className="py-28 md:py-40 relative bg-night-soft border-t border-hairline font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading index="04 — Skills" title="Technical Skills" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
            {data.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-8 border-r border-b border-hairline"
              >
                <p className="sx-eyebrow text-white mb-6">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="sx-display text-2xl text-white mb-8">{category.title}</h3>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="text-xs font-medium uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border border-hairline text-white/80 cursor-default hover:bg-[#f0f0fa] hover:text-black hover:border-[#f0f0fa] transition-colors duration-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
