import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Camera, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import RevealText from "@/components/motion/RevealText";
import CountUp from "@/components/motion/CountUp";

export const metadata: Metadata = {
  title: "SaveMe! AI Server Infrastructure — Case Study | Arrashi Satyadi",
  description:
    "How a 4-server on-premise stack with an NVIDIA H200 NVL AI node was sized, designed and procured for 100K–150K active users.",
};

// Drop the real topology diagram into public/projects/ (e.g. saveme-topology.jpg), then set its path here.
const TOPOLOGY_IMAGE: string | null = null;

const facts = [
  { label: "Role", value: "IoT Engineer & Server Manager" },
  { label: "Company", value: "Mitra Teknologi Gemilang" },
  { label: "Year", value: "2026" },
  { label: "Status", value: "Vendor RFQ" },
];

const outcomes = [
  { value: "4", label: "Dedicated servers" },
  { value: "100K–150K", label: "Active users, initial tier" },
  { value: "~25%", label: "Lower est. AI node cost" },
  { value: "1.76×", label: "GPU memory per node" },
];

const servers = [
  {
    role: "General",
    purpose: "Application & API backend",
    spec: "2× 32-core Xeon · 128 GB DDR5 ECC · 2× 1.92 TB SSD (RAID 1)",
  },
  {
    role: "AI",
    purpose: "GPU inference services",
    spec: "2× 32-core Xeon · 512 GB DDR5 ECC · 1× NVIDIA H200 NVL 141 GB · 2× 1.92 TB NVMe (RAID 1)",
  },
  {
    role: "Realtime",
    purpose: "Live connections & events",
    spec: "1× 32-core Xeon · 64 GB DDR5 ECC · 2× 960 GB SSD (RAID 1)",
  },
  {
    role: "Storage",
    purpose: "Database & file storage",
    spec: "2× 32-core Xeon · 128 GB DDR5 ECC · 4× 3.84 TB NVMe (RAID 10)",
  },
];

const aiNode = [
  { item: "GPU", before: "1× 80 GB (H100 PCIe class)", after: "1× NVIDIA H200 NVL, 141 GB HBM3e" },
  { item: "System RAM", before: "256 GB DDR5 ECC", after: "512 GB DDR5 ECC" },
  { item: "Data storage", before: "4× 3.84 TB NVMe, RAID 10 (~7.7 TB usable)", after: "2× 1.92 TB NVMe, RAID 1 (1.92 TB usable)" },
  { item: "Estimated node cost", before: "Baseline", after: "~25% lower" },
];

const introSections = [
  {
    title: "The Challenge",
    body: [
      "SaveMe! needed its own on-premise infrastructure: an application backend, AI inference on GPU, realtime connections, and a database with file storage.",
      "It had to launch for 100,000–150,000 active users, grow toward 1M without a redesign, and go through a vendor-neutral procurement with competing quotes.",
    ],
  },
  {
    title: "Approach",
    body: [
      "Sized every service from per-tier resource estimates (CPU, RAM, GPU memory, disk) and interpolated them to the target tier.",
      "Checked each server against those needs using usable capacity after RAID, and noted which resource runs out first.",
      "Planned capacity tiers from 50K up to 1M active users and verified each node's upgrade path: RAM slots, GPU slots, drive bays and CPU generation.",
      "Validated parts against the chassis platform, such as CPU socket generation and GPU power per slot, before the RFQ went out.",
    ],
  },
];

const closingSections = [
  {
    title: "Network, Rack & Power",
    body: [
      "Data network: a Layer 3 core switch with 24× SFP+/SFP28 ports. Each server bonds two ports with LACP, and VLANs separate service traffic.",
      "Out-of-band management: a separate 1G switch for iDRAC/IPMI and PDU monitoring, so every server stays reachable even if the core switch fails.",
      "Power: two monitored 3-phase PDUs (A and B), with each server's redundant PSUs split across both feeds, in a 42U rack at a Tier-3 colocation data center in Jakarta.",
    ],
  },
  {
    title: "Procurement",
    body: [
      "Wrote a brand-neutral BOM and RFQ (spec-based, equivalent brands accepted) so several vendors can quote on the same requirements.",
      "Set commercial terms up front: DDP pricing including VAT, import duty and logistics, plus a 3-year principal warranty with 24×7, 4-hour onsite support.",
      "Prepared the RAB, an NDA step before full specs are shared, and a vendor comparison matrix targeting at least three quotes.",
    ],
  },
  {
    title: "Trade-offs & Next Steps",
    body: [
      "Known risk: one server per role and a single core switch, so there is no node-level failover yet; disks and power are redundant. A spare switch and N+1 nodes are the next HA step.",
      "Capacity figures are paper estimates. GPU memory math does not capture throughput, so load testing after deployment will confirm real capacity.",
      "Open item: confirm H200 NVL support and power per GPU slot on the vendor's proposed chassis.",
    ],
  },
];

