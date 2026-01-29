import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeStyles = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
};

export function Loading({
  size = "md",
  text,
  fullScreen = false,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={`${sizeStyles[size]} animate-spin text-primary-500`}
      />
      {text && <p className="text-sm text-text-secondary">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-surface-900/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
}

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse bg-surface-700/50 rounded ${className}`} />
  );
}

export function PostSkeleton() {
  return (
    <div className="terminal-box rounded-xl border-terminal/10 p-6 flex flex-col space-y-4">
      <div className="flex justify-between">
        <LoadingSkeleton className="h-4 w-20" />
        <LoadingSkeleton className="h-4 w-24" />
      </div>
      <LoadingSkeleton className="h-8 w-3/4" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
      <div className="pt-4 border-t border-terminal/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LoadingSkeleton className="w-6 h-6 rounded" />
          <LoadingSkeleton className="h-3 w-16" />
        </div>
        <LoadingSkeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
