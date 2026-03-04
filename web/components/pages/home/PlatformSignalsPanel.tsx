import { Code2, GitBranch, Rocket, ShieldCheck } from "lucide-react";
import { platformSignals } from "./data";

export function PlatformSignalsPanel() {
  return (
    <div className="terminal-box h-full min-w-0 overflow-hidden rounded-xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-4 h-4 text-terminal" />
        <h2 className="font-mono text-sm text-text-primary">Platform Signals</h2>
      </div>

      <div className="space-y-3 mb-5">
        {platformSignals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-lg border border-terminal/10 bg-surface-800/70 px-3 py-2.5"
          >
            <p className="break-words font-mono text-xs text-text-muted">{signal.label}</p>
            <p className="text-lg font-semibold text-text-primary">{signal.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-terminal/10 bg-surface-800/50 p-3.5">
        <p className="text-xs font-mono text-terminal mb-2">Why teams stay</p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 mt-0.5 text-terminal shrink-0" />
            Practical, implementation-level discussions.
          </li>
          <li className="flex items-start gap-2">
            <Code2 className="w-4 h-4 mt-0.5 text-terminal shrink-0" />
            Reusable patterns from real engineering workflows.
          </li>
          <li className="flex items-start gap-2">
            <GitBranch className="w-4 h-4 mt-0.5 text-terminal shrink-0" />
            Meaningful connections across frontend, backend, and platform.
          </li>
        </ul>
      </div>
    </div>
  );
}
