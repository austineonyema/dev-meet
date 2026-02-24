import type { UserRecord } from "@/lib/users";

type UserRecordCardProps = {
  user: UserRecord;
};

function formatDate(value?: string): string {
  if (!value) return "-";
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return "-";
  return new Date(timestamp).toLocaleString();
}

export function UserRecordCard({ user }: UserRecordCardProps) {
  return (
    <article className="terminal-box rounded-xl border-terminal/10 p-4">
      <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <DataRow label="Email" value={user.email} />
        <DataRow label="Name" value={user.name || "-"} />
        <DataRow label="Role" value={user.role || "-"} />
        <DataRow label="Created" value={formatDate(user.createdAt)} />
        <DataRow label="Updated" value={formatDate(user.updatedAt)} />
      </div>
    </article>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-text-secondary">
      <span className="font-semibold text-text-primary">{label}:</span> {value}
    </p>
  );
}
