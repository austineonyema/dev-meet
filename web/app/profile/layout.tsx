import type { ReactNode } from "react";
import { DashboardRouteShell } from "@/components/layout";

type ProfileLayoutProps = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>;
}
