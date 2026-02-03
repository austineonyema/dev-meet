import {
  Terminal,
  GitBranch,
  MessageSquareCode,
  ArrowUpRight,
  Clock,
  Plus,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Button, ScrollReveal } from "../../../components/ui";
import { activityFeed } from "../../../data/feed";
import { mockUser } from "../../../data/user";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["me"]);
  console.log(user);
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Info */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back,{" "}
            <span className="text-terminal">{mockUser.name.split(" ")[0]}</span>
          </h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-terminal/60">$</span> last login: Wed Jan 28
            2026 23:24:51 on ttys001
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            size="sm"
            className="bg-surface-800 hover:bg-surface-700 text-text-primary border-terminal/10 border font-mono text-xs"
          >
            <Clock className="w-3.5 h-3.5 mr-2" /> History
          </Button>
          <Button
            size="sm"
            className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-bold text-xs ring-offset-surface-950 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> $ post --new
          </Button>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Connections",
            value: mockUser.stats.connections,
            icon: GitBranch,
            color: "text-blue-500",
          },
          {
            label: "Articles",
            value: mockUser.stats.posts,
            icon: MessageSquareCode,
            color: "text-purple-500",
          },
          {
            label: "Contributions",
            value: mockUser.stats.contributions,
            icon: Terminal,
            color: "text-terminal",
          },
          {
            label: "Global Rank",
            value: "#1,204",
            icon: Sparkles,
            color: "text-yellow-500",
          },
        ].map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 100} className="h-full">
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
                <span className="text-[10px] text-terminal font-mono font-bold">
                  +12%
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2 font-mono">
              <div className="w-1.5 h-4 bg-terminal" />
              Main Feed
            </h2>
            <select className="bg-surface-900 border border-terminal/10 rounded-md text-[10px] font-mono px-2 py-1 text-text-muted focus:outline-none focus:border-terminal/40">
              <option>ALL_TRAFFIC</option>
              <option>POSTS_ONLY</option>
              <option>CONNECTIONS</option>
            </select>
          </div>

          <div className="space-y-4">
            {activityFeed.map((activity, i) => (
              <ScrollReveal
                key={activity.id}
                delay={i * 150}
                direction="up"
                distance={20}
              >
                <div className="terminal-box rounded-xl border-terminal/10 overflow-hidden hover:border-terminal/20 transition-colors">
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-surface-800 border border-terminal/20 overflow-hidden shrink-0 flex items-center justify-center text-terminal font-mono text-sm font-bold">
                          {activity.user.avatar ? (
                            <img
                              src={activity.user.avatar}
                              alt={activity.user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            activity.user.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2 truncate">
                            <span className="truncate">
                              {activity.user.name}
                            </span>
                            {activity.user.username === mockUser.username && (
                              <span className="text-[9px] sm:text-[10px] bg-terminal/10 text-terminal px-1 sm:px-1.5 py-0.5 rounded border border-terminal/20 shrink-0">
                                ME
                              </span>
                            )}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-text-muted font-mono truncate">
                            @{activity.user.username} • {activity.timestamp}
                          </p>
                        </div>
                      </div>
                      <button className="text-text-muted hover:text-terminal transition-colors shrink-0 p-1">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="pl-0 sm:pl-13">
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {activity.content ||
                          (activity.type === "connection"
                            ? `Connected with @${activity.target?.username}`
                            : "")}
                      </p>

                      {activity.type === "post" ||
                      activity.type === "project" ? (
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-terminal/5">
                          <button className="flex items-center gap-2 group">
                            <Heart className="w-4 h-4 text-text-muted group-hover:text-red-500 transition-colors" />
                            <span className="text-xs font-mono text-text-muted group-hover:text-text-primary">
                              {activity.likes}
                            </span>
                          </button>
                          <button className="flex items-center gap-2 group">
                            <MessageCircle className="w-4 h-4 text-text-muted group-hover:text-terminal transition-colors" />
                            <span className="text-xs font-mono text-text-muted group-hover:text-text-primary">
                              {activity.comments}
                            </span>
                          </button>
                          <button className="flex items-center gap-2 group ml-auto">
                            <Share2 className="w-4 h-4 text-text-muted group-hover:text-terminal transition-colors" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <Button className="w-full bg-surface-900 hover:bg-surface-800 text-text-muted font-mono text-xs border border-terminal/10 py-3 mt-4">
            FETCH_MORE --limit 20
          </Button>
        </div>

        {/* Sidebar Widgets */}
        <aside className="space-y-6">
          {/* Active Devs Widget */}
          <div className="terminal-box rounded-xl border-terminal/10 p-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4 border-b border-terminal/5 pb-2">
              Online_Nodes
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded border border-terminal/20 bg-surface-800 flex items-center justify-center font-mono text-[10px] text-terminal">
                      DEV_{i}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-surface-900 rounded-full" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate">Node_{421 + i}</p>
                    <p className="text-[10px] text-text-muted font-mono truncate">
                      active 5m ago
                    </p>
                  </div>
                  <button className="text-[10px] px-2 py-1 bg-surface-800 rounded border border-terminal/10 hover:border-terminal/30 transition-all font-mono text-terminal">
                    MSG
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="terminal-box rounded-xl border-terminal/10 p-5 bg-surface-900/50">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4">
              Quick_Commands
            </h3>
            <div className="space-y-2">
              {[
                { cmd: "post --new", key: "⌘ N" },
                { cmd: "search", key: "⌘ K" },
                { cmd: "git sync", key: "⌘ S" },
                { cmd: "help", key: "?" },
              ].map((c) => (
                <div
                  key={c.cmd}
                  className="flex items-center justify-between p-2 rounded hover:bg-surface-800 transition-colors border border-transparent hover:border-terminal/5 text-[11px] font-mono group cursor-pointer"
                >
                  <span className="text-text-secondary group-hover:text-terminal">
                    {c.cmd}
                  </span>
                  <span className="px-1.5 py-0.5 bg-surface-700 rounded text-text-muted text-[10px]">
                    {c.key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
