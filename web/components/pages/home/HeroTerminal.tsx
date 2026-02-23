import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { TypingText } from "./TypingText";

export function HeroTerminal() {
  return (
    <div className="border border-terminal/20 bg-surface-900 rounded-xl overflow-hidden h-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-800 border-b border-terminal/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-xs text-text-muted ml-2">
          ~/dev-meet/onboarding
        </span>
      </div>

      <div className="p-6 sm:p-8 font-mono">
        <p className="text-text-muted text-sm mb-3">
          <span className="text-terminal">$</span> open mission.md
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
          <span className="text-terminal">&gt;</span>{" "}
          <TypingText text="Build better software with better people." />
        </h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
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
            className="font-mono text-text-secondary hover:text-terminal transition-colors inline-flex items-center gap-2"
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
