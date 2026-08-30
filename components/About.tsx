"use client";

import { motion } from "framer-motion";
import { User, Shield, Zap, Server, Target } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "RELIABILITY",
      desc: "99%+ uptime across 10+ IBM enterprise servers. High-availability infrastructure design.",
      border: "hover:border-primary/50",
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "INNOVATION",
      desc: "VTOL drone R&D, ESP32 AIoT pipelines, and NVIDIA H100 AI server architecture.",
      border: "hover:border-secondary/50",
    },
    {
      icon: <Server className="w-8 h-8 text-yellow-400" />,
      title: "SCALE",
      desc: "Designed infrastructure supporting 2,000,000 concurrent users. Budget: Rp 16B+.",
      border: "hover:border-yellow-400/50",
    },
    {
      icon: <Target className="w-8 h-8 text-purple-400" />,
      title: "VERSATILITY",
      desc: "Spanning Cisco networking, VMware/Proxmox virtualization, IoT, and autonomous drones.",
      border: "hover:border-purple-400/50",
    },
  ];

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
              <p className="text-lg text-slate-300 leading-relaxed">
                I&apos;m a <span className="text-primary font-semibold">Network & IT Infrastructure Engineer</span> based in South Jakarta with 3+ years of hands-on experience across enterprise server administration, Cisco networking, virtualization, and AIoT systems.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                My work spans from managing <span className="text-secondary font-semibold">10+ IBM enterprise servers</span> and deploying <span className="text-secondary font-semibold">50+ VMs</span> on VMware ESXi/Proxmox, to architecting a <span className="text-primary font-semibold">Rp 16 Billion AI server infrastructure</span> with NVIDIA H100 GPUs capable of supporting 2,000,000 concurrent users.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                On the frontier side, I engineer <span className="text-secondary font-semibold">autonomous drone systems</span> using ArduPilot/MAVLink for real-time crowd monitoring, and build embedded AIoT devices that bridge physical sensors with centralized cloud infrastructure.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                I hold a <span className="text-primary font-semibold">BNSP National Certification in Computer Network Engineering</span> (2025), a TOEIC score of <span className="text-primary font-semibold">770/990</span>, and am completing my Bachelor&apos;s at Gunadarma University (GPA: 3.89/4.00) on a full scholarship.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: "BNSP Certified", color: "text-secondary border-secondary/30 bg-secondary/5" },
                  { label: "Full Scholarship", color: "text-primary border-primary/30 bg-primary/5" },
                  { label: "TOEIC 770", color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
                  { label: "Open to Work", color: "text-green-400 border-green-400/30 bg-green-400/5" },
                ].map((badge, i) => (
                  <span key={i} className={`text-sm font-mono px-3 py-1 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className={`bg-surface border border-slate-800 p-4 rounded-lg flex items-start space-x-4 transition-colors group ${h.border}`}
                  >
                    <div className="shrink-0 group-hover:scale-110 transition-transform">
                      {h.icon}
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
                  <User className="w-32 h-32 text-slate-700 mb-4" />
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
