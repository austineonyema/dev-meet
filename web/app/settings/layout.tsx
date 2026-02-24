import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardRouteShell } from "@/components/layout";
import { getDashboardUser } from "@/lib/auth/get-dashboard-user";

type SettingsLayoutProps = {
  children: ReactNode;
};

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const currentUser = await getDashboardUser();
  if (!currentUser) {
    redirect("/login");
  }

  return <DashboardRouteShell currentUser={currentUser}>{children}</DashboardRouteShell>;
}
