import { Suspense, lazy } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock } from "lucide-react";

// @ts-ignore
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      markdown_lang,
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
      PrismLight.registerLanguage("markdown", markdown_lang.default);
      PrismLight.registerLanguage("json", json.default);
      return { default: PrismLight };
    },
  ),
);

interface PostPreviewProps {
  title: string;
  content: string;
}

export default function PostPreview({ title, content }: PostPreviewProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-2 border-b border-terminal/5 flex items-center justify-between bg-surface-900/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="px-3 font-mono text-[9px] text-text-muted opacity-40 uppercase tracking-tighter">
          RENDERED_OUTPUT
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted px-2">
          <Clock className="w-3 h-3 text-terminal/60" /> ~
          {Math.ceil(content.length / 500)} MIN_READ
        </div>
      </div>

      <div className="flex-1 p-8 sm:p-12 prose prose-invert prose-terminal max-w-none prose-pre:bg-transparent prose-pre:p-0 overflow-y-auto custom-scrollbar-minimal">
        {title ? (
          <h1 className="text-4xl font-black mb-10 text-terminal font-mono tracking-tighter border-b border-terminal/10 pb-6 leading-tight">
            {title}
          </h1>
        ) : (
          <p className="text-text-muted italic opacity-5 select-none text-2xl font-mono mb-10">
            _ waiting_for_title...
          </p>
        )}

        <div className="opacity-90 leading-relaxed">
          {content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({
                  node: _node,
                  inline,
                  className,
                  children,
                  ...props
                }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="my-8 rounded-xl overflow-hidden border border-terminal/10 shadow-2xl">
                      <div className="bg-surface-800 px-4 py-2 border-b border-terminal/10 flex justify-between items-center bg-linear-to-r from-surface-800 to-surface-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/30" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                          <div className="w-2 h-2 rounded-full bg-green-500/30" />
                        </div>
                        <span className="text-[10px] font-mono text-terminal/70 font-bold uppercase tracking-widest">
                          {match[1]}
                        </span>
                      </div>
                      <Suspense
                        fallback={
                          <div className="bg-surface-800 h-24 animate-pulse rounded-b-xl" />
                        }
                      >
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            background: "rgba(5, 5, 5, 0.8)",
                            padding: "2rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.6",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </Suspense>
                    </div>
                  ) : (
                    <code
                      className="bg-surface-800 text-terminal px-1.5 py-0.5 rounded border border-terminal/20 font-mono text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ node: _node, children, ...props }) => (
                  <h1
                    className="text-3xl font-bold text-terminal mb-6 mt-12 font-mono border-b border-terminal/5 pb-2 uppercase tracking-wide"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ node: _node, children, ...props }) => (
                  <h2
                    className="text-2xl font-bold text-terminal mt-10 mb-5 font-mono flex items-center gap-3"
                    {...props}
                  >
                    <span className="text-terminal/20">{">>"}</span> {children}
                  </h2>
                ),
                h3: ({ node: _node, children, ...props }) => (
                  <h3
                    className="text-xl font-bold text-terminal/80 mt-8 mb-4 font-mono italic"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                blockquote: ({ node: _node, children, ...props }) => (
                  <blockquote
                    className="border-l-4 border-terminal/20 bg-terminal/5 pl-8 py-6 my-10 italic text-text-secondary rounded-r-2xl font-mono text-base shadow-sm"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                ul: ({ node: _node, children, ...props }) => (
                  <ul className="list-none space-y-4 my-8 pl-4" {...props}>
                    {children}
                  </ul>
                ),
                li: ({ node: _node, children, ...props }) => (
                  <li className="flex gap-4 items-start group" {...props}>
                    <span className="text-terminal mt-1.5 text-xs opacity-40 group-hover:opacity-100 transition-opacity">
                      {"➔"}
                    </span>
                    <div className="flex-1 text-text-secondary text-base">
                      {children}
                    </div>
                  </li>
                ),
                table: ({ node: _node, children, ...props }) => (
                  <div className="overflow-x-auto my-12 border border-terminal/10 rounded-2xl bg-surface-900 shadow-2xl">
                    <table
                      className="w-full text-left border-collapse"
                      {...props}
                    >
                      {children}
                    </table>
                  </div>
                ),
                th: ({ node: _node, children, ...props }) => (
                  <th
                    className="p-5 border-b border-terminal/20 font-mono text-[11px] text-terminal uppercase tracking-widest bg-surface-800/80"
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ node: _node, children, ...props }) => (
                  <td
                    className="p-5 border-b border-terminal/5 text-sm text-text-secondary font-mono leading-relaxed"
                    {...props}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="space-y-8 opacity-5 select-none mt-12 animate-pulse">
              <div className="h-4 w-full bg-terminal rounded-full" />
              <div className="h-4 w-11/12 bg-terminal rounded-full" />
              <div className="h-4 w-4/5 bg-terminal rounded-full" />
              <div className="h-32 w-full border-2 border-dashed border-terminal rounded-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
