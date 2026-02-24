"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MessageSquareCode,
  Search,
  Settings,
  Terminal,
  User,
  Users,
} from "lucide-react";
import { getApiErrorMessage, getCurrentUser, logout, type AuthUser } from "@/lib/api";
import { mockDashboardUser } from "@/lib/dashboard";
import { DashboardSessionProvider } from "./dashboard-session";
import { CommandBar } from "@/components/navigation/CommandBar";

type DashboardRouteShellProps = {
  children: React.ReactNode;
};

type SessionPreview = {
  name: string;
  email: string;
  avatar: string | null;
};

const navItems = [
  { icon: LayoutDashboard, label: "Feed", path: "/dashboard", shortcut: "G F" },
  { icon: MessageSquareCode, label: "Posts", path: "/posts", shortcut: "G P" },
  { icon: Users, label: "Connections", path: "/connections", shortcut: "G C" },
  { icon: User, label: "Profile", path: "/profile", shortcut: "G U" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", path: "/settings", shortcut: "," },
];

const breadcrumbNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  profile: "Profile",
  posts: "Posts",
  new: "Create Post",
  settings: "Settings",
  connections: "Connections",
  test: "Users",
};

function mapAuthUserToSessionPreview(user: AuthUser): SessionPreview {
  return {
    name: user.name?.trim() || mockDashboardUser.name,
    email: user.email,
    avatar: mockDashboardUser.avatar ?? null,
  };
}

