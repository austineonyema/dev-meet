"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { LanguageDescription } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { placeholder } from "@codemirror/view";

type PostEditorInputProps = {
  content: string;
  setContent: (value: string) => void;
};

export function PostEditorInput({ content, setContent }: PostEditorInputProps) {
  const cmExtensions = useMemo(
    () => [
      markdown({
        base: markdownLanguage,
        codeLanguages: [
          LanguageDescription.of({
            name: "javascript",
            alias: ["js", "jsx"],
            support: javascript(),
          }),
        ],
      }),
      oneDark,
      placeholder("your post goes here..."),
    ],
    [],
  );

  return (
    <div className="post-editor-input flex-1 overflow-auto">
      <CodeMirror
        value={content}
        height="100%"
        theme={oneDark}
        extensions={cmExtensions}
        onChange={(value: string) => setContent(value)}
        className="h-full font-mono text-sm"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}
