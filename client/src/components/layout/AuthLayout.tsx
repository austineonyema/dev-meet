import { Link, Outlet } from "react-router-dom";
import { Terminal } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terminal/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="p-2 rounded-lg bg-surface-800 border border-terminal/20 group-hover:border-terminal/50 transition-colors">
              <Terminal className="w-6 h-6 text-terminal" />
            </div>
            <span className="font-mono text-xl text-text-primary">
              dev<span className="text-terminal">-meet</span>
            </span>
          </Link>
        </div>

        <div className="terminal-box rounded-xl overflow-hidden backdrop-blur-sm bg-surface-900/90">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-800/50 border-b border-terminal/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-text-muted ml-2">
              user_auth.exe
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <Outlet />
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm font-mono text-text-muted hover:text-terminal transition-colors"
          >
            <span className="text-terminal/60">&lt;</span> cd ..
          </Link>
        </div>
      </div>
    </div>
  );
}
