"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { SkillCategory } from "@/lib/defaultData";

interface Props {
  data: SkillCategory[];
  onChange: (d: SkillCategory[]) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";

const colorOptions = [
  { value: "primary", label: "Blue (Primary)" },
  { value: "secondary", label: "Green (Secondary)" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Light Blue" },
];

const emptyCategory: SkillCategory = { title: "", color: "primary", skills: [] };

export default function SkillsEditor({ data, onChange }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function updateCategory(i: number, key: keyof SkillCategory, value: unknown) {
    const next = [...data];
    next[i] = { ...next[i], [key]: value } as SkillCategory;
    onChange(next);
  }

  function addCategory() {
    const next = [...data, { ...emptyCategory }];
    onChange(next);
    setOpenIdx(next.length - 1);
  }

  function removeCategory(i: number) {
    onChange(data.filter((_, idx) => idx !== i));
    setOpenIdx(null);
  }

  function setSkillsString(i: number, value: string) {
    updateCategory(i, "skills", value.split(",").map(s => s.trim()).filter(Boolean));
  }

  return (
    <div className="space-y-3">
      {data.map((cat, i) => (
        <div key={i} className="border border-slate-700/50 rounded-xl overflow-hidden">
          <div
            className="flex items-center gap-3 p-4 bg-surface cursor-pointer hover:bg-surface-hover/50 transition-colors"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200">{cat.title || "(Untitled Category)"}</p>
              <p className="text-xs text-slate-500 font-mono">{cat.skills.length} skills</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={e => { e.stopPropagation(); removeCategory(i); }} className="p-1 text-slate-600 hover:text-red-400 ml-1">
                <Trash2 className="w-4 h-4" />
              </button>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-primary ml-1" /> : <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />}
            </div>
          </div>

          {openIdx === i && (
            <div className="p-5 border-t border-slate-700/50 space-y-4 bg-background/30">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Category Title</label>
                  <input className={inputCls} value={cat.title} onChange={e => updateCategory(i, "title", e.target.value)} placeholder="Networking & Protocols" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Accent Color</label>
                  <select className={inputCls} value={cat.color} onChange={e => updateCategory(i, "color", e.target.value as SkillCategory["color"])}>
                    {colorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Skills (comma-separated)</label>
                <textarea
                  className={inputCls + " resize-none"}
                  rows={4}
                  value={cat.skills.join(", ")}
                  onChange={e => setSkillsString(i, e.target.value)}
                  placeholder="Cisco IOS, OSPF, BGP, EIGRP..."
                />
                <p className="text-[11px] text-slate-600 font-mono mt-1">// Each skill separated by a comma</p>
              </div>

              {/* Preview pills */}
              {cat.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-primary/5 border border-primary/20 text-primary/70 rounded-md font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addCategory}
        className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2 font-mono text-sm"
      >
        <Plus className="w-4 h-4" /> Add Skill Category
      </button>
    </div>
  );
}
