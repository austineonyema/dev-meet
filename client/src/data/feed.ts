import { mockUser } from "./user";

export const activityFeed = [
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
    user: mockUser,
    content:
      "Pushed updates to 'terminal-ui-kit' v2.0.0. Added new custom beziers for scroll reveals.",
    timestamp: "1d ago",
    likes: 156,
    comments: 12,
  },
];

export const contributionData = [
  [0, 2, 1, 4, 3, 2, 1],
  [1, 0, 3, 2, 5, 1, 0],
  [2, 3, 4, 1, 2, 3, 4],
  [0, 1, 2, 0, 1, 2, 0],
  [3, 2, 1, 5, 4, 3, 2],
  [1, 2, 3, 4, 5, 2, 1],
  [0, 0, 1, 2, 1, 0, 0],
];
