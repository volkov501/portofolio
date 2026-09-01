"use client";

import { motion } from "framer-motion";
import { ExternalLink, Camera, Server, Plane, Flame, Cpu, HardDrive, Zap } from "lucide-react";
import type { Project } from "@/lib/defaultData";

const iconMap: Record<string, React.ReactNode> = {
  yellow: <HardDrive className="w-6 h-6 text-yellow-400" />,
  primary: <Camera className="w-6 h-6 text-primary" />,
  secondary: <Server className="w-6 h-6 text-secondary" />,
  red: <Flame className="w-6 h-6 text-red-400" />,
  purple: <Zap className="w-6 h-6 text-purple-400" />,
  plane: <Plane className="w-6 h-6 text-primary" />,
  cpu: <Cpu className="w-6 h-6 text-secondary" />,
};

const iconBgMap: Record<string, string> = {
  yellow: "bg-yellow-400/10 border-yellow-400/30",
  primary: "bg-primary/10 border-primary/30",
  secondary: "bg-secondary/10 border-secondary/30",
  red: "bg-red-400/10 border-red-400/30",
  purple: "bg-purple-400/10 border-purple-400/30",
  plane: "bg-primary/10 border-primary/30",
  cpu: "bg-secondary/10 border-secondary/30",
};

export default function Projects({ data }: { data: Project[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center space-x-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary font-mono mr-2">03.</span>
            Key{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Projects
            </span>
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`bg-surface border rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full relative overflow-hidden ${
                project.highlight
                  ? "border-yellow-400/40 hover:border-yellow-400/70 shadow-[0_0_20px_rgba(250,204,21,0.08)]"
                  : "border-slate-700/50 hover:border-primary/50 bg-glow-hover"
              }`}
            >
              {project.highlight && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400/80 via-yellow-300 to-yellow-400/80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${iconBgMap[project.iconColor] ?? iconBgMap.primary} group-hover:scale-110 transition-transform duration-200`}>
                  {iconMap[project.iconColor] ?? iconMap.primary}
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-200 mb-3 group-hover:text-primary transition-colors relative z-10">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow relative z-10">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Link */}
              <div className="mt-4 pt-4 border-t border-slate-700/50 relative z-10">
                {project.liveUrl && project.liveUrl !== "#" ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    View Live Project
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 select-none">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Link coming soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
