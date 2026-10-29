"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certs", href: "#certifications" },
    { name: "Education", href: "#education" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-[background-color,padding] duration-500 font-[family-name:var(--font-barlow)] ${
        isScrolled || mobileMenuOpen
          ? "bg-black border-b border-hairline py-4"
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 sx-reveal-sub" style={{ animationDelay: "0s" }}>
        <div className="flex justify-between items-center">
          <a href="#" className="sx-display text-xl sm:text-2xl text-white tracking-[0.18em]">
            Arrashi
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.17em] text-white/80 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="text-xs font-semibold uppercase tracking-[0.17em] text-white/80 hover:text-white transition-colors duration-300 cursor-pointer"
              title="Preview ATS Resume"
            >
              Resume
            </button>
            <a
              href="#contact"
              className="text-xs font-bold uppercase tracking-[0.17em] px-6 py-3 rounded-full border border-white text-white hover:bg-[#f0f0fa] hover:text-black transition-colors duration-300"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-hairline">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm font-semibold uppercase tracking-[0.17em] text-white/80 hover:text-white border-b border-hairline/60 sx-reveal-sub"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-resume"));
              }}
              className="w-full text-left py-3 text-sm font-semibold uppercase tracking-[0.17em] text-white/80 hover:text-white border-b border-hairline/60 cursor-pointer sx-reveal-sub"
              style={{ animationDelay: `${navLinks.length * 0.05}s` }}
            >
              Resume (PDF Preview)
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="sx-ghost mt-6 w-full justify-center sx-reveal-btn"
              style={{ animationDelay: "0.4s" }}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
