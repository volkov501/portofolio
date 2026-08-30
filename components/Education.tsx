"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Star, BookOpen } from "lucide-react";

export default function Education() {
  const education = [
    {
      school: "Gunadarma University",
      location: "Depok, Indonesia",
      degrees: [
        {
          level: "S1 — Bachelor of Computer System",
          period: "Sep 2022 – Sep 2026 (Expected)",
          gpa: "3.89 / 4.00",
        },
        {
          level: "D3 — Diploma, Computer System",
          period: "Sep 2022 – Aug 2025",
          gpa: "3.89 / 4.00",
        },
      ],
      highlight: "Full Scholarship Recipient",
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      iconBg: "bg-primary/10 border-primary/20",
      color: "primary",
    },
    {
      school: "Perguruan Cikini Vocational High School",
      location: "DKI Jakarta",
      degrees: [
        {
          level: "High School Diploma — Computer & Network Engineering",
          period: "Aug 2019 – Aug 2022",
          gpa: null,
        },
      ],
      highlight: "Graduated as Best Student — Highest Score in Department",
      icon: <BookOpen className="w-8 h-8 text-secondary" />,
      iconBg: "bg-secondary/10 border-secondary/20",
      color: "secondary",
    },
  ];

  const certifications = [
    {
      title: "Computer Network Engineering",
      issuer: "BNSP — Badan Nasional Sertifikasi Profesi",
      year: "2025",
      icon: <Award className="w-7 h-7 text-yellow-400" />,
      color: "border-yellow-400/30 bg-yellow-400/5",
      badge: "NATIONAL CERT",
      badgeColor: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    },
    {
      title: "TOEIC English Proficiency",
      issuer: "Score: 770 / 990 — Professional Working Level",
      year: "2025",
      icon: <Star className="w-7 h-7 text-blue-400" />,
      color: "border-blue-400/30 bg-blue-400/5",
      badge: "LANGUAGE",
      badgeColor: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    },
    {
      title: "Computer Engineering Training",
      issuer: "P2KPTK2",
      year: "2023",
      icon: <BookOpen className="w-7 h-7 text-secondary" />,
      color: "border-secondary/30 bg-secondary/5",
      badge: "TRAINING",
      badgeColor: "text-secondary border-secondary/30 bg-secondary/5",
    },
  ];

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
            {education.map((edu, i) => (
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
                  <div className={`p-3 rounded-lg border ${edu.iconBg}`}>{edu.icon}</div>
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
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-surface border rounded-xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 ${cert.color}`}
              >
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-surface rounded-lg border border-slate-700">
                    {cert.icon}
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${cert.badgeColor}`}>
                    {cert.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-base">{cert.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">{cert.issuer}</p>
                  <p className="text-slate-500 text-xs font-mono mt-1">Issued: {cert.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
