import { Cpu, Moon, Sun } from "lucide-react";
import { mockProfileUser } from "@/lib/profile";
import type { SecuritySession, SettingsUser, ThemeOption } from "./types";

export const mockSettingsUser: SettingsUser = {
  displayName: mockProfileUser.name,
  email: mockProfileUser.email,
  location: mockProfileUser.location,
  bio: mockProfileUser.bio,
};

export const themeOptions: ThemeOption[] = [
  {
    id: "dark",
    name: "Deep_Space",
    variantLabel: "OLED_OPTIMIZED",
    icon: Moon,
  },
  {
    id: "matrix",
    name: "Digital_Rain",
    variantLabel: "HIGH_CONTRAST",
    icon: Cpu,
  },
  {
    id: "light",
    name: "Light_Cycle",
    variantLabel: "SOLARIZED",
    icon: Sun,
  },
];

export const securitySessions: SecuritySession[] = [
  {
    id: 1,
    device: "macOS - Chrome",
    location: "Lagos, Nigeria",
    isCurrent: true,
  },
  {
    id: 2,
    device: "iPhone 15 Pro",
    location: "Lagos, Nigeria",
    isCurrent: false,
  },
];
