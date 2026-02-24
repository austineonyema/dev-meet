"use client";

type PostEditorInputProps = {
  content: string;
  setContent: (value: string) => void;
};

export function PostEditorInput({ content, setContent }: PostEditorInputProps) {
  return (
    <div className="flex-1 overflow-auto">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="your post goes here..."
        className="h-full min-h-[420px] w-full resize-none bg-transparent px-6 pb-8 font-mono text-sm leading-7 text-text-primary outline-none placeholder:text-text-muted/40"
      />
    </div>
  );
}
