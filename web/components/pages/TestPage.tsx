"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getApiErrorMessage,
  getUsers,
  isBackendNotReadyError,
  type ApiError,
} from "@/lib/api";
import type { UserRecord } from "@/lib/users";
import { UsersList } from "@/components/users";

export function TestPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | Error | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadUsers() {
      try {
        const response = await getUsers();
        if (isActive) setUsers(response);
      } catch (caught) {
        if (isActive) setError(caught as ApiError | Error);
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    void loadUsers();

    return () => {
      isActive = false;
    };
  }, []);

  const isAccessError =
    error instanceof Error &&
    "status" in error &&
    (((error as ApiError).status === 401) || ((error as ApiError).status === 403));
  const isBackendUnavailable = isBackendNotReadyError(error);

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-1">
        <h1 className="font-mono text-2xl font-bold text-text-primary">
          Users Directory
        </h1>
        <p className="font-mono text-xs text-text-muted">
          Team records proxied through `GET /api/users`.
        </p>
      </header>

      {isLoading ? (
        <div className="terminal-box rounded-xl border-terminal/10 p-6 font-mono text-sm text-text-muted">
          Loading users...
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-xl border border-error/40 bg-error/5 p-6">
          {isAccessError ? (
            <div className="space-y-3">
              <p className="text-error">
                Users endpoint is protected. Sign in with a permitted account to
                view records.
              </p>
              <p className="font-mono text-xs text-text-muted">
                {getApiErrorMessage(error, "Unauthorized.")}
              </p>
              <Link
                href="/login"
                className="inline-flex rounded border border-error/40 px-3 py-2 text-sm text-error transition-colors hover:bg-error/10"
              >
                Go to login
              </Link>
            </div>
          ) : isBackendUnavailable ? (
            <div className="space-y-3">
              <p className="text-amber-200">
                Users backend endpoint is not ready yet. Frontend integration is prepared and waiting for backend availability.
              </p>
              <p className="font-mono text-xs text-text-muted">
                {getApiErrorMessage(error, "Backend endpoint not ready.")}
              </p>
            </div>
          ) : (
            <p className="text-error">
              {getApiErrorMessage(error, "Failed to load users.")}
            </p>
          )}
        </div>
      ) : null}

      {!isLoading && !error ? <UsersList users={users} /> : null}
    </section>
  );
}
