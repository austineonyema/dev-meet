"use client";

import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import { getCombinedPosts, getPostsUpdateEventName } from "@/lib/api/posts";
import { PostsFilterBar } from "./PostsFilterBar";
import { PostsFooter } from "./PostsFooter";
import { PostsGrid } from "./PostsGrid";
import { PostsHeader } from "./PostsHeader";

const categories = ["ALL", "KERNEL", "SUDO", "GIT", "FRONTEND", "NETWORKING"];

export function PostsPageShell() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    const hydratePosts = () => {
      setPosts(getCombinedPosts());
      setIsLoading(false);
    };

    hydratePosts();
    const eventName = getPostsUpdateEventName();
    window.addEventListener(eventName, hydratePosts);
    window.addEventListener("storage", hydratePosts);

    return () => {
      window.removeEventListener(eventName, hydratePosts);
      window.removeEventListener("storage", hydratePosts);
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
  }, [posts, searchQuery, selectedCategory]);

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
        isLoading={isLoading}
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
