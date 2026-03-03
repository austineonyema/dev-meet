import { Button, Input } from "@/components/ui";

const colorGroups = [
  {
    name: "Terminal",
    items: [
      { token: "--color-terminal", value: "#00ff41", className: "bg-terminal" },
      { token: "--color-terminal-dim", value: "#00cc33", className: "bg-terminal-dim" },
    ],
  },
  {
    name: "Surface",
    items: [
      { token: "--color-surface-950", value: "#050505", className: "bg-surface-950" },
      { token: "--color-surface-900", value: "#0a0a0b", className: "bg-surface-900" },
      { token: "--color-surface-800", value: "#121214", className: "bg-surface-800" },
      { token: "--color-surface-700", value: "#1a1a1e", className: "bg-surface-700" },
      { token: "--color-surface-600", value: "#232329", className: "bg-surface-600" },
      { token: "--color-surface-500", value: "#2d2d35", className: "bg-surface-500" },
    ],
  },
  {
    name: "Text",
    items: [
      { token: "--color-text-primary", value: "#e4e4e7", className: "bg-text-primary" },
      { token: "--color-text-secondary", value: "#a1a1aa", className: "bg-text-secondary" },
      { token: "--color-text-muted", value: "#71717a", className: "bg-text-muted" },
    ],
  },
  {
    name: "Semantic",
    items: [
      { token: "--color-success", value: "#22c55e", className: "bg-success" },
      { token: "--color-warning", value: "#f59e0b", className: "bg-warning" },
      { token: "--color-error", value: "#ef4444", className: "bg-error" },
      { token: "--color-info", value: "#3b82f6", className: "bg-info" },
    ],
  },
];

const breakpoints = [
  { label: "base", width: "< 640px", usage: "mobile-first default styles" },
  { label: "sm", width: ">= 640px", usage: "small-screen spacing adjustments" },
  { label: "md", width: ">= 768px", usage: "tablet layouts and form density changes" },
  { label: "lg", width: ">= 1024px", usage: "desktop multi-column section layouts" },
  { label: "xl", width: ">= 1280px", usage: "wide desktop content breathing room" },
  { label: "2xl", width: ">= 1536px", usage: "large monitor max-width expansion" },
];

const motionTokens = [
  "blink",
  "typing",
  "scanline",
  "flicker",
  "pulse-glow",
  "float-code",
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-3 border-b border-terminal/20 pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">
          Dev-Meet Foundations
        </p>
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Design System
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary sm:text-base">
          Token source: <code className="kbd">web/app/globals.css</code>. Component source:
          <code className="kbd ml-2">web/components/ui</code>.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Color Tokens</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {colorGroups.map((group) => (
            <article key={group.name} className="terminal-box rounded-xl p-5">
              <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.15em] text-terminal">
                {group.name}
              </h3>
              <div className="grid gap-3">
                {group.items.map((item) => (
                  <div key={item.token} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className={`h-10 w-10 rounded-md border border-border ${item.className}`} />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-xs text-text-primary">{item.token}</p>
                      <p className="font-mono text-xs text-text-muted">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 grid gap-6 lg:grid-cols-2">
        <article className="terminal-box rounded-xl p-6">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-mono text-xs text-text-muted">Sans / Inter</p>
              <p className="text-3xl font-bold text-text-primary">Build better software teams</p>
              <p className="mt-2 text-base text-text-secondary">
                Body copy in sans for readable long-form messaging.
              </p>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs text-text-muted">Mono / JetBrains Mono</p>
              <p className="font-mono text-lg text-terminal">$ npm run ship:quality</p>
              <p className="mt-2 font-mono text-sm text-text-secondary">Command-style UI accents and metadata.</p>
            </div>
          </div>
        </article>

        <article className="terminal-box rounded-xl p-6">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">Breakpoints</h2>
          <div className="space-y-3">
            {breakpoints.map((bp) => (
              <div key={bp.label} className="rounded-lg border border-border p-3">
                <p className="font-mono text-xs text-terminal">
                  {bp.label} <span className="text-text-muted">({bp.width})</span>
                </p>
                <p className="mt-1 text-sm text-text-secondary">{bp.usage}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Core Components</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="terminal-box rounded-xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-terminal">Buttons</p>
            <div className="mb-4 flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </article>

          <article className="terminal-box rounded-xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-terminal">Inputs</p>
            <div className="space-y-4">
              <Input label="Email" placeholder="user@dev-meet.com" />
              <Input label="Password" type="password" placeholder="••••••••" error="Password is required" />
            </div>
          </article>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Motion Tokens</h2>
        <div className="terminal-box rounded-xl p-6">
          <div className="flex flex-wrap gap-2">
            {motionTokens.map((token) => (
              <span key={token} className="kbd">
                {token}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
