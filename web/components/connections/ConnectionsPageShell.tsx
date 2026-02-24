import Link from "next/link";
import { ArrowRight, Plus, Terminal } from "lucide-react";
import { Button } from "@/components/ui";
import { mockConnections } from "@/lib/connections";
import { ConnectionCard } from "./ConnectionCard";

export function ConnectionsPageShell() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
      <section className="flex flex-col justify-between gap-4 border-b border-terminal/10 pb-8 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Terminal className="h-8 w-8 text-terminal" />
            Connections
          </h1>
          <p className="font-mono text-sm text-text-secondary">
            <span className="text-terminal/60">$</span> ls --online /network/devs
          </p>
        </div>
        <Link href="/posts/new">
          <Button className="bg-terminal font-mono font-bold text-surface-950 transition-all active:scale-95 hover:bg-terminal-dim">
            <Plus className="mr-2 h-4 w-4" /> Start discussion
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockConnections.map((connection) => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </section>

      <footer className="flex items-center justify-end">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-terminal"
        >
          Browse engineering posts <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </footer>
    </div>
  );
}
