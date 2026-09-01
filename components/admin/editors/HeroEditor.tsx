"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import type { HeroData, HeroStat } from "@/lib/defaultData";

interface Props {
  data: HeroData;
  onChange: (d: HeroData) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";
const textareaCls = inputCls + " resize-none";

export default function HeroEditor({ data, onChange }: Props) {
  function set<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    onChange({ ...data, [key]: value });
  }

  function setStat(i: number, key: keyof HeroStat, value: string) {
    const stats = [...data.stats];
    stats[i] = { ...stats[i], [key]: value };
    set("stats", stats);
  }

  function addStat() {
    set("stats", [...data.stats, { value: "", label: "" }]);
  }

  function removeStat(i: number) {
    set("stats", data.stats.filter((_, idx) => idx !== i));
  }

  function setRole(i: number, value: string) {
    const roles = [...data.roles];
    roles[i] = value;
    set("roles", roles);
  }

  function addRole() {
    set("roles", [...data.roles, ""]);
  }

  function removeRole(i: number) {
    set("roles", data.roles.filter((_, idx) => idx !== i));
  }

  function setTechLabel(i: number, value: string) {
    const labels = [...data.techLabels];
    labels[i] = value;
    set("techLabels", labels);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name">
          <input className={inputCls} value={data.firstName} onChange={e => set("firstName", e.target.value)} />
        </Field>
        <Field label="Last Name">
          <input className={inputCls} value={data.lastName} onChange={e => set("lastName", e.target.value)} />
        </Field>
      </div>

      <Field label="Availability Badge Text">
        <input className={inputCls} value={data.availabilityBadge} onChange={e => set("availabilityBadge", e.target.value)} />
      </Field>

      <Field label="Bio Paragraph">
        <textarea className={textareaCls} rows={3} value={data.bio} onChange={e => set("bio", e.target.value)} />
      </Field>

      <Field label="Resume URL">
        <input className={inputCls} value={data.resumeUrl} onChange={e => set("resumeUrl", e.target.value)} placeholder="/Arrashi_Satyadi_Resume_ATS.pdf" />
      </Field>

      {/* Roles typewriter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Typewriter Roles</label>
          <button onClick={addRole} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-mono">
            <Plus className="w-3 h-3" /> Add role
          </button>
        </div>
        <div className="space-y-2">
          {data.roles.map((role, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-slate-600 shrink-0" />
              <input className={inputCls} value={role} onChange={e => setRole(i, e.target.value)} placeholder="e.g. Network Infrastructure Engineer" />
              <button onClick={() => removeRole(i)} className="text-slate-600 hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Stats</label>
          <button onClick={addStat} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-mono">
            <Plus className="w-3 h-3" /> Add stat
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="bg-background border border-slate-800 rounded-lg p-3 relative group">
              <button
                onClick={() => removeStat(i)}
                className="absolute top-2 right-2 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                className={inputCls + " mb-2 text-lg font-bold text-primary"}
                value={stat.value}
                onChange={e => setStat(i, "value", e.target.value)}
                placeholder="3+"
              />
              <input
                className={inputCls + " text-xs"}
                value={stat.label}
                onChange={e => setStat(i, "label", e.target.value)}
                placeholder="Years Experience"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tech Labels (4 floating labels on the graphic) */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
          Floating Tech Labels (max 4, on hero graphic)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i}>
              <label className="text-[10px] text-slate-600 font-mono mb-1 block">
                {["Top Right", "Bottom Left", "Middle Right", "Middle Left"][i]}
              </label>
              <input
                className={inputCls}
                value={data.techLabels[i] ?? ""}
                onChange={e => setTechLabel(i, e.target.value)}
                placeholder="e.g. OSPF/BGP"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
