import { mockDashboardUser } from "./mock-user";
import type { DashboardActivity } from "./types";

export const activityFeed: DashboardActivity[] = [
  {
    id: "act-1",
    type: "post",
    user: {
      name: "Sarah Chen",
      username: "schen_dev",
      avatar: "/assets/avatars/user-2.png",
    },
    content:
      "Just published a new guide on advanced React patterns with TypeScript. Check it out!",
    timestamp: "2h ago",
    likes: 24,
    comments: 5,
  },
  {
    id: "act-2",
    type: "connection",
    user: {
      name: "Marcus Thorne",
      username: "mthorne",
      avatar: "/assets/avatars/user-3.png",
    },
    target: { name: "Alex Rivera", username: "arivera_dev" },
    timestamp: "5h ago",
  },
  {
    id: "act-3",
    type: "project",
    user: mockDashboardUser,
    content:
      "Pushed updates to 'terminal-ui-kit' v2.0.0. Added new custom beziers for scroll reveals.",
    timestamp: "1d ago",
    likes: 156,
    comments: 12,
  },
];
