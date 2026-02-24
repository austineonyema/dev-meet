"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Columns,
  Eye,
  Image as ImageIcon,
  Link as LinkIcon,
  Maximize2,
  Rows,
  Send,
  Terminal,
  Type,
} from "lucide-react";
import { getApiErrorMessage } from "@/lib/api";
import { createPost } from "@/lib/api/posts";
import { Button } from "@/components/ui";
import { postSchema, type PostFormData } from "@/schema/post.schema";
import { PostEditorInput } from "./PostEditorInput";
import { PostPreview } from "./PostPreview";

type LayoutMode = "side" | "stack" | "hidden";

const DRAFT_TITLE_KEY = "post_draft_title";
const DRAFT_CONTENT_KEY = "post_draft_content";

const toolbarActions = [
  { icon: Type, label: "Heading", action: "\n## " },
  { icon: Code2, label: "Code", action: "\n```\n\n```" },
  { icon: LinkIcon, label: "Link", action: "[text](url)" },
  { icon: ImageIcon, label: "Image", action: "![alt](url)" },
];

function readDraftValue(key: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(key) ?? "";
}

export function PostEditorShell() {
  const router = useRouter();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("side");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const title = watch("title");
  const content = watch("content");

  useEffect(() => {
    const draftTitle = readDraftValue(DRAFT_TITLE_KEY);
    const draftContent = readDraftValue(DRAFT_CONTENT_KEY);
    if (draftTitle) {
      setValue("title", draftTitle, { shouldDirty: false });
    }
    if (draftContent) {
      setValue("content", draftContent, { shouldDirty: false });
    }
  }, [setValue]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DRAFT_TITLE_KEY, title);
    window.localStorage.setItem(DRAFT_CONTENT_KEY, content);
  }, [title, content]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!content && !title) return;
      setIsSaving(true);
      window.setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date().toLocaleTimeString());
      }, 800);
    }, 10000);

    return () => {
      window.clearInterval(timer);
    };
  }, [content, title]);

  const onSubmit = async (data: PostFormData) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await createPost(data);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(DRAFT_TITLE_KEY);
        window.localStorage.removeItem(DRAFT_CONTENT_KEY);
      }
      router.push("/posts");
      router.refresh();
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "Unable to publish post. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Are you sure you want to clear the current buffer?",
      );
      if (!confirmed) return;
    }

    reset({ title: "", content: "" });

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DRAFT_TITLE_KEY);
      window.localStorage.removeItem(DRAFT_CONTENT_KEY);
    }
  };

  const insertText = (text: string) => {
    setValue("content", `${content}${text}`, { shouldDirty: true });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col space-y-6 px-4 pb-20">
      <header className="flex flex-col justify-between gap-4 border-b border-terminal/10 pb-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/posts"
            className="rounded-lg border border-terminal/10 bg-surface-900 p-2 text-text-muted transition-colors hover:text-terminal"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 truncate font-mono text-lg font-bold sm:text-xl">
              <Terminal className="h-5 w-5 shrink-0 text-terminal" />
              vi knowledge_post.md
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[10px] text-terminal/60 uppercase">
                {isPreviewMode ? "Readonly (Preview)" : "Insert"}
              </span>
              {lastSaved ? (
                <span className="flex items-center gap-1 font-mono text-[10px] text-text-muted">
                  <CheckCircle2 className="h-2.5 w-2.5 text-terminal" />
                  Synced {lastSaved}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-2 flex items-center overflow-hidden rounded-lg border border-border bg-surface-900 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setLayoutMode("side");
                setIsPreviewMode(false);
              }}
              className={`rounded p-1.5 transition-all ${
                layoutMode === "side"
                  ? "bg-terminal/10 text-terminal shadow-[0_0_10px_rgba(0,255,65,0.12)]"
                  : "text-text-muted hover:text-text-primary"
              }`}
              title="Side-by-Side"
            >
              <Columns className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setLayoutMode("stack");
                setIsPreviewMode(false);
              }}
              className={`rounded p-1.5 transition-all ${
                layoutMode === "stack"
                  ? "bg-terminal/10 text-terminal shadow-[0_0_10px_rgba(0,255,65,0.12)]"
                  : "text-text-muted hover:text-text-primary"
              }`}
              title="Stacked"
            >
              <Rows className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setLayoutMode("hidden");
                setIsPreviewMode(false);
              }}
              className={`rounded p-1.5 transition-all ${
                layoutMode === "hidden"
                  ? "bg-terminal/10 text-terminal shadow-[0_0_10px_rgba(0,255,65,0.12)]"
                  : "text-text-muted hover:text-text-primary"
              }`}
              title="Hide Preview"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearDraft}
            className="border border-transparent font-mono text-[10px] text-error/60 hover:border-error/20 hover:bg-error/5 hover:text-error"
          >
            $ rm -rf draft
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreviewMode((prev) => !prev)}
            className={`border font-mono text-xs ${
              isPreviewMode
                ? "border-terminal/40 bg-terminal/10 text-terminal"
                : "border-terminal/10 bg-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            {isPreviewMode ? "$ edit" : "$ preview"}
          </Button>
          <Button
            size="sm"
            disabled={isSubmitting}
            className="bg-terminal px-6 font-mono font-bold text-surface-950 shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:bg-terminal-dim disabled:opacity-50"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-surface-950 border-t-transparent" />
                STAGING...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-3.5 w-3.5" /> PUSH
              </>
            )}
          </Button>
        </div>
      </header>

      {submitError ? (
        <div className="rounded-lg border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">
          {submitError}
        </div>
      ) : null}

      <div
        className={`min-h-[500px] flex-1 gap-px overflow-hidden rounded-xl border border-terminal/10 bg-border md:min-h-[600px] ${
          layoutMode === "stack" ? "flex flex-col" : "flex flex-row"
        }`}
      >
        <div
          className={`flex min-h-0 flex-col bg-surface-950 ${
            isPreviewMode
              ? "hidden"
              : layoutMode === "hidden"
                ? "h-full w-full overflow-y-auto"
                : layoutMode === "side"
                  ? "w-full overflow-y-auto md:w-1/2"
                  : "h-1/2 overflow-y-auto"
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-terminal/5 bg-surface-900/50 p-2 backdrop-blur-md">
            <div className="flex items-center gap-1">
              {toolbarActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => insertText(action.action)}
                  className="rounded p-1.5 text-text-muted transition-all hover:bg-terminal/10 hover:text-terminal"
                  title={action.label}
                >
                  <action.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <div className="px-3 font-mono text-[9px] tracking-tighter text-text-muted opacity-40 uppercase">
              Insert_Pane
            </div>
          </div>

          <div className="px-6 py-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    type="text"
                    placeholder="title goes here..."
                    className={`w-full border-none bg-surface-900/10 py-4 font-mono text-2xl font-bold tracking-tight text-text-primary outline-none placeholder:text-text-muted/40 sm:py-8 sm:text-3xl ${
                      errors.title ? "text-error" : ""
                    }`}
                  />
                  {errors.title ? (
                    <span className="mb-4 mt-[-20px] font-mono text-[10px] tracking-widest text-error uppercase">
                      {`ERR: ${errors.title.message}`}
                    </span>
                  ) : null}
                </div>
              )}
            />
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div className="flex min-h-0 flex-1 flex-col">
                <PostEditorInput content={field.value} setContent={field.onChange} />
                {errors.content ? (
                  <div className="border-t border-error/20 bg-error/10 p-2">
                    <span className="font-mono text-[10px] tracking-widest text-error uppercase">
                      {`ERR: ${errors.content.message}`}
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          />
        </div>

        <div
          className={`relative min-h-0 flex-col bg-surface-950 ${
            !isPreviewMode && layoutMode === "hidden"
              ? "hidden"
              : isPreviewMode
                ? "flex h-full w-full overflow-y-auto"
                : layoutMode === "side"
                  ? "flex w-full overflow-y-auto border-t border-terminal/10 md:w-1/2 md:border-l md:border-t-0"
                  : "flex flex-1 overflow-y-auto border-t border-terminal/10"
          }`}
        >
          <PostPreview title={title} content={content} />
        </div>
      </div>

      <footer className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-terminal/10 bg-surface-900 px-4 py-4 font-mono text-[10px] text-text-muted shadow-xl sm:px-6 sm:text-[11px] md:flex-row md:gap-0">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-terminal/40">LN_COUNT</span>
            <span className="tabular-nums font-bold text-text-primary">
              {content.split("\n").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-terminal/40">CHAR_BUF</span>
            <span className="tabular-nums font-bold text-text-primary">
              {content.length}
            </span>
          </div>
          <div className="hidden h-4 w-px bg-terminal/10 sm:block" />
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`flex items-center gap-2 transition-colors ${
                layoutMode === "side" ? "text-terminal" : "hover:text-text-primary"
              }`}
              onClick={() => setLayoutMode("side")}
            >
              <Columns className="h-3.5 w-3.5" />
              <span className="text-[9px] tracking-widest uppercase">SIDE</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 transition-colors ${
                layoutMode === "stack" ? "text-terminal" : "hover:text-text-primary"
              }`}
              onClick={() => setLayoutMode("stack")}
            >
              <Rows className="h-3.5 w-3.5" />
              <span className="text-[9px] tracking-widest uppercase">STACK</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:justify-end">
          <div className="flex items-center gap-3 rounded-lg border border-terminal/5 bg-surface-950/50 px-3 py-1">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                isSaving ? "animate-pulse bg-yellow-500" : "bg-terminal"
              }`}
            />
            <span
              className={`text-[9px] font-bold tracking-widest uppercase ${
                isSaving ? "text-yellow-500" : "text-terminal"
              }`}
            >
              {isSaving ? "Saving_Status::STAGING" : "Saving_Status::IDLE"}
            </span>
          </div>
          <span className="hidden select-none font-bold tracking-widest text-terminal/30 sm:block">
            v4.2.0-STABLE
          </span>
        </div>
      </footer>
    </div>
  );
}
