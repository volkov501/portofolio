"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Images, X, ChevronLeft, ChevronRight, Zap, Camera } from "lucide-react";
import type { Project } from "@/lib/defaultData";
import SectionHeading from "./SectionHeading";

interface GalleryState {
  isOpen: boolean;
  projectTitle: string;
  images: string[];
  currentIndex: number;
}

export default function Projects({ data }: { data: Project[] }) {
  const [gallery, setGallery] = useState<GalleryState>({
    isOpen: false,
    projectTitle: "",
    images: [],
    currentIndex: 0,
  });

  // Handle ESC and Arrow keys for Gallery Lightbox
  useEffect(() => {
    if (!gallery.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGallery((prev) => ({ ...prev, isOpen: false }));
      } else if (e.key === "ArrowRight") {
        setGallery((prev) => ({
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.images.length,
        }));
      } else if (e.key === "ArrowLeft") {
        setGallery((prev) => ({
          ...prev,
          currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery.isOpen, gallery.images.length]);

  const openGallery = (project: Project, startIdx = 0) => {
    const allImages = project.images && project.images.length > 0 
      ? project.images 
      : project.image 
        ? [project.image] 
        : [];

    if (allImages.length === 0) return;

    setGallery({
      isOpen: true,
      projectTitle: project.title,
      images: allImages,
      currentIndex: Math.min(startIdx, allImages.length - 1),
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-28 md:py-40 relative bg-black border-t border-hairline font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeading index="03 — Projects" title="Key Projects" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline"
        >
          {data.map((project, index) => {
            const hasImages = Boolean(project.image || (project.images && project.images.length > 0));
            const imageCount = project.images?.length || (project.image ? 1 : 0);

            return (
              <motion.div
                key={index}
                variants={item}
                className="group flex flex-col h-full p-8 border-r border-b border-hairline hover:bg-white transition-colors duration-300"
              >
                {/* Header row: Index & Badge */}
                <div className="flex justify-between items-start mb-6">
                  <span className="sx-display text-3xl text-white/30 group-hover:text-black/30 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-hairline text-white/80 group-hover:border-black/30 group-hover:text-black transition-colors duration-300">
                    {project.badge}
                  </span>
                </div>

                {/* Project Image Banner / Gallery Slot */}
                <div className="relative mb-6 overflow-hidden border border-hairline/70 group-hover:border-black/20 bg-night-soft transition-colors duration-300">
                  {project.image ? (
                    <div 
                      onClick={() => openGallery(project, 0)}
                      className="relative aspect-video cursor-pointer overflow-hidden"
                      title="Click to expand gallery"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

                      {/* Multiple photos indicator */}
                      {imageCount > 1 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full shadow-lg pointer-events-none">
                          <Images className="w-3 h-3 text-white" />
                          <span>{imageCount} Photos</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Subtle aesthetic slot for projects awaiting photos */
                    <div className="aspect-[2.4/1] flex flex-col items-center justify-center p-4 text-center bg-white/[0.02] group-hover:bg-black/[0.02] border-dashed border-hairline group-hover:border-black/15 transition-colors">
                      <Camera className="w-5 h-5 text-white/20 group-hover:text-black/30 mb-1.5 stroke-[1.5]" />
                      <span className="sx-eyebrow text-[10px] text-white/30 group-hover:text-black/40 tracking-[0.18em]">
                        Visual Telemetry Ready
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="sx-display text-2xl lg:text-3xl text-white group-hover:text-black mb-3 transition-colors duration-300">
                  {project.title}
                  {project.highlight && (
                    <span className="block sx-eyebrow mt-2 text-white group-hover:text-black transition-colors duration-300">
                      — Featured Project
                    </span>
                  )}
                </h3>

                {/* Outcome / Measurable Impact (Priority 1.3) */}
                {project.outcome && (
                  <div className="mb-4 p-3 border-l-2 border-white group-hover:border-black bg-white/[0.04] group-hover:bg-black/[0.04] transition-colors duration-300">
                    <p className="sx-eyebrow text-[10px] text-white/50 group-hover:text-black/50 mb-1 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-white group-hover:text-black" />
                      Measurable Impact
                    </p>
                    <p className="text-xs font-semibold text-white group-hover:text-black tracking-wide leading-snug">
                      {project.outcome}
                    </p>
                  </div>
                )}

                {/* Description */}
                <p className="text-white/60 group-hover:text-black/70 text-sm leading-relaxed mb-6 flex-grow transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] uppercase tracking-[0.12em] text-mute group-hover:text-black/60 transition-colors duration-300"
                    >
                      {i > 0 && <span className="mr-2 opacity-40">/</span>}
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Links */}
                <div className="mt-6 pt-5 border-t border-hairline group-hover:border-black/20 flex flex-wrap items-center justify-between gap-3 transition-colors duration-300">
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.17em] text-white group-hover:text-black transition-colors duration-300 hover:underline"
                    >
                      View Live Project
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.17em] text-white/30 group-hover:text-black/30 select-none">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Internal Architecture
                    </span>
                  )}

                  {hasImages && (
                    <button
                      type="button"
                      onClick={() => openGallery(project, 0)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 group-hover:text-black transition-colors hover:underline"
                    >
                      <Images className="w-3.5 h-3.5" />
                      Gallery ({imageCount})
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Photo Gallery Modal */}
      <AnimatePresence>
        {gallery.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setGallery((prev) => ({ ...prev, isOpen: false }))}
          >
            <div 
              className="relative w-full max-w-5xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between py-4 border-b border-hairline mb-4">
                <div>
                  <span className="sx-eyebrow text-white/50">Mission Telemetry // Gallery</span>
                  <h4 className="sx-display text-xl sm:text-2xl text-white mt-0.5">
                    {gallery.projectTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="sx-eyebrow text-white/70">
                    {gallery.currentIndex + 1} / {gallery.images.length}
                  </span>
                  <button
                    onClick={() => setGallery((prev) => ({ ...prev, isOpen: false }))}
                    className="p-2 border border-hairline rounded-full text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo Display */}
              <div className="relative flex-1 min-h-[320px] max-h-[65vh] flex items-center justify-center overflow-hidden bg-night-soft border border-hairline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gallery.images[gallery.currentIndex]}
                  alt={`${gallery.projectTitle} - photo ${gallery.currentIndex + 1}`}
                  className="w-full h-full object-contain max-h-[65vh]"
                />

                {/* Left / Right Nav Arrows */}
                {gallery.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setGallery((prev) => ({
                          ...prev,
                          currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
                        }))
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-white hover:text-black border border-hairline text-white rounded-full transition-colors"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setGallery((prev) => ({
                          ...prev,
                          currentIndex: (prev.currentIndex + 1) % prev.images.length,
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-white hover:text-black border border-hairline text-white rounded-full transition-colors"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Reel */}
              {gallery.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto py-2 scrollbar-none">
                  {gallery.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGallery((prev) => ({ ...prev, currentIndex: i }))}
                      className={`relative shrink-0 w-20 h-14 border overflow-hidden transition-all ${
                        i === gallery.currentIndex
                          ? "border-white ring-1 ring-white"
                          : "border-hairline opacity-50 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
