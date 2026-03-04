"use client";

import { useEffect, useState } from "react";
import {
  ActivitySection,
  CommandSurfaceSection,
  EngineeringTracksSection,
  HeroSection,
} from "./home";

export default function HomePage() {
  const [captureLabel, setCaptureLabel] = useState<string | null>(null);
  const [captureViewport, setCaptureViewport] = useState<string | null>(null);

  useEffect(() => {
    const isFigmaCaptureMode = window.location.hash.includes("figmacapture=");
    if (!isFigmaCaptureMode) {
      return;
    }

    const url = new URL(window.location.href);
    setCaptureLabel(url.searchParams.get("capture"));
    setCaptureViewport(`${window.innerWidth}x${window.innerHeight}`);

    // For capture mode, walk the viewport to the bottom so reveal-on-scroll
    // sections are mounted before Figma ingests the DOM snapshot.
    window.scrollTo({ top: 0, behavior: "auto" });

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const step = Math.max(140, Math.floor(window.innerHeight * 0.42));
    const tick = () => {
      if (cancelled) {
        return;
      }

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const next = Math.min(window.scrollY + step, maxScroll);
      window.scrollTo({ top: next, behavior: "auto" });

      if (next < maxScroll) {
        timer = setTimeout(tick, 90);
      }
    };

    timer = setTimeout(tick, 120);

    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col overflow-x-clip">
      {captureLabel ? (
        <div className="fixed left-3 top-16 z-[70] rounded border border-terminal/40 bg-surface-900/95 px-2 py-1 font-mono text-[10px] tracking-widest text-terminal uppercase">
          {captureLabel}
          {captureViewport ? ` ${captureViewport}` : ""}
        </div>
      ) : null}
      <div className="scanline fixed inset-0 pointer-events-none z-50" />
      <HeroSection />
      <CommandSurfaceSection />
      <EngineeringTracksSection />
      <ActivitySection />
    </div>
  );
}
