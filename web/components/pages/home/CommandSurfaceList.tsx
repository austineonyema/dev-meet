"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { commandSurface } from "./data";

export function CommandSurfaceList() {
  const [hoveredCommand, setHoveredCommand] = useState<number | null>(null);

  return (
    <div className="terminal-box min-w-0 overflow-hidden rounded-xl divide-y divide-terminal/10">
      {commandSurface.map((command, index) => (
        <div
          key={command.command}
          className={`flex min-w-0 items-center gap-4 overflow-hidden p-4 transition-all sm:p-5 ${
            hoveredCommand === index ? "bg-terminal/5" : "hover:bg-surface-800/80"
          }`}
          onMouseEnter={() => setHoveredCommand(index)}
          onMouseLeave={() => setHoveredCommand(null)}
        >
          <span className="hidden sm:inline-flex kbd">{command.shortcut}</span>
          <command.icon
            className={`w-5 h-5 ${
              hoveredCommand === index ? "text-terminal" : "text-text-muted"
            } transition-colors`}
          />
          <div className="flex-1 min-w-0">
            <p className="break-all font-mono text-text-primary sm:break-normal">
              <span className="text-terminal/60">&gt; </span>
              {command.command}
            </p>
            <p className="text-sm text-text-muted mt-0.5 truncate">
              {command.description}
            </p>
          </div>
          <ChevronRight
            className={`w-4 h-4 text-text-muted transition-transform ${
              hoveredCommand === index ? "translate-x-1 text-terminal" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}
