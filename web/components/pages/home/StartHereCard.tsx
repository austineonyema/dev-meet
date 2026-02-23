import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

export function StartHereCard() {
  return (
    <div className="terminal-box rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-surface-800 border-b border-terminal/10">
        <Sparkles className="w-4 h-4 text-terminal" />
        <span className="font-mono text-sm text-text-primary">START_HERE.md</span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          Start building with the right people
        </h3>
        <p className="text-text-secondary leading-relaxed mb-5">
          Create your profile, join engineering discussions, and build
          relationships that improve how you design and ship software.
        </p>

        <div className="space-y-2.5 mb-5 font-mono text-sm">
          <p className="text-text-primary">
            <span className="text-terminal">1.</span> Set up your engineering profile
          </p>
          <p className="text-text-primary">
            <span className="text-terminal">2.</span> Follow tracks aligned with your
            stack
          </p>
          <p className="text-text-primary">
            <span className="text-terminal">3.</span> Contribute and connect with peers
          </p>
        </div>

        <Link href="/register">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold"
          >
            Create Your Profile
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
