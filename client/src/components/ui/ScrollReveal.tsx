import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 96,
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

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(100%)";
    const d = distance;
    switch (direction) {
      case "up":
        return `translateY(${d}px) scale(95%)`;
      case "down":
        return `translateY(-${d}px) scale(95%)`;
      case "left":
        return `translateX(${d}px) scale(95%)`;
      case "right":
        return `translateX(-${d}px) scale(95%)`;
      default:
        return `translateY(${d}px) scale(95%)`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        ...transitionStyle,
        transform: getTransform(),
      }}
      className={`transition-all duration-1000 will-change-transform ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
