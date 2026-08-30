"use client";

import { useState, useEffect } from "react";
import { Menu, X, Cpu, Network } from "lucide-react";

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-md border-b border-primary/20 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <Network className="w-6 h-6 text-primary" />
              <Cpu className="w-6 h-6 text-secondary" />
            </div>
            <span className="font-mono font-bold text-xl tracking-tighter ml-1">
              ARRASHI<span className="text-primary">.SYS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-primary transition-colors hover:text-glow font-mono"
              >
                <span className="text-primary/70 mr-1">/</span>
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-medium px-4 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all bg-glow-hover"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-b border-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-primary hover:bg-surface-hover font-mono"
              >
                <span className="text-primary/70 mr-2">/</span>
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10 border border-primary/30"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
