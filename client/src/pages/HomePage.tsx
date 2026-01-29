import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Terminal,
  GitBranch,
  Users,
  MessageSquareCode,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button, ScrollReveal } from "../components/ui";

// Simulated recent activity for git-log style display
const recentActivity = [
  {
    hash: "a3f2c1b",
    user: "sarah_dev",
    action: "joined the community",
    time: "2m ago",
  },
  {
    hash: "b7e4d9a",
    user: "code_ninja",
    action: "shared a TypeScript tip",
    time: "5m ago",
  },
  {
    hash: "c1a8f3e",
    user: "designerX",
    action: "posted about Figma workflows",
    time: "8m ago",
  },
  {
    hash: "d4b2e7c",
    user: "rust_fan",
    action: "started a discussion on async",
    time: "12m ago",
  },
  {
    hash: "e9c5a1f",
    user: "fullstack_dev",
    action: "connected with 3 developers",
    time: "15m ago",
  },
];

// Command palette style features
const commands = [
  {
    shortcut: "⌘ S",
    command: "share.knowledge",
    description: "Post articles, snippets, and tutorials",
    icon: Terminal,
  },
  {
    shortcut: "⌘ K",
    command: "connect.developers",
    description: "Find and connect with like-minded devs",
    icon: Users,
  },
  {
    shortcut: "⌘ D",
    command: "discuss.ideas",
    description: "Comment, debate, and collaborate",
    icon: MessageSquareCode,
  },
  {
    shortcut: "⌘ T",
    command: "track.trends",
    description: "Stay updated on tools and tech",
    icon: GitBranch,
  },
];

function TypingText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`${showCursor ? "opacity-100" : "opacity-0"} text-terminal`}
      >
        ▋
      </span>
    </span>
  );
}

export default function HomePage() {
  const [hoveredCommand, setHoveredCommand] = useState<number | null>(null);

  return (
    <div className="flex flex-col relative">
      {/* Scanline overlay */}
      <div className="scanline fixed inset-0 pointer-events-none z-50" />

      {/* Hero Section - Terminal Style */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            {/* Terminal window */}
            <div className="border border-terminal/20 bg-surface-900 rounded-lg overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-800 border-b border-terminal/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-text-muted ml-2">
                  ~/dev-meet
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 sm:p-8 font-mono">
                <div className="text-text-muted text-sm mb-4">
                  <span className="text-terminal">$</span> cat welcome.txt
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                  <span className="text-terminal">&gt;</span>{" "}
                  <TypingText text="Where developers meet & create_" />
                </h1>

                <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
                  <span className="text-terminal/60">//</span> A platform built
                  by devs, for devs. Share knowledge, build connections, ship
                  projects together.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold"
                    >
                      <span className="mr-2">$</span> npm start journey
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link
                    to="/posts"
                    className="font-mono text-text-secondary hover:text-terminal transition-colors flex items-center gap-2"
                  >
                    <span className="text-terminal/60">&gt;</span> explore
                    --posts
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-terminal/10">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-mono">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>847 devs online</span>
                    </span>
                    <span className="text-terminal/30">|</span>
                    <span>v1.0.0</span>
                    <span className="text-terminal/30">|</span>
                    <span className="text-terminal/60">MIT License</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Command Palette Features */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-mono text-text-muted text-sm mb-3">
                  <span className="text-terminal">$</span> man dev-meet
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Everything you need, one{" "}
                  <span className="kbd text-base">⌘ K</span> away
                </h3>
              </div>

              {/* Command list */}
              <div className="terminal-box rounded-lg divide-y divide-terminal/10">
                {commands.map((cmd, index) => (
                  <div
                    key={cmd.command}
                    className={`flex items-center gap-4 p-4 sm:p-5 transition-all cursor-pointer ${
                      hoveredCommand === index
                        ? "bg-terminal/5"
                        : "hover:bg-surface-800"
                    }`}
                    onMouseEnter={() => setHoveredCommand(index)}
                    onMouseLeave={() => setHoveredCommand(null)}
                  >
                    <div className="hidden sm:flex">
                      <span className="kbd">{cmd.shortcut}</span>
                    </div>
                    <cmd.icon
                      className={`w-5 h-5 ${
                        hoveredCommand === index
                          ? "text-terminal"
                          : "text-text-muted"
                      } transition-colors`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-text-primary">
                        <span className="text-terminal/60">&gt; </span>
                        {cmd.command}
                      </div>
                      <p className="text-sm text-text-muted mt-0.5 truncate">
                        {cmd.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-text-muted transition-transform ${
                        hoveredCommand === index
                          ? "translate-x-1 text-terminal"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Git Log Activity */}
      <section className="py-20 sm:py-28 bg-surface-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-mono text-text-muted text-sm mb-3">
                  <span className="text-terminal">$</span> git log --oneline
                  --live
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  See what's happening right now
                </h3>
              </div>

              <div className="terminal-box rounded-lg p-4 sm:p-6 font-mono text-sm">
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.hash}
                      className="group flex items-center gap-2 sm:gap-3 py-2 border-b border-terminal/5 last:border-0 min-w-0 overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-yellow-500/80 shrink-0 font-mono text-[10px] sm:text-xs opacity-50 hidden xs:inline">
                        {activity.hash}
                      </span>
                      <span className="text-terminal shrink-0 font-bold text-xs sm:text-sm">
                        @{activity.user}
                      </span>
                      <span className="text-text-secondary flex-1 min-w-0 truncate text-xs sm:text-sm">
                        {activity.action}
                      </span>
                      <span className="text-text-muted shrink-0 text-[10px] sm:text-xs font-mono ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-terminal/10 text-text-muted">
                  <span className="text-terminal">$</span>{" "}
                  <span className="cursor-blink">▋</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* README CTA */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="terminal-box rounded-lg overflow-hidden">
                {/* README header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-surface-800 border-b border-terminal/10">
                  <Sparkles className="w-4 h-4 text-terminal" />
                  <span className="font-mono text-sm text-text-primary">
                    README.md
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                    ## Getting Started
                  </h2>
                  <p className="text-text-secondary mb-6 text-lg">
                    Join thousands of developers already building connections
                    and sharing knowledge.
                  </p>

                  <div className="space-y-4 mb-8 font-mono text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-terminal">1.</span>
                      <span className="text-text-primary">
                        Create your developer profile
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-terminal">2.</span>
                      <span className="text-text-primary">
                        Connect with devs who share your stack
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-terminal">3.</span>
                      <span className="text-text-primary">
                        Start sharing and learning
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-800 rounded-lg p-4 font-mono text-sm mb-6">
                    <div className="text-text-muted mb-2"># Quick install</div>
                    <div className="text-text-primary">
                      <span className="text-terminal">$</span> npx
                      create-dev-profile
                    </div>
                  </div>

                  <Link to="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold"
                    >
                      Initialize Profile
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
