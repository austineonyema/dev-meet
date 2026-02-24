import { History, Key, LogOut, Smartphone } from "lucide-react";
import { Button } from "@/components/ui";
import { securitySessions } from "@/lib/settings";

export function SecuritySettingsPanel() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-terminal uppercase">
          <Key className="h-4 w-4" /> Auth_Credentials
        </h3>
        <div className="space-y-6 rounded-xl border border-terminal/10 bg-surface-900 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-sm font-bold text-text-primary">
                Change_Password
              </p>
              <p className="mt-1 font-mono text-[10px] text-text-muted">
                Update your system access credentials
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="border-terminal/20 font-mono text-[10px] hover:border-terminal/40"
            >
              $ update-pass
            </Button>
          </div>

          <div className="h-px bg-terminal/5" />

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-text-primary">
                  Two_Factor_Auth
                </p>
                <span className="rounded border border-error/20 bg-error/10 px-1.5 py-0.5 text-[9px] font-bold text-error">
                  DISABLED
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-text-muted">
                Add an extra layer of security to your node
              </p>
            </div>
            <Button
              size="sm"
              className="bg-terminal font-mono text-[10px] font-bold text-surface-950"
            >
              $ enable-2fa
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-terminal/5 pt-8">
        <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-terminal uppercase">
          <History className="h-4 w-4" /> Active_Sessions
        </h3>
        <div className="space-y-3">
          {securitySessions.map((session) => (
            <div
              key={session.id}
              className="group flex items-center justify-between rounded-xl border border-terminal/5 bg-surface-900/50 p-4 transition-all hover:border-terminal/10"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-surface-800 p-2 text-text-muted transition-colors group-hover:text-terminal">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <p className="flex items-center gap-2 font-mono text-xs font-bold text-text-primary">
                    {session.device}
                    {session.isCurrent ? (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terminal" />
                    ) : null}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                    {session.location}
                  </p>
                </div>
              </div>
              {session.isCurrent ? (
                <span className="font-mono text-[9px] tracking-tighter text-terminal/50 uppercase">
                  Current_Node
                </span>
              ) : (
                <button className="font-mono text-[9px] tracking-tighter text-error uppercase hover:underline">
                  Terminate
                </button>
              )}
            </div>
          ))}
          <button className="group flex w-full items-center justify-center gap-2 py-4 font-mono text-[10px] text-text-muted transition-colors hover:text-error">
            <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            $ logout --all-other-sessions
          </button>
        </div>
      </section>
    </div>
  );
}
