import { GitBranch, MessageSquareCode, Sparkles, Terminal } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import type { DashboardUser } from "@/lib/dashboard";

type DashboardStatsProps = {
  user: DashboardUser;
};

export function DashboardStats({ user }: DashboardStatsProps) {
  const stats = [
    {
      label: "Connections",
      value: user.stats.connections,
      icon: GitBranch,
      color: "text-blue-500",
    },
    {
      label: "Articles",
      value: user.stats.posts,
      icon: MessageSquareCode,
      color: "text-primary-400",
    },
    {
      label: "Contributions",
      value: user.stats.contributions,
      icon: Terminal,
      color: "text-terminal",
    },
    {
      label: "Global Rank",
      value: "#1,204",
      icon: Sparkles,
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <ScrollReveal key={stat.label} delay={index * 100} className="h-full">
          <div className="terminal-box p-5 rounded-xl border-terminal/10 hover:border-terminal/30 transition-all hover:-translate-y-0.5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-muted text-xs font-mono uppercase tracking-widest">
                {stat.label}
              </span>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-80`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] text-terminal font-mono font-bold">+12%</span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>
  );
}
