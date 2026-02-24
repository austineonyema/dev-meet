"use client";

import { useState } from "react";
import {
  Bell,
  Monitor,
  Settings as SettingsIcon,
  Shield,
  Terminal,
  User,
} from "lucide-react";
import type { SettingsTabId, SettingsTabItem, SettingsUser } from "@/lib/settings";
import { AppearanceSettingsPanel } from "./AppearanceSettingsPanel";
import { ProfileSettingsForm } from "./ProfileSettingsForm";
import { SecuritySettingsPanel } from "./SecuritySettingsPanel";
import { SettingsNav } from "./SettingsNav";
import { SettingsPanelCard } from "./SettingsPanelCard";

type SettingsPageShellProps = {
  user: SettingsUser;
};

const tabs: SettingsTabItem[] = [
  {
    id: "profile",
    label: "User_Profile",
    icon: User,
    description: "Identity and bio settings",
  },
  {
    id: "appearance",
    label: "System_UI",
    icon: Monitor,
    description: "Themes and animations",
  },
  {
    id: "security",
    label: "Auth_Security",
    icon: Shield,
    description: "Passkeys and sessions",
  },
  {
    id: "notifications",
    label: "Push_Hooks",
    icon: Bell,
    description: "Event notifications",
  },
];

export function SettingsPageShell({ user }: SettingsPageShellProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-terminal/40 uppercase">
            <Terminal className="h-3.5 w-3.5" />
            <span>sys_config / user / dev_meet.settings</span>
          </div>
          <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight">
            Environment_Config
          </h1>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-terminal/10 bg-surface-900 px-4 py-2 font-mono text-[10px] text-text-muted">
          <div className="h-2 w-2 animate-pulse rounded-full bg-terminal" />
          STABLE_BUILD_v4.2.0
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <SettingsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1">
          <SettingsPanelCard>
            <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-5">
              <SettingsIcon className="-mr-20 -mt-20 h-64 w-64 rotate-12" />
            </div>

            <div className="relative z-10 transition-all duration-300">
              {activeTab === "profile" ? <ProfileSettingsForm user={user} /> : null}
              {activeTab === "appearance" ? <AppearanceSettingsPanel /> : null}
              {activeTab === "security" ? <SecuritySettingsPanel /> : null}
              {activeTab === "notifications" ? <NotificationPlaceholder /> : null}
            </div>
          </SettingsPanelCard>
        </main>
      </div>
    </div>
  );
}

function NotificationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-40">
      <Bell className="mb-4 h-12 w-12" />
      <p className="font-mono text-xs">MODULE_PENDING::NULL_BUFFER</p>
      <p className="mt-2 text-[10px] tracking-tighter uppercase">
        v4.3.0 Release Candidate
      </p>
    </div>
  );
}
