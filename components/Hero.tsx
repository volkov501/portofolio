"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Database, Download, Server } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = [
    "Network Infrastructure Engineer",
    "IT Infrastructure Engineer",
    "HPC / AI Infrastructure Architect",
    "Autonomous Drone & AIoT Engineer",
  ];

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
      setTypingSpeed(2200);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    }
  };

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "500+", label: "Users Supported" },
    { value: "50+", label: "VMs Managed" },
    { value: "3.89", label: "GPA" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-surface border border-primary/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-mono text-slate-300">AVAILABLE_FOR_HIRE // CONTRACT_ENDED: SEP 4, 2026</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              Arrashi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Satyadi
              </span>
            </h1>

            <div className="h-14 mb-6">
              <p className="text-lg sm:text-xl font-mono text-slate-300 h-full flex items-center">
                <span className="text-primary mr-2">&gt;</span>
                {text}
                <span className="typewriter-cursor text-primary"></span>
              </p>
            </div>

            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              Building enterprise-grade infrastructure from the ground up — Cisco networks, VMware/Proxmox hypervisors, AI server clusters (NVIDIA H100), and autonomous drone systems. Based in South Jakarta.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                className="px-6 py-3 rounded-md bg-primary text-background font-semibold hover:bg-primary/90 transition-all flex items-center bg-glow hover:scale-105 duration-200"
              >
                <Terminal className="w-4 h-4 mr-2" />
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-md bg-surface border border-slate-700 text-slate-200 font-medium hover:border-primary/50 hover:text-primary transition-all flex items-center hover:scale-105 duration-200"
              >
                <Database className="w-4 h-4 mr-2" />
                Get In Touch
              </a>
              <a
                href="/Arrashi_Satyadi_Resume_ATS.pdf"
                download="Arrashi_Satyadi_Resume.pdf"
                className="px-6 py-3 rounded-md bg-secondary/10 border border-secondary/30 text-secondary font-medium hover:bg-secondary/20 hover:border-secondary/50 transition-all flex items-center hover:scale-105 duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume (PDF)
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="text-center p-3 bg-surface/50 border border-slate-800 rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Abstract Tech Graphic */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full border border-primary/30 rounded-full flex items-center justify-center p-8 backdrop-blur-sm bg-surface/30">
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
                <div className="absolute left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent" />
                <div className="absolute right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-secondary to-transparent" />

                <div className="w-full h-full border border-secondary/30 rounded-full flex items-center justify-center border-dashed animate-[spin_60s_linear_infinite]">
                  <div className="w-3/4 h-3/4 border border-primary/40 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                    <div className="w-24 h-24 bg-surface border border-primary/50 rounded-2xl shadow-[0_0_40px_rgba(56,189,248,0.4)] flex items-center justify-center rotate-45 group">
                      <Server className="w-10 h-10 text-primary -rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Floating tech labels */}
                <div className="absolute top-8 right-8 bg-surface/80 border border-primary/30 px-2 py-1 rounded text-xs font-mono text-primary backdrop-blur-sm">
                  OSPF/BGP
                </div>
                <div className="absolute bottom-8 left-8 bg-surface/80 border border-secondary/30 px-2 py-1 rounded text-xs font-mono text-secondary backdrop-blur-sm">
                  VMware ESXi
                </div>
                <div className="absolute top-1/2 -right-4 bg-surface/80 border border-primary/30 px-2 py-1 rounded text-xs font-mono text-primary backdrop-blur-sm -translate-y-1/2">
                  H100 GPU
                </div>
                <div className="absolute top-1/2 -left-4 bg-surface/80 border border-secondary/30 px-2 py-1 rounded text-xs font-mono text-secondary backdrop-blur-sm -translate-y-1/2">
                  ArduPilot
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-slate-500 hover:text-primary transition-colors">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
