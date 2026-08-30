"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "Mitra Teknologi Gemilang (MTG)",
      location: "Depok, Indonesia",
      role: "Autonomous Drone & AIoT Engineer",
      type: "Contract",
      period: "Jan 2026 – Sep 2026",
      color: "primary",
      achievements: [
        "Engineered autonomous drone systems (ArduPilot/MAVLink) for real-time crowd monitoring and riot detection at large-scale events, achieving reliable HD video and sub-200ms telemetry transmission.",
        "Developed end-to-end AIoT data pipelines integrating embedded systems (ESP32, M10Q GPS, Flight Controllers) with cloud databases via WebSockets, bridging field hardware with centralized server infrastructure.",
        "Spearheaded VTOL R&D (QuadPlane/Tilt-Rotor designs), leading transition from standard multirotors to enhance aerodynamic efficiency and extend autonomous patrol duration by ~40%.",
        "Optimized Command & Control (C2) networks by implementing custom RF protocols to maintain robust, low-latency command links in high-RF-interference environments.",
      ],
      tags: ["ArduPilot", "MAVLink", "VTOL", "AIoT", "ESP32", "WebSockets"],
    },
    {
      company: "LePKom, Gunadarma University",
      location: "Depok, Indonesia",
      role: "IT Infrastructure & Network Engineer",
      type: "Freelance",
      period: "Jun 2024 – Present",
      color: "secondary",
      achievements: [
        "Managed and monitored 10+ IBM System enterprise servers, maintaining 99%+ uptime through proactive monitoring and rapid fault resolution.",
        "Installed and maintained 50+ VMs/containers on VMware ESXi (vSphere) & Proxmox VE, including hypervisor setup and optimization.",
        "Built remote desktop environment using Apache Guacamole integrated with Active Directory Domain Controller (ADDC) for streamlined centralized access.",
        "Provided IT support for 500+ students while deploying 100+ PCs and 100+ thin clients including full OS and application configuration.",
        "Developed IoT monitoring system for server room (temperature, humidity, smoke) using ESP32 integrated with Bardi devices via custom Flutter mobile app.",
      ],
      tags: ["VMware ESXi", "Proxmox VE", "ADDC", "NAS", "IBM Servers", "IoT", "ESP32"],
    },
    {
      company: "LePKom, Gunadarma University",
      location: "Depok, Indonesia",
      role: "Network Course Instructor & PIC",
      type: "Part Time",
      period: "Oct 2023 – Present",
      color: "purple",
      achievements: [
        "Delivered comprehensive Cisco networking instruction to 100+ learners per semester, covering OSPF, BGP, EIGRP, VLANs, switching, TCP/IP, DNS, and network security.",
        "Led hands-on lab sessions configuring, securing, and troubleshooting Cisco routers and switches, aligned with CCNA/CCNP certification standards.",
        "Developed a full teaching module series (Fundamental, Beginner, Intermediate) covering Cisco routing, switching, VLAN, TCP/IP, and network security.",
      ],
      tags: ["Cisco IOS", "OSPF", "BGP", "EIGRP", "VLAN", "Network Security"],
    },
    {
      company: "CNN Indonesia (Trans Media)",
      location: "Jakarta, Indonesia",
      role: "IT Infrastructure Core System & Broadcast",
      type: "Internship",
      period: "Feb 2024 – Jun 2024",
      color: "primary",
      achievements: [
        "Implemented and managed Windows Server Active Directory Domain Controller (ADDC) for centralized authentication and Group Policy control.",
        "Configured and maintained NAS storage for centralized file sharing, access control, and automated backups for critical broadcast operations.",
        "Developed Broadcasting Resources Installation Manual to ensure accurate deployment and optimal network performance.",
        "Ensured server stability by troubleshooting outages and restoring critical services with zero broadcast interruption.",
      ],
      tags: ["Windows Server", "ADDC", "NAS", "Group Policy", "Broadcast IT"],
    },
    {
      company: "Pushansiber Bainstrahan, Ministry of Defence",
      location: "Jakarta, Indonesia",
      role: "Network Engineer",
      type: "Internship",
      period: "May 2021 – Sep 2021",
      color: "secondary",
      achievements: [
        "Designed load-balancing solutions using Cisco technologies (VRRP, GLBP) improving network performance, redundancy, and reliability for national cyber-defense infrastructure.",
        "Supported development of the Pushan Siber national cyber-defense network topology for large-scale government communication infrastructure.",
        "Built and maintained Data Center network infrastructure ensuring stable connectivity and secure data flow between critical government systems.",
        "Configured and integrated 10+ Local Area Networks (LANs) across client-server environments, optimizing routing, switching, and network segmentation.",
      ],
      tags: ["Cisco", "VRRP", "GLBP", "Data Center", "LAN", "Ministry of Defence"],
    },
  ];

  const colorMap: Record<string, { dot: string; tag: string; border: string }> = {
    primary: {
      dot: "bg-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]",
      tag: "text-primary/80 bg-primary/10 border-primary/20",
      border: "hover:border-primary/50",
    },
    secondary: {
      dot: "bg-secondary shadow-[0_0_10px_rgba(52,211,153,0.8)]",
      tag: "text-secondary/80 bg-secondary/10 border-secondary/20",
      border: "hover:border-secondary/50",
    },
    purple: {
      dot: "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]",
      tag: "text-purple-400/80 bg-purple-400/10 border-purple-400/20",
      border: "hover:border-purple-400/50",
    },
  };

  return (
    <section id="experience" className="py-24 relative bg-surface-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-primary font-mono mr-2">02.</span>
              Work{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Experience
              </span>
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="relative border-l border-slate-700/50 ml-4 md:ml-6 space-y-10">
            {experiences.map((exp, index) => {
              const c = colorMap[exp.color];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ${c.dot}`} />

                  <div className={`group bg-surface border border-slate-700/50 rounded-xl p-6 transition-all duration-300 ${c.border} hover:-translate-y-1`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-4 h-4 text-secondary shrink-0" />
                          <span className="text-slate-400 font-medium">{exp.company}</span>
                          <span className="text-slate-600">|</span>
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="text-slate-500 text-sm">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${c.tag}`}>
                          {exp.type}
                        </span>
                        <div className="flex items-center text-primary/80 font-mono text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          <Calendar className="w-3 h-3 mr-2" />
                          {exp.period}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex items-start text-slate-300 text-sm leading-relaxed">
                          <ChevronRight className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className={`text-xs font-mono px-2 py-0.5 rounded border ${c.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
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
