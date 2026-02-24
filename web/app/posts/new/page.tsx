import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NewPostPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="terminal-box rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-terminal font-mono text-sm mb-5">
          <Terminal className="w-4 h-4" />
          <span>$ vi knowledge_post.md</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Post Editor Port In Progress
        </h1>
        <p className="text-text-secondary leading-relaxed mb-6">
          The full editor is being migrated from `client` to `web` in the next
          incremental step while keeping component boundaries intact.
        </p>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-terminal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to knowledge feed
        </Link>
      </div>
    </main>
  );
}
