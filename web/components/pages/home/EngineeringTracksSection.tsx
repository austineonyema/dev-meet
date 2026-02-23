import { ScrollReveal } from "@/components/ui";
import { engineeringTracks } from "./data";

export function EngineeringTracksSection() {
  return (
    <section className="py-14 sm:py-20 bg-surface-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-mono text-text-muted text-sm mb-2">
                <span className="text-terminal">$</span> ls tracks/
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Built for real engineering work
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {engineeringTracks.map((track) => (
                <article
                  key={track.title}
                  className="terminal-box rounded-xl p-4 sm:p-5 hover:border-terminal/30 transition-colors"
                >
                  <track.icon className="w-5 h-5 text-terminal mb-3" />
                  <h4 className="text-text-primary font-semibold mb-2">{track.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {track.description}
                  </p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
