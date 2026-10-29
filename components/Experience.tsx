"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, MapPin } from "lucide-react";
import type { ExperienceEntry } from "@/lib/defaultData";
import SectionHeading from "./SectionHeading";
import RevealText from "./motion/RevealText";

export default function Experience({ data }: { data: ExperienceEntry[] }) {
  return (
    <section id="experience" className="py-28 md:py-40 relative bg-night-soft border-t border-hairline font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading index="02 — Experience" title="Work Experience" />

          <div className="border-t border-hairline">
            {data.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-hairline"
              >
                <div className="lg:col-span-4">
                  <div className="inline-flex items-center gap-2 sx-eyebrow text-white mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm uppercase tracking-[0.12em]">
                    <Briefcase className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    {exp.company}
                  </div>
                  <div className="flex items-center gap-2 text-mute text-xs uppercase tracking-[0.12em] mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    {exp.location}
                  </div>
                  <span className="inline-block mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-hairline text-white/80">
                    {exp.type}
                  </span>
                </div>

                <div className="lg:col-span-8">
                  <h3 className="sx-display text-3xl md:text-4xl text-white mb-6">
                    <RevealText>{exp.role}</RevealText>
                  </h3>

                  <ul className="space-y-3 mb-8">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start text-white/70 leading-relaxed">
                        <ChevronRight className="w-4 h-4 mr-3 text-white shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] uppercase tracking-[0.14em] px-3 py-1 border border-hairline text-mute rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
