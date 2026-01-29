import { useState, useEffect, lazy, Suspense } from "react";
import {
  Send,
  Eye,
  Code2,
  Terminal,
  Type,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
  Columns,
  Rows,
  Maximize2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";

const PostEditorInput = lazy(() => import("./PostEditorInput"));
const PostPreview = lazy(() => import("./PostPreview"));

type LayoutMode = "side" | "stack" | "hidden";

export default function PostEditor() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("side");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (content || title) {
        setIsSaving(true);
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date().toLocaleTimeString());
        }, 800);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [content, title]);

  const toolbarActions = [
    { icon: Type, label: "Heading", action: "\n## " },
    { icon: Code2, label: "Code", action: "\n```\n\n```" },
    { icon: LinkIcon, label: "Link", action: "[text](url)" },
    { icon: ImageIcon, label: "Image", action: "![alt](url)" },
  ];

  const insertText = (text: string) => {
    setContent((prev) => prev + text);
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6 max-w-7xl mx-auto px-4 pb-20">
      {/* Header Controls */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-terminal/10 pb-4 gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg bg-surface-900 border border-terminal/10 text-text-muted hover:text-terminal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold font-mono flex items-center gap-2 truncate">
              <Terminal className="w-5 h-5 text-terminal shrink-0" />
              vi knowledge_post.md
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              <span className="text-[10px] font-mono text-terminal/60 uppercase">
                {isPreviewMode ? "READONLY (PREVIEW)" : "INSERT"}
              </span>
              {lastSaved && (
                <span className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-terminal" />
                  Synced {lastSaved}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-surface-900 border border-border rounded-lg p-1 mr-2 overflow-hidden shadow-inner">
            <button
              onClick={() => {
                setLayoutMode("side");
                setIsPreviewMode(false);
              }}
              className={`p-1.5 rounded transition-all ${layoutMode === "side" ? "bg-terminal/10 text-terminal shadow-[0_0_10px_var(--color-terminal-glow)]" : "text-text-muted hover:text-text-primary"}`}
              title="Side-by-Side"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setLayoutMode("stack");
                setIsPreviewMode(false);
              }}
              className={`p-1.5 rounded transition-all ${layoutMode === "stack" ? "bg-terminal/10 text-terminal shadow-[0_0_10px_var(--color-terminal-glow)]" : "text-text-muted hover:text-text-primary"}`}
              title="Stacked"
            >
              <Rows className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setLayoutMode("hidden");
                setIsPreviewMode(false);
              }}
              className={`p-1.5 rounded transition-all ${layoutMode === "hidden" ? "bg-terminal/10 text-terminal shadow-[0_0_10px_var(--color-terminal-glow)]" : "text-text-muted hover:text-text-primary"}`}
              title="Hide Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`font-mono text-xs border ${isPreviewMode ? "bg-terminal/10 border-terminal/40 text-terminal" : "border-terminal/10 bg-transparent text-text-muted hover:text-text-primary"}`}
          >
            <Eye className="w-3.5 h-3.5 mr-2" />{" "}
            {isPreviewMode ? "$ edit" : "$ preview"}
          </Button>
          <Button
            size="sm"
            className="bg-terminal hover:bg-terminal-dim text-surface-950 font-bold font-mono px-6 shadow-[0_0_15px_rgba(0,255,65,0.3)]"
            onClick={() => navigate("/dashboard")}
          >
            <Send className="w-3.5 h-3.5 mr-2" /> PUSH
          </Button>
        </div>
      </header>

      {/* Editor Body */}
      <div
        className={`flex-1 flex gap-px bg-border rounded-xl border border-terminal/10 overflow-hidden shadow-2xl ${layoutMode === "stack" ? "flex-col" : "flex-row"} min-h-[500px] md:min-h-[600px]`}
      >
        {/* Input Pane */}
        <div
          className={`flex flex-col bg-surface-950 min-h-0 ${
            isPreviewMode
              ? "hidden"
              : layoutMode === "hidden"
                ? "w-full overflow-y-auto h-full"
                : layoutMode === "side"
                  ? "w-full md:w-1/2 overflow-y-auto"
                  : "h-1/2 overflow-y-auto"
          } custom-scrollbar-minimal scrollbar-stable`}
        >
          <div className="p-2 border-b border-terminal/5 flex items-center justify-between bg-surface-900/50 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-1">
              {toolbarActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => insertText(action.action)}
                  className="p-1.5 rounded hover:bg-terminal/10 text-text-muted hover:text-terminal transition-all"
                  title={action.label}
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className="px-3 font-mono text-[9px] text-text-muted opacity-40 uppercase tracking-tighter">
              INSERT_PANE
            </div>
          </div>
          <input
            type="text"
            placeholder="title goes here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-surface-900/10 border-none px-6 py-4 sm:py-8 font-bold text-2xl sm:text-3xl text-text-primary focus:outline-none placeholder:text-text-muted/40 font-mono tracking-tight"
          />
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center font-mono text-terminal/40 animate-pulse bg-surface-950">
                {"< EDITOR_HYDRATING />"}
              </div>
            }
          >
            <PostEditorInput content={content} setContent={setContent} />
          </Suspense>
        </div>

        {/* Preview Pane */}
        <div
          className={`bg-surface-950 flex flex-col min-h-0 relative ${
            !isPreviewMode && layoutMode === "hidden"
              ? "hidden"
              : isPreviewMode
                ? "w-full overflow-y-auto h-full"
                : layoutMode === "side"
                  ? "w-full md:w-1/2 overflow-y-auto border-t md:border-t-0 md:border-l border-terminal/10"
                  : "flex-1 overflow-y-auto border-t border-terminal/10"
          } custom-scrollbar-minimal scrollbar-stable`}
        >
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center font-mono text-terminal/40 animate-pulse">
                {"< ENGINE_INITIALIZING />"}
              </div>
            }
          >
            <PostPreview title={title} content={content} />
          </Suspense>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="px-4 sm:px-6 py-4 bg-surface-900 border border-terminal/10 rounded-2xl flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-text-muted shadow-xl gap-4 md:gap-0">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-terminal/40 font-bold">LN_COUNT</span>
            <span className="text-text-primary tabular-nums font-bold">
              {content.split("\n").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-terminal/40 font-bold">CHAR_BUF</span>
            <span className="text-text-primary tabular-nums font-bold">
              {content.length}
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-terminal/10" />
          <div className="flex items-center gap-4">
            <button
              className={`flex items-center gap-2 transition-colors ${layoutMode === "side" ? "text-terminal" : "hover:text-text-primary"}`}
              onClick={() => setLayoutMode("side")}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-widest">SIDE</span>
            </button>
            <button
              className={`flex items-center gap-2 transition-colors ${layoutMode === "stack" ? "text-terminal" : "hover:text-text-primary"}`}
              onClick={() => setLayoutMode("stack")}
            >
              <Rows className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-widest">
                STACK
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
          <div className="flex items-center gap-3 py-1 px-3 bg-surface-950/50 rounded-lg border border-terminal/5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isSaving ? "bg-yellow-500 animate-pulse" : "bg-terminal"}`}
            />
            <span
              className={`uppercase font-bold tracking-widest text-[9px] ${
                isSaving ? "text-yellow-500" : "text-terminal"
              }`}
            >
              {isSaving ? "Saving_Status::STAGING" : "Saving_Status::IDLE"}
            </span>
          </div>
          <span className="text-terminal/30 font-bold select-none tracking-widest hidden xs:block">
            v4.2.0-STABLE
          </span>
        </div>
      </footer>
    </div>
  );
}
