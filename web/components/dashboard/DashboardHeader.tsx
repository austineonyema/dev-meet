import Link from "next/link";
import { Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui";

type DashboardHeaderProps = {
  firstName: string;
  onLogout: () => Promise<void>;
  isLoggingOut: boolean;
};

export function DashboardHeader({
  firstName,
  onLogout,
  isLoggingOut,
}: DashboardHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back, <span className="text-terminal capitalize">{firstName}</span>
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          <span className="text-terminal/60">$</span> last login: Wed Jan 28 2026
          23:24:51 on ttys001
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/posts">
          <Button
            size="sm"
            className="bg-surface-800 hover:bg-surface-700 text-text-primary border-terminal/10 border font-mono text-xs"
          >
            <Clock className="w-3.5 h-3.5 mr-2" /> History
          </Button>
        </Link>
        <Link href="/posts/new">
          <Button
            size="sm"
            className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-bold text-xs ring-offset-surface-950 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> $ post --new
          </Button>
        </Link>
        <Button
          size="sm"
          variant="ghost"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="border border-error/30 text-error hover:bg-error/10 hover:text-error font-mono text-xs"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </section>
  );
}
