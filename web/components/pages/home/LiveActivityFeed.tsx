import { recentActivity } from "./data";

export function LiveActivityFeed() {
  return (
    <div className="terminal-box min-w-0 overflow-hidden rounded-xl p-4 font-mono text-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-text-primary">Live Activity</h3>
        <span className="text-text-muted text-xs">updated now</span>
      </div>
      <div className="space-y-2.5">
        {recentActivity.map((activity) => (
          <div
            key={activity.hash}
            className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 overflow-hidden border-b border-terminal/5 py-2 last:border-0"
          >
            <span className="text-yellow-500/80 shrink-0 text-[10px] sm:text-xs opacity-60 hidden sm:inline">
              {activity.hash}
            </span>
            <span className="text-terminal shrink-0 font-semibold text-xs sm:text-sm">
              @{activity.user}
            </span>
            <span className="text-text-secondary order-3 basis-full min-w-0 break-words text-xs sm:order-none sm:basis-auto sm:flex-1 sm:truncate sm:text-sm">
              {activity.action}
            </span>
            <span className="text-text-muted order-2 ml-auto shrink-0 text-[10px] sm:order-none sm:text-xs">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
