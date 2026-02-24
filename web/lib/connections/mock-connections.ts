import type { ConnectionRecord } from "./types";

export const mockConnections: ConnectionRecord[] = [
  {
    id: "conn-1",
    name: "Alex Rivera",
    username: "arivera_dev",
    role: "Platform Engineer",
    location: "San Francisco, CA",
    status: "online",
    avatar: "/assets/avatars/user-1.png",
  },
  {
    id: "conn-2",
    name: "Sarah Chen",
    username: "schen_dev",
    role: "Frontend Architect",
    location: "Toronto, CA",
    status: "away",
    avatar: "/assets/avatars/user-2.png",
  },
  {
    id: "conn-3",
    name: "Marcus Thorne",
    username: "mthorne",
    role: "Infrastructure Engineer",
    location: "Berlin, DE",
    status: "online",
    avatar: "/assets/avatars/user-3.png",
  },
];
