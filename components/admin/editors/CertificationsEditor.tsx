"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Certification } from "@/lib/defaultData";

interface Props {
  data: Certification[];
  onChange: (d: Certification[]) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";

const categoryOptions = ["Networking", "Virtualization", "IT Support", "Cloud", "Security", "Development", "Other"];

const emptyCert: Certification = { title: "", issuer: "", date: "", category: "Networking", downloadUrl: "#", verifyUrl: "#" };

export default function CertificationsEditor({ data, onChange }: Props) {
  function updateCert(i: number, key: keyof Certification, value: string) {
    const next = [...data];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  }

  function addCert() {
    onChange([...data, { ...emptyCert }]);
  }

  function removeCert(i: number) {
    onChange(data.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      {data.map((cert, i) => (
        <div key={i} className="bg-surface border border-slate-700/50 rounded-xl p-5 relative group">
          <button
            onClick={() => removeCert(i)}
            className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Certification Title</label>
              <input className={inputCls} value={cert.title} onChange={e => updateCert(i, "title", e.target.value)} placeholder="Cisco CCNA" />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Issuer</label>
              <input className={inputCls} value={cert.issuer} onChange={e => updateCert(i, "issuer", e.target.value)} placeholder="Cisco" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Date / Status</label>
              <input className={inputCls} value={cert.date} onChange={e => updateCert(i, "date", e.target.value)} placeholder="Jan 2025 or 'Coming Soon'" />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Category</label>
              <select className={inputCls} value={cert.category} onChange={e => updateCert(i, "category", e.target.value)}>
                {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Download URL (# = coming soon)</label>
              <input className={inputCls} value={cert.downloadUrl ?? "#"} onChange={e => updateCert(i, "downloadUrl", e.target.value)} placeholder="#" />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1 block">Verify URL (# = hide)</label>
              <input className={inputCls} value={cert.verifyUrl ?? "#"} onChange={e => updateCert(i, "verifyUrl", e.target.value)} placeholder="#" />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addCert}
        className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2 font-mono text-sm"
      >
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  );
}
