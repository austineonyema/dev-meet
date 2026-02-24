import type { ReactNode } from "react";
import { DashboardRouteShell } from "@/components/layout";

type ConnectionsLayoutProps = {
  children: ReactNode;
};

export default function ConnectionsLayout({ children }: ConnectionsLayoutProps) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>;
}
