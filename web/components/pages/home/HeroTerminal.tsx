import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { TypingText } from "./TypingText";

export function HeroTerminal() {
  return (
    <div className="h-full min-w-0 overflow-hidden rounded-xl border border-terminal/20 bg-surface-900">
      <div className="flex min-w-0 items-center gap-2 border-b border-terminal/10 bg-surface-800 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 min-w-0 truncate font-mono text-xs text-text-muted">
          ~/dev-meet/onboarding
        </span>
      </div>

      <div className="p-6 sm:p-8 font-mono">
        <p className="text-text-muted text-sm mb-3">
          <span className="text-terminal">$</span> open mission.md
        </p>
        <h1 className="mb-4 break-words text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          <span className="text-terminal">&gt;</span>{" "}
          <TypingText text="Build better software with better people." />
        </h1>
        <p className="mb-6 max-w-2xl break-words text-base leading-relaxed text-text-secondary sm:text-lg">
          Dev-Meet is a focused community for software developers and engineers to
          exchange practical knowledge, form meaningful technical connections, and
          ship with more confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold"
            >
              Start Your Profile
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link
            href="/posts"
            className="inline-flex min-w-0 items-center gap-2 break-words font-mono text-text-secondary transition-colors hover:text-terminal"
          >
            <span className="text-terminal/60">&gt;</span> Browse engineering posts
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-terminal/10 flex flex-wrap items-center gap-3 text-sm text-text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            live community
          </span>
          <span className="text-terminal/30">|</span>
          <span>developer-first</span>
          <span className="text-terminal/30">|</span>
          <span>signal over noise</span>
        </div>
      </div>
    </div>
  );
}
