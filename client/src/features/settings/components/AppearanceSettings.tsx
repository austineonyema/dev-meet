import { Monitor, Sun, Moon, Cpu, Zap } from "lucide-react";
import { useState } from "react";

export function AppearanceSettings() {
  const [theme, setTheme] = useState("dark");
  const [glowEnabled, setGlowEnabled] = useState(true);

  const themes = [
    { id: "dark", name: "Deep_Space", icon: Moon, color: "bg-surface-950" },
    { id: "matrix", name: "Digital_Rain", icon: Cpu, color: "bg-black" },
    { id: "light", name: "Light_Cycle", icon: Sun, color: "bg-white" },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal mb-6 flex items-center gap-2">
          <Monitor className="w-4 h-4" /> Theme_Selector
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-3 group ${
                theme === t.id
                  ? "border-terminal bg-terminal/5 shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                  : "border-terminal/10 bg-surface-900 hover:border-terminal/30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === t.id
                    ? "bg-terminal text-surface-950"
                    : "bg-surface-800 text-text-muted"
                }`}
              >
                <t.icon className="w-5 h-5" />
              </div>
              <div>
                <p
                  className={`font-mono text-xs font-bold ${theme === t.id ? "text-terminal" : "text-text-primary"}`}
                >
                  {t.name}
                </p>
                <p className="text-[10px] text-text-muted mt-1 uppercase tracking-tighter">
                  {t.id === "dark"
                    ? "OLED_OPTIMIZED"
                    : t.id === "matrix"
                      ? "HIGH_CONTRAST"
                      : "SOLARIZED"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="pt-8 border-t border-terminal/5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal mb-6 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Visual_Enhancements
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-900 rounded-xl border border-terminal/10">
            <div className="space-y-1">
              <p className="text-sm font-mono font-bold text-text-primary uppercase tracking-tight">
                Active_Glow_Engine
              </p>
              <p className="text-[10px] text-text-muted font-mono capitalize">
                Toggles terminal bloom and neon reflections
              </p>
            </div>
            <button
              onClick={() => setGlowEnabled(!glowEnabled)}
              className={`w-12 h-6 rounded-full transition-all relative ${glowEnabled ? "bg-terminal" : "bg-surface-700"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full transition-all ${glowEnabled ? "right-1 bg-surface-950" : "left-1 bg-text-muted"}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-900 rounded-xl border border-terminal/10">
            <div className="space-y-1">
              <p className="text-sm font-mono font-bold text-text-primary uppercase tracking-tight">
                CRT_Scanlines
              </p>
              <p className="text-[10px] text-text-muted font-mono capitalize">
                Simulate retro terminal overlay
              </p>
            </div>
            <button className="w-12 h-6 rounded-full bg-surface-700 transition-all relative opacity-50 cursor-not-allowed">
              <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-text-muted" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
