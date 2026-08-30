"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Cloud, Network, Shield, BookOpen } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Networking & Protocols",
      icon: <Network className="w-6 h-6 text-primary" />,
      skills: [
        "Cisco IOS",
        "OSPF",
        "BGP",
        "EIGRP",
        "VLAN / STP",
        "EtherChannel",
        "TCP/IP",
        "DNS / DHCP",
        "NAT / SSH",
        "VPN / IPSec",
        "VRRP / GLBP",
        "Load Balancing",
        "Layer 2/3 Switching",
        "Network Segmentation",
      ],
      color: "border-primary/40 bg-primary/5 text-primary",
      gradientTop: "bg-primary",
    },
    {
      title: "Server & Virtualization",
      icon: <Server className="w-6 h-6 text-secondary" />,
      skills: [
        "VMware ESXi (vSphere)",
        "Proxmox VE",
        "Hypervisor Management",
        "Windows Server",
        "Active Directory (ADDC)",
        "NAS Storage",
        "RAID Configuration",
        "NVMe",
        "iDRAC9",
        "IBM System Servers",
        "Dell PowerEdge",
        "Apache Guacamole",
        "Docker",
        "Ubuntu Server",
      ],
      color: "border-secondary/40 bg-secondary/5 text-secondary",
      gradientTop: "bg-secondary",
    },
    {
      title: "HPC & AI Infrastructure",
      icon: <Cpu className="w-6 h-6 text-yellow-400" />,
      skills: [
        "Dell PowerEdge R760xa/xd",
        "NVIDIA H100 GPU",
        "Intel Xeon Gold",
        "DDR5 ECC RDIMM",
        "NVMe RAID10",
        "Data Center Ops",
        "High Availability (HA)",
        "Server Rack Design",
        "Budget Planning (RAB)",
        "LKPP / INAPROC",
        "Enterprise Storage",
      ],
      color: "border-yellow-400/40 bg-yellow-400/5 text-yellow-400",
      gradientTop: "bg-yellow-400",
    },
    {
      title: "IoT & Autonomous Systems",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      skills: [
        "ESP32",
        "ArduPilot",
        "MAVLink",
        "PX4",
        "Flight Controller",
        "GPS Module (M10Q)",
        "MQTT",
        "WebSockets",
        "VTOL / QuadPlane",
        "RF Protocols",
        "Flutter",
        "Firmware Integration",
        "CGNAT Bypass",
        "Drone Telemetry",
      ],
      color: "border-purple-400/40 bg-purple-400/5 text-purple-400",
      gradientTop: "bg-purple-400",
    },
    {
      title: "OS, Tools & Security",
      icon: <Shield className="w-6 h-6 text-red-400" />,
      skills: [
        "Linux (Ubuntu Server)",
        "Windows Server",
        "Bash",
        "Python",
        "Wireshark",
        "Node.js",
        "FFmpeg",
        "Git",
        "SSH Hardening",
        "Network Security",
        "Firewall Config",
      ],
      color: "border-red-400/40 bg-red-400/5 text-red-400",
      gradientTop: "bg-red-400",
    },
    {
      title: "Soft Skills & Teaching",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      skills: [
        "Technical Instruction",
        "Curriculum Development",
        "Mentoring (100+ students)",
        "Documentation Writing",
        "Lab Facilitation",
        "Technical Communication",
        "English (TOEIC 770)",
        "Problem Solving",
        "Project Planning",
      ],
      color: "border-blue-400/40 bg-blue-400/5 text-blue-400",
      gradientTop: "bg-blue-400",
    },
  ];

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
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`bg-surface border rounded-xl p-6 relative overflow-hidden group hover:border-opacity-70 transition-all duration-300 hover:-translate-y-1 ${category.color.split(" ")[0]}`}
              >
                <div className={`absolute top-0 left-0 w-full h-0.5 ${category.gradientTop} opacity-60`} />

                <div className="flex items-center space-x-3 mb-5">
                  <div className={`p-2 rounded-lg border ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-200">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md border cursor-default hover:scale-105 transition-transform ${category.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
