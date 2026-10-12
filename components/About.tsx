"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Server, Target } from "lucide-react";
import type { AboutData, AboutHighlight } from "@/lib/defaultData";
import SectionHeading from "./SectionHeading";

const highlightIcons: Record<string, React.ReactNode> = {
  primary: <Shield className="w-6 h-6 text-white" strokeWidth={1.25} />,
  secondary: <Zap className="w-6 h-6 text-white" strokeWidth={1.25} />,
  yellow: <Server className="w-6 h-6 text-white" strokeWidth={1.25} />,
  purple: <Target className="w-6 h-6 text-white" strokeWidth={1.25} />,
};

// Renders paragraphs with <primary>...</primary> and <secondary>...</secondary> tags as emphasised spans
function renderParagraph(text: string): React.ReactNode {
  const parts = text.split(/(<primary>.*?<\/primary>|<secondary>.*?<\/secondary>)/gs);
  return parts.map((part, i) => {
    if (part.startsWith("<primary>")) {
      return <span key={i} className="text-white font-semibold">{part.replace(/<\/?primary>/g, "")}</span>;
    }
    if (part.startsWith("<secondary>")) {
      return <span key={i} className="text-white font-semibold">{part.replace(/<\/?secondary>/g, "")}</span>;
    }
    return part;
  });
}

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-28 md:py-40 relative bg-black border-t border-hairline font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading index="01 — About" title="About Me" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-6">
              {data.paragraphs.map((para, i) => (
                <p key={i} className="text-lg lg:text-xl text-white/70 leading-relaxed tracking-wide">
                  {renderParagraph(para)}
                </p>
              ))}

              <div className="flex flex-wrap gap-3 pt-4">
                {data.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] px-4 py-2 rounded-full border border-hairline text-white/80"
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-hairline p-8 mb-px bg-night-soft">
                <p className="sx-eyebrow mb-6">Mission Profile</p>
                <div className="space-y-3 text-sm uppercase tracking-[0.14em]">
                  <div className="flex justify-between gap-4 border-b border-hairline pb-3">
                    <span className="text-mute">ID</span>
                    <span className="text-white font-semibold">ARRASHI_SATYADI</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-hairline pb-3">
                    <span className="text-mute">Class</span>
                    <span className="text-white font-semibold text-right">NETWORK_INFRA_ENGINEER</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-mute">Status</span>
                    <span className="text-white font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      AVAILABLE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
            {data.highlights.map((h: AboutHighlight, i: number) => (
              <div
                key={i}
                className="p-8 border-r border-b border-hairline hover:bg-night-soft transition-colors duration-300"
              >
                <div className="mb-8">{highlightIcons[h.color]}</div>
                <h4 className="sx-display text-2xl text-white mb-3">{h.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
