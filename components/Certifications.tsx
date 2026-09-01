"use client";

import { motion } from "framer-motion";
import { Award, Download, ExternalLink, Calendar, Building2 } from "lucide-react";
import type { Certification } from "@/lib/defaultData";

const categoryColors: Record<string, string> = {
  Networking: "bg-blue-400/10 border-blue-400/30 text-blue-400",
  Virtualization: "bg-purple-400/10 border-purple-400/30 text-purple-400",
  "IT Support": "bg-emerald-400/10 border-emerald-400/30 text-emerald-400",
};

export default function Certifications({ data }: { data: Certification[] }) {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center space-x-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">
            Certifications &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Credentials
            </span>
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {data.map((cert, i) => {
            const isPlaceholder = !cert.downloadUrl || cert.downloadUrl === "#";
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group bg-surface border border-slate-700/50 rounded-xl p-5 flex gap-4 items-start hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.07)]"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Award className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <span
                      className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border ${
                        categoryColors[cert.category] ??
                        "bg-slate-700/50 border-slate-600 text-slate-400"
                      }`}
                    >
                      {cert.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPlaceholder ? (
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-slate-700/60 text-slate-600 select-none">
                        <Download className="w-3 h-3" />
                        Coming soon
                      </span>
                    ) : (
                      <>
                        <a
                          href={cert.downloadUrl}
                          download
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                        {cert.verifyUrl && cert.verifyUrl !== "#" && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:border-secondary/40 hover:text-secondary transition-all duration-200"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Verify
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="text-center text-xs text-slate-600 mt-8 font-mono">
          // more certifications in progress — section will be updated
        </p>
      </div>
    </section>
  );
}
