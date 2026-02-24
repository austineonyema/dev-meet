"use client";

import { Suspense, lazy, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-ignore
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const FENCED_CODE_PATTERN = /(^|\n)```/;

const SyntaxHighlighter = lazy(() =>
  Promise.all([
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/prism-light"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/javascript"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/typescript"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/jsx"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/tsx"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/python"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/rust"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/php"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/bash"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/css"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/markdown"),
    // @ts-ignore
    import("react-syntax-highlighter/dist/esm/languages/prism/json"),
  ]).then(
    ([
      { default: PrismLight },
      js,
      ts,
      jsx,
      tsx,
      python,
      rust,
      php,
      bash,
      css,
      markdownLang,
      json,
    ]) => {
      PrismLight.registerLanguage("javascript", js.default);
      PrismLight.registerLanguage("typescript", ts.default);
      PrismLight.registerLanguage("jsx", jsx.default);
      PrismLight.registerLanguage("tsx", tsx.default);
      PrismLight.registerLanguage("python", python.default);
      PrismLight.registerLanguage("rust", rust.default);
      PrismLight.registerLanguage("php", php.default);
      PrismLight.registerLanguage("bash", bash.default);
      PrismLight.registerLanguage("css", css.default);
      PrismLight.registerLanguage("markdown", markdownLang.default);
      PrismLight.registerLanguage("json", json.default);
      return { default: PrismLight };
    },
  ),
);

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const hasFencedCode = useMemo(
    () => FENCED_CODE_PATTERN.test(content),
    [content],
  );

  return (
    <div
      className={`post-preview-markdown text-base leading-relaxed text-text-secondary ${className ?? ""}`}
    >
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
          p: ({ children }) => <p className="mb-4 whitespace-pre-wrap">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>,
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
          pre: ({ children }) => <>{children}</>,
          code({
            node: _node,
            inline,
            className,
            children,
            ...props
          }: any) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              if (!hasFencedCode) {
                return (
                  <pre className="my-5 overflow-x-auto rounded-xl border border-terminal/15 bg-surface-900 p-4 font-mono text-sm text-text-primary">
                    <code {...props}>{children}</code>
                  </pre>
                );
              }

              return (
                <div className="my-6 overflow-hidden rounded-xl border border-terminal/10 shadow-xl">
                  <div className="flex items-center justify-between border-b border-terminal/10 bg-surface-800 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500/35" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/35" />
                      <span className="h-2 w-2 rounded-full bg-green-500/35" />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-terminal/70 uppercase">
                      {match[1]}
                    </span>
                  </div>
                  <Suspense
                    fallback={
                      <div className="h-24 animate-pulse bg-surface-900" />
                    }
                  >
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        background: "rgba(5, 5, 5, 0.9)",
                        padding: "1.25rem",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </Suspense>
                </div>
              );
            }

            return (
              <code className="rounded bg-surface-900 px-1.5 py-0.5 font-mono text-[0.92em] text-terminal/90">
                {children}
              </code>
            );
          },
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
  );
}
