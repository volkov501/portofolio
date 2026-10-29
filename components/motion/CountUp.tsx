"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Counts the number in a stat like "500+", "3.89" or "~25%" up from zero when it comes into view.
// Values with more than one number (e.g. "100K–150K") are shown as-is.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const alreadySeen = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const [, prefix = "", num = "", suffix = ""] = match ?? [];

  // On a slow load the server-rendered number may already be on screen when JS arrives;
  // in that case keep it instead of resetting it to zero in front of the visitor.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    const shown = Number(getComputedStyle(el.closest(".sx-reveal-sub") ?? el).opacity) > 0.1;
    alreadySeen.current = onScreen && shown;
  }, []);

  useEffect(() => {
    if (!num || !inView || reduceMotion || alreadySeen.current) return;
    const decimals = num.split(".")[1]?.length ?? 0;
    const controls = animate(0, parseFloat(num), {
      duration: 1.8,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, prefix, num, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
