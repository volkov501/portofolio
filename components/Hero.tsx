"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Download, FileText } from "lucide-react";
import type { HeroData } from "@/lib/defaultData";
import ResumeModal from "./ResumeModal";
import CountUp from "./motion/CountUp";

export default function Hero({ data }: { data: HeroData }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener("open-resume", handleOpenResume);
    return () => window.removeEventListener("open-resume", handleOpenResume);
  }, []);

  const roles = data.roles;

  // Typewriter: type a role, hold it, delete it, move to the next role
  useEffect(() => {
    const fullText = roles[loopNum % roles.length] ?? "";
    const isFull = !isDeleting && text === fullText;
    const delay = isFull ? 2600 : isDeleting ? 40 : 120;

    const timer = setTimeout(() => {
      if (isFull) {
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      } else {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black font-[family-name:var(--font-barlow)]">
      {/* Full-bleed photo: slow settle on load, slower drift on scroll (parallax) */}
      <div className="absolute inset-0 sx-parallax" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-90 sx-hero-settle"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 w-full pt-40 pb-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end">
          {/* Staged entrance, same rhythm as spacex.com: headline, then subheader, then CTA */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8 sx-reveal-sub" style={{ animationDelay: "0.05s" }}>
              {/* The large portrait is desktop-only, so phones get a compact avatar here */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt="Arrashi Satyadi"
                className="lg:hidden w-16 h-16 rounded-full object-cover object-top border border-hairline"
              />
              <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-white" />
              <span className="sx-eyebrow text-white/80">{data.availabilityBadge}</span>
            </div>

            <h1 className="sx-display text-6xl sm:text-7xl lg:text-[104px] xl:text-[120px] text-white leading-[0.92]">
              <span className="block overflow-hidden">
                <span className="block sx-reveal-header" style={{ animationDelay: "0.1s" }}>
                  {data.firstName}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block text-white/45 sx-reveal-header" style={{ animationDelay: "0.25s" }}>
                  {data.lastName}
                </span>
              </span>
            </h1>

            <div className="h-10 mt-8 mb-6 flex items-center sx-reveal-sub" style={{ animationDelay: "0.55s" }}>
              <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-white font-semibold">
                {text}
                <span className="typewriter-cursor" />
              </p>
            </div>

            <p
              className="text-base lg:text-lg text-white/70 mb-10 max-w-xl leading-relaxed tracking-wide sx-reveal-sub"
              style={{ animationDelay: "0.6s" }}
            >
              {data.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 sx-reveal-btn" style={{ animationDelay: "0.85s" }}>
              <a href="#projects" className="sx-ghost">
                View Projects
                <ArrowRight className="w-4 h-4 sx-arrow" />
              </a>
              <a
                href="#contact"
                className="py-3 -my-3 text-xs font-bold uppercase tracking-[0.17em] text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors duration-300"
              >
                Get In Touch
              </a>
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="py-3 -my-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-white underline underline-offset-8 decoration-white/40 hover:decoration-white transition-colors duration-300 cursor-pointer"
                title="Preview ATS Resume in interactive modal"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume (Preview)
              </button>
              <a
                href={data.resumeUrl}
                download="Arrashi_Satyadi_Resume.pdf"
                className="py-3 -my-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.17em] text-white/50 hover:text-white transition-colors duration-300"
                title="Download PDF directly"
              >
                <Download className="w-3 h-3" />
                Download
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block sx-reveal-sub" style={{ animationDelay: "0.45s" }}>
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
          </div>
        </div>

        {/* Stats: count up from zero as they arrive */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-16 lg:mt-20 border-t border-hairline">
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className="py-6 pr-6 md:border-r last:border-r-0 border-hairline md:pl-6 first:pl-0 sx-reveal-sub"
              style={{ animationDelay: `${1 + i * 0.1}s` }}
            >
              <CountUp value={stat.value} className="block sx-display text-4xl lg:text-5xl text-white" />
              <div className="sx-eyebrow mt-3 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden lg:block text-white/70 hover:text-white"
      >
        <span className="block sx-scroll-cue">
          <ChevronDown className="w-6 h-6" strokeWidth={1.25} />
        </span>
      </a>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={data.resumeUrl}
      />
    </section>
  );
}
