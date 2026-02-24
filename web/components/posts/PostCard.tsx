import Link from "next/link";
import { ArrowRight, Clock, Hash } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import type { Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  index: number;
};

export function PostCard({ post, index }: PostCardProps) {
  return (
    <ScrollReveal delay={index * 100} distance={20}>
      <Link href={`/posts/${post.id}`} className="group block h-full">
        <article className="terminal-box h-full rounded-xl border-terminal/10 p-6 flex flex-col hover:border-terminal/30 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-terminal px-2 py-0.5 rounded border border-terminal/20 bg-terminal/5 uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-[10px] font-mono text-text-muted italic">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-terminal transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-terminal/5">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-[10px] font-mono text-text-muted group-hover:text-text-primary transition-colors"
                >
                  <Hash className="w-2.5 h-2.5 text-terminal/40" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="h-5 w-5 shrink-0 overflow-hidden rounded border border-terminal/10 bg-surface-800 sm:h-6 sm:w-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-text-muted truncate">
                  @{post.author.username}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono text-text-muted shrink-0">
                <span className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {post.readingTime}
                </span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform text-terminal" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}
