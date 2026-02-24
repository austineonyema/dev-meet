import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui";

type ProfileContributionCardProps = {
  contributionData: number[][];
};

const opacityClasses = [
  "bg-surface-800 opacity-20",
  "bg-terminal/20",
  "bg-terminal/40",
  "bg-terminal/60",
  "bg-terminal/80",
  "bg-terminal",
];

export function ProfileContributionCard({
  contributionData,
}: ProfileContributionCardProps) {
  return (
    <ScrollReveal delay={300}>
      <div className="terminal-box overflow-hidden rounded-xl border-terminal/10 p-6">
        <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold">
          <div className="h-4 w-1.5 bg-terminal" />
          git-stats --contribution-map
        </h2>
        <div className="custom-scrollbar overflow-x-auto pb-4">
          <div className="flex gap-1.5">
            {Array.from({ length: 24 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const level = contributionData[dayIndex][weekIndex % 7];
                  return (
                    <div
                      key={dayIndex}
                      className={`h-3 w-3 cursor-pointer rounded-sm transition-all hover:scale-125 hover:shadow-[0_0_8px_rgba(0,255,65,0.4)] ${opacityClasses[level]}`}
                      title={`${level} commits`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-text-muted">
          <span>Less</span>
          <div className="mx-2 flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <div key={level} className={`h-2.5 w-2.5 rounded-sm ${opacityClasses[level]}`} />
            ))}
          </div>
          <span>More</span>
          <button className="ml-auto flex items-center gap-1 transition-colors hover:text-terminal">
            view data <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
