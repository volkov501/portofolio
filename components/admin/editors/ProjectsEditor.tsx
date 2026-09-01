"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Star } from "lucide-react";
import type { Project } from "@/lib/defaultData";

interface Props {
  data: Project[];
  onChange: (d: Project[]) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";
const textareaCls = inputCls + " resize-none";

const iconColors = [
  { value: "primary", label: "Blue (Primary)" },
  { value: "secondary", label: "Green (Secondary)" },
  { value: "yellow", label: "Yellow" },
  { value: "red", label: "Red" },
  { value: "purple", label: "Purple" },
];

const emptyProject: Project = {
  title: "",
  description: "",
  tags: [],
  badge: "",
  badgeColor: "text-primary bg-primary/10 border-primary/30",
  iconColor: "primary",
  highlight: false,
  liveUrl: "#",
};

export default function ProjectsEditor({ data, onChange }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function updateProject(i: number, key: keyof Project, value: unknown) {
    const next = [...data];
    next[i] = { ...next[i], [key]: value } as Project;
    onChange(next);
  }

  function addProject() {
    const next = [...data, { ...emptyProject }];
    onChange(next);
    setOpenIdx(next.length - 1);
  }

  function removeProject(i: number) {
    onChange(data.filter((_, idx) => idx !== i));
    setOpenIdx(null);
  }

  function moveProject(i: number, dir: -1 | 1) {
    const next = [...data];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpenIdx(j);
  }

  function setTagsString(i: number, value: string) {
    updateProject(i, "tags", value.split(",").map(t => t.trim()).filter(Boolean));
  }

  return (
    <div className="space-y-3">
      {data.map((project, i) => (
        <div key={i} className={`border rounded-xl overflow-hidden ${project.highlight ? "border-yellow-400/30" : "border-slate-700/50"}`}>
          {/* Header */}
          <div
            className="flex items-center gap-3 p-4 bg-surface cursor-pointer hover:bg-surface-hover/50 transition-colors"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            {project.highlight && <Star className="w-4 h-4 text-yellow-400 shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">{project.title || "(Untitled Project)"}</p>
              <p className="text-xs text-slate-500 font-mono">{project.badge}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={e => { e.stopPropagation(); moveProject(i, -1); }} className="p-1 text-slate-600 hover:text-slate-300">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button onClick={e => { e.stopPropagation(); moveProject(i, 1); }} className="p-1 text-slate-600 hover:text-slate-300">
                <ChevronDown className="w-4 h-4" />
              </button>
              <button onClick={e => { e.stopPropagation(); removeProject(i); }} className="p-1 text-slate-600 hover:text-red-400 ml-1">
                <Trash2 className="w-4 h-4" />
              </button>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-primary ml-1" /> : <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />}
            </div>
          </div>

          {/* Body */}
          {openIdx === i && (
            <div className="p-5 border-t border-slate-700/50 space-y-4 bg-background/30">
              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Project Title</label>
                <input className={inputCls} value={project.title} onChange={e => updateProject(i, "title", e.target.value)} placeholder="Project Title" />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Description</label>
                <textarea className={textareaCls} rows={3} value={project.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Project description..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Badge Text</label>
                  <input className={inputCls} value={project.badge} onChange={e => updateProject(i, "badge", e.target.value)} placeholder="THESIS" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 block">Icon Color</label>
                  <select className={inputCls} value={project.iconColor} onChange={e => updateProject(i, "iconColor", e.target.value)}>
                    {iconColors.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Live URL (use # if none)</label>
                <input className={inputCls} value={project.liveUrl} onChange={e => updateProject(i, "liveUrl", e.target.value)} placeholder="https://..." />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Tags (comma-separated)</label>
                <input className={inputCls} value={project.tags.join(", ")} onChange={e => setTagsString(i, e.target.value)} placeholder="React, Node.js, Docker" />
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={project.highlight}
                    onChange={e => updateProject(i, "highlight", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:bg-yellow-400 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5" />
                </label>
                <span className="text-sm text-slate-400">Featured / Highlight project</span>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2 font-mono text-sm"
      >
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}
