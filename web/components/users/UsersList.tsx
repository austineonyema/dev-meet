import type { UserRecord } from "@/lib/users";
import { UserRecordCard } from "./UserRecordCard";

type UsersListProps = {
  users: UserRecord[];
};

export function UsersList({ users }: UsersListProps) {
  if (!users.length) {
    return (
      <div className="terminal-box rounded-xl border-terminal/10 p-6 font-mono text-sm text-text-muted">
        No users found.
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {users.map((user) => (
        <UserRecordCard key={user.id} user={user} />
      ))}
    </section>
  );
}
