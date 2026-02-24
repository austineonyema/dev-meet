import { ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import type { ProfileUser } from "@/lib/profile";

type ProfileNetworkStatsCardProps = {
  user: ProfileUser;
};

export function ProfileNetworkStatsCard({ user }: ProfileNetworkStatsCardProps) {
  const stats = [
    { label: "Connections", value: user.stats.connections.toString() },
    { label: "Articles", value: user.stats.posts.toString() },
    { label: "Projects", value: user.stats.projects.toString() },
    { label: "Contributions", value: `${(user.stats.contributions / 1000).toFixed(1)}k` },
  ];

  return (
    <ScrollReveal delay={200}>
      <div className="terminal-box rounded-xl border-terminal/10 p-6">
        <h3 className="mb-4 flex items-center justify-between font-mono text-xs font-bold tracking-widest text-text-muted uppercase">
          <span>Network_Stats</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-terminal/5 bg-surface-900 p-3">
              <p className="mb-1 font-mono text-[10px] text-text-muted">{stat.label}</p>
              <p className="font-mono text-lg font-bold tracking-tighter text-text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
