export function PostSkeleton() {
  return (
    <div className="terminal-box rounded-xl border-terminal/10 p-6 flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="h-4 w-20 animate-pulse bg-surface-700/50 rounded" />
        <div className="h-4 w-24 animate-pulse bg-surface-700/50 rounded" />
      </div>
      <div className="h-8 w-3/4 animate-pulse bg-surface-700/50 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse bg-surface-700/50 rounded" />
        <div className="h-4 w-5/6 animate-pulse bg-surface-700/50 rounded" />
      </div>
      <div className="pt-4 border-t border-terminal/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded animate-pulse bg-surface-700/50" />
          <div className="h-3 w-16 animate-pulse bg-surface-700/50 rounded" />
        </div>
        <div className="h-3 w-12 animate-pulse bg-surface-700/50 rounded" />
      </div>
    </div>
  );
}
