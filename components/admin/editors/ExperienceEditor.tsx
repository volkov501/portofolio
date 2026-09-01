"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import type { ExperienceEntry } from "@/lib/defaultData";

interface Props {
  data: ExperienceEntry[];
  onChange: (d: ExperienceEntry[]) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";
const textareaCls = inputCls + " resize-none";

const colorOptions = [
  { value: "primary", label: "Blue (Primary)" },
  { value: "secondary", label: "Green (Secondary)" },
  { value: "purple", label: "Purple" },
];

const emptyEntry: ExperienceEntry = {
  company: "",
  location: "",
  role: "",
  type: "Full Time",
  period: "",
  color: "primary",
  achievements: [""],
  tags: [],
};

export default function ExperienceEditor({ data, onChange }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function updateEntry(i: number, key: keyof ExperienceEntry, value: unknown) {
    const next = [...data];
    next[i] = { ...next[i], [key]: value } as ExperienceEntry;
    onChange(next);
  }

  function addEntry() {
    const next = [...data, { ...emptyEntry }];
    onChange(next);
    setOpenIdx(next.length - 1);
  }

  function removeEntry(i: number) {
    onChange(data.filter((_, idx) => idx !== i));
    setOpenIdx(null);
  }

  function moveEntry(i: number, dir: -1 | 1) {
    const next = [...data];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpenIdx(j);
  }

  function setAchievement(entryIdx: number, achIdx: number, value: string) {
    const achievements = [...data[entryIdx].achievements];
    achievements[achIdx] = value;
    updateEntry(entryIdx, "achievements", achievements);
  }

  function addAchievement(entryIdx: number) {
    updateEntry(entryIdx, "achievements", [...data[entryIdx].achievements, ""]);
  }

  function removeAchievement(entryIdx: number, achIdx: number) {
    updateEntry(entryIdx, "achievements", data[entryIdx].achievements.filter((_, i) => i !== achIdx));
  }

  function setTagsString(entryIdx: number, value: string) {
    updateEntry(entryIdx, "tags", value.split(",").map(t => t.trim()).filter(Boolean));
  }

  return (
    <div className="space-y-3">
      {data.map((exp, i) => (
        <div key={i} className="border border-slate-700/50 rounded-xl overflow-hidden">
          {/* Accordion Header */}
          <div
            className="flex items-center gap-3 p-4 bg-surface cursor-pointer hover:bg-surface-hover/50 transition-colors"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <GripVertical className="w-4 h-4 text-slate-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">{exp.role || "(Untitled Role)"}</p>
              <p className="text-xs text-slate-500 font-mono truncate">{exp.company} · {exp.period}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={e => { e.stopPropagation(); moveEntry(i, -1); }}
                className="p-1 text-slate-600 hover:text-slate-300 transition-colors"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); moveEntry(i, 1); }}
                className="p-1 text-slate-600 hover:text-slate-300 transition-colors"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); removeEntry(i); }}
                className="p-1 text-slate-600 hover:text-red-400 transition-colors ml-1"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-primary ml-1" /> : <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />}
            </div>
          </div>

          {/* Accordion Body */}
          {openIdx === i && (
            <div className="p-5 border-t border-slate-700/50 space-y-4 bg-background/30">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Role / Title</label>
                  <input className={inputCls} value={exp.role} onChange={e => updateEntry(i, "role", e.target.value)} placeholder="Network Engineer" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Type</label>
                  <select className={inputCls} value={exp.type} onChange={e => updateEntry(i, "type", e.target.value)}>
                    {["Full Time", "Part Time", "Freelance", "Contract", "Internship"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Company</label>
                  <input className={inputCls} value={exp.company} onChange={e => updateEntry(i, "company", e.target.value)} placeholder="Company Name" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Location</label>
                  <input className={inputCls} value={exp.location} onChange={e => updateEntry(i, "location", e.target.value)} placeholder="Jakarta, Indonesia" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Period</label>
                  <input className={inputCls} value={exp.period} onChange={e => updateEntry(i, "period", e.target.value)} placeholder="Jan 2026 – Present" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Accent Color</label>
                  <select className={inputCls} value={exp.color} onChange={e => updateEntry(i, "color", e.target.value as ExperienceEntry["color"])}>
                    {colorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Achievements</label>
                  <button onClick={() => addAchievement(i)} className="flex items-center gap-1 text-xs text-primary font-mono hover:text-primary/80 transition-colors">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((ach, j) => (
                    <div key={j} className="flex gap-2 items-start">
                      <span className="text-primary font-mono text-xs mt-2.5 shrink-0">{j + 1}.</span>
                      <textarea
                        className={textareaCls}
                        rows={2}
                        value={ach}
                        onChange={e => setAchievement(i, j, e.target.value)}
                        placeholder="Achievement..."
                      />
                      <button onClick={() => removeAchievement(i, j)} className="text-slate-600 hover:text-red-400 transition-colors shrink-0 mt-1.5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block uppercase tracking-widest">Tags (comma-separated)</label>
                <input
                  className={inputCls}
                  value={exp.tags.join(", ")}
                  onChange={e => setTagsString(i, e.target.value)}
                  placeholder="Cisco, OSPF, BGP"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addEntry}
        className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2 font-mono text-sm"
      >
        <Plus className="w-4 h-4" /> Add Experience Entry
      </button>
    </div>
  );
}
