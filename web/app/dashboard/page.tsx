"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout, type AuthUser } from "@/lib/api";
import { DashboardShell } from "@/components/dashboard";
import { useDashboardSession } from "@/components/layout";
import { mockDashboardUser, type DashboardUser } from "@/lib/dashboard";

function mapAuthUserToDashboardUser(user: AuthUser): DashboardUser {
  const emailPrefix = user.email.split("@")[0] || "dev_user";

  return {
    ...mockDashboardUser,
    id: user.id,
    email: user.email,
    name: user.name?.trim() || mockDashboardUser.name,
    username: emailPrefix,
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useDashboardSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  const dashboardUser = mapAuthUserToDashboardUser(user);
  const firstName = dashboardUser.name.split(" ")[0] || "Engineer";

  return (
    <div className="text-text-primary">
      <DashboardShell
        user={dashboardUser}
        firstName={firstName}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}
