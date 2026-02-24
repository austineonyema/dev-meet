export function DashboardSidebar() {
  return (
    <aside className="space-y-6">
      <div className="terminal-box rounded-xl border-terminal/10 p-5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4 border-b border-terminal/5 pb-2">
          Online_Nodes
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded border border-terminal/20 bg-surface-800 flex items-center justify-center font-mono text-[10px] text-terminal">
                  DEV_{index}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-surface-900 rounded-full" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">Node_{421 + index}</p>
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
          ].map((command) => (
            <div
              key={command.cmd}
              className="flex items-center justify-between p-2 rounded hover:bg-surface-800 transition-colors border border-transparent hover:border-terminal/5 text-[11px] font-mono group cursor-pointer"
            >
              <span className="text-text-secondary group-hover:text-terminal">
                {command.cmd}
              </span>
              <span className="px-1.5 py-0.5 bg-surface-700 rounded text-text-muted text-[10px]">
                {command.key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
