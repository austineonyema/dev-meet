"use client";

import { Monitor, Zap } from "lucide-react";
import { useState } from "react";
import { themeOptions } from "@/lib/settings";

export function AppearanceSettingsPanel() {
  const [theme, setTheme] = useState("dark");
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(false);

  return (
    <div className="space-y-10">
      <section>
        <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-terminal uppercase">
          <Monitor className="h-4 w-4" /> Theme_Selector
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {themeOptions.map((item) => {
            const isActive = item.id === theme;
            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`group flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-terminal bg-terminal/5 shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                    : "border-terminal/10 bg-surface-900 hover:border-terminal/30"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-terminal text-surface-950"
                      : "bg-surface-800 text-text-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-terminal" : "text-text-primary"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-tighter text-text-muted">
                    {item.variantLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="border-t border-terminal/5 pt-8">
        <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-terminal uppercase">
          <Zap className="h-4 w-4" /> Visual_Enhancements
        </h3>
        <div className="space-y-4">
          <ToggleRow
            title="Active_Glow_Engine"
            description="Toggles terminal bloom and neon reflections"
            enabled={glowEnabled}
            onToggle={() => setGlowEnabled((previous) => !previous)}
          />
          <ToggleRow
            title="CRT_Scanlines"
            description="Simulate retro terminal overlay"
            enabled={scanlinesEnabled}
            onToggle={() => setScanlinesEnabled((previous) => !previous)}
          />
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-terminal/10 bg-surface-900 p-4">
      <div className="space-y-1">
        <p className="font-mono text-sm font-bold tracking-tight text-text-primary uppercase">
          {title}
        </p>
        <p className="font-mono text-[10px] text-text-muted capitalize">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-12 rounded-full transition-all ${
          enabled ? "bg-terminal" : "bg-surface-700"
        }`}
      >
        <div
          className={`absolute top-1 h-4 w-4 rounded-full transition-all ${
            enabled ? "right-1 bg-surface-950" : "left-1 bg-text-muted"
          }`}
        />
      </button>
    </div>
  );
}
