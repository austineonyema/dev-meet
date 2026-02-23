import { ScrollReveal } from "@/components/ui";
import { LiveActivityFeed } from "./LiveActivityFeed";
import { StartHereCard } from "./StartHereCard";

export function ActivitySection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <LiveActivityFeed />
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <StartHereCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
