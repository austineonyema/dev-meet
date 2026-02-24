import type { ReactNode } from "react";
import { DashboardRouteShell } from "@/components/layout";

type SettingsLayoutProps = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>;
}
