import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import { PostsEmptyState } from "./PostsEmptyState";

type PostsGridProps = {
  isLoading: boolean;
  posts: Post[];
  onResetFilters: () => void;
};

export function PostsGrid({ isLoading, posts, onResetFilters }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => <PostSkeleton key={index} />)
        : null}

      {!isLoading && posts.length > 0
        ? posts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)
        : null}

      {!isLoading && posts.length === 0 ? (
        <PostsEmptyState onReset={onResetFilters} />
      ) : null}
    </div>
  );
}
