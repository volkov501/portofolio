"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Network, Shield, BookOpen } from "lucide-react";
import type { SkillCategory } from "@/lib/defaultData";

const iconMap: Record<string, React.ReactNode> = {
  primary: <Network className="w-6 h-6 text-primary" />,
  secondary: <Server className="w-6 h-6 text-secondary" />,
  yellow: <Cpu className="w-6 h-6 text-yellow-400" />,
  purple: <Cpu className="w-6 h-6 text-purple-400" />,
  red: <Shield className="w-6 h-6 text-red-400" />,
  blue: <BookOpen className="w-6 h-6 text-blue-400" />,
};

const colorStyles: Record<string, { card: string; badge: string; top: string }> = {
  primary: { card: "border-primary/40", badge: "border-primary/40 bg-primary/5 text-primary", top: "bg-primary" },
  secondary: { card: "border-secondary/40", badge: "border-secondary/40 bg-secondary/5 text-secondary", top: "bg-secondary" },
  yellow: { card: "border-yellow-400/40", badge: "border-yellow-400/40 bg-yellow-400/5 text-yellow-400", top: "bg-yellow-400" },
  purple: { card: "border-purple-400/40", badge: "border-purple-400/40 bg-purple-400/5 text-purple-400", top: "bg-purple-400" },
  red: { card: "border-red-400/40", badge: "border-red-400/40 bg-red-400/5 text-red-400", top: "bg-red-400" },
  blue: { card: "border-blue-400/40", badge: "border-blue-400/40 bg-blue-400/5 text-blue-400", top: "bg-blue-400" },
};

export default function Skills({ data }: { data: SkillCategory[] }) {
  return (
    <section id="skills" className="py-24 relative bg-surface-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-primary font-mono mr-2">04.</span>
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Skills
              </span>
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((category, index) => {
              const styles = colorStyles[category.color] ?? colorStyles.primary;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`bg-surface border rounded-xl p-6 relative overflow-hidden group hover:border-opacity-70 transition-all duration-300 hover:-translate-y-1 ${styles.card}`}
                >
                  <div className={`absolute top-0 left-0 w-full h-0.5 ${styles.top} opacity-60`} />

                  <div className="flex items-center space-x-3 mb-5">
                    <div className={`p-2 rounded-lg border ${styles.badge}`}>
                      {iconMap[category.color] ?? iconMap.primary}
                    </div>
                    <h3 className="text-base font-bold text-slate-200">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium px-2.5 py-1 rounded-md border cursor-default hover:scale-105 transition-transform ${styles.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
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
