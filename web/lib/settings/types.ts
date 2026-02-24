import type { LucideIcon } from "lucide-react";

export type SettingsTabId =
  | "profile"
  | "appearance"
  | "security"
  | "notifications";

export type SettingsUser = {
  displayName: string;
  email: string;
  location: string;
  bio: string;
};

export type SettingsTabItem = {
  id: SettingsTabId;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type SecuritySession = {
  id: number;
  device: string;
  location: string;
  isCurrent: boolean;
};

export type ThemeOption = {
  id: string;
  name: string;
  variantLabel: string;
  icon: LucideIcon;
};
