import { Key, History, Smartphone, LogOut } from "lucide-react";
import { Button } from "../../../components/ui";

export function SecuritySettings() {
  const activeSessions = [
    {
      id: 1,
      device: "macOS - Chrome",
      location: "Lagos, Nigeria",
      active: true,
    },
    {
      id: 2,
      device: "iPhone 15 Pro",
      location: "Lagos, Nigeria",
      active: false,
    },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal mb-6 flex items-center gap-2">
          <Key className="w-4 h-4" /> Auth_Credentials
        </h3>
        <div className="bg-surface-900 p-6 rounded-xl border border-terminal/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-mono font-bold text-text-primary">
                Change_Password
              </p>
              <p className="text-[10px] text-text-muted font-mono mt-1">
                Update your system access credentials
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="font-mono text-[10px] border-terminal/20 hover:border-terminal/40"
            >
              $ update-pass
            </Button>
          </div>

          <div className="h-px bg-terminal/5" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono font-bold text-text-primary">
                  Two_Factor_Auth
                </p>
                <span className="text-[9px] bg-error/10 text-error border border-error/20 px-1.5 py-0.5 rounded font-bold">
                  DISABLED
                </span>
              </div>
              <p className="text-[10px] text-text-muted font-mono mt-1">
                Add an extra layer of security to your node
              </p>
            </div>
            <Button
              size="sm"
              className="font-mono text-[10px] bg-terminal text-surface-950 font-bold"
            >
              $ enable-2fa
            </Button>
          </div>
        </div>
      </section>

      <section className="pt-8 border-t border-terminal/5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal mb-6 flex items-center gap-2">
          <History className="w-4 h-4" /> Active_Sessions
        </h3>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-surface-900/50 rounded-xl border border-terminal/5 group hover:border-terminal/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-surface-800 rounded-lg text-text-muted group-hover:text-terminal transition-colors">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-text-primary flex items-center gap-2">
                    {session.device}
                    {session.active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal animate-pulse" />
                    )}
                  </p>
                  <p className="text-[10px] text-text-muted font-mono mt-0.5">
                    {session.location}
                  </p>
                </div>
              </div>
              {session.active ? (
                <span className="text-[9px] font-mono text-terminal opacity-50 uppercase tracking-tighter">
                  Current_Node
                </span>
              ) : (
                <button className="text-[9px] font-mono text-error hover:underline uppercase tracking-tighter">
                  Terminate
                </button>
              )}
            </div>
          ))}
          <button className="w-full py-4 text-[10px] font-mono text-text-muted hover:text-error transition-colors flex items-center justify-center gap-2 group">
            <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            $ logout --all-other-sessions
          </button>
        </div>
      </section>
    </div>
  );
}
