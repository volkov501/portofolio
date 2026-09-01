"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LayoutDashboard, User, Briefcase, FolderGit2, Code2,
  Award, GraduationCap, ExternalLink, LogOut, Save,
  CheckCircle, AlertCircle, Loader2, Terminal, ChevronRight,
} from "lucide-react";
import AdminAuth from "@/components/admin/AdminAuth";
import HeroEditor from "@/components/admin/editors/HeroEditor";
import AboutEditor from "@/components/admin/editors/AboutEditor";
import ExperienceEditor from "@/components/admin/editors/ExperienceEditor";
import ProjectsEditor from "@/components/admin/editors/ProjectsEditor";
import SkillsEditor from "@/components/admin/editors/SkillsEditor";
import CertificationsEditor from "@/components/admin/editors/CertificationsEditor";
import EducationEditor from "@/components/admin/editors/EducationEditor";
import type { PortfolioData } from "@/lib/defaultData";

type Section = "hero" | "about" | "experience" | "projects" | "skills" | "certifications" | "education";
type SaveStatus = "idle" | "saving" | "saved" | "error";

const navItems: { id: Section; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "hero", label: "Hero", icon: <LayoutDashboard className="w-4 h-4" />, desc: "Name, bio, roles, stats" },
  { id: "about", label: "About", icon: <User className="w-4 h-4" />, desc: "Bio paragraphs, badges" },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" />, desc: "Work history" },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" />, desc: "Project cards" },
  { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" />, desc: "Skill categories" },
  { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" />, desc: "Certs & credentials" },
  { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" />, desc: "Schools & degrees" },
];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [loading, setLoading] = useState(false);

  // Restore token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("/api/portfolio")
      .then(r => r.json())
      .then((d: PortfolioData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setSaveStatus(json.success ? "saved" : "error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [data]);

  // Keyboard shortcut: Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSave]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    setData(null);
  }

  if (!token) return <AdminAuth onAuth={setToken} />;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 flex flex-col bg-surface border-r border-slate-700/50">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Portfolio CMS</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">// admin panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group ${
                activeSection === item.id
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "text-slate-400 hover:bg-surface-hover hover:text-slate-200 border border-transparent"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{item.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-none truncate">{item.desc}</p>
              </div>
              {activeSection === item.id && <ChevronRight className="w-3 h-3 shrink-0" />}
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-700/50 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-surface-hover hover:text-slate-200 transition-all text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View Portfolio
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-surface shrink-0">
          <div>
            <h1 className="text-lg font-bold text-white">
              {navItems.find(n => n.id === activeSection)?.label}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              {navItems.find(n => n.id === activeSection)?.desc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-mono hidden sm:block">Ctrl+S to save</span>
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving" || !data}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                saveStatus === "saved"
                  ? "bg-secondary/20 border border-secondary/40 text-secondary"
                  : saveStatus === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "bg-primary text-background hover:bg-primary/90 disabled:opacity-40"
              }`}
            >
              {saveStatus === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
              {saveStatus === "saved" && <CheckCircle className="w-4 h-4" />}
              {saveStatus === "error" && <AlertCircle className="w-4 h-4" />}
              {saveStatus === "idle" && <Save className="w-4 h-4" />}
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : saveStatus === "error" ? "Error" : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Editor Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                <p className="text-slate-500 font-mono text-sm">Loading portfolio data...</p>
              </div>
            </div>
          ) : data ? (
            <div className="max-w-4xl mx-auto">
              {activeSection === "hero" && (
                <HeroEditor data={data.hero} onChange={hero => setData({ ...data, hero })} />
              )}
              {activeSection === "about" && (
                <AboutEditor data={data.about} onChange={about => setData({ ...data, about })} />
              )}
              {activeSection === "experience" && (
                <ExperienceEditor data={data.experience} onChange={experience => setData({ ...data, experience })} />
              )}
              {activeSection === "projects" && (
                <ProjectsEditor data={data.projects} onChange={projects => setData({ ...data, projects })} />
              )}
              {activeSection === "skills" && (
                <SkillsEditor data={data.skills} onChange={skills => setData({ ...data, skills })} />
              )}
              {activeSection === "certifications" && (
                <CertificationsEditor data={data.certifications} onChange={certifications => setData({ ...data, certifications })} />
              )}
              {activeSection === "education" && (
                <EducationEditor
                  data={data.education}
                  certs={data.educationCerts}
                  onChange={(education, educationCerts) => setData({ ...data, education, educationCerts })}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500 font-mono text-sm">Failed to load data. Check the server.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
