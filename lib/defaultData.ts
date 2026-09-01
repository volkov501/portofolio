// lib/defaultData.ts
// Default portfolio data — extracted from all components.
// This is used as the initial / fallback dataset when no portfolio.json exists.

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  firstName: string;
  lastName: string;
  availabilityBadge: string;
  bio: string;
  roles: string[];
  stats: HeroStat[];
  resumeUrl: string;
  techLabels: string[];
}

export interface AboutHighlight {
  title: string;
  desc: string;
  color: "primary" | "secondary" | "yellow" | "purple";
}

export interface AboutBadge {
  label: string;
  color: string;
}

export interface AboutData {
  paragraphs: string[];
  badges: AboutBadge[];
  highlights: AboutHighlight[];
}

export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  type: string;
  period: string;
  color: "primary" | "secondary" | "purple";
  achievements: string[];
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  badge: string;
  badgeColor: string;
  iconColor: string;
  highlight: boolean;
  liveUrl: string;
}

export interface SkillCategory {
  title: string;
  color: "primary" | "secondary" | "yellow" | "purple" | "red" | "blue";
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  category: string;
  downloadUrl?: string;
  verifyUrl?: string;
}

export interface EducationDegree {
  level: string;
  period: string;
  gpa: string | null;
}

export interface EducationEntry {
  school: string;
  location: string;
  degrees: EducationDegree[];
  highlight: string;
  color: "primary" | "secondary";
}

export interface EducationCertification {
  title: string;
  issuer: string;
  year: string;
  badge: string;
  color: "yellow" | "blue" | "secondary";
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceEntry[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  education: EducationEntry[];
  educationCerts: EducationCertification[];
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    firstName: "Arrashi",
    lastName: "Satyadi",
    availabilityBadge: "AVAILABLE_FOR_HIRE // CONTRACT_ENDED: SEP 4, 2026",
    bio: "Building enterprise-grade infrastructure from the ground up — Cisco networks, VMware/Proxmox hypervisors, AI server clusters (NVIDIA H100), and autonomous drone systems. Based in South Jakarta.",
    roles: [
      "Network Infrastructure Engineer",
      "IT Infrastructure Engineer",
      "HPC / AI Infrastructure Architect",
      "Autonomous Drone & AIoT Engineer",
    ],
    stats: [
      { value: "3+", label: "Years Experience" },
      { value: "500+", label: "Users Supported" },
      { value: "50+", label: "VMs Managed" },
      { value: "3.89", label: "GPA" },
    ],
    resumeUrl: "/Arrashi_Satyadi_Resume_ATS.pdf",
    techLabels: ["OSPF/BGP", "VMware ESXi", "H100 GPU", "ArduPilot"],
  },

