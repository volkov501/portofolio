"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  htmlUrl?: string;
}

// Android Chrome can't render a PDF inside an iframe and iOS Safari only shows its first page,
// so touch devices and browsers without a PDF viewer get the HTML version of the same resume.
function canShowPdfInline(): boolean {
  if (typeof window === "undefined") return true;
  const touchOrSmall = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
  return navigator.pdfViewerEnabled !== false && !touchOrSmall;
}

export default function ResumeModal({
  isOpen,
  onClose,
  resumeUrl = "/Arrashi_Satyadi_Resume_ATS.pdf",
  htmlUrl = "/Arrashi_Satyadi_Resume.html",
}: ResumeModalProps) {
  // ESC key handler & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl flex flex-col h-[92vh] max-h-[920px] bg-black border border-hairline overflow-hidden font-[family-name:var(--font-barlow)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-hairline bg-night-soft">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-white shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="sx-eyebrow text-white/50 block text-[10px]">
                    Document Telemetry // ATS Resume
                  </span>
                  <h3 className="sx-display text-lg sm:text-xl text-white">
                    Arrashi Satyadi — Curriculum Vitae
                  </h3>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Arrashi_Satyadi_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white border border-hairline rounded-full hover:bg-white hover:text-black transition-colors"
                  title="Download PDF directly"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span> PDF
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-hairline rounded-full text-white hover:bg-white hover:text-black transition-colors"
                  title="Open in new tab"
                  aria-label="Open PDF in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="p-2 border border-hairline rounded-full text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Close resume viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Viewer Frame */}
            <div className="relative flex-1 w-full bg-night overflow-hidden">
              <iframe
                src={canShowPdfInline() ? `${resumeUrl}#toolbar=1&navpanes=0` : htmlUrl}
                className="w-full h-full border-none bg-white"
                title="Arrashi Satyadi ATS Resume"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 border-t border-hairline bg-night-soft text-[11px] sx-eyebrow text-white/50">
              <span>ATS Standard • Verified Credentials • Updated 2026</span>
              <div className="flex items-center gap-3">
                <span className="text-white/40 hidden md:inline">Press ESC to close</span>
                <a
                  href={resumeUrl}
                  download="Arrashi_Satyadi_Resume.pdf"
                  className="text-white hover:underline uppercase tracking-wider"
                >
                  Trouble viewing? Click to download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
