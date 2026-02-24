import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button, ScrollReveal } from "@/components/ui";
import { activityFeed } from "@/lib/dashboard";

type DashboardFeedProps = {
  currentUsername: string;
};

export function DashboardFeed({ currentUsername }: DashboardFeedProps) {
  return (
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
        {activityFeed.map((activity, index) => (
          <ScrollReveal
            key={activity.id}
            delay={index * 150}
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
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        activity.user.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2 truncate">
                        <span className="truncate">{activity.user.name}</span>
                        {activity.user.username === currentUsername ? (
                          <span className="text-[9px] sm:text-[10px] bg-terminal/10 text-terminal px-1 sm:px-1.5 py-0.5 rounded border border-terminal/20 shrink-0">
                            ME
                          </span>
                        ) : null}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-text-muted font-mono truncate">
                        @{activity.user.username} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/posts"
                    className="text-text-muted hover:text-terminal transition-colors shrink-0 p-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </div>

                <div className="pl-0 sm:pl-13">
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {activity.content ||
                      (activity.type === "connection"
                        ? `Connected with @${activity.target?.username}`
                        : "")}
                  </p>

                  {activity.type === "post" || activity.type === "project" ? (
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-terminal/5">
                      <button className="flex items-center gap-2 group">
                        <Heart className="w-4 h-4 text-text-muted group-hover:text-red-500 transition-colors" />
                        <span className="text-xs font-mono text-text-muted group-hover:text-text-primary">
                          {activity.likes ?? 0}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 group">
                        <MessageCircle className="w-4 h-4 text-text-muted group-hover:text-terminal transition-colors" />
                        <span className="text-xs font-mono text-text-muted group-hover:text-text-primary">
                          {activity.comments ?? 0}
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

      <Link href="/posts" className="block">
        <Button className="mt-4 w-full border border-terminal/10 bg-surface-900 py-3 font-mono text-xs text-text-muted hover:bg-surface-800">
          FETCH_MORE --limit 20
        </Button>
      </Link>
    </div>
  );
}
