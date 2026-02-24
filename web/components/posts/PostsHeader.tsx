import Link from "next/link";
import { Plus, Terminal } from "lucide-react";
import { Button } from "@/components/ui";

export function PostsHeader() {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-terminal/10 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Terminal className="text-terminal w-8 h-8" />
          Knowledge_Hub
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          <span className="text-terminal/60">$</span> ls --recursive /knowledge/posts
        </p>
      </div>
      <Link href="/posts/new">
        <Button className="bg-terminal hover:bg-terminal-dim text-surface-950 font-bold font-mono shadow-[0_0_20px_rgba(0,255,65,0.15)] active:scale-95 transition-all">
          <Plus className="w-4 h-4 mr-2" /> $ new --article
        </Button>
      </Link>
    </section>
  );
}
