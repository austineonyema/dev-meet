import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Terminal,
  Hash,
  Clock,
  Plus,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, ScrollReveal } from "../../../components/ui";

import { usePosts } from "../hooks/usePosts";
import { PostSkeleton } from "../../../components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { usePosts as usePost } from "../../../hooks/usePosts";
export default function PostsPage() {
  const { data: posts, isLoading } = usePosts();
  const queryClient = useQueryClient();
  const { data: post = [], isLoad, isError, error } = usePost();
  console.log(post, typeof post.tag);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Senior Optimization: Pre-fetch PostEditor chunks when entering the Hub
  useEffect(() => {
    // These match the lazy imports in PostEditor.tsx
    const prefetch = () => {
      import("../components/PostEditorInput");
      import("../components/PostPreview");
    };
    // Delay slightly to prioritize Hub rendering
    const timer = setTimeout(prefetch, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["ALL", "KERNEL", "SUDO", "GIT", "FRONTEND", "NETWORKING"];

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "ALL" ||
        post.category.toUpperCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* CLI Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-terminal/10 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Terminal className="text-terminal w-8 h-8" />
            Knowledge_Hub
          </h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-terminal/60">$</span> ls --recursive
            /knowledge/posts
          </p>
        </div>
        <Link to="/posts/new">
          <Button className="bg-terminal hover:bg-terminal-dim text-surface-950 font-bold font-mono shadow-[0_0_20px_rgba(0,255,65,0.15)] active:scale-95 transition-all">
            <Plus className="w-4 h-4 mr-2" /> $ new --article
          </Button>
        </Link>
      </section>

      {/* Control Bar: Grep & Filter */}
      <section className="sticky top-0 z-20 py-4 bg-surface-950/80 backdrop-blur-md border-b border-terminal/5">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Grep Bar */}
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-terminal transition-colors" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[10px] font-mono text-terminal/40 pointer-events-none">
              grep
            </span>
            <input
              type="text"
              placeholder="Searching patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-900 border border-terminal/10 rounded-lg pl-20 pr-4 py-3 text-sm font-mono focus:outline-none focus:border-terminal/40 focus:ring-1 focus:ring-terminal/20 transition-all placeholder:text-text-muted/30"
            />
          </div>

          {/* Category Switches */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-mono text-[10px] whitespace-nowrap border transition-all ${
                  selectedCategory === cat
                    ? "bg-terminal/10 border-terminal/40 text-terminal shadow-[0_0_10px_rgba(0,255,65,0.1)]"
                    : "bg-surface-900 border-terminal/5 text-text-muted hover:border-terminal/20"
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)
        ) : post.length > 0 ? (
          post.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 100} distance={20}>
              <Link to={`/posts/${post.id}`} className="group block h-full">
                <article className="terminal-box h-full rounded-xl border-terminal/10 p-6 flex flex-col hover:border-terminal/30 transition-all hover:-translate-y-1">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-terminal px-2 py-0.5 rounded border border-terminal/20 bg-terminal/5 uppercase tracking-widest">
                      {/* {post.category} */}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted italic">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-terminal transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {/* {post.excerpt} */}
                  </p>

                  <div className="mt-auto pt-4 border-t border-terminal/5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.from(post.tags).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-[10px] font-mono text-text-muted group-hover:text-text-primary transition-colors"
                        >
                          <Hash className="w-2.5 h-2.5 text-terminal/40" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-terminal/10 overflow-hidden shrink-0">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-text-muted truncate">
                          @{post.author.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono text-text-muted shrink-0">
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{" "}
                          {post.readingTime}
                        </span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform text-terminal" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-block p-6 rounded-2xl bg-surface-900 border border-terminal/10 border-dashed">
              <Filter className="w-12 h-12 text-terminal/20 mx-auto mb-4" />
              <p className="font-mono text-text-muted">
                No patterns matched your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
                className="mt-4 text-xs font-mono text-terminal hover:underline"
              >
                $ reset --filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination / Load More Footer */}
      <footer className="pt-10 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-px w-20 bg-terminal/10" />
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">
            End of buffer
          </p>
          <div className="h-px w-20 bg-terminal/10" />
        </div>
      </footer>
    </div>
  );
}
