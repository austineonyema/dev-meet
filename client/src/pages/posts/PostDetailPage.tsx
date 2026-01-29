import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Hash,
  Copy,
  Check,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import { useState, useEffect } from "react";
import { mockPosts, type Post } from "../../data/posts";
import { Button, ScrollReveal } from "../../components/ui";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const foundPost = mockPosts.find((p) => p.id === id);
    if (foundPost) setPost(foundPost);

    const handleScroll = () => {
      const element = document.documentElement;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-terminal" />
        <p className="font-mono text-text-muted text-sm">
          Mounting knowledge_node_0x{id?.slice(-4)}...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-900 z-50">
        <div
          className="h-full bg-terminal transition-all duration-150 shadow-[0_0_10px_#00ff41]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center justify-between">
        <Link
          to="/dashboard"
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
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="mb-12">
        <ScrollReveal direction="up" distance={20}>
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
              <div className="w-12 h-12 rounded-lg border border-terminal/20 p-1">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">
                  {post.author.name}
                </p>
                <p className="text-[10px] font-mono text-text-muted">
                  @{post.author.username} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex flex-col items-center gap-1 group">
                <Heart className="w-5 h-5 text-text-muted group-hover:text-red-500 transition-colors" />
                <span className="text-[9px] font-mono text-text-muted">
                  {post.likes}
                </span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <MessageCircle className="w-5 h-5 text-text-muted group-hover:text-terminal transition-colors" />
                <span className="text-[9px] font-mono text-text-muted">
                  {post.comments}
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </header>

      {/* Main Content */}
      <section className="prose prose-invert prose-terminal max-w-none mb-20 relative">
        <ScrollReveal delay={200} distance={40}>
          <div className="bg-surface-900/10 border-l-2 border-terminal/30 pl-8 space-y-6">
            <p className="text-xl text-text-secondary leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-12 space-y-8 text-lg leading-relaxed text-text-secondary">
            {/* Simulation of markdown chunks */}
            {post.content.split("\n\n").map((block, i) => (
              <div key={i}>
                {block.startsWith("#") ? (
                  <h2 className="text-2xl font-bold text-text-primary mt-12 mb-6 flex items-center gap-3">
                    <span className="text-terminal">##</span>{" "}
                    {block.replace(/#/g, "").trim()}
                  </h2>
                ) : block.startsWith("```") ? (
                  <div className="my-8 rounded-xl bg-surface-900 border border-terminal/10 overflow-hidden font-mono text-sm">
                    <div className="px-4 py-2 border-b border-terminal/5 flex items-center justify-between bg-surface-800/50">
                      <span className="text-[10px] text-text-muted">
                        POST_SNIPPET.c
                      </span>
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
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer Actions */}
      <footer className="flex flex-col items-center space-y-8">
        <div className="h-px w-full bg-linear-to-r from-transparent via-terminal/20 to-transparent" />
        <div className="flex items-center gap-6">
          <Button className="bg-surface-900 border border-terminal/20 text-text-primary hover:border-terminal">
            <Share2 className="w-4 h-4 mr-2" /> Share Knowledge
          </Button>
          <Button className="bg-terminal text-surface-950 font-bold hover:bg-terminal-dim">
            Next Article <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <p className="text-[10px] font-mono text-text-muted opacity-40">
          SYSTEM_EXIT: 0x00000000
        </p>
      </footer>
    </div>
  );
}
