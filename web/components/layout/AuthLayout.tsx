import Link from "next/link";
import { Terminal } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-terminal/5 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-4">
          <Link href="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="p-1.5 rounded-lg bg-surface-800 border border-terminal/20 group-hover:border-terminal/50 transition-colors">
              <Terminal className="w-5 h-5 text-terminal" />
            </div>
            <span className="font-mono text-lg text-text-primary">
              dev<span className="text-terminal">-meet</span>
            </span>
          </Link>
        </div>

        <div className="terminal-box rounded-xl overflow-hidden backdrop-blur-sm bg-surface-900/90">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-surface-800/50 border-b border-terminal/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-text-muted ml-2">
              user_auth.exe
            </span>
          </div>

          <div className="p-5 sm:p-6">{children}</div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm font-mono text-text-muted hover:text-terminal transition-colors"
          >
            <span className="text-terminal/60">&lt;</span> cd ..
          </Link>
        </div>
      </div>
    </div>
  );
}
