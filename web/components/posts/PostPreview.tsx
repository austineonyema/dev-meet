"use client";

import { Clock } from "lucide-react";
import { MarkdownContent } from "./MarkdownContent";

type PostPreviewProps = {
  title: string;
  content: string;
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function PostPreview({ title, content }: PostPreviewProps) {
  const readingTime = estimateReadingTime(content);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-terminal/5 bg-surface-900/50 p-2 backdrop-blur-md">
        <div className="px-3 font-mono text-[9px] tracking-tighter text-text-muted opacity-40 uppercase">
          Rendered_Output
        </div>
        <div className="flex items-center gap-2 px-2 font-mono text-[10px] text-text-muted">
          <Clock className="h-3 w-3 text-terminal/60" /> ~{readingTime} MIN_READ
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 sm:p-10">
        {title ? (
          <h1 className="mb-8 border-b border-terminal/10 pb-4 font-mono text-3xl font-black tracking-tight text-terminal">
            {title}
          </h1>
        ) : (
          <p className="mb-8 select-none font-mono text-2xl italic text-text-muted/20">
            _ waiting_for_title...
          </p>
        )}

        {content ? (
          <MarkdownContent content={content} />
        ) : (
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full rounded-full bg-terminal/10" />
            <div className="h-4 w-11/12 rounded-full bg-terminal/10" />
            <div className="h-4 w-4/5 rounded-full bg-terminal/10" />
            <div className="h-32 w-full rounded-2xl border border-dashed border-terminal/20" />
          </div>
        )}
      </div>
    </div>
  );
}
