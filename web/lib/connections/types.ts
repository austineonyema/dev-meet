export type ConnectionRecord = {
  id: string;
  name: string;
  username: string;
  role: string;
  location: string;
  status: "online" | "away" | "offline";
  avatar: string;
};