function NarrativeSection({ index, title, body }: { index: number; title: string; body: string[] }) {
  return (
    <section className="border-t border-hairline">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="sx-eyebrow text-white mb-4">{String(index).padStart(2, "0")}</p>
          <h2 className="sx-display text-3xl md:text-4xl">
            <RevealText>{title}</RevealText>
          </h2>
        </div>
        <ul className="lg:col-span-8 space-y-4">
          {body.map((t) => (
            <li key={t} className="flex items-start text-white/70 leading-relaxed text-lg">
              <ChevronRight className="w-4 h-4 mr-3 text-white shrink-0 mt-1.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function SaveMeCaseStudy() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-barlow)] selection:bg-white selection:text-black">
      <header className="sticky top-0 z-50 bg-black border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <span className="sx-display text-xl tracking-[0.18em]">Arrashi</span>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-16">
        <div className="flex items-center gap-4 mb-6 sx-reveal-sub" style={{ animationDelay: "0.1s" }}>
          <span className="sx-eyebrow text-white">Case Study — HPC / AI Infra</span>
          <span className="h-px w-12 bg-white/40" />
        </div>
        <h1 className="sx-display text-4xl sm:text-6xl lg:text-8xl leading-[0.95] mb-8">
          <span className="block overflow-hidden">
            <span className="block sx-reveal-header" style={{ animationDelay: "0.2s" }}>
              SaveMe! AI Server
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-white/45 sx-reveal-header" style={{ animationDelay: "0.35s" }}>
              Infrastructure
            </span>
          </span>
        </h1>
        <p
          className="text-lg lg:text-xl text-white/70 max-w-3xl leading-relaxed tracking-wide sx-reveal-sub"
          style={{ animationDelay: "0.7s" }}
        >
          Sizing, designing and procuring a four-server on-premise stack, including an NVIDIA H200 NVL AI node, for
          a platform launching at 100,000–150,000 active users.
        </p>

        <dl
          className="grid grid-cols-2 md:grid-cols-4 mt-14 border-t border-l border-hairline sx-reveal-btn"
          style={{ animationDelay: "1s" }}
        >
          {facts.map((f) => (
            <div key={f.label} className="p-6 border-r border-b border-hairline">
              <dt className="sx-eyebrow mb-3">{f.label}</dt>
              <dd className="text-white font-semibold tracking-wide">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Topology diagram */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        <figure className="border border-hairline bg-night-soft">
          {TOPOLOGY_IMAGE ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={TOPOLOGY_IMAGE} alt="SaveMe! server and network topology" className="w-full h-auto" />
          ) : (
            <div className="aspect-[2.4/1] flex flex-col items-center justify-center text-center p-6 border-dashed">
              <Camera className="w-6 h-6 text-white/25 mb-3" strokeWidth={1.5} />
              <span className="sx-eyebrow text-white/35">Network topology diagram — coming soon</span>
            </div>
          )}
          <figcaption className="sx-eyebrow px-6 py-4 border-t border-hairline">
            Fig. 1 — Rack, network and power topology
          </figcaption>
        </figure>
      </section>

      {/* Outcomes */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-hairline">
          {outcomes.map((o) => (
            <div key={o.label} className="py-6 pr-6 md:border-r last:border-r-0 border-hairline md:pl-6 first:pl-0">
              <CountUp value={o.value} className="block sx-display text-4xl lg:text-5xl" />
              <div className="sx-eyebrow mt-3 leading-snug">{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {introSections.map((s, i) => (
        <NarrativeSection key={s.title} index={i + 1} title={s.title} body={s.body} />
      ))}

      {/* Server roles */}
      <section className="border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="sx-eyebrow text-white mb-4">03</p>
            <h2 className="sx-display text-3xl md:text-4xl">
              <RevealText>Four Servers, One Job Each</RevealText>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-hairline">
              {servers.map((s) => (
                <div key={s.role} className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-6 border-b border-hairline">
                  <div className="sm:col-span-4">
                    <p className="sx-display text-2xl">{s.role}</p>
                    <p className="text-mute text-xs uppercase tracking-[0.14em] mt-2">{s.purpose}</p>
                  </div>
                  <p className="sm:col-span-8 text-white/70 leading-relaxed">{s.spec}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-6">
              Every node: 2× 600 GB SSD for the OS (RAID 1), 2× SFP+/SFP28 uplinks bonded with LACP, and redundant PSUs
              split across PDU A and B.
            </p>
          </div>
        </div>
      </section>

      {/* Key decision */}
      <section className="border-t border-hairline bg-night-soft">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="sx-eyebrow text-white mb-4">04</p>
            <h2 className="sx-display text-3xl md:text-4xl">
              <RevealText>Key Decision: Storage Out, Compute In</RevealText>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="sx-eyebrow font-normal py-3 pr-4">AI node</th>
                    <th className="sx-eyebrow font-normal py-3 pr-4">Initial spec</th>
                    <th className="sx-eyebrow font-normal py-3 text-white">Final spec</th>
                  </tr>
                </thead>
                <tbody>
                  {aiNode.map((r) => (
                    <tr key={r.item} className="border-b border-hairline">
                      <td className="py-4 pr-4 text-mute uppercase tracking-[0.12em] text-xs">{r.item}</td>
                      <td className="py-4 pr-4 text-white/60">{r.before}</td>
                      <td className="py-4 text-white font-semibold">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="space-y-3 mt-8">
              {[
                "The AI services run stateless inference with no database. Estimated disk need at the target tier was under 1 TB, so 7.7 TB of RAID 10 NVMe was idle capital.",
                "GPU memory was the first resource to run out in the capacity model, so the savings went into compute: a 141 GB H200 NVL instead of an 80 GB card, and double the RAM.",
                "The H200 NVL was priced close to the H100 PCIe at the time, while the H100 PCIe was being discontinued.",
                "The upgrade path stays open: more GPUs and RAM can be added to the same chassis later. The CPU stays, since it only feeds the GPU.",
              ].map((t) => (
                <li key={t} className="flex items-start text-white/70 leading-relaxed">
                  <ChevronRight className="w-4 h-4 mr-3 text-white shrink-0 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {closingSections.map((s, i) => (
        <NarrativeSection key={s.title} index={i + 5} title={s.title} body={s.body} />
      ))}

      <section className="border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="text-white/60 max-w-xl leading-relaxed">
            Budget figures and vendor quotes are confidential and left out of this page.
          </p>
          <Link href="/#projects" className="sx-ghost">
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
