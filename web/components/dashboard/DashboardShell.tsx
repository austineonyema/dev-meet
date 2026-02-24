import type { DashboardUser } from "@/lib/dashboard";
import { DashboardFeed } from "./DashboardFeed";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardStats } from "./DashboardStats";

type DashboardShellProps = {
  user: DashboardUser;
  firstName: string;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
};

export function DashboardShell({
  user,
  firstName,
  onLogout,
  isLoggingOut,
}: DashboardShellProps) {
  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <DashboardHeader
        firstName={firstName}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
      />
      <DashboardStats user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DashboardFeed currentUsername={user.username} />
        <DashboardSidebar />
      </div>
    </div>
  );
}
