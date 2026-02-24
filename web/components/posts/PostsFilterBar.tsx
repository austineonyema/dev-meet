import { Search } from "lucide-react";

type PostsFilterBarProps = {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function PostsFilterBar({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: PostsFilterBarProps) {
  return (
    <section className="sticky top-14 z-20 py-4 bg-surface-950/80 backdrop-blur-md border-b border-terminal/5">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-terminal transition-colors" />
          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[10px] font-mono text-terminal/40 pointer-events-none">
            grep
          </span>
          <input
            type="text"
            placeholder="Searching patterns..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-surface-900 border border-terminal/10 rounded-lg pl-20 pr-4 py-3 text-sm font-mono focus:outline-none focus:border-terminal/40 focus:ring-1 focus:ring-terminal/20 transition-all placeholder:text-text-muted/30"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-md font-mono text-[10px] whitespace-nowrap border transition-all ${
                selectedCategory === category
                  ? "bg-terminal/10 border-terminal/40 text-terminal shadow-[0_0_10px_rgba(0,255,65,0.1)]"
                  : "bg-surface-900 border-terminal/5 text-text-muted hover:border-terminal/20"
              }`}
            >
              [{category}]
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
