import { ScrollReveal } from "@/components/ui";
import { HeroTerminal } from "./HeroTerminal";
import { PlatformSignalsPanel } from "./PlatformSignalsPanel";

export function HeroSection() {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <ScrollReveal className="min-w-0" initiallyVisible>
            <HeroTerminal />
          </ScrollReveal>
          <ScrollReveal className="min-w-0" delay={80} initiallyVisible>
            <PlatformSignalsPanel />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
