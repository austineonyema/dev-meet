import { ScrollReveal } from "@/components/ui";
import type { ProfileUser } from "@/lib/profile";

type ProfileTechStackCardProps = {
  user: ProfileUser;
};

export function ProfileTechStackCard({ user }: ProfileTechStackCardProps) {
  return (
    <ScrollReveal delay={100} initiallyVisible>
      <div className="terminal-box rounded-xl border-terminal/10 p-6">
        <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold">
          <div className="h-4 w-1.5 bg-terminal" />
          ./tech-stack.sh
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {user.stack.map((item) => (
            <div
              key={item.name}
              className="group flex items-center justify-between rounded-xl border border-terminal/5 bg-surface-900 p-3 transition-all hover:border-terminal/20 hover:bg-terminal/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-terminal/10 bg-surface-800 font-mono text-[10px] text-text-muted transition-colors group-hover:text-terminal">
                  {item.name.charAt(0)}
                </div>
                <span className="font-mono text-sm">{item.name}</span>
              </div>
              <span className="rounded border border-terminal/10 px-2 py-0.5 font-mono text-[10px] text-text-muted group-hover:border-terminal/20 group-hover:text-terminal">
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
