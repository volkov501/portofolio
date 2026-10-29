"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { parseVideo } from "@/lib/video";

interface VideoModalProps {
  isOpen: boolean;
  title: string;
  videos: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

// Full-screen player: a black sheet slides up from the bottom and lifts away on close,
// the same curtain move spacex.com uses for its launch videos.
export default function VideoModal({ isOpen, title, videos, index, onIndexChange, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start playback as soon as the sheet opens. Browsers (iOS especially) may refuse sound without a
  // direct tap on the video, so fall back to muted playback; the visitor can unmute from the controls.
  useEffect(() => {
    const v = videoRef.current;
    if (!isOpen || !v) return;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, [isOpen, index]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const video = parseVideo(videos[index] ?? "");

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — video`}
          className="fixed inset-0 z-[70] bg-black flex flex-col font-[family-name:var(--font-barlow)]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-hairline">
            <div className="min-w-0">
              <span className="sx-eyebrow text-white/50">
                Mission Footage{videos.length > 1 ? ` // ${index + 1} of ${videos.length}` : ""}
              </span>
              <h4 className="sx-display text-lg sm:text-2xl text-white mt-0.5 truncate">{title}</h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-3 border border-hairline rounded-full text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8">
            {video.kind === "file" ? (
              <video
                ref={videoRef}
                key={video.src}
                src={video.src}
                controls
                playsInline
                className="max-w-full max-h-full bg-black"
              />
            ) : (
              <div className="w-full max-w-6xl max-h-full aspect-video bg-night-soft border border-hairline">
                <iframe
                  key={video.embedUrl}
                  src={video.embedUrl}
                  title={`${title} — video ${index + 1}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {videos.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 px-5 pb-6">
              {videos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  className={`px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    i === index ? "bg-white text-black border-white" : "border-hairline text-white/70 hover:text-white"
                  }`}
                >
                  Video {i + 1}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
