import { useUsers } from "../features/users/useUsers";

export default function Test() {
  const { data: users = [], isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h2>Users</h2>
      {users.map((u) => (
        <div key={u.id}>
          <p>
            <strong>Email:</strong> {u.email}
          </p>
          <p>
            <strong>Name:</strong> {u.name}
          </p>
          <p>
            <strong>Role:</strong> {u.role}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(u.createdAt ?? "").toLocaleString()}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {new Date(u.updatedAt ?? "").toLocaleString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}
