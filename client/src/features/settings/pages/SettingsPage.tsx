import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Monitor,
  Bell,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { Card } from "../../../components/ui";
import {
  ProfileSettings,
  AppearanceSettings,
  SecuritySettings,
} from "../components";

type SettingsTab = "profile" | "appearance" | "security" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabs = [
    {
      id: "profile",
      label: "User_Profile",
      icon: User,
      desc: "Identity & bio settings",
    },
    {
      id: "appearance",
      label: "System_UI",
      icon: Monitor,
      desc: "Themes & animations",
    },
    {
      id: "security",
      label: "Auth_Security",
      icon: Shield,
      desc: "Passkeys & sessions",
    },
    {
      id: "notifications",
      label: "Push_Hooks",
      icon: Bell,
      desc: "Event notifications",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header section with terminal breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-terminal/40 font-mono text-[10px] uppercase tracking-widest mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>sys_config / user / dev_meet.settings</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            Environment_Config
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-surface-900 border border-terminal/10 rounded-lg text-[10px] font-mono text-text-muted">
          <div className="w-2 h-2 rounded-full bg-terminal animate-pulse" />
          STABLE_BUILD_v4.2.0
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full group flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                activeTab === tab.id
                  ? "bg-terminal/5 border-terminal/30 shadow-[0_4px_20px_rgba(0,255,65,0.05)]"
                  : "bg-transparent border-transparent hover:bg-surface-900 hover:border-terminal/10"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-terminal text-surface-950"
                    : "bg-surface-800 text-text-muted group-hover:text-text-primary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-bold leading-tight ${activeTab === tab.id ? "text-terminal" : "text-text-primary"}`}
                >
                  {tab.label}
                </p>
                <p className="text-[10px] text-text-muted mt-1 truncate">
                  {tab.desc}
                </p>
              </div>
              {activeTab === tab.id && (
                <ChevronRight className="w-3 h-3 ml-auto self-center text-terminal" />
              )}
            </button>
          ))}
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1">
          <Card className="p-8 border-terminal/10 bg-surface-950/50 backdrop-blur-xl relative overflow-hidden min-h-[500px]">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <SettingsIcon className="w-64 h-64 -mr-20 -mt-20 rotate-12" />
            </div>

            <div className="relative z-10 transition-all duration-300">
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "appearance" && <AppearanceSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "notifications" && (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <Bell className="w-12 h-12 mb-4" />
                  <p className="font-mono text-xs">
                    MODULE_PENDING::NULL_BUFFER
                  </p>
                  <p className="text-[10px] uppercase tracking-tighter mt-2">
                    v4.3.0 Release Candidate
                  </p>
                </div>
              )}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
