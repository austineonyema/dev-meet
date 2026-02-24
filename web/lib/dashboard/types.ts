export type DashboardUserStats = {
  posts: number;
  connections: number;
  projects: number;
  contributions: number;
};

export type DashboardStackItem = {
  name: string;
  level: string;
};

export type DashboardUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio: string;
  location: string;
  joined: string;
  stats: DashboardUserStats;
  stack: DashboardStackItem[];
};

export type DashboardActivityType = "post" | "connection" | "project";

export type DashboardActivity = {
  id: string;
  type: DashboardActivityType;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  content?: string;
  target?: {
    name: string;
    username: string;
  };
  timestamp: string;
  likes?: number;
  comments?: number;
};
