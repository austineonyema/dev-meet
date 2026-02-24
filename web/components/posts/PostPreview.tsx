"use client";

import { Clock } from "lucide-react";

type PostPreviewProps = {
  title: string;
  content: string;
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function PostPreview({ title, content }: PostPreviewProps) {
  const lines = content.split("\n");
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
          <div className="space-y-3 text-base leading-relaxed text-text-secondary">
            {lines.map((line, index) => {
              if (line.startsWith("### ")) {
                return (
                  <h3
                    key={`${index}-${line}`}
                    className="pt-4 font-mono text-xl font-bold text-terminal/80 italic"
                  >
                    {line.replace(/^###\s+/, "")}
                  </h3>
                );
              }

              if (line.startsWith("## ")) {
                return (
                  <h2
                    key={`${index}-${line}`}
                    className="pt-6 font-mono text-2xl font-bold text-terminal"
                  >
                    {line.replace(/^##\s+/, "")}
                  </h2>
                );
              }

              if (line.startsWith("# ")) {
                return (
                  <h1
                    key={`${index}-${line}`}
                    className="pt-8 font-mono text-3xl font-bold text-terminal"
                  >
                    {line.replace(/^#\s+/, "")}
                  </h1>
                );
              }

              if (line.startsWith("> ")) {
                return (
                  <blockquote
                    key={`${index}-${line}`}
                    className="rounded-r-xl border-l-4 border-terminal/20 bg-terminal/5 py-3 pl-5 italic"
                  >
                    {line.replace(/^>\s+/, "")}
                  </blockquote>
                );
              }

              if (line.startsWith("- ")) {
                return (
                  <p
                    key={`${index}-${line}`}
                    className="flex items-start gap-3"
                  >
                    <span className="pt-1 text-terminal/50">➔</span>
                    <span>{line.replace(/^-\s+/, "")}</span>
                  </p>
                );
              }

              if (line.startsWith("```")) {
                return (
                  <p
                    key={`${index}-${line}`}
                    className="rounded-lg border border-terminal/20 bg-surface-900 px-4 py-2 font-mono text-xs text-terminal/80"
                  >
                    {line}
                  </p>
                );
              }

              if (!line.trim()) {
                return <div key={`${index}-spacer`} className="h-2" />;
              }

              return (
                <p key={`${index}-${line}`} className="whitespace-pre-wrap">
                  {line}
                </p>
              );
            })}
          </div>
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
