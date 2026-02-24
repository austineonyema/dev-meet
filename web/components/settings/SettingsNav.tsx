import { ChevronRight } from "lucide-react";
import type { SettingsTabId, SettingsTabItem } from "@/lib/settings";

type SettingsNavProps = {
  tabs: SettingsTabItem[];
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
};

export function SettingsNav({ tabs, activeTab, onTabChange }: SettingsNavProps) {
  return (
    <aside className="w-full space-y-2 lg:w-64">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
              isActive
                ? "border-terminal/30 bg-terminal/5 shadow-[0_4px_20px_rgba(0,255,65,0.05)]"
                : "border-transparent bg-transparent hover:border-terminal/10 hover:bg-surface-900"
            }`}
          >
            <div
              className={`rounded-lg p-2 transition-colors ${
                isActive
                  ? "bg-terminal text-surface-950"
                  : "bg-surface-800 text-text-muted group-hover:text-text-primary"
              }`}
            >
              <tab.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p
                className={`font-mono text-xs leading-tight font-bold ${
                  isActive ? "text-terminal" : "text-text-primary"
                }`}
              >
                {tab.label}
              </p>
              <p className="mt-1 truncate text-[10px] text-text-muted">
                {tab.description}
              </p>
            </div>
            {isActive ? (
              <ChevronRight className="ml-auto h-3 w-3 self-center text-terminal" />
            ) : null}
          </button>
        );
      })}
    </aside>
  );
}
