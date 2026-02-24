import type { ReactNode } from "react";

type SettingsPanelCardProps = {
  children: ReactNode;
  className?: string;
};

export function SettingsPanelCard({
  children,
  className = "",
}: SettingsPanelCardProps) {
  return (
    <section
      className={`relative min-h-[500px] overflow-hidden rounded-xl border border-terminal/10 bg-surface-950/50 p-8 backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}
