import type { Post } from "./types";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Mastering the Linux Kernel: A Guide for Devs",
    excerpt:
      "Deep dive into kernel internals, syscalls, and performance tuning for high-scale applications.",
    content: `# Mastering the Linux Kernel

The Linux kernel is the heart of the operating system. Understanding its internals is crucial for optimizing performance in containerized environments.

## Syscalls & Performance
Directly interacting with syscalls can reduce overhead. Here is a small C snippet for a fast write:

\`\`\`c
#include <unistd.h>
#include <string.h>

int main() {
    const char *msg = "Hello, Kernel!\\n";
    write(1, msg, strlen(msg));
    return 0;
}
\`\`\`

## Memory Management
The slab allocator is a key component...`,
    author: {
      name: "Sarah Chen",
      username: "schen_dev",
      avatar: "/assets/avatars/user-2.png",
    },
    tags: ["linux", "kernel", "systems"],
    readingTime: "12 min",
    createdAt: "2026-01-25T14:30:00Z",
    likes: 342,
    comments: 24,
    category: "Kernel",
  },
  {
    id: "post-2",
    title: "The Sudo Philosophy: Permission and Power",
    excerpt:
      "Why privileged access management matters more than ever in the age of zero-trust security.",
    content: `# The Sudo Philosophy

With great power comes great responsibility. Sudo is not just a command; it is a gatekeeper.

> [!IMPORTANT]
> Never run commands you don't understand with sudo.

## Best Practices
- Use \`visudo\` to edit configurations.
- Audit your logs regularly.`,
    author: {
      name: "Alex Rivera",
      username: "arivera_dev",
      avatar: "/assets/avatars/user-1.png",
    },
    tags: ["security", "devops", "sudo"],
    readingTime: "6 min",
    createdAt: "2026-01-27T09:15:00Z",
    likes: 189,
    comments: 12,
    category: "Sudo",
  },
  {
    id: "post-3",
    title: "Vite + Tailwind 4: The Build Tool of 2026",
    excerpt:
      "Exploring the lightning-fast performance of the new CSS engine and Vite incremental builds.",
    content: `# Vite + Tailwind 4

The evolution of the frontend build stack has reached a new peak.

## Why it's fast
The new engine uses a Rust-based parser that handles thousands of classes in milliseconds.`,
    author: {
      name: "Marcus Thorne",
      username: "mthorne",
      avatar: "/assets/avatars/user-3.png",
    },
    tags: ["vite", "tailwind", "frontend"],
    readingTime: "8 min",
    createdAt: "2026-01-28T16:45:00Z",
    likes: 567,
    comments: 89,
    category: "Frontend",
  },
  {
    id: "post-4",
    title: "Git Rebase at Scale: Keeping a Clean History in Busy Teams",
    excerpt:
      "A practical workflow for rebasing long-lived branches, resolving conflicts safely, and keeping pull requests easy to review.",
    content: `# Git Rebase at Scale

In a multi-team codebase, the difference between a manageable merge queue and total history chaos usually comes down to branch hygiene. Rebase is not magic, but when used with discipline it keeps review context clear and reduces merge debt.

## Baseline Rules
1. Keep feature branches short-lived.
2. Rebase daily onto main.
3. Never rewrite shared history without team agreement.

## Recommended Flow
Start by fetching and rebasing before opening your PR:

\`\`\`bash
git fetch origin
git checkout feature/search-index
git rebase origin/main
\`\`\`

If conflicts appear, resolve them one commit at a time instead of editing everything in one pass. This keeps behavior traceable and avoids accidental regressions.

## Conflict Strategy
Treat conflicts as design review moments:
- Ask whether both sides should coexist.
- Prefer explicit adapters over hidden behavior changes.
- Run targeted tests after each resolved commit.

## Why This Matters
Clean commit history is not vanity. It directly improves:
- Incident debugging speed
- Code ownership clarity
- Rollback safety

In high-velocity teams, these are operational advantages, not stylistic preferences.`,
    author: {
      name: "Nina Ortega",
      username: "nortega",
      avatar: "/assets/avatars/user-2.png",
    },
    tags: ["git", "workflow", "code-review", "team-practices"],
    readingTime: "10 min",
    createdAt: "2026-02-01T10:20:00Z",
    likes: 276,
    comments: 31,
    category: "Git",
  },
  {
    id: "post-5",
    title: "Reliable Networking for Real-Time Apps: Retries, Timeouts, and Backoff",
    excerpt:
      "Designing resilient client-server communication for chat and collaboration systems under unstable networks.",
    content: `# Reliable Networking for Real-Time Apps

Real-time apps fail less from one big outage and more from small recurring network issues: short disconnects, partial packet loss, and overloaded edge nodes. If your app cannot absorb these, users experience random failure.

## Core Principles
- Assume connections are unstable.
- Make retries idempotent.
- Cap retry storms with exponential backoff and jitter.

## Practical Retry Model
Use one retry policy for reads and a stricter one for writes:

\`\`\`ts
const retryDelay = (attempt: number) => {
  const base = Math.min(1000 * 2 ** attempt, 10000);
  const jitter = Math.floor(Math.random() * 250);
  return base + jitter;
};
\`\`\`

For writes, attach an idempotency key so duplicate retries do not create duplicate records.

## Timeout Budgeting
Instead of one large timeout, split the budget:
1. DNS/connect timeout
2. TLS handshake timeout
3. First byte timeout
4. Full response timeout

This gives better telemetry and helps isolate whether you have routing, compute, or serialization bottlenecks.

## Observability Signals
Track these in dashboards:
- p50, p95, p99 latency by endpoint
- timeout rate by network region
- retry rate per operation type
- disconnect cause distribution

When these are visible, incident triage gets dramatically faster and your reliability work becomes measurable.`,
    author: {
      name: "Priya Nwosu",
      username: "priyanw",
      avatar: "/assets/avatars/user-3.png",
    },
    tags: ["networking", "reliability", "distributed-systems", "observability"],
    readingTime: "14 min",
    createdAt: "2026-02-03T18:10:00Z",
    likes: 421,
    comments: 54,
    category: "Networking",
  },
  {
    id: "post-6",
    title: "Frontend Performance Budgets that Actually Hold in Production",
    excerpt:
      "How to define practical budgets for bundle size, interaction latency, and rendering cost, then enforce them in CI.",
    content: `# Frontend Performance Budgets that Actually Hold

Most teams set performance goals once and forget them. Budgets only work if they are tied to release gates and owned by the same engineers shipping features.

## Budget Categories
- JavaScript budget per route
- Largest contentful paint threshold
- Interaction latency budget for key actions
- Hydration cost for initial load

## Example Budget File
\`\`\`json
{
  "route": "/dashboard",
  "maxJsKbGzip": 220,
  "maxLcpMs": 2500,
  "maxInteractionMs": 120
}
\`\`\`

## CI Enforcement
Do not fail every minor fluctuation. Use guard bands:
- Warn at 90% of budget
- Block at 100%
- Require explicit approval for temporary exceptions

## Production Drift
A page that passes locally can still regress in production due to:
- Third-party script growth
- feature flags enabling hidden modules
- serialization overhead from larger payloads

Measure both lab and field data. If field p95 gets worse, treat it like a reliability bug.

Teams that keep performance budgets visible in PR checks ship faster over time because refactors happen continuously, not as large emergency rewrites.`,
    author: {
      name: "Elijah Park",
      username: "epark_ui",
      avatar: "/assets/avatars/user-1.png",
    },
    tags: ["frontend", "performance", "web-vitals", "ci-cd"],
    readingTime: "11 min",
    createdAt: "2026-02-05T07:40:00Z",
    likes: 359,
    comments: 42,
    category: "Frontend",
  },
];
