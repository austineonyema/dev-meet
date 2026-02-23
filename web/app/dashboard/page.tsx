"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiErrorMessage, getCurrentUser, logout, type AuthUser } from "@/lib/api";

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

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <h1>Dashboard</h1>
      <p style={{ color: "#666" }}>
        Session check is now done via `GET /api/auth/user`.
      </p>

      {isLoading ? <p>Loading session...</p> : null}

      {!isLoading && user ? (
        <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name || "-"}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "-"}
          </p>
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            style={{ padding: 10, marginTop: 8 }}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </section>
      ) : null}

      {!isLoading && !user ? (
        <section style={{ border: "1px solid #fda29b", padding: 16, borderRadius: 8 }}>
          <p style={{ color: "#b42318", margin: 0 }}>
            {errorMessage || "No active session."}
          </p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{ padding: 10, marginTop: 10 }}
          >
            Go to login
          </button>
        </section>
      ) : null}
    </main>
  );
}
