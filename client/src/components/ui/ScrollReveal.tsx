import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Enhanced cubic-bezier for a more "elastic" heavy pull-up feel
  const transitionStyle = {
    transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={transitionStyle}
      className={`transition-all duration-1000 transform will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-24 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}
