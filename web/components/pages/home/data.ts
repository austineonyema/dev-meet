import type { LucideIcon } from "lucide-react";
import {
  Code2,
  GitBranch,
  MessageSquareCode,
  ShieldCheck,
  Terminal,
  Users,
  Workflow,
} from "lucide-react";

export type RecentActivityItem = {
  hash: string;
  user: string;
  action: string;
  time: string;
};

export type CommandSurfaceItem = {
  shortcut: string;
  command: string;
  description: string;
  icon: LucideIcon;
};

export type EngineeringTrackItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PlatformSignalItem = {
  label: string;
  value: string;
};

export const recentActivity: RecentActivityItem[] = [
  {
    hash: "a3f2c1b",
    user: "sarah_dev",
    action: "shared a distributed tracing guide",
    time: "2m ago",
  },
  {
    hash: "b7e4d9a",
    user: "code_ninja",
    action: "published a TypeScript architecture note",
    time: "5m ago",
  },
  {
    hash: "c1a8f3e",
    user: "design_ops",
    action: "started a product delivery thread",
    time: "8m ago",
  },
  {
    hash: "d4b2e7c",
    user: "rust_fan",
    action: "opened a systems performance discussion",
    time: "12m ago",
  },
  {
    hash: "e9c5a1f",
    user: "infra_lead",
    action: "connected with 4 backend engineers",
    time: "15m ago",
  },
];

export const commandSurface: CommandSurfaceItem[] = [
  {
    shortcut: "⌘ K",
    command: "discover.engineers",
    description: "Find people building with your stack, domain, and priorities.",
    icon: Users,
  },
  {
    shortcut: "⌘ S",
    command: "share.knowledge",
    description: "Publish notes, snippets, architecture decisions, and lessons.",
    icon: Terminal,
  },
  {
    shortcut: "⌘ D",
    command: "discuss.ideas",
    description: "Debate tradeoffs, unblock technical decisions, move faster.",
    icon: MessageSquareCode,
  },
  {
    shortcut: "⌘ T",
    command: "track.trends",
    description: "Stay current on frameworks, tooling, and engineering practices.",
    icon: GitBranch,
  },
];

export const engineeringTracks: EngineeringTrackItem[] = [
  {
    title: "Backend & APIs",
    description:
      "Design resilient services, model clean contracts, and share production patterns.",
    icon: Workflow,
  },
  {
    title: "Frontend Systems",
    description:
      "Collaborate on scalable UI architecture, state models, and performance tuning.",
    icon: Code2,
  },
  {
    title: "Platform & Reliability",
    description:
      "Exchange playbooks for observability, deployment strategy, and incident response.",
    icon: ShieldCheck,
  },
];

export const platformSignals: PlatformSignalItem[] = [
  { label: "Active engineers", value: "847+" },
  { label: "Knowledge posts", value: "12.4k" },
  { label: "Weekly discussions", value: "3.1k" },
];
