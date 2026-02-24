"use client";

import { SettingsPageShell } from "@/components/settings";
import type { AuthUser } from "@/lib/api";
import { useDashboardSession } from "@/components/layout";
import { mockSettingsUser, type SettingsUser } from "@/lib/settings";

function mapAuthUserToSettingsUser(user: AuthUser): SettingsUser {
  return {
    ...mockSettingsUser,
    displayName: user.name?.trim() || mockSettingsUser.displayName,
    email: user.email,
  };
}

export default function SettingsPage() {
  const { user } = useDashboardSession();

  const settingsUser = mapAuthUserToSettingsUser(user);

  return (
    <div className="text-text-primary">
      <SettingsPageShell user={settingsUser} />
    </div>
  );
}
