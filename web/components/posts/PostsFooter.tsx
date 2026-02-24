export function PostsFooter() {
  return (
    <footer className="pt-10 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="h-px w-20 bg-terminal/10" />
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">
          End of buffer
        </p>
        <div className="h-px w-20 bg-terminal/10" />
      </div>
    </footer>
  );
}
