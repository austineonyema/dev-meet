"use client";

import { Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          <div className="post-preview-markdown text-base leading-relaxed text-text-secondary">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mt-8 mb-4 font-mono text-3xl font-bold text-terminal">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-7 mb-3 font-mono text-2xl font-bold text-terminal">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-6 mb-3 font-mono text-xl font-bold text-terminal/85">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 whitespace-pre-wrap">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="my-5 rounded-r-xl border-l-4 border-terminal/20 bg-terminal/5 py-3 pl-5 italic text-text-primary/90">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-terminal underline decoration-terminal/40 underline-offset-2 transition-colors hover:text-terminal-dim"
                  >
                    {children}
                  </a>
                ),
                pre: ({ children }) => (
                  <pre className="my-5 overflow-x-auto rounded-xl border border-terminal/15 bg-surface-900 p-4">
                    {children}
                  </pre>
                ),
                code: ({ className, children }) => (
                  <code
                    className={
                      className
                        ? `font-mono text-sm text-text-primary ${className}`
                        : "rounded bg-surface-900 px-1.5 py-0.5 font-mono text-[0.92em] text-terminal/90"
                    }
                  >
                    {children}
                  </code>
                ),
                hr: () => <hr className="my-8 border-terminal/15" />,
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-lg border border-terminal/15">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-surface-900/80 text-text-primary">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="border-b border-border px-3 py-2 text-left font-mono">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-border/60 px-3 py-2">{children}</td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
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
