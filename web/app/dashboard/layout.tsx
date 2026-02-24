import type { ReactNode } from "react";
import { DashboardRouteShell } from "@/components/layout";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>;
}
