"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiErrorMessage, getCurrentUser, logout, type AuthUser } from "@/lib/api";
import { DashboardShell } from "@/components/dashboard";
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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadSession() {
      try {
        const profile = await getCurrentUser();
        if (isActive) setUser(profile);
      } catch (error) {
        if (isActive) setErrorMessage(getApiErrorMessage(error, "Unauthorized."));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    void loadSession();

    return () => {
      isActive = false;
    };
  }, []);

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  const dashboardUser = user
    ? mapAuthUserToDashboardUser(user)
    : mockDashboardUser;
  const firstName = dashboardUser.name.split(" ")[0] || "Engineer";

  return (
    <main className="min-h-screen bg-surface-950 text-text-primary">
      {isLoading ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="terminal-box rounded-xl p-6 font-mono text-sm text-text-muted">
            Loading session...
          </div>
        </section>
      ) : null}

      {!isLoading && !user ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-xl border border-error/40 bg-error/5 p-6">
            <p className="text-error m-0">
              {errorMessage || "No active session."}
            </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-4 px-3 py-2 text-sm rounded border border-error/40 text-error hover:bg-error/10 transition-colors"
            >
              Go to login
            </button>
          </div>
        </section>
      ) : null}

      {!isLoading && user ? (
        <DashboardShell
          user={dashboardUser}
          firstName={firstName}
          onLogout={onLogout}
          isLoggingOut={isLoggingOut}
        />
      ) : null}
    </main>
  );
}
