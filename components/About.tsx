"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Server, Target } from "lucide-react";
import type { AboutData, AboutHighlight } from "@/lib/defaultData";

const highlightIcons: Record<string, React.ReactNode> = {
  primary: <Shield className="w-8 h-8 text-primary" />,
  secondary: <Zap className="w-8 h-8 text-secondary" />,
  yellow: <Server className="w-8 h-8 text-yellow-400" />,
  purple: <Target className="w-8 h-8 text-purple-400" />,
};

const highlightBorders: Record<string, string> = {
  primary: "hover:border-primary/50",
  secondary: "hover:border-secondary/50",
  yellow: "hover:border-yellow-400/50",
  purple: "hover:border-purple-400/50",
};

// Renders paragraphs with <primary>...</primary> and <secondary>...</secondary> tags as colored spans
function renderParagraph(text: string): React.ReactNode {
  const parts = text.split(/(<primary>.*?<\/primary>|<secondary>.*?<\/secondary>)/gs);
  return parts.map((part, i) => {
    if (part.startsWith("<primary>")) {
      return <span key={i} className="text-primary font-semibold">{part.replace(/<\/?primary>/g, "")}</span>;
    }
    if (part.startsWith("<secondary>")) {
      return <span key={i} className="text-secondary font-semibold">{part.replace(/<\/?secondary>/g, "")}</span>;
    }
    return part;
  });
}

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-primary font-mono mr-2">01.</span>
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Me
              </span>
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 lg:col-span-8 space-y-5">
              {data.paragraphs.map((para, i) => (
                <p key={i} className="text-lg text-slate-300 leading-relaxed">
                  {renderParagraph(para)}
                </p>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                {data.badges.map((badge, i) => (
                  <span key={i} className={`text-sm font-mono px-3 py-1 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.highlights.map((h: AboutHighlight, i: number) => (
                  <div
                    key={i}
                    className={`bg-surface border border-slate-800 p-4 rounded-lg flex items-start space-x-4 transition-colors group ${highlightBorders[h.color]}`}
                  >
                    <div className="shrink-0 group-hover:scale-110 transition-transform">
                      {highlightIcons[h.color]}
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-mono text-sm mb-1">{h.title}</h4>
                      <p className="text-sm text-slate-400">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10" />
              <div className="bg-surface border border-slate-700 rounded-xl p-1 relative overflow-hidden aspect-square z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-20 pointer-events-none" />
                <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center border border-slate-800 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                  <svg className="w-32 h-32 text-slate-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div className="font-mono text-xs text-center w-full bg-slate-950/80 py-3 absolute bottom-0 border-t border-slate-800 space-y-1">
                    <div className="text-primary/70">ID: ARRASHI_SATYADI</div>
                    <div className="text-secondary/70">CLASS: NETWORK_INFRA_ENGINEER</div>
                    <div className="text-slate-500">STATUS: <span className="text-green-400">AVAILABLE</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
