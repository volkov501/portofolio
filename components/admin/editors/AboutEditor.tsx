"use client";

import { Plus, Trash2 } from "lucide-react";
import type { AboutData, AboutBadge, AboutHighlight } from "@/lib/defaultData";

interface Props {
  data: AboutData;
  onChange: (d: AboutData) => void;
}

const inputCls = "w-full bg-background border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";
const textareaCls = inputCls + " resize-none";

const highlightColors = ["primary", "secondary", "yellow", "purple"] as const;
const highlightColorLabels: Record<string, string> = { primary: "Blue (Primary)", secondary: "Green (Secondary)", yellow: "Yellow", purple: "Purple" };

export default function AboutEditor({ data, onChange }: Props) {
  function setParagraph(i: number, value: string) {
    const paragraphs = [...data.paragraphs];
    paragraphs[i] = value;
    onChange({ ...data, paragraphs });
  }

  function addParagraph() {
    onChange({ ...data, paragraphs: [...data.paragraphs, ""] });
  }

  function removeParagraph(i: number) {
    onChange({ ...data, paragraphs: data.paragraphs.filter((_, idx) => idx !== i) });
  }

  function setBadge(i: number, key: keyof AboutBadge, value: string) {
    const badges = [...data.badges];
    badges[i] = { ...badges[i], [key]: value };
    onChange({ ...data, badges });
  }

  function addBadge() {
    onChange({ ...data, badges: [...data.badges, { label: "", color: "text-primary border-primary/30 bg-primary/5" }] });
  }

  function removeBadge(i: number) {
    onChange({ ...data, badges: data.badges.filter((_, idx) => idx !== i) });
  }

  function setHighlight(i: number, key: keyof AboutHighlight, value: string) {
    const highlights = [...data.highlights] as AboutHighlight[];
    highlights[i] = { ...highlights[i], [key]: value } as AboutHighlight;
    onChange({ ...data, highlights });
  }

  function addHighlight() {
    onChange({ ...data, highlights: [...data.highlights, { title: "", desc: "", color: "primary" }] });
  }

  function removeHighlight(i: number) {
    onChange({ ...data, highlights: data.highlights.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-8">
      {/* Paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Bio Paragraphs</label>
          <button onClick={addParagraph} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono transition-colors">
            <Plus className="w-3 h-3" /> Add paragraph
          </button>
        </div>
        <p className="text-xs text-slate-500 font-mono mb-3">
          // Tip: use &lt;primary&gt;text&lt;/primary&gt; or &lt;secondary&gt;text&lt;/secondary&gt; for colored text
        </p>
        <div className="space-y-3">
          {data.paragraphs.map((para, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                className={textareaCls}
                rows={3}
                value={para}
                onChange={e => setParagraph(i, e.target.value)}
                placeholder="Paragraph text..."
              />
              <button onClick={() => removeParagraph(i)} className="text-slate-600 hover:text-red-400 transition-colors shrink-0 mt-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Badges</label>
          <button onClick={addBadge} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono transition-colors">
            <Plus className="w-3 h-3" /> Add badge
          </button>
        </div>
        <div className="space-y-2">
          {data.badges.map((badge, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls}
                value={badge.label}
                onChange={e => setBadge(i, "label", e.target.value)}
                placeholder="Badge text"
              />
              <input
                className={inputCls + " text-xs"}
                value={badge.color}
                onChange={e => setBadge(i, "color", e.target.value)}
                placeholder="Tailwind color classes"
              />
              <button onClick={() => removeBadge(i)} className="text-slate-600 hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Highlight Cards</label>
          <button onClick={addHighlight} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono transition-colors">
            <Plus className="w-3 h-3" /> Add card
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.highlights.map((h, i) => (
            <div key={i} className="bg-background border border-slate-800 rounded-lg p-4 relative group">
              <button
                onClick={() => removeHighlight(i)}
                className="absolute top-2 right-2 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                className={inputCls + " mb-2 font-mono uppercase text-xs"}
                value={h.title}
                onChange={e => setHighlight(i, "title", e.target.value)}
                placeholder="RELIABILITY"
              />
              <textarea
                className={textareaCls + " mb-2"}
                rows={2}
                value={h.desc}
                onChange={e => setHighlight(i, "desc", e.target.value)}
                placeholder="Description..."
              />
              <select
                className={inputCls}
                value={h.color}
                onChange={e => setHighlight(i, "color", e.target.value)}
              >
                {highlightColors.map(c => (
                  <option key={c} value={c}>{highlightColorLabels[c]}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
