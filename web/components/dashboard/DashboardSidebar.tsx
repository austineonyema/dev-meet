import Link from "next/link";

const onlineNodes = [
  {
    id: "node-1",
    label: "Alex Rivera",
    username: "arivera_dev",
    avatar: "/assets/avatars/user-1.png",
  },
  {
    id: "node-2",
    label: "Sarah Chen",
    username: "schen_dev",
    avatar: "/assets/avatars/user-2.png",
  },
  {
    id: "node-3",
    label: "Marcus Thorne",
    username: "mthorne",
    avatar: "/assets/avatars/user-3.png",
  },
  {
    id: "node-4",
    label: "Platform Team",
    username: "platform_team",
    avatar: "/assets/avatars/user-1.png",
  },
];

const quickCommands = [
  { cmd: "post --new", key: "⌘ N", path: "/posts/new" },
  { cmd: "search", key: "⌘ K", path: "/posts" },
  { cmd: "profile", key: "G U", path: "/profile" },
  { cmd: "settings", key: ",", path: "/settings" },
];

export function DashboardSidebar() {
  return (
    <aside className="space-y-6">
      <div className="terminal-box rounded-xl border-terminal/10 p-5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4 border-b border-terminal/5 pb-2">
          Online_Nodes
        </h3>
        <div className="space-y-4">
          {onlineNodes.map((node) => (
            <div key={node.id} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 overflow-hidden rounded border border-terminal/20 bg-surface-800">
                  <img
                    src={node.avatar}
                    alt={node.label}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-surface-900 rounded-full" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">{node.label}</p>
                <p className="text-[10px] text-text-muted font-mono truncate">
                  @{node.username} • active now
                </p>
              </div>
              <Link
                href="/connections"
                className="rounded border border-terminal/10 bg-surface-800 px-2 py-1 font-mono text-[10px] text-terminal transition-all hover:border-terminal/30"
              >
                MSG
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-box rounded-xl border-terminal/10 p-5 bg-surface-900/50">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4">
          Quick_Commands
        </h3>
        <div className="space-y-2">
          {quickCommands.map((command) => (
            <Link
              key={command.cmd}
              href={command.path}
              className="flex items-center justify-between p-2 rounded hover:bg-surface-800 transition-colors border border-transparent hover:border-terminal/5 text-[11px] font-mono group cursor-pointer"
            >
              <span className="text-text-secondary group-hover:text-terminal">
                {command.cmd}
              </span>
              <span className="px-1.5 py-0.5 bg-surface-700 rounded text-text-muted text-[10px]">
                {command.key}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
