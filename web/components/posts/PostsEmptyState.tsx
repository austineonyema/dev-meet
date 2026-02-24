import { Filter } from "lucide-react";

type PostsEmptyStateProps = {
  onReset: () => void;
};

export function PostsEmptyState({ onReset }: PostsEmptyStateProps) {
  return (
    <div className="col-span-full py-20 text-center">
      <div className="inline-block p-6 rounded-2xl bg-surface-900 border border-terminal/10 border-dashed">
        <Filter className="w-12 h-12 text-terminal/20 mx-auto mb-4" />
        <p className="font-mono text-text-muted">No patterns matched your search.</p>
        <button
          onClick={onReset}
          className="mt-4 text-xs font-mono text-terminal hover:underline"
        >
          $ reset --filters
        </button>
      </div>
    </div>
  );
}
