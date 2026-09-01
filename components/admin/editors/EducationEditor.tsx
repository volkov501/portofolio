"use client";

import { Plus, Trash2 } from "lucide-react";
import type { EducationEntry, EducationDegree, EducationCertification } from "@/lib/defaultData";

interface Props {
  data: EducationEntry[];
  certs: EducationCertification[];
  onChange: (data: EducationEntry[], certs: EducationCertification[]) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";

const eduColorOptions = ["primary", "secondary"];
const certColorOptions = ["yellow", "blue", "secondary"];
const certColorLabels: Record<string, string> = { yellow: "Yellow", blue: "Blue", secondary: "Green" };

const emptyDegree: EducationDegree = { level: "", period: "", gpa: null };
const emptyEdu: EducationEntry = { school: "", location: "", degrees: [{ ...emptyDegree }], highlight: "", color: "primary" };
const emptyCert: EducationCertification = { title: "", issuer: "", year: "", badge: "", color: "secondary" };

export default function EducationEditor({ data, certs, onChange }: Props) {
  function updateEdu(i: number, key: keyof EducationEntry, value: unknown) {
    const next = [...data];
    next[i] = { ...next[i], [key]: value } as EducationEntry;
    onChange(next, certs);
  }

  function updateDegree(eduIdx: number, degIdx: number, key: keyof EducationDegree, value: string | null) {
    const degrees = [...data[eduIdx].degrees];
    degrees[degIdx] = { ...degrees[degIdx], [key]: value };
    updateEdu(eduIdx, "degrees", degrees);
  }

  function addDegree(eduIdx: number) {
    updateEdu(eduIdx, "degrees", [...data[eduIdx].degrees, { ...emptyDegree }]);
  }

  function removeDegree(eduIdx: number, degIdx: number) {
    updateEdu(eduIdx, "degrees", data[eduIdx].degrees.filter((_, i) => i !== degIdx));
  }

  function addEdu() {
    onChange([...data, { ...emptyEdu }], certs);
  }

  function removeEdu(i: number) {
    onChange(data.filter((_, idx) => idx !== i), certs);
  }

  function updateCert(i: number, key: keyof EducationCertification, value: string) {
    const next = [...certs];
    next[i] = { ...next[i], [key]: value } as EducationCertification;
    onChange(data, next);
  }

  function addCert() {
    onChange(data, [...certs, { ...emptyCert }]);
  }

  function removeCert(i: number) {
    onChange(data, certs.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-8">
      {/* Education entries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-widest">// Education</h3>
          <button onClick={addEdu} className="flex items-center gap-1 text-xs text-primary font-mono hover:text-primary/80 transition-colors">
            <Plus className="w-3 h-3" /> Add School
          </button>
        </div>

        <div className="space-y-5">
          {data.map((edu, i) => (
            <div key={i} className="bg-surface border border-slate-700/50 rounded-xl p-5 relative group">
              <button
                onClick={() => removeEdu(i)}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">School Name</label>
                  <input className={inputCls} value={edu.school} onChange={e => updateEdu(i, "school", e.target.value)} placeholder="Gunadarma University" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Location</label>
                  <input className={inputCls} value={edu.location} onChange={e => updateEdu(i, "location", e.target.value)} placeholder="Depok, Indonesia" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Highlight / Achievement</label>
                  <input className={inputCls} value={edu.highlight} onChange={e => updateEdu(i, "highlight", e.target.value)} placeholder="Full Scholarship Recipient" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Color</label>
                  <select className={inputCls} value={edu.color} onChange={e => updateEdu(i, "color", e.target.value as EducationEntry["color"])}>
                    {eduColorOptions.map(c => <option key={c} value={c}>{c === "primary" ? "Blue (Primary)" : "Green (Secondary)"}</option>)}
                  </select>
                </div>
              </div>

              {/* Degrees */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Degrees / Programs</label>
                  <button onClick={() => addDegree(i)} className="flex items-center gap-1 text-xs text-primary font-mono hover:text-primary/80 transition-colors">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {edu.degrees.map((deg, j) => (
                    <div key={j} className="bg-background/50 border border-slate-800 rounded-lg p-3 flex gap-2">
                      <div className="flex-1 space-y-2">
                        <input
                          className={inputCls}
                          value={deg.level}
                          onChange={e => updateDegree(i, j, "level", e.target.value)}
                          placeholder="S1 — Bachelor of Computer System"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            className={inputCls}
                            value={deg.period}
                            onChange={e => updateDegree(i, j, "period", e.target.value)}
                            placeholder="Sep 2022 – Sep 2026 (Expected)"
                          />
                          <input
                            className={inputCls}
                            value={deg.gpa ?? ""}
                            onChange={e => updateDegree(i, j, "gpa", e.target.value || null)}
                            placeholder="3.89 / 4.00 (or leave blank)"
                          />
                        </div>
                      </div>
                      <button onClick={() => removeDegree(i, j)} className="text-slate-600 hover:text-red-400 transition-colors shrink-0 mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications inside Education section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-widest">// Certifications (Education Section)</h3>
          <button onClick={addCert} className="flex items-center gap-1 text-xs text-primary font-mono hover:text-primary/80 transition-colors">
            <Plus className="w-3 h-3" /> Add Cert
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certs.map((cert, i) => (
            <div key={i} className="bg-surface border border-slate-700/50 rounded-xl p-4 relative group">
              <button
                onClick={() => removeCert(i)}
                className="absolute top-3 right-3 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="space-y-2">
                <input className={inputCls} value={cert.title} onChange={e => updateCert(i, "title", e.target.value)} placeholder="BNSP Certification" />
                <input className={inputCls} value={cert.issuer} onChange={e => updateCert(i, "issuer", e.target.value)} placeholder="Issuer name" />
                <div className="grid grid-cols-3 gap-2">
                  <input className={inputCls} value={cert.year} onChange={e => updateCert(i, "year", e.target.value)} placeholder="2025" />
                  <input className={inputCls} value={cert.badge} onChange={e => updateCert(i, "badge", e.target.value)} placeholder="NATIONAL CERT" />
                  <select className={inputCls} value={cert.color} onChange={e => updateCert(i, "color", e.target.value as EducationCertification["color"])}>
                    {certColorOptions.map(c => <option key={c} value={c}>{certColorLabels[c]}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
