"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  className?: string;
};

export function TypingText({ text, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index += 1;
        return;
      }

      clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((previous) => !previous);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-terminal`}>
        ▋
      </span>
    </span>
  );
}
