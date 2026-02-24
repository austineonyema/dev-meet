import type { ConnectionRecord } from "@/lib/connections";

type ConnectionCardProps = {
  connection: ConnectionRecord;
};

const statusClassMap: Record<ConnectionRecord["status"], string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-slate-500",
};

export function ConnectionCard({ connection }: ConnectionCardProps) {
  return (
    <article className="terminal-box rounded-xl border-terminal/10 p-4">
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-terminal/20 bg-surface-800">
          <img
            src={connection.avatar}
            alt={connection.name}
            className="h-full w-full object-cover"
          />
          <span
            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-surface-950 ${statusClassMap[connection.status]}`}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-bold text-text-primary">{connection.name}</p>
          <p className="truncate font-mono text-xs text-terminal">
            @{connection.username}
          </p>
          <p className="text-xs text-text-secondary">{connection.role}</p>
          <p className="text-[11px] text-text-muted">{connection.location}</p>
        </div>
      </div>
    </article>
  );
}