  about: {
    paragraphs: [
      "I'm a <primary>Network & IT Infrastructure Engineer</primary> based in South Jakarta with 3+ years of hands-on experience across enterprise server administration, Cisco networking, virtualization, and AIoT systems.",
      "My work spans from managing <secondary>10+ IBM enterprise servers</secondary> and deploying <secondary>50+ VMs</secondary> on VMware ESXi/Proxmox, to architecting a <primary>Rp 16 Billion AI server infrastructure</primary> with NVIDIA H100 GPUs capable of supporting 2,000,000 concurrent users.",
      "On the frontier side, I engineer <secondary>autonomous drone systems</secondary> using ArduPilot/MAVLink for real-time crowd monitoring, and build embedded AIoT devices that bridge physical sensors with centralized cloud infrastructure.",
      "I hold a <primary>BNSP National Certification in Computer Network Engineering</primary> (2025), a TOEIC score of <primary>770/990</primary>, and am completing my Bachelor's at Gunadarma University (GPA: 3.89/4.00) on a full scholarship.",
    ],
    badges: [
      { label: "BNSP Certified", color: "text-secondary border-secondary/30 bg-secondary/5" },
      { label: "Full Scholarship", color: "text-primary border-primary/30 bg-primary/5" },
      { label: "TOEIC 770", color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
      { label: "Open to Work", color: "text-green-400 border-green-400/30 bg-green-400/5" },
    ],
    highlights: [
      { title: "RELIABILITY", desc: "99%+ uptime across 10+ IBM enterprise servers. High-availability infrastructure design.", color: "primary" },
      { title: "INNOVATION", desc: "VTOL drone R&D, ESP32 AIoT pipelines, and NVIDIA H100 AI server architecture.", color: "secondary" },
      { title: "SCALE", desc: "Designed infrastructure supporting 2,000,000 concurrent users. Budget: Rp 16B+.", color: "yellow" },
      { title: "VERSATILITY", desc: "Spanning Cisco networking, VMware/Proxmox virtualization, IoT, and autonomous drones.", color: "purple" },
    ],
  },

  experience: [
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
  ],

  projects: [
    {
      title: 'AI Server Infrastructure — "SaveMe!" Platform',
      description:
        "Architected enterprise-grade 4-tier server infrastructure (General, AI, Realtime, Storage) using Dell PowerEdge R760xd/R760xa to support 100,000–2,000,000 concurrent active users. AI Server: 2x Intel Xeon Gold 6760P, 4x NVIDIA H100 PCIe 80GB, 1TB DDR5 ECC RAM. Prepared formal RAB totaling Rp 16,009,267,392 aligned with LKPP/INAPROC procurement standards.",
      tags: ["Dell PowerEdge R760xa", "NVIDIA H100", "Xeon Gold", "DDR5 ECC", "NVMe RAID10", "iDRAC9", "LKPP"],
      badge: "HPC / AI INFRA",
      badgeColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      iconColor: "yellow",
      highlight: true,
      liveUrl: "#",
    },
    {
      title: "Smart Tactical Body Camera",
      description:
        "Developed a thin-client IoT tactical camera using ESP32-CAM + M10Q GPS. Replaced SD card with Client Push Mode via WebSockets to bypass CGNAT, streaming directly to a Node.js backend and processing real-time video with FFmpeg to guarantee evidence chain of custody.",
      tags: ["ESP32-CAM", "WebSockets", "Node.js", "FFmpeg", "GPS", "CGNAT Bypass"],
      badge: "THESIS",
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      iconColor: "primary",
      highlight: false,
      liveUrl: "https://cam.volkovindustry.online",
    },
    {
      title: "VmLepkom Infrastructure Modernization",
      description:
        "Architected and migrated a heavy multi-user Windows and Ubuntu environment on VMware vSphere into a lightweight, isolated Docker-based architecture using docker-compose, reducing resource overhead while maintaining full functionality for 500+ concurrent users.",
      tags: ["VMware vSphere", "Docker", "docker-compose", "Ubuntu Server", "Windows Server"],
      badge: "INFRASTRUCTURE",
      badgeColor: "text-secondary bg-secondary/10 border-secondary/30",
      iconColor: "secondary",
      highlight: false,
      liveUrl: "#",
    },
    {
      title: "Autonomous Drone & VTOL R&D",
      description:
        "Built high-performance autonomous drone systems with ArduPilot/MAVLink for real-time crowd monitoring at large-scale events. Spearheaded transition from standard multirotors to VTOL QuadPlane/Tilt-Rotor designs, increasing patrol efficiency by ~40%.",
      tags: ["ArduPilot", "MAVLink", "VTOL", "RF Protocols", "C2 Network", "UAV"],
      badge: "AUTONOMOUS",
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      iconColor: "primary",
      highlight: false,
      liveUrl: "#",
    },
    {
      title: "IoT Server Environment Monitoring",
      description:
        "Designed and deployed a full IoT monitoring system for server room environmental parameters (temperature, humidity, smoke) using ESP32 with cloud integration and Bardi smart device control. Built custom Flutter mobile application for remote monitoring.",
      tags: ["ESP32", "Flutter", "MQTT", "Bardi IoT", "Sensor Integration"],
      badge: "DIPLOMA",
      badgeColor: "text-secondary bg-secondary/10 border-secondary/30",
      iconColor: "secondary",
      highlight: false,
      liveUrl: "#",
    },
    {
      title: "IoT Wildfire Detection System",
      description:
        "Capstone project developing a multi-sensor IoT network for real-time environmental anomaly detection (smoke, heat, humidity), providing automated early warning alerts for rapid response teams.",
      tags: ["IoT Sensors", "Telemetry", "Environmental Monitoring", "Rapid Response"],
      badge: "CAPSTONE",
      badgeColor: "text-red-400 bg-red-400/10 border-red-400/30",
      iconColor: "red",
      highlight: false,
      liveUrl: "#",
    },
    {
      title: "Centralized Auth & Storage — CNN Indonesia",
      description:
        "Deployed Windows Server ADDC + NAS in VirtualBox for centralized authentication, Group Policy management, file sharing, and automated backups for CNN Indonesia's broadcast IT environment.",
      tags: ["Windows Server", "ADDC", "NAS", "VirtualBox", "Group Policy"],
      badge: "BROADCAST IT",
      badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/30",
      iconColor: "purple",
      highlight: false,
      liveUrl: "#",
    },
  ],

  skills: [
    {
      title: "Networking & Protocols",
      color: "primary",
      skills: [
        "Cisco IOS", "OSPF", "BGP", "EIGRP", "VLAN / STP", "EtherChannel",
        "TCP/IP", "DNS / DHCP", "NAT / SSH", "VPN / IPSec", "VRRP / GLBP",
        "Load Balancing", "Layer 2/3 Switching", "Network Segmentation",
      ],
    },
    {
      title: "Server & Virtualization",
      color: "secondary",
      skills: [
        "VMware ESXi (vSphere)", "Proxmox VE", "Hypervisor Management",
        "Windows Server", "Active Directory (ADDC)", "NAS Storage",
        "RAID Configuration", "NVMe", "iDRAC9", "IBM System Servers",
        "Dell PowerEdge", "Apache Guacamole", "Docker", "Ubuntu Server",
      ],
    },
    {
      title: "HPC & AI Infrastructure",
      color: "yellow",
      skills: [
        "Dell PowerEdge R760xa/xd", "NVIDIA H100 GPU", "Intel Xeon Gold",
        "DDR5 ECC RDIMM", "NVMe RAID10", "Data Center Ops",
        "High Availability (HA)", "Server Rack Design", "Budget Planning (RAB)",
        "LKPP / INAPROC", "Enterprise Storage",
      ],
    },
    {
      title: "IoT & Autonomous Systems",
      color: "purple",
      skills: [
        "ESP32", "ArduPilot", "MAVLink", "PX4", "Flight Controller",
        "GPS Module (M10Q)", "MQTT", "WebSockets", "VTOL / QuadPlane",
        "RF Protocols", "Flutter", "Firmware Integration", "CGNAT Bypass", "Drone Telemetry",
      ],
    },
    {
      title: "OS, Tools & Security",
      color: "red",
      skills: [
        "Linux (Ubuntu Server)", "Windows Server", "Bash", "Python",
        "Wireshark", "Node.js", "FFmpeg", "Git", "SSH Hardening",
        "Network Security", "Firewall Config",
      ],
    },
    {
      title: "Soft Skills & Teaching",
      color: "blue",
      skills: [
        "Technical Instruction", "Curriculum Development", "Mentoring (100+ students)",
        "Documentation Writing", "Lab Facilitation", "Technical Communication",
        "English (TOEIC 770)", "Problem Solving", "Project Planning",
      ],
    },
  ],

  certifications: [
    {
      title: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "Coming Soon",
      category: "Networking",
      downloadUrl: "#",
      verifyUrl: "#",
    },
    {
      title: "VMware Certified Professional — Data Center Virtualization",
      issuer: "VMware / Broadcom",
      date: "Coming Soon",
      category: "Virtualization",
      downloadUrl: "#",
      verifyUrl: "#",
    },
    {
      title: "MTCNA — MikroTik Certified Network Associate",
      issuer: "MikroTik",
      date: "Coming Soon",
      category: "Networking",
      downloadUrl: "#",
      verifyUrl: "#",
    },
    {
      title: "Google IT Support Professional Certificate",
      issuer: "Google / Coursera",
      date: "Coming Soon",
      category: "IT Support",
      downloadUrl: "#",
      verifyUrl: "#",
    },
  ],

  education: [
    {
      school: "Gunadarma University",
      location: "Depok, Indonesia",
      degrees: [
        { level: "S1 — Bachelor of Computer System", period: "Sep 2022 – Sep 2026 (Expected)", gpa: "3.89 / 4.00" },
        { level: "D3 — Diploma, Computer System", period: "Sep 2022 – Aug 2025", gpa: "3.89 / 4.00" },
      ],
      highlight: "Full Scholarship Recipient",
      color: "primary",
    },
    {
      school: "Perguruan Cikini Vocational High School",
      location: "DKI Jakarta",
      degrees: [
        { level: "High School Diploma — Computer & Network Engineering", period: "Aug 2019 – Aug 2022", gpa: null },
      ],
      highlight: "Graduated as Best Student — Highest Score in Department",
      color: "secondary",
    },
  ],

  educationCerts: [
    { title: "Computer Network Engineering", issuer: "BNSP — Badan Nasional Sertifikasi Profesi", year: "2025", badge: "NATIONAL CERT", color: "yellow" },
    { title: "TOEIC English Proficiency", issuer: "Score: 770 / 990 — Professional Working Level", year: "2025", badge: "LANGUAGE", color: "blue" },
    { title: "Computer Engineering Training", issuer: "P2KPTK2", year: "2023", badge: "TRAINING", color: "secondary" },
  ],
};
