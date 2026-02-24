import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardRouteShell } from "@/components/layout";
import { getDashboardUser } from "@/lib/auth/get-dashboard-user";

type PostsLayoutProps = {
  children: ReactNode;
};

export default async function PostsLayout({ children }: PostsLayoutProps) {
  const currentUser = await getDashboardUser();
  if (!currentUser) {
    redirect("/login");
  }

  return <DashboardRouteShell currentUser={currentUser}>{children}</DashboardRouteShell>;
}