export function DashboardRouteShell({ children }: DashboardRouteShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sessionUser, setSessionUser] = useState<AuthUser | null>(null);
  const [sessionState, setSessionState] = useState<
    "loading" | "ready" | "redirecting" | "error"
  >("loading");
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [session, setSession] = useState<SessionPreview>({
    name: mockDashboardUser.name,
    email: mockDashboardUser.email,
    avatar: mockDashboardUser.avatar ?? null,
  });

  useEffect(() => {
    let isActive = true;

    async function loadSessionPreview() {
      try {
        const profile = await getCurrentUser();
        if (!isActive) return;
        setSessionUser(profile);
        setSession(mapAuthUserToSessionPreview(profile));
        setSessionError(null);
        setSessionState("ready");
      } catch (error) {
        const status =
          typeof error === "object" &&
          error !== null &&
          "status" in error &&
          typeof (error as { status?: unknown }).status === "number"
            ? ((error as { status: number }).status ?? 0)
            : 0;

        if (status === 401 || status === 403) {
          if (isActive) setSessionState("redirecting");
          router.replace("/login");
          return;
        }

        if (isActive) {
          setSessionError(
            getApiErrorMessage(
              error,
              "Unable to resolve dashboard session. Please retry.",
            ),
          );
          setSessionState("error");
        }
      }
    }

    setSessionState("loading");
    void loadSessionPreview();

    return () => {
      isActive = false;
    };
  }, [router]);

  const pathnames = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname],
  );

  const firstName = session.name.split(" ")[0] || "Dev";
  const username = (session.email.split("@")[0] || "engineer").replace(
    /\s+/g,
    "_",
  );

  if (sessionState === "loading" || sessionState === "redirecting") {
    return (
      <main className="min-h-screen bg-surface-950 px-4 py-8 text-text-primary sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl">
          <div className="terminal-box rounded-xl p-6 font-mono text-sm text-text-muted">
            Resolving session...
          </div>
        </section>
      </main>
    );
  }

  if (sessionState === "error" || !sessionUser) {
    return (
      <main className="min-h-screen bg-surface-950 px-4 py-8 text-text-primary sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-error/40 bg-error/5 p-6">
            <p className="m-0 text-error">
              {sessionError || "Unable to resolve dashboard session."}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded border border-error/40 px-3 py-2 text-sm text-error transition-colors hover:bg-error/10"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => router.replace("/login")}
                className="rounded border border-terminal/30 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-terminal/10"
              >
                Go to login
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <DashboardSessionProvider user={sessionUser}>
      <CommandBar />
      <div className="flex h-screen overflow-hidden bg-surface-950 font-sans text-text-primary">
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"} z-30 flex flex-col border-r border-terminal/10 bg-surface-900 transition-all duration-300`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-terminal/10 p-4">
          <Link href="/" className="group flex items-center gap-2">
            <Terminal className="h-6 w-6 text-terminal" />
            {isSidebarOpen ? (
              <span className="font-mono text-lg font-bold tracking-tight">
                dev<span className="text-terminal">-meet</span>
              </span>
            ) : null}
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  isActive
                    ? "border-terminal/20 bg-terminal/10 text-terminal shadow-[0_0_15px_rgba(0,255,65,0.05)]"
                    : "border-transparent text-text-muted hover:bg-surface-800 hover:text-text-primary"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-terminal" : "group-hover:text-terminal"}`}
                />
                {isSidebarOpen ? (
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-[10px] opacity-40">
                      {item.shortcut}
                    </span>
                  </div>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-terminal/10 p-3">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  isActive
                    ? "border-terminal/20 bg-terminal/10 text-terminal"
                    : "border-transparent text-text-muted hover:bg-surface-800 hover:text-text-primary"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors ${isActive ? "text-terminal" : "group-hover:text-terminal"}`}
                />
                {isSidebarOpen ? (
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-[10px] opacity-40">
                      {item.shortcut}
                    </span>
                  </div>
                ) : null}
              </Link>
            );
          })}

          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-lg border border-transparent p-3 text-error transition-all hover:bg-error/5"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5 transition-transform group-hover:scale-110" />
            {isSidebarOpen ? (
              <span className="text-sm font-medium">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            ) : null}
          </button>
        </div>

        {isSidebarOpen ? (
          <div className="border-t border-terminal/10 bg-surface-950/50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full border border-terminal/20 bg-surface-800">
                {session.avatar ? (
                  <img
                    src={session.avatar}
                    alt={session.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs text-terminal">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-bold capitalize">{session.name}</p>
                <p className="truncate font-mono text-[10px] text-terminal">
                  @{username}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="hidden items-center justify-center border-t border-terminal/10 p-2 text-text-muted transition-all hover:bg-surface-800 hover:text-terminal md:flex"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`}
          />
        </button>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-20 flex h-16 items-center justify-between border-b border-terminal/10 bg-surface-900/50 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-800 hover:text-terminal md:hidden"
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div className="group relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-terminal" />
              <input
                type="text"
                readOnly
                value="Search terminal... (Ctrl + K)"
                className="w-64 rounded-full border border-terminal/10 bg-surface-800 py-1.5 pl-10 pr-4 font-mono text-xs text-text-muted focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 text-text-muted transition-colors hover:text-terminal"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-terminal shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
            </button>
            <div className="mx-1 h-6 w-px bg-terminal/10" />
            <Link
              href="/profile"
              className="group flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-surface-800"
            >
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-terminal/20 bg-surface-700 transition-colors group-hover:border-terminal/50">
                {session.avatar ? (
                  <img
                    src={session.avatar}
                    alt={session.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-[10px] font-bold text-terminal">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="hidden text-left lg:block">
                <p className="mb-1 text-[10px] leading-none tracking-wider text-text-muted uppercase">
                  Status
                </p>
                <div className="flex items-center gap-1.5 leading-none">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  <p className="font-mono text-xs font-bold text-terminal">ONLINE</p>
                </div>
              </div>
            </Link>
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto bg-surface-950">
          <div className="pointer-events-none absolute inset-0 z-10 h-full opacity-30 scanline" />

          <div className="relative z-20 p-6 md:p-8 lg:p-10">
            <nav className="mb-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-text-muted uppercase">
              <Link href="/" className="transition-colors hover:text-terminal">
                root
              </Link>
              {pathnames.length > 0 ? (
                <ChevronRight className="h-3 w-3 opacity-30" />
              ) : null}
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const name = breadcrumbNameMap[value] || value;

                if (last) {
                  return (
                    <span key={to} className="font-bold text-terminal">
                      {name}
                    </span>
                  );
                }

                return (
                  <span key={to} className="flex items-center gap-2">
                    <Link href={to} className="transition-colors hover:text-terminal">
                      {name}
                    </Link>
                    <ChevronRight className="h-3 w-3 opacity-30" />
                  </span>
                );
              })}
            </nav>
            {children}
          </div>
        </main>
      </div>
      </div>
    </DashboardSessionProvider>
  );
}
