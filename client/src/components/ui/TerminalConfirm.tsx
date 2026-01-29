import { useState, useEffect } from "react";
import { Terminal, X, AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface TerminalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  command: string;
  warningText?: string;
}

export function TerminalConfirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  command,
  warningText,
}: TerminalConfirmProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = () => {
    if (
      inputValue.toLowerCase() === "y" ||
      inputValue.toLowerCase() === "yes"
    ) {
      onConfirm();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface-900 border border-terminal/20 rounded-xl shadow-[0_0_50px_rgba(0,255,65,0.1)] overflow-hidden scale-in-center">
        {/* Terminal Header */}
        <div className="bg-surface-800 px-4 py-2 border-b border-terminal/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-terminal" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4 p-3 rounded-lg bg-error/5 border border-error/10">
            <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary leading-relaxed">
              {warningText ||
                "This action is irreversible. Are you sure you want to proceed?"}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono text-text-muted">
              <span className="text-terminal">$</span> {command}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-terminal">Confirm? [y/N]:</p>
              <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAction()}
                className={`bg-transparent border-none outline-none font-mono text-xs text-text-primary w-20 ${error ? "text-error animate-shake" : ""}`}
                placeholder="_"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-surface-800/50 flex justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="font-mono text-xs"
          >
            ABORT
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleAction}
            className="font-mono text-xs border border-error/20"
          >
            EXECUTE
          </Button>
        </div>
      </div>
    </div>
  );
}
