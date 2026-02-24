"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  Copy,
  Hash,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Button, ScrollReveal } from "@/components/ui";
import type { Post } from "@/lib/posts";

type PostDetailShellProps = {
  post: Post;
};

export function PostDetailShell({ post }: PostDetailShellProps) {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="fixed top-14 left-0 w-full h-1 bg-surface-900 z-50">
        <div
          className="h-full bg-terminal transition-all duration-150 shadow-[0_0_10px_#00ff41]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <nav className="mb-8 flex items-center justify-between">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-text-muted hover:text-terminal transition-colors font-mono text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ./back --to feed
        </Link>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 border border-terminal/10 text-text-muted hover:text-terminal"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="p-2 border border-terminal/10 text-text-muted hover:text-terminal"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      <header className="mb-12">
        <ScrollReveal direction="up" distance={20} initiallyVisible>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono text-terminal px-3 py-1 rounded bg-terminal/10 border border-terminal/20 uppercase tracking-[0.2em]">
              {post.category}
            </span>
            <div className="h-px flex-1 bg-terminal/10" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
              <Clock className="w-3 h-3" /> {post.readingTime} READ
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-900 border border-terminal/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg border border-terminal/20 p-1 bg-surface-800 text-text-muted flex items-center justify-center text-xs font-mono">
                {post.author.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">{post.author.name}</p>
                <p className="text-[10px] font-mono text-text-muted">
                  @{post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex flex-col items-center gap-1 group">
                <Heart className="w-5 h-5 text-text-muted group-hover:text-red-500 transition-colors" />
                <span className="text-[9px] font-mono text-text-muted">{post.likes}</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <MessageCircle className="w-5 h-5 text-text-muted group-hover:text-terminal transition-colors" />
                <span className="text-[9px] font-mono text-text-muted">{post.comments}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </header>

      <section className="max-w-none mb-20 relative">
        <ScrollReveal delay={200} distance={40} initiallyVisible>
          <div className="bg-surface-900/10 border-l-2 border-terminal/30 pl-8 space-y-6">
            <p className="text-xl text-text-secondary leading-relaxed italic">{post.excerpt}</p>
          </div>

          <div className="mt-12 space-y-8 text-lg leading-relaxed text-text-secondary">
            {post.content.split("\n\n").map((block, index) => (
              <div key={`${post.id}-${index}`}>
                {block.startsWith("#") ? (
                  <h2 className="text-2xl font-bold text-text-primary mt-12 mb-6 flex items-center gap-3">
                    <span className="text-terminal">##</span>
                    {block.replace(/#/g, "").trim()}
                  </h2>
                ) : block.startsWith("```") ? (
                  <div className="my-8 rounded-xl bg-surface-900 border border-terminal/10 overflow-hidden font-mono text-sm">
                    <div className="px-4 py-2 border-b border-terminal/5 flex items-center justify-between bg-surface-800/50">
                      <span className="text-[10px] text-text-muted">POST_SNIPPET.c</span>
                      <button className="text-text-muted hover:text-terminal">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <pre className="p-6 overflow-x-auto">
                      <code className="text-terminal-dim">
                        {block.replace(/```[a-z]*/g, "").trim()}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <p>{block}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-terminal/10">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-900 border border-terminal/5 text-xs font-mono text-text-muted hover:text-terminal hover:border-terminal/20 transition-all cursor-pointer"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="flex flex-col items-center space-y-8">
        <div className="h-px w-full bg-linear-to-r from-transparent via-terminal/20 to-transparent" />
        <div className="flex items-center gap-6">
          <Button className="bg-surface-900 border border-terminal/20 text-text-primary hover:border-terminal">
            <Share2 className="w-4 h-4 mr-2" /> Share Knowledge
          </Button>
          <Link href="/posts">
            <Button className="bg-terminal text-surface-950 font-bold hover:bg-terminal-dim">
              Back to Feed
            </Button>
          </Link>
        </div>
        <p className="text-[10px] font-mono text-text-muted opacity-40">SYSTEM_EXIT: 0x00000000</p>
      </footer>
    </div>
  );
}
