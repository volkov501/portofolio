"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Star, BookOpen } from "lucide-react";
import type { EducationEntry, EducationCertification } from "@/lib/defaultData";

const eduIconMap: Record<string, React.ReactNode> = {
  primary: <GraduationCap className="w-8 h-8 text-primary" />,
  secondary: <BookOpen className="w-8 h-8 text-secondary" />,
};

const eduIconBg: Record<string, string> = {
  primary: "bg-primary/10 border-primary/20",
  secondary: "bg-secondary/10 border-secondary/20",
};

const certIconMap: Record<string, React.ReactNode> = {
  yellow: <Award className="w-7 h-7 text-yellow-400" />,
  blue: <Star className="w-7 h-7 text-blue-400" />,
  secondary: <BookOpen className="w-7 h-7 text-secondary" />,
};

const certColorMap: Record<string, { card: string; badge: string }> = {
  yellow: { card: "border-yellow-400/30 bg-yellow-400/5", badge: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5" },
  blue: { card: "border-blue-400/30 bg-blue-400/5", badge: "text-blue-400 border-blue-400/30 bg-blue-400/5" },
  secondary: { card: "border-secondary/30 bg-secondary/5", badge: "text-secondary border-secondary/30 bg-secondary/5" },
};

export default function Education({
  data,
  certs,
}: {
  data: EducationEntry[];
  certs: EducationCertification[];
}) {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-primary font-mono mr-2">05.</span>
              Education &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Certifications
              </span>
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          {/* Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {data.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface border border-slate-700/50 rounded-xl p-8 relative flex flex-col justify-start hover:border-slate-500 transition-colors"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <GraduationCap className="w-32 h-32 text-primary" />
                </div>
                <div className="flex items-center space-x-4 mb-5 relative z-10">
                  <div className={`p-3 rounded-lg border ${eduIconBg[edu.color] ?? eduIconBg.primary}`}>
                    {eduIconMap[edu.color] ?? eduIconMap.primary}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-200">{edu.school}</h3>
                    <p className="text-slate-500 text-sm font-mono">{edu.location}</p>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  {edu.degrees.map((deg, j) => (
                    <div key={j} className="bg-surface-hover/50 rounded-lg p-3 border border-slate-800">
                      <p className="text-slate-200 font-medium text-sm">{deg.level}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-slate-500 text-xs font-mono">{deg.period}</p>
                        {deg.gpa && (
                          <span className="text-primary text-xs font-mono font-bold">GPA {deg.gpa}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium">
                    <Star className="w-3.5 h-3.5" />
                    {edu.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="text-xl font-bold text-slate-300 font-mono mb-6 flex items-center gap-2">
            <span className="text-primary">//</span> Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certs.map((cert, i) => {
              const styles = certColorMap[cert.color] ?? certColorMap.secondary;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-surface border rounded-xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 ${styles.card}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-surface rounded-lg border border-slate-700">
                      {certIconMap[cert.color] ?? certIconMap.secondary}
                    </div>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${styles.badge}`}>
                      {cert.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-100 font-bold text-base">{cert.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{cert.issuer}</p>
                    <p className="text-slate-500 text-xs font-mono mt-1">Issued: {cert.year}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
