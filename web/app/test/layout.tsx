import type { ReactNode } from "react";
import { DashboardRouteShell } from "@/components/layout";

type TestLayoutProps = {
  children: ReactNode;
};

export default function TestLayout({ children }: TestLayoutProps) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>;
}
