import { ScrollReveal } from "@/components/ui";
import { CommandSurfaceList } from "./CommandSurfaceList";

export function CommandSurfaceSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-mono text-text-muted text-sm mb-2">
                <span className="text-terminal">$</span> man dev-meet
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Fast, familiar command surface
              </h3>
            </div>
            <CommandSurfaceList />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
