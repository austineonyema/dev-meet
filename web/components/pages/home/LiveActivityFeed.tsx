import { recentActivity } from "./data";

export function LiveActivityFeed() {
  return (
    <div className="terminal-box rounded-xl p-4 sm:p-6 font-mono text-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary">Live Activity</h3>
        <span className="text-text-muted text-xs">updated now</span>
      </div>
      <div className="space-y-2.5">
        {recentActivity.map((activity) => (
          <div
            key={activity.hash}
            className="flex items-center gap-2.5 py-2 border-b border-terminal/5 last:border-0 min-w-0 overflow-hidden"
          >
            <span className="text-yellow-500/80 shrink-0 text-[10px] sm:text-xs opacity-60 hidden sm:inline">
              {activity.hash}
            </span>
            <span className="text-terminal shrink-0 font-semibold text-xs sm:text-sm">
              @{activity.user}
            </span>
            <span className="text-text-secondary flex-1 min-w-0 truncate text-xs sm:text-sm">
              {activity.action}
            </span>
            <span className="text-text-muted shrink-0 text-[10px] sm:text-xs ml-auto">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
