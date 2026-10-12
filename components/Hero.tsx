"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import type { HeroData } from "@/lib/defaultData";

export default function Hero({ data }: { data: HeroData }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = data.roles;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);
    return () => clearInterval(ticker);
  }, [text, isDeleting, typingSpeed, loopNum]);

  const tick = () => {
    const i = loopNum % roles.length;
    const fullText = roles[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(2600);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(120);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black font-[family-name:var(--font-barlow)]">
      {/* Full-bleed photographic background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 w-full pt-40 pb-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="sx-eyebrow text-white/80">{data.availabilityBadge}</span>
            </div>

            <h1 className="sx-display text-6xl sm:text-7xl lg:text-[104px] xl:text-[120px] text-white leading-[0.92]">
              {data.firstName}
              <br />
              <span className="text-white/45">{data.lastName}</span>
            </h1>

            <div className="h-10 mt-8 mb-6 flex items-center">
              <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-white font-semibold">
                {text}
                <span className="typewriter-cursor" />
              </p>
            </div>

            <p className="text-base lg:text-lg text-white/70 mb-10 max-w-xl leading-relaxed tracking-wide">
              {data.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href="#projects" className="sx-ghost">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="text-xs font-bold uppercase tracking-[0.17em] text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a
                href={data.resumeUrl}
                download="Arrashi_Satyadi_Resume.pdf"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                Resume (PDF)
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[280px] ml-auto">
              <div className="relative overflow-hidden border border-hairline bg-night-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Arrashi Satyadi"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-end">
                {data.techLabels.map((label, i) =>
                  label ? (
                    <li key={i} className="sx-eyebrow text-white/70 tracking-[0.16em]">
                      {label}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-16 lg:mt-20 border-t border-hairline">
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="py-6 pr-6 md:border-r last:border-r-0 border-hairline md:pl-6 first:pl-0"
            >
              <div className="sx-display text-4xl lg:text-5xl text-white">{stat.value}</div>
              <div className="sx-eyebrow mt-3 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
