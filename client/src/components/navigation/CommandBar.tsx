import { useState, useEffect, useRef } from "react";
import {
  Search,
  Terminal,
  ArrowRight,
  Hash,
  User,
  Layout,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: "home", label: "cd /home", icon: Layout, path: "/" },
    { id: "hub", label: "cd /knowledge/hub", icon: Terminal, path: "/posts" },
    { id: "profile", label: "cd /user/profile", icon: User, path: "/profile" },
    {
      id: "settings",
      label: "cd /etc/config",
      icon: Settings,
      path: "/settings",
    },
    {
      id: "new-post",
      label: "vi /new-article",
      icon: Hash,
      path: "/posts/new",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const runCommand = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-surface-900 border border-terminal/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-terminal/10">
          <Search className="w-5 h-5 text-terminal" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none text-text-primary focus:outline-none font-mono text-sm placeholder:text-text-muted/40"
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-800 border border-terminal/10 rounded text-[9px] font-mono text-text-muted">
            <span className="text-terminal">ESC</span> to close
          </div>
        </div>

        <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          <div className="px-2 py-1.5 text-[9px] font-mono font-bold text-terminal/40 uppercase tracking-widest">
            Navigation_Hooks
          </div>
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => runCommand(cmd.path)}
              className="w-full group flex items-center justify-between p-3 rounded-lg hover:bg-terminal/5 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded bg-surface-800 text-text-muted group-hover:text-terminal group-hover:bg-terminal/10 transition-colors">
                  <cmd.icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-text-primary group-hover:translate-x-1 transition-transform">
                  {cmd.label}
                </span>
              </div>
              <ArrowRight className="w-3 h-3 text-terminal opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
          {filteredCommands.length === 0 && (
            <div className="py-20 text-center opacity-40 font-mono text-[10px]">
              $ grep: {query}: No such file or directory
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-surface-950 border-t border-terminal/5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[9px] font-mono text-text-muted uppercase">
            <span className="flex items-center gap-1">
              <span className="text-terminal">↑↓</span> select
            </span>
            <span className="flex items-center gap-1">
              <span className="text-terminal">↵</span> execute
            </span>
          </div>
          <span className="text-[9px] font-mono text-terminal/20">
            v4.2.0-STABLE
          </span>
        </div>
      </div>
    </div>
  );
}
