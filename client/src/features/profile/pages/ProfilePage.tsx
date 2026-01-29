import {
  MapPin,
  Calendar,
  Mail,
  Terminal,
  Github,
  Twitter,
  Globe,
  Edit,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button, ScrollReveal } from "../../../components/ui";
import { mockUser } from "../../../data/user";
import { contributionData } from "../../../data/feed";

export default function ProfilePage() {
  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header Profile Section */}
      <section className="relative">
        <div className="h-48 w-full rounded-2xl bg-surface-800 border border-terminal/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-linear-to-br from-terminal/5 to-primary-500/5 opacity-50" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Abstract animation in cover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="h-full w-full opacity-20 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-terminal/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-48 h-48 border-2 border-primary-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-10 -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            <div className="w-32 h-32 rounded-2xl bg-surface-900 border-4 border-surface-950 shadow-2xl overflow-hidden flex items-center justify-center font-mono text-4xl text-terminal font-bold relative group">
              <div className="absolute inset-0 bg-terminal opacity-10 group-hover:opacity-20 transition-opacity" />
              {mockUser.avatar ? (
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-full h-full object-cover relative z-10"
                />
              ) : (
                "AR"
              )}
            </div>
            <div className="mb-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {mockUser.name}
              </h1>
              <p className="text-terminal font-mono text-sm">
                @{mockUser.username}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-2">
            <Button
              size="sm"
              className="bg-surface-800 hover:bg-surface-700 text-text-primary border-terminal/10 border font-mono"
            >
              <Edit className="w-4 h-4 mr-2" /> $ profile --edit
            </Button>
            <Button
              size="sm"
              className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-bold ring-offset-surface-950 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
            >
              Connect
            </Button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details */}
        <div className="space-y-8">
          <ScrollReveal>
            <div className="terminal-box rounded-xl border-terminal/10 p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-terminal mb-4 pb-2 border-b border-terminal/10 flex items-center justify-between">
                  <span>identity_log</span>
                  <Terminal className="w-3.5 h-3.5" />
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-mono">
                  {mockUser.bio}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-terminal/5">
                {[
                  { icon: MapPin, text: mockUser.location },
                  { icon: Mail, text: mockUser.email },
                  { icon: Calendar, text: `Initialized: ${mockUser.joined}` },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-text-muted"
                  >
                    <item.icon className="w-4 h-4 text-terminal/60" />
                    <span className="font-mono text-xs">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {[Github, Twitter, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 bg-surface-800 rounded-lg hover:bg-terminal/10 hover:text-terminal transition-all border border-terminal/5"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Activity Mini Log */}
          <ScrollReveal delay={200}>
            <div className="terminal-box rounded-xl border-terminal/10 p-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center justify-between">
                <span>Network_Stats</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Connections", value: "847" },
                  { label: "Articles", value: "42" },
                  { label: "Projects", value: "12" },
                  { label: "Contributions", value: "1.3k" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 bg-surface-900 rounded-lg border border-terminal/5"
                  >
                    <p className="text-[10px] font-mono text-text-muted mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold font-mono tracking-tighter text-text-primary">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Experience & Contributions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tech Stack */}
          <ScrollReveal delay={100}>
            <div className="terminal-box rounded-xl border-terminal/10 p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 font-mono mb-6">
                <div className="w-1.5 h-4 bg-terminal" />
                ./tech-stack.sh
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockUser.stack.map((item) => (
                  <div
                    key={item.name}
                    className="group p-3 bg-surface-900 hover:bg-terminal/5 border border-terminal/5 hover:border-terminal/20 rounded-xl transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-800 border border-terminal/10 flex items-center justify-center font-mono text-[10px] text-text-muted group-hover:text-terminal transition-colors">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-mono text-sm">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-terminal/10 text-text-muted group-hover:text-terminal group-hover:border-terminal/20">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contribution Graph (Mock Interface) */}
          <ScrollReveal delay={300}>
            <div className="terminal-box rounded-xl border-terminal/10 p-6 overflow-hidden">
              <h2 className="text-lg font-bold flex items-center gap-2 font-mono mb-6">
                <div className="w-1.5 h-4 bg-terminal" />
                git-stats --contribution-map
              </h2>
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-1.5">
                  {/* Rendering the mock contribution grid */}
                  {Array.from({ length: 24 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1.5">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        // Just cycle through the small data set I made in mock.ts
                        const level = contributionData[dayIndex][weekIndex % 7];
                        const opacityClasses = [
                          "bg-surface-800 opacity-20",
                          "bg-terminal/20",
                          "bg-terminal/40",
                          "bg-terminal/60",
                          "bg-terminal/80",
                          "bg-terminal",
                        ];
                        return (
                          <div
                            key={dayIndex}
                            className={`w-3 h-3 rounded-sm transition-all hover:scale-125 hover:shadow-[0_0_8px_rgba(0,255,65,0.4)] cursor-pointer ${opacityClasses[level]}`}
                            title={`${level} commits`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-text-muted">
                <span>Less</span>
                <div className="flex gap-1 mx-2">
                  {[0, 1, 2, 3, 4, 5].map((lv) => (
                    <div
                      key={lv}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        [
                          "bg-surface-800 opacity-20",
                          "bg-terminal/20",
                          "bg-terminal/40",
                          "bg-terminal/60",
                          "bg-terminal/80",
                          "bg-terminal",
                        ][lv]
                      }`}
                    />
                  ))}
                </div>
                <span>More</span>
                <button className="ml-auto flex items-center gap-1 hover:text-terminal transition-colors">
                  view data <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
