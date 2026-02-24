"use client";

import { useMemo, useState } from "react";
import { mockPosts } from "@/lib/posts";
import { PostsFilterBar } from "./PostsFilterBar";
import { PostsFooter } from "./PostsFooter";
import { PostsGrid } from "./PostsGrid";
import { PostsHeader } from "./PostsHeader";

const categories = ["ALL", "KERNEL", "SUDO", "GIT", "FRONTEND", "NETWORKING"];

export function PostsPageShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "ALL" ||
        post.category.toUpperCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PostsHeader />
      <PostsFilterBar
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />
      <PostsGrid
        isLoading={false}
        posts={filteredPosts}
        onResetFilters={() => {
          setSearchQuery("");
          setSelectedCategory("ALL");
        }}
      />
      <PostsFooter />
    </div>
  );
}
