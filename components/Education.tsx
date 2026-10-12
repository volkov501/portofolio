"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { EducationEntry, EducationCertification } from "@/lib/defaultData";
import SectionHeading from "./SectionHeading";

export default function Education({
  data,
  certs,
}: {
  data: EducationEntry[];
  certs: EducationCertification[];
}) {
  return (
    <section id="education" className="py-28 md:py-40 relative bg-black border-t border-hairline font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading index="05 — Education" title="Education & Certifications" />

          {/* Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-hairline mb-24">
            {data.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 lg:p-10 border-r border-b border-hairline flex flex-col"
              >
                <p className="sx-eyebrow mb-4">{edu.location}</p>
                <h3 className="sx-display text-3xl lg:text-4xl text-white mb-8">{edu.school}</h3>

                <div className="space-y-5 mb-8">
                  {edu.degrees.map((deg, j) => (
                    <div key={j} className="border-t border-hairline pt-4">
                      <p className="text-white font-semibold tracking-wide">{deg.level}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-mute text-xs uppercase tracking-[0.14em]">{deg.period}</p>
                        {deg.gpa && (
                          <span className="text-white text-xs font-bold uppercase tracking-[0.14em]">GPA {deg.gpa}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <span className="mt-auto self-start text-[11px] font-semibold uppercase tracking-[0.16em] px-4 py-2 rounded-full border border-white text-white">
                  {edu.highlight}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <p className="sx-eyebrow text-white mb-6">Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-hairline">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border-r border-b border-hairline flex flex-col gap-6 hover:bg-night-soft transition-colors duration-300"
              >
                <div className="flex justify-between items-start">
                  <Award className="w-6 h-6 text-white" strokeWidth={1.25} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-hairline text-white/80">
                    {cert.badge}
                  </span>
                </div>
                <div>
                  <h4 className="sx-display text-xl text-white leading-tight">{cert.title}</h4>
                  <p className="text-white/60 text-sm mt-3">{cert.issuer}</p>
                  <p className="text-mute text-xs uppercase tracking-[0.14em] mt-2">Issued: {cert.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
