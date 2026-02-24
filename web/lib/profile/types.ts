export type ProfileStatSet = {
  posts: number;
  connections: number;
  projects: number;
  contributions: number;
};

export type ProfileStackItem = {
  name: string;
  level: string;
};

export type ProfileUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  location: string;
  joined: string;
  stats: ProfileStatSet;
  stack: ProfileStackItem[];
};
