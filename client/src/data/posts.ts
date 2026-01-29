import { mockUser } from "./user";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  readingTime: string;
  createdAt: string;
  likes: number;
  comments: number;
  category: "Kernel" | "Sudo" | "Git" | "Frontend" | "Networking";
}

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
    author: mockUser,
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
];
