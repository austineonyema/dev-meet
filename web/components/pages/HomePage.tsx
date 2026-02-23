"use client";

import {
  ActivitySection,
  CommandSurfaceSection,
  EngineeringTracksSection,
  HeroSection,
} from "./home";

export default function HomePage() {
  return (
    <div className="flex flex-col relative">
      <div className="scanline fixed inset-0 pointer-events-none z-50" />
      <HeroSection />
      <CommandSurfaceSection />
      <EngineeringTracksSection />
      <ActivitySection />
    </div>
  );
}
