import type { ProfileUser } from "./types";

export const mockProfileUser: ProfileUser = {
  id: "user-1",
  name: "Alex Rivera",
  username: "arivera_dev",
  email: "alex@dev-meet.com",
  avatar: null,
  bio: "Full-stack engineer building the future of developer collaboration. Passionate about Rust, TypeScript, and Terminal UIs.",
  location: "San Francisco, CA",
  joined: "Jan 2024",
  stats: {
    posts: 42,
    connections: 847,
    projects: 12,
    contributions: 1337,
  },
  stack: [
    { name: "TypeScript", level: "Expert" },
    { name: "React", level: "Expert" },
    { name: "Rust", level: "Intermediate" },
    { name: "Node.js", level: "Expert" },
    { name: "TailwindCSS", level: "Expert" },
  ],
};

export const contributionData = [
  [0, 2, 1, 4, 3, 2, 1],
  [1, 0, 3, 2, 5, 1, 0],
  [2, 3, 4, 1, 2, 3, 4],
  [0, 1, 2, 0, 1, 2, 0],
  [3, 2, 1, 5, 4, 3, 2],
  [1, 2, 3, 4, 5, 2, 1],
  [0, 0, 1, 2, 1, 0, 0],
];
