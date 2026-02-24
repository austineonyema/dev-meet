"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsPageShell } from "@/components/settings";
import { getApiErrorMessage, getCurrentUser, type AuthUser } from "@/lib/api";
import { mockSettingsUser, type SettingsUser } from "@/lib/settings";

function mapAuthUserToSettingsUser(user: AuthUser): SettingsUser {
  return {
    ...mockSettingsUser,
    displayName: user.name?.trim() || mockSettingsUser.displayName,
    email: user.email,
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const settingsUser = user ? mapAuthUserToSettingsUser(user) : mockSettingsUser;

  return (
    <div className="text-text-primary">
      {isLoading ? (
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="terminal-box rounded-xl p-6 font-mono text-sm text-text-muted">
            Loading settings...
          </div>
        </section>
      ) : null}

      {!isLoading && !user ? (
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-error/40 bg-error/5 p-6">
            <p className="m-0 text-error">{errorMessage || "No active session."}</p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-4 rounded border border-error/40 px-3 py-2 text-sm text-error transition-colors hover:bg-error/10"
            >
              Go to login
            </button>
          </div>
        </section>
      ) : null}

      {!isLoading && user ? <SettingsPageShell user={settingsUser} /> : null}
    </div>
  );
}
